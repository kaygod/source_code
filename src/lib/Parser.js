class Parser {
    constructor(expression) {
        this.expression = expression;
        //所有可能出现的符号
        this.symbal = [
            '(',
            ')',
            '+',
            '-',
            '*',
            '/',
            '%',
            '[',
            ']',
            '.',
            '!',
            '&',
            '|',
            '=',
        ];
        this.fragments = []; //存储文档碎片
        this.exp_list = []; //存储表达式列表
        this.expression = expression; //将表达式存储起来
        this.compile(this.expression);
    }
    /**
     * 编译表达式
     */
    compile(exp) {
        let i = 0, last = 0, tmp = '', record = false;
        while (i < exp.length) {
            if (exp[i] === '{' && exp[i + 1] === '{') {
                this.fragments.push(exp.slice(last, i), '');
                last = i;
                record = true; // 开始记录
                i += 2;
                continue;
            }
            else if (exp[i] === '}' && exp[i + 1] === '}') {
                this.exp_list.push({
                    index: this.fragments.length - 1,
                    exp: exp.slice(last + 2, i),
                });
                last = i + 2;
                record = false;
                tmp = '';
            }
            else if (record) {
                tmp += exp[i];
            }
            i++;
        }
        this.fragments.push(exp.slice(last));
        this.deep();
    }
    /**
     * 深度编译
     */
    deep() {
        let i = 0;
        while (i < this.exp_list.length) {
            const ob = this.exp_list[i]; //获取表达式
            ob.render = this.deepParse(ob.exp); //添加渲染函数
            i++;
        }
    }
    /**
     *  返回渲染函数
     */
    deepParse(expression) {
        let origin = this.parseExpression(expression);
        origin = this.optimize(origin);
        return (scope) => {
            const [data] = origin;
            if (data.getValue) {
                return data.getValue(scope);
            }
            else if (data.type === 'state' && data.isConstant === false) {
                return scope[data.exp];
            }
            else if (data.type === 'state' && data.isConstant === true) {
                return data.exp.replace(/('|"|`)/gi, ''); //将字符串常量的引号去掉
            }
        };
    }
    /**
     * 编译核心过程
     */
    optimize(data) {
        let result = [];
        //第一步先去掉空格
        data.forEach((value) => {
            if (value.exp.trim() !== '') {
                value.exp = value.exp.trim();
                if (/^(['"`])[^'"`]*\1$/.test(value.exp)) {
                    //判断是不是字符串常量
                    value.isConstant = true;
                    value.catagory = 'string';
                }
                result.push(value);
            }
        });
        //第二步 将 - - 2 ,+ + 3 正负数合并
        for (let i = result.length - 1; i >= 0; i--) {
            const value = result[i];
            const black_list = ['+', '-', '*', '/', '%', '!', '&', '|', '='];
            if (value.type === 'symbal' &&
                (value.exp === '+' || value.exp === '-') &&
                (i === 0 ||
                    (result[i - 1].type === 'symbal' &&
                        black_list.includes(result[i - 1].exp)))) {
                //这说明这是个正负数
                result.splice(i, 1)[0]; //符号对象
                result[i].exp = value.exp === '-' ? '-' + result[i].exp : result[i].exp;
            }
        }
        // 第三步 将 &&,||,以及 == 都转换成一个符号
        for (let i = result.length - 1; i >= 0; i--) {
            const value = result[i];
            if (value.type === 'symbal' &&
                (value.exp === '&' || value.exp === '|' || value.exp === '=') &&
                value.exp === result[i + 1].exp) {
                result.splice(i, 1);
            }
        }
        // 第四步 处理小括号
        result = this.bracketHanlder(result);
        // 第五步 处理 '[' 和 ']'
        result = this.squreBracketHanlder(result);
        // 第六步 处理 "."
        result = this.dotHandler(result);
        // 第七步 处理 "!"
        result = this.exclamationHandler(result);
        // 第八步 处理 "*","/","%"
        this.superiorClac(result);
        // 第九步 处理 "+" 和 "-"
        this.basicClac(result);
        // 第十步 处理 "&", "|" 和 "="
        this.logicClac(result);
        return result;
    }
    /**
     *  处理逻辑运算符
     */
    logicClac(data) {
        const white_list = ['&', '|', '='];
        this.exec(white_list, data, (lv, rv, tmp) => {
            if (tmp[1].exp === '&') {
                return lv && rv;
            }
            else if (tmp[1].exp === '|') {
                return lv || rv;
            }
            else if (tmp[1].exp === '=') {
                return lv == rv;
            }
        });
    }
    /**
     *  处理 "+" 和 "-"
     */
    basicClac(data) {
        const white_list = ['+', '-'];
        this.exec(white_list, data, (lv, rv, tmp) => {
            if (tmp[1].exp === '+') {
                return lv + rv;
            }
            else if (tmp[1].exp === '-') {
                return lv - rv;
            }
        });
    }
    /**
     *  处理 "*","/","%"
     */
    superiorClac(data) {
        const white_list = ['*', '/', '%'];
        this.exec(white_list, data, (lv, rv, tmp) => {
            if (tmp[1].exp === '*') {
                return lv * rv;
            }
            else if (tmp[1].exp === '/') {
                return lv / rv;
            }
            else if (tmp[1].exp === '%') {
                return lv % rv;
            }
        });
    }
    /**
     *  执行计算逻辑
     */
    exec(white_list, data, callback) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].type === 'symbal' && white_list.includes(data[i].exp)) {
                //删除三个元素
                const tmp = data.splice(i - 1, 3);
                // 组合新元素
                const left = tmp[0];
                const right = tmp[2];
                const new_item = {
                    type: 'state',
                    catagory: tmp[1].exp,
                    left: this.getExp(left),
                    right: this.getExp(right),
                    getValue: (scope) => {
                        const lv = this.getMidValue(left, scope);
                        const rv = this.getMidValue(right, scope);
                        return callback(lv, rv, tmp);
                    },
                };
                //插入新元素
                data.splice(i - 1, 0, new_item);
                //修正索引
                i -= 1;
            }
        }
    }
    /**
     * 处理 "!""
     */
    exclamationHandler(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].type === 'symbal' && data[i].exp === '!') {
                const extra = data.splice(i, 2);
                const right = extra[1].getValue ? extra[1].getValue : extra[1].exp;
                const new_item = {
                    type: 'state',
                    catagory: '!',
                    right,
                    getValue: (scope) => {
                        return typeof right === 'function'
                            ? !right(scope)
                            : extra[1].isConstant
                                ? !this.getConstant(extra[1])
                                : !scope[right];
                    },
                };
                data.splice(i, 0, new_item);
            }
        }
        return data;
    }
    /**
     *  处理 "."
     */
    dotHandler(data) {
        for (let i = 0; i < data.length; i++) {
            if (data[i].exp === '.') {
                const de_array = data.splice(i - 1, 3); //删掉的三个元素
                const left = de_array[0].getValue
                    ? de_array[0].getValue
                    : de_array[0].exp;
                const right = de_array[2].exp;
                data.splice(i - 1, 0, {
                    type: 'state',
                    catagory: 'dot',
                    left,
                    right,
                    getValue(scope) {
                        const val = typeof left === 'function' ? left(scope) : left;
                        if (de_array[0].isConstants) {
                            // 判断是小数
                            return Number(val + '.' + right);
                        }
                        if (typeof val === 'string') {
                            // val属于状态
                            return scope[val][right];
                        }
                        else {
                            // val是表达式计算出来的值
                            return val[right];
                        }
                    },
                });
                i -= 1;
            }
        }
        return data;
    }
    /**
     * 处理中括号
     */
    squreBracketHanlder(data) {
        let start_index = null, count = 0;
        const indexArray = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].exp === '[') {
                if (start_index == null) {
                    //第一次触碰 "["
                    start_index = i;
                    count++;
                }
                else {
                    count++;
                }
            }
            if (data[i].exp === ']') {
                count--;
                if (count == 0) {
                    //结尾了
                    indexArray.push([start_index, i]);
                    start_index = null;
                }
            }
        }
        let result = [], last = 0; //结果集
        indexArray.forEach((value) => {
            const [start, end] = value;
            result = result.concat(data.slice(last, start - 1));
            const left = data[start - 1].exp;
            const right = data.slice(start + 1, end).reduce((cur, next) => {
                return cur + next.exp;
            }, '');
            result.push({
                type: 'state',
                catagory: 'array',
                left,
                right,
                getValue: (scope) => {
                    return scope[left][this.deepParse(right)(scope)];
                },
            });
            last = end + 1;
        });
        result = result.concat(data.slice(last));
        return indexArray.length > 0 ? result : data;
    }
    /**
     * 处理小括号
     */
    bracketHanlder(data) {
        let start_index = null, count = 0;
        const indexArray = [];
        for (let i = 0; i < data.length; i++) {
            if (data[i].exp === '(') {
                if (start_index == null) {
                    //第一次触碰 "("
                    start_index = i;
                    count++;
                }
                else {
                    count++;
                }
            }
            if (data[i].exp === ')') {
                count--;
                if (count == 0) {
                    //结尾了
                    indexArray.push([start_index, i]);
                    start_index = null;
                }
            }
        }
        let result = [], last = 0; //结果集
        indexArray.forEach((value) => {
            const [start, end] = value;
            result = result.concat(data.slice(last, start));
            const exp = data.slice(start + 1, end).reduce((cur, next) => {
                return cur + next.exp;
            }, '');
            result.push({
                type: 'expression',
                exp,
                getValue: (scope) => {
                    return this.deepParse(exp)(scope);
                },
            });
            last = end + 1;
        });
        result = result.concat(data.slice(last));
        return indexArray.length > 0 ? result : data;
    }
    /**
     * 编译原始表达式
     */
    parseExpression(expression) {
        const data = [];
        let i = 0, tmp = '', last = 0;
        while (i < expression.length) {
            const c = expression[i];
            // -1*price[0].value && 12+(8*!6-num)
            if (this.symbal.includes(c)) {
                let exp = expression.slice(last, i), isConstant = false;
                if (this.isConstant(exp)) {
                    //是否为常量
                    isConstant = true;
                }
                //它是一个字符
                data.push({
                    type: 'state',
                    exp,
                    isConstant,
                });
                data.push({
                    type: 'symbal',
                    exp: c,
                });
                last = i + 1;
            }
            i++;
        }
        let exp = expression.slice(last), isConstant = false;
        if (this.isConstant(exp)) {
            //是否为数字常量
            isConstant = true;
        }
        data.push({
            type: 'state',
            exp,
            isConstant,
        });
        return data;
    }
    /**
     * 判断数据是否为数字常量
     */
    isConstant(exp) {
        return isNaN(Number(exp)) === false; //是数字
    }
    /**
     * 解析数据
     */
    parse(data) {
        const list = this.exp_list;
        if (list.length == 0) {
            //静态字符串直接返回
            return this.expression;
        }
        else {
            const fragments = [...this.fragments];
            list.forEach((item) => {
                fragments[item.index] = item.render(data);
            });
            return fragments.join('');
        }
    }
    /**
     * 获取表达式的值
     */
    getExp(ob) {
        if (ob.getValue) {
            return ob.getValue;
        }
        else {
            return ob.exp;
        }
    }
    /**
     * 获取中间值
     */
    getMidValue(ob, scope) {
        if (ob.getValue) {
            return ob.getValue(scope);
        }
        else {
            if (ob.isConstant) {
                let value = this.getConstant(ob);
                if (typeof value === 'string') {
                    value = value.replace(/('|"|`)/gi, '');
                }
                if (ob.catagory == null) {
                    // 是数字型常量
                    value = Number(value);
                }
                return value;
            }
            else {
                return scope[ob.exp];
            }
        }
    }
    /**
     * 获取常量值
     */
    getConstant(ob) {
        if (ob.catagory === 'string') {
            //字符串常量
            return ob.exp;
        }
        else {
            return Number(ob.exp); //数字常量
        }
    }
}
