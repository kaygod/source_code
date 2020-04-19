/**
 * 函数珂里化
 */
function currying(fn){

  const length = fn.length;//调用函数的length属性可以得到该函数拥有几个参数

  return function child(...args){

    if(args.length>=length){
        return fn(...args);
    }else{
        return (...new_args)=>{
            return child(...args,...new_args);
        }
    }

  }

}

function sum(a,b,c,d,e){
  return a+b+c+d+e;
}

const newFn = currying(sum);

console.log(newFn(1,2,3,4)); //[Function]
console.log(newFn(1)(2)(3,4,5)); //15
console.log(newFn(1)(2)(3)(4)(5)); //15
