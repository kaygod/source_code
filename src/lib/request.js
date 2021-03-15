function request(params){
   let count = 3;
   //控制返回结果
   function execute(rResolve){
      if(rResolve == null){ //第一次请求 rResolve为空
         return new Promise((resolve)=>{
            Post(resolve)
         })
      }else{
         Post(rResolve);
      }      
   }
   //请求数据
   function Post(resolve){
      axios.post(params.url,params.data).then((res)=>{
         resolve(res);
       }).catch(()=>{
          if(count > 0){
            count--;
            execute(resolve);
          }
       })
   }
   return execute();
}
//页面上调用
request({
  url:"/api/getList",
  data:{
     id:1
  }
}).then((data)=>{
  console.log(data);
})