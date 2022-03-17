/** 获取数组的第一个元素 */
type GetFirst<T extends unknown[]> = T extends [infer First, ...unknown[]]
  ? First
  : never;

/** 获取数组最后一个元素 */
type GetLast<T extends unknown[]> = T extends [...unknown[], infer Last]
  ? Last
  : never;

/** 去除数组最后一个元素 */
type PopArr<T extends unknown[]> = T extends [...infer Rest, unknown]
  ? Rest
  : never;

/** 去除数组第一个元素 */
type UnshiftArr<T extends unknown[]> = T extends [unknown, ...infer Rest]
  ? Rest
  : never;

/** 字符串是否以某个前缀开头 */
type StartsWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;

/** 字符串替换 */
type ReplaceStr<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;

/** 去除字符串右边空字符 */
type TrimStrRight<Str extends string> = Str extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
  ? TrimStrRight<Rest>
  : Str;

/** 去除字符串左边空字符 */
type TrimStrLeft<Str extends string> = Str extends `${
  | " "
  | "\n"
  | "\t"}${infer Rest}`
  ? TrimStrLeft<Rest>
  : Str;

/** 去除字符串左右两边空白字符 */
type TrimStr<Str extends string> = TrimStrLeft<TrimStrRight<Str>>;

/** 获取函数的参数 */
type GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : unknown;

/** 获取函数的返回值 */
type GetReturnType<Func extends Function> = Func extends (
  ...args: unknown[]
) => infer ReturnType
  ? ReturnType
  : unknown;

/** 获取方法里面的this */
type GetThisParameterType<T> = T extends (
  this: infer ThisType,
  ...args: unknown[]
) => unknown
  ? ThisType
  : unknown;

/** 获取构造器的返回的实例类型 */
type GetInstanceType<Constructor extends new (...args: any) => any> =
  Constructor extends new (...args: any) => infer InstanceType
    ? InstanceType
    : any;

/** 获取构造器的参数 */
type GetConstructorParameters<Constructor extends new (...args: any) => any> =
  Constructor extends new (...args: infer ParametersType) => any
    ? ParametersType
    : any;
