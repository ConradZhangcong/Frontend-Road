type AddTest1 = Add<1, 2>;
type AddTest2 = Add<0, 2>;
type AddTest3 = Add<112, 23>;

type SubtractTest1 = Subtract<39, 9>;
type SubtractTest2 = Subtract<9, 39>;

type MutiplyTest = Mutiply<2, 3>;
type MutiplyTest2 = Mutiply<10, 10>;

type DivideTest1 = Divide<10, 2>;
type DivideTest2 = Divide<10, 3>;

type StrLengthTest1 = StrLength<"123">;
type StrLengthTest2 = StrLength<"">;

type GreaterThanTest1 = GreaterThan<10, 2>;
type GreaterThanTest2 = GreaterThan<10, 20>;

type FibonacciTest1 = Fibonacci<5>;
type FibonacciTest2 = Fibonacci<10>;

export {};
