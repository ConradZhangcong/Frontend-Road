interface Person {
  name: string;
  age: number;
}

let personProps: keyof Person; // 'name' | 'age'
