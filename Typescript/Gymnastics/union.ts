// type CamelCase<T extends string> =
//   T extends `${infer Left}_${infer Right}${infer Rest}`
//     ? `${Left}${Uppercase<Right>}${CamelCase<Rest>}`
//     : T;

type CamelcaseArr<
  Arr extends unknown[],
  Result extends unknown[] = []
> = Arr extends [infer Item, ...infer Rest]
  ? [...Result, CamelCase<Item & string>, ...CamelcaseArr<Rest>]
  : Result;

type CamelcaseUnion<Item extends string> =
  Item extends `${infer Left}_${infer Right}${infer Rest}`
    ? `${Left}${Uppercase<Right>}${CamelcaseUnion<Rest>}`
    : Item;

type IsUnionFake<A, B = A> = A extends A ? { a: A; b: B } : never;

/** 判断是否为联合类型 */
type IsUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

/** BEM block__element--modifier */
type BEM<
  Block extends string,
  Element extends string[],
  Modifiers extends string[]
> = `${Block}__${Element[number]}--${Modifiers[number]}`;

type Combination<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

/** 全排列 */
type AllCombinations<A extends string, B extends string = A> = A extends A
  ? Combination<A, AllCombinations<Exclude<B, A>>>
  : never;
