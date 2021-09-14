/** 交换数组两个下标的位置 */
const swap = (arr, i, j) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
};

const divide = (arr, start, end) => {
  // 以数组末尾为分界值
  const pivot = arr[end - 1];
  // 下标为起始点的前一位 start-1
  let index = start - 1;

  // 循环数组
  for (let i = start; i < end - 1; i++) {
    // 如果元素比边界值小 i++ 并且交换元素位置
    if (arr[i] < pivot) {
      index++;
      swap(arr, index, i);
    }
  }
  // 结束循环后将基准点跟i+1的位置互换
  swap(arr, index + 1, end - 1);
  return index + 1;
};

const quickSort = (arr, start, end) => {
  start = start || 0;
  end = end || arr.length;

  if (start < end - 1) {
    const pivot = divide(arr, start, end);
    quickSort(arr, start, pivot);
    quickSort(arr, pivot + 1, end);
  }

  return arr;
};

console.log(quickSort([15, 12, 3, 2, 7]));
