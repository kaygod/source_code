const { Btree } = require("./Btree");


/**
 *  二叉树的直径
 
  给定一棵二叉树，你需要计算它的直径长度.一棵二叉树的直径长度是任意两个结点路径长度中的最大值.
  这条路径可能穿过也可能不穿过根结点(leetcode真题).

  依旧观察下图,``8 - 4 - 2 - 1 - 3 - 6``和``8 - 4 - 2 - 1 - 3 - 7``是两条最长的路径,路径长度
  等于节点之间的边数,因此该二叉树的直径长度为``5``.

  计算直径长度其实是计算最大深度的延伸.依照计算最大深度的方法,根节点``1``的最大深度等于左右子树最大深度
  的较大值加``1``.

  那么如果将根节点``1``的左子树的最大深度和右子树的最大深度相加就得出了穿过``1``节点这条路径的直径.

  穿过根节点的直径长度不一定是最大的直径长度,比如下图中``6 - 4 - 2 - 5 - 8 - 9``就比穿过根节点的直径大.

          1
         / \
        2   3
       / \     
      4   5
     / \ / \    
    6  7 8  9
        /   
       10

  同理节点``2``作为左子树的根节点,它的直径等于它的左子树的最大深度加上右子树的最大深度.
  
  定义一个全局变量``max``存储直径长度的最大值.递归计算最大深度的过程中,每计算出一条直径长度就与``max``比较,
  如果值比``max``大就赋值给``max``.递归结束后,``max``便等于整颗二叉树最大的直径长度.
 

 */

 function DiameterOfBTree(node){

    let max = 0;

    (function maxDepth(node){
        if(node == null){
            return 0;
        }
        const maxLeftDepth = maxDepth(node.left);
        const maxRightDepth = maxDepth(node.right);
        const diameter = maxLeftDepth + maxRightDepth;
        if(diameter > max){
            max = diameter;
        }
        return Math.max(maxLeftDepth,maxRightDepth) + 1;
    })(node);
      
    return max;

 }

const root = new Btree([1,2,3,4,5,6,7,8])

console.log(DiameterOfBTree(root));