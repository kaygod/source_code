
/**
 *  选择排序
 */
/*
 function selectSort(list){
    let min_index;
    for(let i = 0;i<list.length;i++ ){
        min_index = i;
        for(let j = i+1;j<list.length;j++){
            if(list[j] < list[min_index]){
                min_index = j;
            }
        }
        swap(i,min_index);
    }
    function swap(ii,mmin_index){
        let c = list[ii];
        list[ii] = list[mmin_index];
        list[mmin_index] = c;
    }
    return list;
}*/

/**
 *  选择排序
 */
function selectSort(list){
    let max_index;
    for(let i = 0;i<list.length;i++ ){
        max_index = i;
        for(let j = i+1;j<list.length;j++){
            if(list[j] > list[max_index]){
                max_index = j;
            }
        }
        swap(i,max_index);
    }
    function swap(ii,mmin_index){
        let c = list[ii];
        list[ii] = list[mmin_index];
        list[mmin_index] = c;
    }
    return list;
}


console.log(selectSort([1,6,4,9,3,5,7,22,4,8,3,12]));