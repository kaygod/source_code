function compiler(code) {
  const rules = [
    '<\\?=([\\s\\S]*?)\\?>',
    '<\\?-([\\s\\S]*?)\\?>',
    '<\\?([\\s\\S]*?)\\?>',
  ];

  code = code.replace(/\n|\r\n/g, '');

  //code = code.replace(/\s+/g, "");

  const exp = new RegExp(rules.join('|'), 'g');

  var str = "var _p = ''; with (data) {  _p +=",
    index = 0;

  code.replace(
    exp,
    function (matches, interpolation, insertion, expression, offset) {
      //console.log(matches, interpolation, insertion, expression, offset);
      str += "'" + code.slice(index, offset) + "'";
      index = offset + matches.length;
      if (interpolation) {
        //插入值
        str += '+(' + interpolation + ')+';
      } else if (insertion) {
        str += "+'" + insertion + "'+";
      } else if (expression) {
        str += ';' + expression + '_p+=';
      }
    }
  );

  str += "'" + code.slice(index) + "'";

  str += ';}return _p;';

  console.log(str);

  const compile = new Function('data', str);

  const render = function (data) {
    return compile(data);
  };

  return render;
}
