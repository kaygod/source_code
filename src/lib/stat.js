/**
 * 2.DOM 的体积过大会影响页面性能，假如你想在用户关闭页面时统计（计算并反馈给服务器）
 当前页面中元素节点的数量总和、元素节点的最大嵌套深度以及最大子元素个数，请用 JS 配合
 原生 DOM API 实现该需求（不用考虑陈旧浏览器以及在现代浏览器中的兼容性，可以使用任意
 浏览器的最新特性；不用考虑 shadow DOM）。比如在如下页面中运行后：
 
<html>
  <head></head>
  <body>
    <div>
      <span>f</span>
      <span>o</span>
      <span>o</span>
    </div>
  </body>
</html>
// 会输出：
{
  totalElementsCount: 7,
  maxDOMTreeDepth: 4,
  maxChildrenCount: 3
}
*/

function stat() {
  const htmlEle = document.querySelector('html');

  let count = 1;

  let max_child = 0;

  let deep = 1;

  function executa(ele, layer) {
    layer++;

    const nodeList = Array.prototype.slice.call(ele.children, 0);

    count += nodeList.length;

    max_child = nodeList.length > max_child ? nodeList.length : max_child;

    deep = layer > deep ? layer : deep;

    nodeList.forEach((node) => {
      if (node.children.length > 0) {
        executa(node, layer);
      }
    });
  }

  executa(htmlEle, 1);

  return {
    totalElementsCount: count,
    maxDOMTreeDepth: deep,
    maxChildrenCount: max_child,
  };
}

console.log(stat());
