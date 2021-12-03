class Node {
  constructor(value){
    this.value = value;
    this.next = null;            
  }
}

//const node = new Node(1);

//console.log(node);

class NodeList {

   constructor(list){
     
      const head = new Node(list.shift());

      let parent = head;

      list.forEach((value)=>{
        parent.next = new Node(value);
        parent = parent.next;
      })

      return head;

   }

}

//console.log(JSON.stringify(new NodeList([1,2,3,4])));


module.exports = {
  Node,
  NodeList
};

