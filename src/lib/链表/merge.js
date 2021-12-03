

 const { NodeList,Node } = require("./ListNode");


 const head1 = new NodeList([1,3,6,7,9]);

 const head2 = new NodeList([2,3,6]);


/**
 * 
 *  有序链表的合并.存在两个有序链表(1,3,6,7,9)和(2,3,6),期待合并一个有序链表(1,2,3,3,6,6,7,9)输出.
 * 
 *  观察下图.创建一个空节点next,以及两个头指针head1和head2.两条链表使用头指针同时遍历,
 * 
 * 当head1的值比head2的值要小时,就将next节点指向head1.指针head1和节点next都往后进一步,第二轮再将head1的
 * 
 * 值与head2的值比较,发现head2的值比head1的值小,于是将next节点指向head2,指针head2和节点next往后进一步.
 * 
 * 依次类推,不断比较两条链表的值,将较小的值的节点接到next节点后面,最终由next节点推动生成的链表便是最终
 * 
 * 按序排列的合成链表.
 *  
 * 
 * 
 * @param {any} head 
 */
function Merge(head1,head2){
   
  const start = new Node(null); // 创建一个空节点

  let next = start;

  while(head1 && head2){
     if(head1.value <= head2.value){
        next.next = head1;
        next = head1;
        head1 = head1.next;
     }else{
        next.next = head2;
        next = head2;
        head2 = head2.next;  
     }
  }

  const extra = head1?head1:head2; // 长一些链表的剩余部分

  next.next = extra;

  return start.next;

}


console.log(JSON.stringify(Merge(head1,head2)));
