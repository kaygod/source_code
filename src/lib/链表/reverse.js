
 const {NodeList,Node} = require("./ListNode");


 const head = new NodeList([1,2,3,4,5]);

 /**
  * 
  * 
  *   从下图观察,(1,2,3,4,5)是一个链表,目标是翻转链表得到(5,4,3,2,1)
  * 
  *   首先新建一个值为null的节点next,将右侧链表第一个节点1指向next节点,并将1节点赋值给next
  * 
  *   同理链表第二个节点2改成指向next节点,并将2节点赋值给next.
  * 
  *   遍历持续下去,最终实现了(5,4,3,2,1)链表的反转,最后next节点变成了头指针5节点. 
  * 
  * 
  * @param {any} LinkOne 
  * @param {any} LinkTwo 
  */
 function reverse(head){
    
   let next = new Node(null);
   
   while(head){
      const tmp = head.next;
      head.next = next;
      next = head;
      head = tmp; 
   }

   return next;

 }

 console.log(JSON.stringify(reverse(head)));


 module.exports = {
  reverse
 }