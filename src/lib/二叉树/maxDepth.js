const { Btree } = require("./Btree");


/**
 *  最大深度

 观察下图中的二叉树,请编写函数找出类似二叉树的最大深度?

 二叉树的最大深度为根节点到最远叶子节点的最长路径上的节点数.

 例如下图中``1 - 2 - 4 - 8``这条路径上的节点数是``4``,而其他从根节点到叶子节点路径上的最大节点数才为``3``
 个,因此该二叉树的最大深度为``4``.

 从图中可分析规律,二叉树的最大深度一定等于根节点与左子树某个叶子节点或者是右子树某个叶子节点形成路径的节点数的值较大的那一个.

 比如图中根节点``1``的最大深度等于节点``2``或者节点``3``的最大深度中更大的那一个加``1``.

 而节点``2``的最大深度等于节点``4``或者节点``5``的最大深度中更大的那一个加``1``.节点``3``的最大深度同理可得.

 最后经过层层递归,一定会到达最下层的叶子节点.叶子节点没有下一级,最大深度为1,能够成为递归的结束条件.

 */
function maxDepth(node){
    if(node == null){
        return 0;
    }
    return Math.max(maxDepth(node.left),maxDepth(node.right)) + 1;
}

const root = new Btree([1,2,3,4,5,6,7,8])

console.log(maxDepth(root));