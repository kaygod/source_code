// 链表的排序

 const NodeList = require("./ListNode");

 const head  = new NodeList([3,9,2,4,6,5,1,7,8]);

 function sort(head,tail){
   let anchor = head.next;
   let start = head; // 起始指针
   while(anchor != tail){
    if(anchor.value <= head.value){
        start = start.next; 
        swap(start,anchor);
    }
    anchor = anchor.next;
   }
   swap(head,start);
   sort(head,start);
   sort(start.next,tail);
   return head;
 }

 function swap(node_one,node_two){
  const tmp = node_one.value;
  node_one.value = node_two.value;
  node_two.value = tmp;
 }

 console.log(sort(head,null));