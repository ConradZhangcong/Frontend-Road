type DeepPromiseValueTypeTest1 = DeepPromiseValueType<
  Promise<Promise<Promise<string>>>
>;
type DeepPromiseValueTypeTest2 = DeepPromiseValueType2<
  Promise<Promise<Promise<string>>>
>;
// @ts-expect-error
type DeepPromiseValueTypeTest4 = DeepPromiseValueType<string>;
type DeepPromiseValueTypeTest3 = DeepPromiseValueType2<string>;

type ReverseArrTest1 = ReverseArr<[1, 2, 3]>;
type ReverseArrTest2 = ReverseArr<[]>;

type IncludesTest1 = Includes<[1, 2, 3], 3>;
type IncludesTest2 = Includes<[1, 2, 3], 4>;

type RemoveItemTest1 = RemoveItem<[1, 2, 3], 3>;
type RemoveItemTest2 = RemoveItem<[1, 2, 3], 4>;
type RemoveItemTest3 = RemoveItem<[3, 1, 2, 3, 3], 3>;

type BuildArrayTest1 = BuildArray<5>;
type BuildArrayTest2 = BuildArray<5, string>;

type ReplaceAllTest1 = ReplaceAll<"aaa?b??c?", "?", "-">;

type StringToUnionTest = StringToUnion<"conrad">;

type ReverseStrTest = ReverseStr<"123456789">;

type DeepReadonlyTest = DeepReadonly<{
  a: { b: { c: 1; d: "2"; h: () => {} } };
  e: 3;
  f: { g: 4 };
}>;
type DeepReadonlyTest2 = DeepReadonlyTest["a"];
type DeepReadonlyTest3 = DeepReadonlyTest["a"]["b"];

export {};
