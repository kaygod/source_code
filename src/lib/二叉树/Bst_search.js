const { Bst } = require("./Bst");

const root = new Bst([10,2,12,1,5,11,13]);

/**
  
 二叉搜索树查询元素

 */
function search(node,value){
   if(!node){
      return false;
   }
   else if(node.value == value){
      return true;
   } else if(value > node.value){
     return search(node.right,value);
   }else{
     return search(node.left,value);
   }
}

console.log(search(root,12)); // true

console.log(search(root,100)); // false


/**
 
  二叉搜索树类似结构如下.请编写函数reverse将其翻转.

          10
         /  \
        2    12 
       / \   / \     
      1   5 11  13 
   
  翻转后的二叉树结构如下:
  
          10
         /  \
        12   2 
       / \   / \     
      13  11 5  1
  
  通过利用前面学习的遍历方式,翻转功能轻易实现.    

 */

function reverse(root){
    function preorderTraversal(node){
        if(!node){
            return;
        }
        const tmp = node.left; // 左右节点进行交换
        node.left = node.right;
        node.right = tmp;
        preorderTraversal(node.left);
        preorderTraversal(node.right);
    }
    preorderTraversal(root);
    return root;
}

//const root = new Bst([10,2,12,1,5,11,13]);

//console.log(reverse(root));



/**
 
 判断一棵树是否是二叉搜索树.

 二叉搜索树的判断标准是节点的值要大于左节点的值,小于右节点的值,不满足此条件返回``false``.

 */
function isBst(node){

    if(!node){
        return true;
    }

    if( (node.right && node.value >= node.right.value) || (node.left && node.value <= node.left.value)){
        return false;
    }

    return isBst(node.left) && isBst(node.right);

}

//const root = new Bst([10,2,12,1,5,11,13]);

console.log(isBst(root)); // true

console.log(isBst(reverse(root))); // false