Object._getOwnPropertyNames = function(data){

    if(Object.prototype.toString.call(data)!== "[object Object]"){
        return null;
    }
    
    let arr = [];

    for(let key in data){
         if(data.hasOwnProperty(key)){
            arr.push(key);
         }
    }

    return arr;

}

let obj = {
    a:1,
    b:2,
    c:function(){}
}

console.log(Object._getOwnPropertyNames(obj));