// 链表的排序

 const { NodeList } = require("./ListNode");

 const head  = new NodeList([3,9,2,4,6,5,3,1,7,8]);
 
  /****
   * 
   * 快速排序的原理通常取队列第一个值为基准值,然后遍历整个队列,将小于基准值的数放左边,大于基准值的数放右边.然后将基准值左边和右边的子队列分别递归执行上一流程.
   * 
   * 链表实现快拍具体步骤如下(观察下图),定义两个指针smaller和bigger.将链表的第一个节点anchor设定为快速排序的基准点.首先
   * 
   * 比较bigger与anchor的值,bigger的值大,不做任何操作指针往下进一位,继续比较bigger与anchor的值.
   * 
   * bigger的值为2,小于anchor.将maller指针往下进一位,将maller的值和bigger的值进行交换,此时链表变成(3,2,9,1,6)
   * 
   * 交换后bigger指针往下进一位再与anchor的值比较,此时bigger的值为1小于anchor,smaller往下进一位再与bigger进行值交换,此时链表变成(3,2,1,9,6)
   * 
   * 交换后bigger指针往下进一位再与anchor的值比较,bigger的值大不做操作.此时遍历结束,将anchor的值与smaller值进行交换,链表变成(1,2,3,9,6)
   * 
   * 第一轮遍历后成功的将小于3的节点都放到了左边,大于3的节点放到了右边.剩下的任务是将3左边的子链表和右边的子链表分别递归执行上述步骤,直至将所有顺序排列完成.
   * 
   */

 function sort(head,tail){
   if(head === tail){
     return head;
   }
   let smaller = head;
   let anchor = head;
   let bigger = head.next;
   while(bigger != tail){
    if(bigger.value <= anchor.value){
        smaller = smaller.next; 
        swap(smaller,bigger);
    }
    bigger = bigger.next;
   }
   swap(anchor,smaller);
   sort(head,smaller);
   sort(smaller.next,tail);
   return head;
 }

 function swap(node_one,node_two){
  const tmp = node_one.value;
  node_one.value = node_two.value;
  node_two.value = tmp;
 }

 console.log(JSON.stringify(sort(head,null)));