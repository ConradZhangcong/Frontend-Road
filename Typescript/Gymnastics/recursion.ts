/** 从层级不确定的Promise中获取返回值 */
type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
  infer ValueType
>
  ? ValueType extends Promise<unknown>
    ? DeepPromiseValueType<ValueType>
    : ValueType
  : never;

/** 简化DeepPromiseValueType */
type DeepPromiseValueType2<P> = P extends Promise<infer ValueType>
  ? DeepPromiseValueType2<ValueType>
  : P;

/** 反转数组 */
type ReverseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest
]
  ? [...ReverseArr<Rest>, First]
  : Arr;

/** 查找数组是否包含元素 */
type Includes<Arr extends unknown[], Item> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, Item> extends true
    ? true
    : Includes<Rest, Item>
  : false;

/** 是否相等 */
type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

/** 删除数组中的元素 */
type RemoveItem<
  Arr extends unknown[],
  Item,
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item, Result>
    : RemoveItem<Rest, Item, [...Result, First]>
  : Result;

/** 生成一定长度的数组 */
type BuildArray<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

/** 字符串替换 */
type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer First}${From}${infer Rest}`
  ? ReplaceAll<`${First}${To}${Rest}`, From, To>
  : Str;

type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;

/** 反转字符串 */
type ReverseStr<
  Str extends string,
  Result extends string = ""
> = Str extends `${infer Fisrt}${infer Rest}`
  ? ReverseStr<Rest, `${Fisrt}${Result}`>
  : Result;

type DeepReadonly<T extends Record<string, any>> = {
  readonly [Key in keyof T]: T[Key] extends Record<string, any>
    ? T[Key] extends Function
      ? T[Key]
      : DeepReadonly<T[Key]>
    : T[Key];
};
