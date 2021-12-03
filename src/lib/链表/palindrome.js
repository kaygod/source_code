

 const { NodeList } = require("./ListNode");
 const { reverse } = require("./reverse.js");

 const head = new NodeList([1,2,3,2,1]);


/**
 * 
 *   什么是回文链表?
 * 
 *   回文的含义是指无论从前往后读还是从后往前读,当所读的顺序一致时,读取的值应该相等.
 * 
 *   比如链表(1,2,3,2,1),从前往后读和从后往前获取的值是相同的,因此该链表为回文链表.另外偶数
 * 
 * 链表(1,2,2,1)也符合回文链表的标准.
 * 
 *    
 *   为了验证一个链表是否为回文链表,首先在链表头部设置两个指针:快指针fast和慢指针slow.快慢指针同时遍历
 * 
 * 链表,快指针每次进2格,慢指针进1格.如此快指针跑的距离是慢指针的两倍,当快指针跑到链表最后一个节点时,慢指针
 * 
 * 所处的位置恰好是链表的中心点(如下图).此时只需要将中心点右侧的链表进行翻转,再依次遍历同左侧链表的值一一比较,
 * 
 * 就能判断出链表是否是回文链表.
 * 
 * 
 * @param {any} head 
 */
function Palindrome(head){
   
   let fast = head; // 创建快指针
   let slow = head; // 创建慢指针
   let start; 

   while(fast && fast.next){
      fast = fast.next.next;;
      slow = slow.next;
   }

   if(fast){ // 链表是奇数个
    start = slow.next;
   }else{ // 链表是偶数个
    start = slow;
   }

   start = reverse(start); //使用上一小节介绍的翻转函数,将中心点右侧的链表翻转

   while(head != slow){
       if(head.value !== start.value){
         return false; // 有一个值不相等就不是回文链表
       }
       head = head.next;
       start = start.next; 
   }

   return true;
}


console.log(Palindrome(head));
