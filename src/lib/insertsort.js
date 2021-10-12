/*
function insertSort(list){
    for(let i = 0;i<list.length-1 ;i++){
        let j = i+1;
        const value = list[j];
        while(j>0 && list[j - 1] > value){
            list[j] = list[j-1];
            j--;
        }
        list[j] = value;
    }

    return list;

}
*/

function insertSort(list){
    for(let i = 0;i<list.length-1 ;i++){
        let j = i+1;
        const value = list[j];
        while(j>0 && list[j - 1] < value){
            list[j] = list[j-1];
            j--;
        }
        list[j] = value;
    }

    return list;

}


console.log(insertSort([1,4,6,3,-1,-2,7,5,9,8,22,1,34]));