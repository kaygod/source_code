var Parser = /** @class */ (function () {
    function Parser(expression) {
        this.expression = expression;
        this.config = {
            //定义符号和优先级
            '+': 10,
            '-': 10,
            '*': 100,
            '/': 100,
            '%': 100,
            '||': 1,
            '&&': 1,
            '==': 1,
            '!': 200
        };
        this.fragments = []; //存储文档碎片
        this.exp_list = []; //存储表达式列表
        this.expression = expression; //将表达式存储起来
        this.compile();
    }
    //'<div>{{ -1*price[0].value && 12+(8*!6-num) }}</div>';
    /**
     * 编译表达式
     */
    Parser.prototype.compile = function () {
        var exp = this.expression;
        var i = 0, last = 0, tmp = '', record = false;
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
                    exp: exp.slice(last + 2, i)
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
    };
    /**
     * 解析数据
     */
    Parser.prototype.parse = function () {
        console.log(this);
    };
    return Parser;
}());
