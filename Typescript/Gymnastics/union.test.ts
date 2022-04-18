// type Union = "a" | "b" | "c";
// type UppercaseA<Item extends string> = Item extends "a"
//   ? Uppercase<Item>
//   : Item;
// type result = UppercaseA<Union>;

type CamelcaseArrTest = CamelcaseArr<["aa_a_a_aa", "bb_bb_bb"]>;

type CamelcaseUnionTest = CamelcaseUnion<"aa_a_a_aa" | "bb_bb_bb">;

type IsUnionFakeTest1 = IsUnionFake<"a">;
type IsUnionFakeTest2 = IsUnionFake<"a" | "b">;
type IsUnionTest1 = IsUnion<"a">;
type IsUnionTest2 = IsUnion<"a" | "b">;

type BEMTest = BEM<"a", ["b", "c"], ["e", "f"]>;

type AllCombinationsTest = AllCombinations<"A" | "B" | "C">;

export {};
