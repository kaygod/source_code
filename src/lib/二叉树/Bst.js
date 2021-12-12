const { Node } = require("./Btree");


/**
 * 
  二叉搜索树定义如下:

  * 节点的左子树只包含小于当前节点的数
  * 节点的右子树只包含大于当前节点的数
  * 所有左子树和右子树自身必须也是二叉搜索树
  
  例如下面数据结构就是一颗二叉搜索树,当前节点的值小于右节点的值,大于左节点的值.子树也遵循此规律.
  
          10
         /  \
        2    12 
       / \   / \     
      1   5 11  13

  构建二叉树的思路很简单.每插入一个新节点,从根节点开始判断,大于根节点的值看右边,小于看左边.再继续递归
  执行上述过程,直到子节点为空时将新节点插入.

 
 * @class Bst
 */
class Bst {
   
    constructor(list = []){
       this.root = new Node(list.shift());
       list.forEach((item)=>{
            this.add(new Node(item));
       })
       return this.root;     
    }

    add(node){
        if(!this.root){
            this.root = node;
            return;
        }

        let current = this.root;

        let parent;

        let direction;

        while(current){
            parent = current;
            if(node.value > current.value){ // 相等值不插入
                current = current.right;
                direction = "RIGHT"; // 右侧
            }else if(node.value < current.value){
                current = current.left;
                direction = "LEFT"; // 左侧
            }else{
                direction = null;
                break;
            }
        }

        if(direction == "LEFT"){
            parent.left =  node;
        }else if(direction == "RIGHT"){
            parent.right = node;
        }
    }

}

class Bstv2 {

    compare(valueA,valueB){
        if(this.compareFun){
            return this.compareFun(valueA,valueB);
        }
        return valueA - valueB;
    }
   
    constructor(list = [],compareFun){
       this.compareFun = compareFun; 
       this.root = new Node(list.shift());
       list.forEach((item)=>{
            this.add(new Node(item));
       })
       return this.root;       
    }

    add(node){
        if(!this.root){
            this.root = node;
            return;
        }

        let current = this.root;

        let parent;

        let direction;

        while(current){
            parent = current;
            if(this.compare(node.value,current.value)){ // 相等值不插入
                current = current.right;
                direction = "RIGHT"; // 右侧
            }else if(this.compare(current.value,node.value)){
                current = current.left;
                direction = "LEFT"; // 左侧
            }else{
                direction = null;
                break;
            }
        }

        if(direction == "LEFT"){
            parent.left =  node;
        }else if(direction == "RIGHT"){
            parent.right = node;
        }
    }

}

module.exports = {
    Bst
}

// console.log(new Bst([6,2,3,7,8]));

console.log(new Bstv2([{name:"张三",score:90},{name:"李四",score:100},{name:"王五",score:80}],function(valueA,valueB){
     return valueA.score > valueB.score;
}));


/*
 
 观察下面二叉树的结构特征,大的值放右边,小的值放左边,这样的数据结构已经做了二分处理. 

          10
         /  \
        2    12 
       / \   / \     
      1   5 11  13
  
二叉搜索树由于在构建时将数据做了而分化的处理,所以它在处理大数据的查询和排序占据优势.

为了学习二叉搜索树的查询和排序,先要了解常用的四种遍历方式.

* 前序遍历.先访问根节点,再访问左子树,后访问右子树.
* 中序遍历.先访问左子树,再访问根节点,后访问右子树.
* 后序遍历.先访问左子树,再访问右子树,后访问根节点.
* 层序遍历.从上到下,一层层的访问.

以上面二叉树举例.前序遍历先访问节点``10``,再访问左节点``2``,后访问右节点``12``.

访问左节点``2``的过程中,又递归执行上面流程.先访问节点``2``,再访问左节点``1``,后访问右节点``5``.左子树
访问完毕,开始访问右子树.节点``12``递归执行上述流程.

层序遍历先访问节点``10``,再访问第二层``2``和``12``,后访问第三层``1``、``5``、``11``和``13``.

下面用代码分别演示四种遍历方式.

*/

const root = new Bst([10,2,12,1,5,11,13]);

// 前序遍历
function preorderTraversal(node,callback){
    if(!node){
        return;
    }
    callback(node);
    preorderTraversal(node.left,callback);
    preorderTraversal(node.right,callback);
}

// console.log(preorderTraversal(root,function(node){
//     console.log(node.value); // 10 2 1 5 12 11 13
// }));

// 中序遍历
/**
  从结果可以看出,中序遍历的结果等于从小到大排序后的结果.利用中序遍历,我们在一些大数据的场景能快速得到
排序后的序列.
 */
function midTraversal(node,callback){
    if(!node){
        return;
    }
    midTraversal(node.left,callback);
    callback(node);
    midTraversal(node.right,callback);
}

// console.log(midTraversal(root,function(node){
//     console.log(node.value); // 1 2 5 10 11 12 13
// }));


// 后续遍历
function postorderTraversal(node,callback){
    if(!node){
        return;
    }
    postorderTraversal(node.left,callback);
    postorderTraversal(node.right,callback);
    callback(node);
}

// console.log(postorderTraversal(root,function(node){
//     console.log(node.value); // 1 5 2 11 13 12 10
// }));

// 层序遍历
function postorderTraversal(node,callback){
    const array = [node];
    for(let i = 0;i<array.length;i++){
        const item = array[i];
        if(!item){
            return;
        }
        callback(item);
        array.push(item.left);
        array.push(item.right);
    }
}

console.log(postorderTraversal(root,function(node){
    console.log(node.value); // 10 2 12 1 5 11 13
}));