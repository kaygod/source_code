function deDuplecate(list){
    let slow = 0;
    let fast = 1;
    const result = [];
    while(list[fast] != null){
        if(list[fast] > list[slow]){
            result.push(list[slow]);
            slow = fast;
        }
        fast++; 
    }
    result.push(list[slow]);
    return result;
}



console.log(deDuplecate([1,2,3,3,4,4,4,5,6,7,8,9,10,10,10,11,11,12,12,12,13,14,14,19,19,19,19]));

console.log(deDuplecate([1,2,3,4,5,6,7,8,9]));

console.log(deDuplecate([1,1,1,1,1,1,1,1]));

