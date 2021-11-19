
 const NodeList = require("./ListNode");

 const head  = new NodeList([1,2,3,4]);

 head.next.next.next.next = head.next;

 // 判断是否有环
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

