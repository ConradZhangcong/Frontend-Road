/**
 * 插入排序
 */
const insertionSort = (arr) => {
  // 第0位初始为已排序区间中的数据
  // 从第1位开始排序
  for (let i = 1; i < arr.length; i++) {
    // 当前元素
    const value = arr[i];
    // 比较0-j之间的元素 查找插入的位置
    let j = i - 1;
    for (; j >= 0; j--) {
      if (arr[j] > value) {
        arr[j + 1] = arr[j];
      } else {
        break;
      }
    }
    arr[j + 1] = value;
  }

  return arr;
};

console.log(insertionSort([1, 2, 3, 4, 5]));
console.log(insertionSort([3, 1, 4, 5, 2]));
console.log(insertionSort([2, 1, 1, 3, 2]));
