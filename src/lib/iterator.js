function Iterator(array){
    let i = 0;
    return {
        next:function(){
            return {
                done:i<array.length?false:true,
                value:array[i++]
            }
        }
    }
}


const it = Iterator([1,2,3,4]);
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());
console.log(it.next());