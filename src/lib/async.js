function delay(){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(100);
        },1000)
    })
}

function async(fn){

    return new Promise((resolve,reject)=>{
        const gennerator = fn();    
        function next(data){
            const result = gennerator.next(data);
            if(result.done){ //运行完成了
                resolve(result.value);
            }else{
                if(result.value instanceof Promise){
                    result.value.then((value)=>{
                        next(value)
                    }).catch((e)=>{
                        reject(e);
                    })
                }else{
                    next(result.value);
                }         
            }
        } 
        next();
    })

}

/**
 * 这是用户写的函数
 */
function* getData(){
   
  let data = yield delay();

  data++;

  data = data + (yield 100); 

  data = data + (yield delay());

  return data;

}

async(getData).then((value)=>{
  console.log(value);
})