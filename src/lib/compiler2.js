function compile(string) {
  string = string.replace(/\n|\r\n/g, ''); //为了调用时兼容es6模板字符串

  /**
   * 将html字符串的特殊字符转义,预防xss攻击
   */
  function esacper(str) {
    const keyMap = {
      //需要转译的队列
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&hx27;',
      '`': '&#x660;',
    };

    const keys = Object.keys(keyMap);

    const reg = new RegExp(`(?:${keys.join('|')})`, 'g');

    const replace = (value) => {
      return keyMap[value];
    };

    return reg.test(str) ? str.replace(reg, replace) : str;
  }

  function render() {
    var str = '';
    str += esacper.toString();
    str += "var _p = '';";
    str += 'with(data){';
    str += '_p +=';
    str = templateParse(str);
    str += ';}return _p;';
    return str;
  }

  function templateParse(str) {
    var reg = /<\?=([\s\S]+?)\?>|<\?-([\s\S]+?)\?>|<\?([\s\S]+?)\?>/g;
    var index = 0;
    string.replace(reg, function (matches, $1, $2, $3, offset) {
      str += "'" + string.slice(index, offset) + "'";
      if ($1) {
        //渲染值
        str += '+';
        str += $1;
        str += '+';
      } else if ($2) {
        //渲染html字符串
        str += '+ esacper(' + $2 + ') +';
      } else if ($3) {
        //渲染表达式
        str += ';'; //第一步加个分号将前面的逻辑终止
        str += $3; //第二步直接拼接表达式
        str += '_p+='; //第三步要将表达式包裹的内容与_p相加并赋值给_p
      }
      index = offset + matches.length;
    });
    str += "'" + string.slice(index) + "'";
    return str;
  }

  var template_str = render();

  var fn = new Function('data', template_str);

  return fn;
}
