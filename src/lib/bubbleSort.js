function bubbleSort(list){
  
  function swap(a,b){
     let c = list[a];
     list[a] = list[b];
     list[b] = c;
  }

  for(let i = 0;i<list.length;i++){
    for(let j = 0;j<list.length - 1 -i;j++){
        if(list[j] > list[j+1]){
             swap(j,j+1);
        }
    }
  }

  return list;

}


console.log(bubbleSort([1,4,6,3,-1,-2,7,5,9,8,22,1,34]));