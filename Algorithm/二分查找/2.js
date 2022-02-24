/**
 * 递归实现二分查找
 */
const binarySearch = (nums, value) => {
  return binarySearchStep(nums, 0, nums.length - 1, value);
};

const binarySearchStep = (nums, left, right, value) => {
  if (left > right) return -1;

  const mid = left + ((right - left) >> 1);
  if (nums[mid] === value) {
    return mid;
  } else if (nums[mid] > value) {
    return binarySearchStep(nums, left, mid - 1, value);
  } else {
    return binarySearchStep(nums, mid + 1, right, value);
  }
};

console.log(binarySearch([8, 11, 19, 23, 27, 33, 45, 55, 67, 98], 19));
