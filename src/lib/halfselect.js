/*
function halfSelect(list,target){
    function handler(data){
        if(data.length == 0){
          return false;
        }
        if(data.length == 1){  
          return data[0] == target; 
        }
        const mid_index = Math.floor((0 + data.length-1)/2);
        const mid_value = data[mid_index];
        if(target == mid_value){
            return true;  
        }else if(target < mid_value){
            return handler(data.slice(0,mid_index));
        }else{
            return handler(data.slice(mid_index+1));
        }
    }
    return handler(list);
}*/

/*
function halfSelect(list,target){
    function handler(data,start_index = 0,end_index = data.length - 1){
        if(data.length == 0){
            return -1;
          }
        if(data.length == 1){
           return data[0] == target?start_index:-1;
        }
        const mid_index = Math.floor((0 + data.length-1)/2);
        const mid_value = data[mid_index];
        const mid_global_index = Math.floor((start_index + end_index)/2);
        if(target == mid_value){
             return mid_global_index;
        }else if(target < mid_value){
            return handler(data.slice(0,mid_index),start_index,mid_global_index - 1);
        }else{
            return handler(data.slice(mid_index+1),mid_global_index + 1,end_index);
        }
    }
    return handler(list);
}*/


function halfSelect(list,target){
    let cache_mid = null;
    function handler(data,start_index = 0,end_index = data.length - 1){
        if(data.length == 0){
            return -1;
        }
        if(data.length <= 2){
            const [ v1 = 0,v2 = 0 ] = data;
            const collections = [{
               index:start_index,
               value:Math.abs(target -v1)
            },{
               index: end_index,
               value: Math.abs(target -v2)
            },{
                index: cache_mid.mid_global_index,
                value: cache_mid.value
            }]

            const ob = {};
            
            collections.forEach((item)=>{
                if(ob[item.value] !== undefined){
                    if(item.index < ob[item.value]){
                      ob[item.value] = item.index;
                    }
                    return;
                }
                ob[item.value] = item.index;
            })

            const min__value = Math.min(Math.abs(target -v2),Math.abs(target -v1),cache_mid.value);

            return ob[min__value];
        }
        const mid_index = Math.floor((0 + data.length-1)/2);
        const mid_value = data[mid_index];
        const mid_global_index = Math.floor((start_index + end_index)/2);
        if(target == mid_value){
           return mid_global_index;
        }else{
            cache_mid = {
                mid_global_index,
                value:Math.abs(target - mid_value)
            }
            if(target < mid_value){
                return handler(data.slice(0,mid_index),start_index,mid_global_index - 1);
            }else{
                return handler(data.slice(mid_index+1),mid_global_index + 1,end_index);
            }
        }
    }
    return handler(list);
}


/*
function halfSelect(list,target){
    let start =  0;
    let end = list.length - 1;
    while(start<=end){
        let mid = Math.floor((start + end)/2); // 中间元素的索引
        if(list[mid] === target){
            return mid;
        }else if(list[mid] < target){
             start = mid + 1;
        }else{
            end = mid - 1;
        }
    }
    return -1;  
}
*/


console.log(halfSelect([3,4,5,5,5,5,5,5,10,23,24,30],5));