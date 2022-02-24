/**
 * 冒泡排序
 */
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        // const temp = arr[i];
        // arr[i] = arr[j];
        // arr[j] = temp;
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }
  }

  return arr;
};

console.log(bubbleSort([1, 2, 3, 4, 5]));
console.log(bubbleSort([3, 1, 4, 5, 2]));
console.log(bubbleSort([2, 1, 1, 3, 2]));
