const { Btree } = require("./Btree");


/**
 
 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过``1``,此二叉树为平衡二叉树.

 例如下列二叉树为平衡二叉树. 

          10
         /  \
        2    12 
       / \       
      1   5 
 
 下列二叉树为非平衡二叉树.

          10
         /  \
        2    12 
       / \       
      1   5 
     / \ 
    11  13

请编写函数``isBalanced``判断二叉树是否为平衡二叉树.

判断平衡的关键条件是同一颗子树上的左右两个节点高度差不能大于``1``.

那么可以从根节点出发,递归求解左右子树的高度差.只要有一个高度差大于1,最终返回的结果就为``false``.


 */
function isBalanced(node){

    let result = true;
    
    function handler(node){
        if(!node){
            return 0;
        }

        const left_height = handler(node.left) + 1; // 左子树高度加1
        const right_height = handler(node.right) + 1; // 右子树高度加1

        if(!result){
            return;
        }
     
        if(Math.abs(left_height - right_height) > 1){ // 只要有一个高度差大于1,最终结果就为false
            result = false;
        }

        return Math.max(left_height,right_height);
    }

    handler(node);
    
    return result;

}

console.log(isBalanced(new Btree([3,9,20,null,null,15,7]))); // true

console.log(isBalanced(new Btree([1,2,2,3,3,null,null,4,4]))); // false





