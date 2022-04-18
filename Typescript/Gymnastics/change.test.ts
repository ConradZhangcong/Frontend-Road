type PushTest1 = [1, 2, 3];
type PushTest2 = Push<PushTest1, 4>;
// [1, 2, 3, 4]

type UnShiftTest1 = [1, 2, 3];
type UnShiftTest2 = UnShift<UnShiftTest1, 4>;
// [4, 1, 2, 3]

type ZipTest1 = [1, 2];
type ZipTest2 = ["a", "b"];
type ZipTest3 = ZipSimple<ZipTest1, ZipTest2>;

type ZipTest4 = [1, 2, 3, 4, 5];
type ZipTest5 = ["a", "b", "c", "d", "e"];
type ZipTest6 = Zip<ZipTest4, ZipTest5>;

type CapitalizeStrTest1 = CapitalizeStr<"conrad">;

type CamelCaseTest1 = CamelCase<"aa_bb_c_d">;

type DropSubStrTest1 = DropSubStr<"aaa--", "-">;
type DropSubStrTest2 = DropSubStr<"aa-a--", "-">;

type AppendArgumentTest = AppendArgument<(name: string) => boolean, number>;

type MappingTest1 = Mapping<{ a: 1; b: 2 }>;

type UppercaseKeyTest = UppercaseKey<{ aa: 1; bb: 2 }>;

type MyRecordTest = MyRecord<string, string>;
type RecordTest = Record<string, string>;

type ToReadonlyTest = ToReadonly<{
  a: 1;
  b: 2;
}>;

type ToPartialTest = ToPartial<{
  a: 1;
  b: 2;
}>;

type ToMutableTest = ToMutable<{
  readonly a: 1;
  b: 2;
}>;

type ToRequiredTest = ToRequired<{
  a?: 1;
  b: 2;
}>;

type FilterByValueTypeTest = FilterByValueType<
  {
    name: string;
    age: number;
    hobby: string[];
  },
  string | number
>;

export {};
