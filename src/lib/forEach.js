Array.prototype._forEach = function(fn){
    const array = this;
    for(let i=0;i<array.length;i++){
        fn(array[i],i,array);
    }
}


const arr = [{value:1},{value:2},{value:3},{value:4}];

arr._forEach((item,index)=>{
   item.value++;
})

console.log(arr);