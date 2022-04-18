type IsAnyTest1 = IsAny<number>;
type IsAnyTest2 = IsAny<never>;
type IsAnyTest3 = IsAny<any>;

type IsEqualTest = IsEqual<any, number>;
type IsEqualTest2 = IsEqual2<any, number>;

type IsNeverTest<T> = T extends number ? 1 : 2;
type IsNeverTest2 = IsNeverTest<never>;
type IsNeverTest3 = IsNever<never>;

type TestAny<T> = IsNeverTest<any>;

type len = [1, 2, 3]["length"];
type len2 = number[]["length"];
type IsTupleTest1 = IsTuple<[1, 2, 3]>;
type IsTupleTest2 = IsTuple<number[]>;

type UnionToIntersectionTest = UnionToIntersection<{ a: 1 } | { b: 2 }>;
