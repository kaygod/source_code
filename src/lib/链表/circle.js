
 const {NodeList} = require("./ListNode");

 const head  = new NodeList([1,2,3,4]);

 head.next.next.next.next = head.next;

 // 判断是否有环
 /**
  * 
  *   普通单向链表头指针遍历链表不断右移,最终会移动到空节点结束遍历.
  * 
  *   环形链表用头指针遍历后,指针最终不会移动到空节点,而是陷入了死循环(如下图).
  * 
  *   判断一个链表是否为环,可以采用快慢指针的思想.快指针每次右移两格,慢指针右移一格.
  * 
  *   两个指针同时从头部开始遍历链表,如果链表有环,快指针最终一定会追上慢指针.
  * 
  * @param {any} head 
  * @returns 
  */
 function isCircle(head){
    let fast = head;
    let slow = head;
    while(fast != null && fast.next != null){
      fast = fast.next.next;
      slow = slow.next; 
      if((fast && fast.next === slow) || fast === slow){
        return true; 
      }
    }
    return false;
 }

 console.log(isCircle(head));

