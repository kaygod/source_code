

/**
 *
   每个节点最多有两个子树的树结构称之为二叉树(形状如下图所示). 
 
   树中每一个圆圈代表一个节点,其中根部的节点A称为根节点
   
   B和C是A的子节点.子节点的个数称为度,A节点的度为2,D节点的度数为1.
   
   度为0的节点称之为叶子节点,比如图中的H、E、F、G 都属于叶子节点

   节点的深度: 从根节点到当前节点的唯一路径上的节点总数.B节点的深度为1.
   
   节点的高度：从当前节点到最远叶子节点的路径上的节点总数.B节点的高度为3.

   二叉树的基本概念介绍完毕后,我们接下来使用js实现一棵二叉树.
   
   二叉树由一个个节点组成,每一个节点可以通过类生成(代码如下).

   ``this.value``存储着当前节点的值,``this.left``是左节点,``this.right``是右节点.

   定义单个节点的目标已经实现了,那如何将这些节点组合起来形成一颗二叉树呢?

   存在数组``[0,1,2,3,4,5,6]``,请将该数组转换成一颗二叉树(数据存储的顺序如下图).

   观察图中数据的排列顺序,于数组中从左往右一一取出数据,顺着二叉树的第``0``层开始,自顶而下一层一层

   放置,每一层又从左往右的顺序安放数据.

   合成二叉树的关键在于每生成一个节点,需要知道该节点的父节点是谁,其次要知道该节点属于父节点的左侧还是右侧.

   从图中我们可以总结出以下规律:

   * 每一层的元素的索引值(数组中的索引)(数组中的索引)加``1``再求对数的结果相等.例如第``0``层元素``0``加``1``再求对数向下取整等于``0``.
   第二层的元素``1``和``2``都加``1``再求对数取整都等于``1``.因此数组中每个元素的索引值``i``使用公式``Math.floor(Math.log2(i+1))``就得到该元素在二叉树中所处的层数. 
   * 每一层第一个元素的索引等于``2``的``n``次方减``1``,其中``n``等于该元素所处的层数.
   * 父级的层数等于当前元素的层数减``1``.
   * 每个元素的索引值减去该层第一个元素的索引值除以``2``向下取整就能得到父级在自己层处于第几个位置.比如``4``号元素减去``3``除以``2``取整为0.那么父级元素就位于第``1``
   层第``0``个元素.而``5``号元素同理计算后父级处于第``1``层的第``1``个元素.
  
   通过以上几点规律,每个元素通过自己的索引值最终能够求出父级的索引,那二叉树的构建水到渠成(代码如下).

 *  
 * 
 * @class Node
 */
class Node {
    constructor(value){
       this.value = value;
       this.left = this.right = null;
    }
}


class Btree {
   
   constructor(array){
      this.transform(array);
      return this.root;
   }

   transform(array){
    
    const list = [];

    array.forEach((item,index)=>{

      if(item == null){ // 非空处理
        return;
      }

      const node = new Node(item);

      list.push(node);

      if(!this.root){
        this.root = node;
        return;
      }
      // 得到当前节点所处的层数
      const layer = Math.floor(Math.log2(index + 1));
      // 当前节点所在层数的首元素的索引
      const first_index = Math.pow(2,layer) - 1;
      // 父节点在其层处于第几个位置
      const parent_position = Math.floor((index - first_index)/2);
      // 父节点的层数
      const parent_layer = layer -1;
      // 父节点所在层数的首元素的索引
      const parent_first_index =  Math.pow(2,parent_layer) - 1;
      // 父节点的索引值
      const parent_index = parent_first_index + parent_position;
      // 父元素的节点
      const parent_node = list[parent_index];
  
      if(parent_node.left == null){
        parent_node.left = node;
      }else{
        parent_node.right = node;
      }
    })

    list.length = 0;

  }

}

module.exports = {
  Btree
};

// console.log(new Btree([0,1,2,3,4,5,6]));