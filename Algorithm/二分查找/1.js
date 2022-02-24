/**
 * 二分查找
 * 三个易错点:
 * 1. 循环条件 left <= right
 * 2. mid取值需要加上left的值: left + ((right-left) >> 1)
 * 3. left和right的更新需要+1, -1
 */
const binarySearch = (nums, value) => {
  let left = 0;
  let right = nums.length;
  while (left <= right) {
    const mid = left + ((right - left) >> 1);
    if (nums[mid] === left) {
      return mid;
    } else if (nums[mid] < value) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};

console.log(binarySearch([8, 11, 19, 23, 27, 33, 45, 55, 67, 98], 19));
