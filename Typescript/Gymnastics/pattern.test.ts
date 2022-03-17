type GetFirstTest1 = GetFirst<[1, 2, 3]>;
type GetFirstTest2 = GetFirst<[]>;
// @ts-expect-error
type GetFirstTest3 = GetFirst<"123">;

type GetLastTest1 = GetLast<[1, 2, 3]>;

type PopArrTest1 = PopArr<[1, 2, 3]>;
type PopArrTest2 = PopArr<[]>;

type UnshiftArrTest = UnshiftArr<[1, 2, 3]>;

type StartsWithTest1 = StartsWith<"123", "12">;
type StartsWithTest2 = StartsWith<"123", "4">;

type ReplaceStrTest1 = ReplaceStr<"aabbcc", "b", "d">;
type ReplaceStrTest2 = ReplaceStr<"aabbcc", "d", "b">;

type TrimStrRightTest = TrimStrRight<"   abc   ">;
type TrimStrLeftTest = TrimStrLeft<"   abc   ">;
type TrimStrTest = TrimStr<"   abc   ">;

type GetParametersTest = GetParameters<(name: string, age: number) => string>;

type GetReturnTypeTest = GetReturnType<(name: string, age: number) => string>;

class Person {
  name: string;

  constructor() {
    this.name = "conrad";
  }

  hello(this: Person) {
    return "hello, I'm" + this.name;
  }
}

interface PersonConstructor {
  new (name: string): Person;
}

const conrad = new Person();
conrad.hello();

conrad.hello.call({ xxx: 1 });
type GetThisParameterTypeTest = GetThisParameterType<typeof conrad.hello>;

type GetInstanceTypeTest = GetInstanceType<PersonConstructor>;
type GetConstructorParametersTest = GetConstructorParameters<PersonConstructor>;

export {};
