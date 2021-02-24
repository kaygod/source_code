interface eExp {
  index: number; //索引
  exp: string; //具体的表达式
  render?: (scope: any) => string;
}

class Parser {
  //所有可能出现的符号
  private symbal = [
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

  private fragments: string[] = []; //存储文档碎片

  private exp_list: eExp[] = []; //存储表达式列表

  constructor(private expression: string) {
    this.expression = expression; //将表达式存储起来
    this.compile();
  }

  //'<div>{{ -1*price[0].value && 12+(8*!6-num) }}</div>';

  /**
   * 编译表达式
   */
  compile() {
    const exp = this.expression;

    let i = 0,
      last = 0,
      tmp = '',
      record = false;

    while (i < exp.length) {
      if (exp[i] === '{' && exp[i + 1] === '{') {
        this.fragments.push(exp.slice(last, i), '');

        last = i;

        record = true; // 开始记录

        i += 2;

        continue;
      } else if (exp[i] === '}' && exp[i + 1] === '}') {
        this.exp_list.push({
          index: this.fragments.length - 1,
          exp: exp.slice(last + 2, i),
        });

        last = i + 2;

        record = false;
        tmp = '';
      } else if (record) {
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

      ob.render = (data) => {
        //添加渲染函数

        return this.deepParse(data, ob.exp);
      };
    }
  }

  deepParse(data, expression) {
    const origin = parseExpression(expression);

    return '';
  }

  /**
   * 编译原始表达式
   */
  parseExpression(expression) {
    const data = [];

    let i = 0,
      tmp = '',
      last = 0;

    while (i < expression.length) {
      const c = expression[i];

      // -1*price[0].value && 12+(8*!6-num)

      if (this.symbal.includes(c)) {
        //它是一个字符

        if (c === '+' || c === '-') {
          // 它有可能是正数和负数

          if (expression[i - 1] && this.symbal.includes(expression[i - 1])) {
            //判断它前一个符号是不是字符

            data.push({
              type: 'state',
              exp: expression.slice(last, i),
            });
          } else {
          }
        } else {
          data.push({
            type: 'state',
            exp: expression.slice(last, i),
          });

          data.push({
            type: 'symbal',
            exp: c,
          });
        }
      } else {
        // 非字符

        data.push({
          type: 'state',
          exp: '',
        });
      }
    }
  }

  /**
   * 解析数据
   */
  parse() {
    return '1213';
  }
}
