 
const toString = Object.prototype.toString;

const static = {
   type_id:1,
   children:[
       {
           type_id:2,
           type_name:"2号",
           children:[{
               type_id:5,
               type_name:"5号",
               children:[
                   {type_id:6, type_name:"6号",},
                   {type_id:88, type_name:"88号",}
               ]
           }]
       },
       {
           type_id:3,
           type_name:"3号",
       }, {
           type_id:4,
           type_name:"4号",
           children:[{
               type_id:7,
               type_name:"7号",
           },{
               type_id:8,
               type_name:"8号",
           }]
       }
   ]
}


function findName(data,id){
 if(typeof data !== "object" || data === null){
   return false;
 }
 if(toString.call(data) === "[object Object]"){
    data = [data];
 }
 const result = clac(data,id,[]);
 if(result){
   let value;
   Array.from(Array(result.length)).forEach((v,index)=>{
       if(index == 0){
           value = data[result[index]];
       }else{
           value = value.children[result[index]];
       }
   })
   if(value){
       return value.type_name;
   }
 }else{
   return null;
 }
}

function clac(data,id,array){
  for(let i = 0;i<data.length;i++){
       if(data[i].type_id === id){
           array.push(i);
           return array;    
       }else if(toString.call(data[i].children) === "[object Array]"){//还有下一级
           const result = clac(data[i].children,id,[...array,i]);
           if(result !== undefined){
               return result;
           }
       }
  }
}

console.log(findName(static,88));
console.log(findName(static,6));
console.log(findName(static,5));
console.log(findName(static,2));
console.log(findName(static,4));
console.log(findName(static,3));
console.log(findName(static,100));