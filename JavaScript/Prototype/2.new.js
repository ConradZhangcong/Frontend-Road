/**
 * 实现new
 * 1. 创新新对象
 * 2. 执行[[Prototype]]链接
 * 3. 生成的新对象绑定到函数调用的this
 * 4.
 */
function MyNew(Ctor) {
  if (typeof Ctor !== "function") {
    throw new Error("is not constructor");
  }

  newOperator.target = ctor;
  const newObj = Object.create(Ctor);
  const args = [].slice.call(arguments, 1);
  const returnObj = Ctor.apply(newObj, args);
  if (
    typeof returnObj === "function" ||
    (typeof returnObj === "object" && returnObj !== null)
  ) {
    return returnObj;
  }
  return newObj;
}
