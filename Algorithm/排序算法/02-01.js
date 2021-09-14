const arr = [15, 12, 3, 2, 7];
// 2,3,7,12,15

const quickSort = (arr) => {
  if (arr.length <= 1) return arr;
  // 位运算取中间值下标
  const pivotIndex = arr.length >> 1;
  // 截取原来的数组 并且获取中间值
  const pivot = arr.splice(pivotIndex, 1)[0];

  const left = [],
    right = [];
  // 循环数组 根据分界值进行分组
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 递归并且拼接左中右三个数组
  return quickSort(left).concat([pivot], quickSort(right));
};

console.log(quickSort(arr));
