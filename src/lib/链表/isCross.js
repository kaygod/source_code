
 const { NodeList } = require("./ListNode");

 const LinkOne = new NodeList([1,2,3,4,5]);
 const LinkTwo = new NodeList([6,7]); 

 LinkTwo.next.next = LinkOne.next.next.next;



 /**
  *  从图中观察链表相交后,相交点后面的节点都是一样的.因此存在两条长度不等的链表相交时,那么可以确定较长长度的那条链表
  * 所多出来的长度节点是绝对不会发生相交的.
  * 
  * 例如图中(1,2,3,4,20,21,22)形成的长链表长度比另一条短链表长度多2.那么可以断定长链表前2个元素绝不会出现相交.
  * 
  * @param {any} LinkOne 
  * @param {any} LinkTwo 
  */
 function isCross(head_one,head_two){
    
    let one_len = 1;
    let two_len = 1;
    let next_one = head_one;
    let next_two = head_two;

    while(next_one = next_one.next){
      one_len++; //获取链表1的长度
    }

    while(next_two = next_two.next){
      two_len++;  //获取链表2的长度
    }

    const extra = Math.abs(one_len - two_len); //多余的长度

    let long,short;

    if(one_len >= two_len){ // 如果链表1比链表2长
      long = head_one;
      short = head_two;
    }else{
      long = head_two;
      short = head_one;
    }

    for(let i = 0;i < extra;i++){ // 先排除掉多余的长度
      long = long.next;
    }

    while(true){
       if(!long.next){
          return false;
       }
       else if(long.next === short.next){
           return long.next;
       }else{
           long = long.next;
           short = short.next;
       }
    }

 }

 console.log(isCross(LinkOne,LinkTwo));
