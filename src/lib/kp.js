/**
 * 快速排序
 */
function kp(list){
    function execuate(data){
        if(data.length <= 1){
            return data;
        }
        const anchor = data.shift();
        const left = [];
        const right = [];
        data.forEach((v)=>{
              if(v <= anchor){
                 left.push(v);
              }else{
                 right.push(v)
              }
        })
        return execuate(left).concat([anchor]).concat(execuate(right));
    }
    return execuate(list);
}

console.log(kp([2,1,6,100,-3,3,12,-9,7,2,8,3,22,4,1,6,8]));