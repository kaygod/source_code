const { Btree } = require("./Btree");

/**
  
 如果一个树的左子树与右子树镜像对称,那么这个树是对称二叉树.

 例如，二叉树 [1,2,2,3,4,4,3,5,6,7,8,8,7,6,5] 是对称的.

             1
           /   \
          2     2
         / \   / \
        3  4   4  3
       /\ /\  /\  /\
      5 6 7 8 8 7 6 5
  
 请编写函数``isSymmetric``验证一颗二叉树是否为对称二叉树.

 分析上述对称二叉树的结构特征,根节点``1``下的左右子节点的值相等.

 左子树``2``节点的左节点等于右子树``2``节点的右节点.左子树``2``节点的右节点等于右子树``2``节点的左节点.

 比较完了第二层,将左子树``2``节点的左节点与右子树``2``节点的右节点继续按上述流程递归比较.同理左子树``2``节点的右节点
 和右子树``2``节点的左节点也按上述流程递归比较.

 那么判断每一层是否对称的规律总结如下.

 * 两个节点``A``和``B``的值相等
 * ``A``节点的左节点的值等于``B``节点右侧的值,``A``节点的右节点的值等于``B``节点左侧的值

 */

function isSymmetric(root){

    function hanlder(nodeA,nodeB){
        
        //两个节点一个为空,另一个不为空说明是不对称的
        if((nodeA == null && nodeB != null) || (nodeA != null && nodeB == null)){
            return false;
        }
        
        //两个节点都为空,这两个空节点是对称的
        if(nodeA == null && nodeB == null){
            return true;
        }

        //两个节点的值不相等是不对称的
        if(nodeA.value != nodeB.value){
            return false;
        }

        return hanlder(nodeA.left,nodeB.right) && hanlder(nodeA.right,nodeB.left);

    }

    return hanlder(root.left,root.right);
}

const tree = new Btree([1,2,2,3,4,4,3,5,6,7,8,8,7,6,5]);

console.log(isSymmetric(tree));