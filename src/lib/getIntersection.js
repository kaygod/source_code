// 计算多个区间的交集.每个区间用长度为2的数字数组表示,如[2,5]表示区间2到5(包括2和5).区间不限定防线.如[5,2]等同于[2,5].
// 请实现getIntersection函数,可接受多个区间并返回所有区间的交集(用区间表示),空集用null表示

//实例:   getIntersection([5, 2], [1, 9], [3, 6]) // [3,5]
// getIntersection([1, 7], [8, 9], [1, 2, 3]) // null

function getIntersection(...args) {
  function clac(array1, array2) {
    if (array1[0] > array1[1]) {
      array1 = [array1[1], array1[0]];
    }

    if (array2[0] > array2[1]) {
      array2 = [array2[1], array2[0]];
    }

    if (array1[1] < array2[0] || array1[0] > array2[1]) {
      return [];
    }

    let min_arr, max_arr;

    if (array1[1] - array1[0] <= array2[1] - array2[0]) {
      min_arr = array1;
      max_arr = array2;
    } else {
      min_arr = array2;
      max_arr = array1;
    }

    const result = [];

    for (let i = min_arr[0]; i <= min_arr[1]; i++) {
      if (i >= max_arr[0] && i <= max_arr[1]) {
        result.push(i);
      } else if (i > max_arr[1]) {
        break;
      }
    }

    if (result.length > 0) {
      return [result[0], result[result.length - 1]];
    }

    return result;
  }

  let data = args.reduce((value, cur) => {
    return clac(value, cur);
  });

  if (data.length == 0) {
    return null;
  } else {
    return data;
  }
}

console.log(getIntersection([5, 2], [1, 9], [3, 6])); // 返回[3,5]

console.log(getIntersection([1, 7], [8, 9], [1, 2, 3])); // 返回null
