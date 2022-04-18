/** 添加到数组末尾生成新数组 */
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];

/** 添加到数组头部生成新数组 */
type UnShift<Arr extends unknown[], Ele> = [Ele, ...Arr];

/** 键值生成键值对 */
type ZipSimple<
  Key extends [unknown, unknown],
  Value extends [unknown, unknown]
> = Key extends [infer Key1, infer Key2]
  ? Value extends [infer Value1, infer Value2]
    ? [[Key1, Value1], [Key2, Value2]]
    : unknown
  : unknown;

type Zip<Key extends unknown[], Value extends unknown[]> = Key extends [
  infer Key1,
  ...infer RestKey
]
  ? Value extends [infer Value1, ...infer RestValue]
    ? [[Key1, Value1], ...Zip<RestKey, RestValue>]
    : []
  : [];

// 字符串重新构造
/** 首字母大写 */
type CapitalizeStr<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T;

/** aa_bb_cc 到 aaBbCc的转换 */
type CamelCase<T extends string> =
  T extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
    : T;

/** 删除字符串中的子串 */
type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Left}${SubStr}${infer Right}`
  ? DropSubStr<`${Left}${Right}`, SubStr>
  : Str;

// 函数重新构造
type AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer Result
  ? (...args: [...Args, Arg]) => Result
  : Func;

// 索引类型的重新构造
type Mapping<T extends object> = {
  [Key in keyof T]: [T[Key], T[Key], T[Key]];
};

/** 将key值变为大写 */
type UppercaseKey<T extends object> = {
  [Key in keyof T as Uppercase<Key & string>]: T[Key];
};

type MyRecord<K extends string | number | symbol, T> = {
  [key in K]: T;
};

/** 属性变为只读 */
type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

/** 属性变为可选 */
type ToPartial<T> = {
  [Key in keyof T]?: T[Key];
};

/** 只读属性变为可修改 */
type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

/** 属性变为必须 */
type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};

/** 根据值得类型过滤 */
type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as ValueType extends Obj[Key] ? Key : never]: Obj[Key];
};
