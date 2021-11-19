
function oddEvenSort(list){
    function swap(a,b){
        let c = list[a];
        list[a] = list[b];
        list[b] = c;
    }
   //外层循环控制奇偶循环的总次数,最差的情况就是最大值在队列起始位置,要经历list.length-1次循环移到末尾
   for(let i = 0;i < list.length - 1;i++){
        let start = (i+1)%2 != 0 ? 0:1; // 奇循环起始索引为0,偶循环起始索引为1  
        while(start < list.length - 1){
           if(list[start] > list[start + 1]){
            swap(start,start+1);
           } 
           start+=2;
        }
   }
   return list;
}

console.log(oddEvenSort([24,10,7,23,-3,5,5,3,3,5,11]));