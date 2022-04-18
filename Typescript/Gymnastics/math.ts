// type BuildArray<
//   Length extends number,
//   Ele = unknown,
//   Arr extends unknown[] = []
// > = Arr["length"] extends Length ? Arr : BuildArray<Length, Ele, [...Arr, Ele]>;

type Add<Num1 extends number, Num2 extends number> = [
  ...BuildArray<Num1>,
  ...BuildArray<Num2>
]["length"];

type Subtract<
  Num1 extends number,
  Num2 extends number
> = BuildArray<Num1> extends [...BuildArray<Num2>, ...infer Rest]
  ? Rest["length"]
  : never;

type Mutiply<
  Num1 extends number,
  Num2 extends number,
  Result extends unknown[] = []
> = Num2 extends 0
  ? Result["length"]
  : Mutiply<Num1, Subtract<Num2, 1>, [...Result, ...BuildArray<Num1>]>;

type Divide<
  Num1 extends number,
  Num2 extends number,
  Result extends unknown[] = []
> = Num1 extends 0
  ? Result["length"]
  : Divide<Subtract<Num1, Num2>, Num2, [unknown, ...Result]>;

/** 字符串长度 */
type StrLength<
  Str extends string,
  Result extends unknown[] = []
> = Str extends `${infer Fisrt}${infer Rest}`
  ? StrLength<Rest, [unknown, ...Result]>
  : Result["length"];

type GreaterThan<
  Num1 extends number,
  Num2 extends number,
  Result extends unknown[] = []
> = Num1 extends Num2 // Num1 extends Num2 表示相等
  ? false
  : Result["length"] extends Num2
  ? true
  : Result["length"] extends Num1
  ? false
  : GreaterThan<Num1, Num2, [...Result, unknown]>;

type FibonacciLoop<
  PrevArr extends unknown[],
  CurrentArr extends unknown[],
  IndexArr extends unknown[] = [],
  Num extends number = 1
> = IndexArr["length"] extends Num
  ? CurrentArr["length"]
  : FibonacciLoop<
      CurrentArr,
      [...PrevArr, ...CurrentArr],
      [...IndexArr, unknown],
      Num
    >;

type Fibonacci<Num extends number> = FibonacciLoop<[1], [], [], Num>;
