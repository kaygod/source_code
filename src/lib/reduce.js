

Array.prototype._reduce = function(fn,data){

    const array = this;

    let start_index = 0;

    if(data === null || data === undefined){

        data = array[0];

        start_index = 1;

    }

    for(let i = start_index;i<array.length;i++){
        data = fn(data,array[i],i,array);
    }

    return data;

}


const arr = [1,2,3,4,5,6];
let obj = {};

const result = arr._reduce((prev,current,index,arr)=>{

    prev[index] = current;

    return prev;

},obj)

console.log(result);