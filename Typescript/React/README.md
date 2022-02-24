# TypeScript 在 React 中的应用

React 一些内置的类型可以在`node_modules/@types/react/index.d.ts`这个文件中查看. `vscode`是内置`TypeScript`解析器的, 很多 React 的类型可以通过`ctrl+鼠标左键`(`command+鼠标左键`)直接定位到上面文件的相应位置查看.

React 中很多变量和组件等, 不定义类型也可以直接使用, 因为会进行类型推断. 但是类型推断在大多数情况下不够准确, 所以对于 React 开发者来, 学会在 React 中使用 TypeScript 来定义类型是非常重要的一项技能.

## 组件

React 中组件分为类组件和函数组件

### 类组件

类组件定义主要为`React.Component<P, S>`和`React.PureComponent<P, S, SS>`.

`P`为`props`的类型, `S`为`state`的类型, `S`可以忽略不写, 会进行类型推断.

`SS`为`getSnapshotBeforeUpdate`的返回值.

```tsx
interface AppProps {
  value: string;
}
interface AppState {
  count: number;
}

class App extends React.Component<AppProps, AppState> {
  static defaultProps = {
    value: "",
  };
  state = {
    count: 0,
  };
}
class App extends React.PureComponent<AppProps, AppState> {
  static defaultProps = {
    value: "",
  };
  state = {
    count: 0,
  };
}
```

### 函数组件

函数组件定义的方式为`React.FC<P>`, 等同于`React.FunctionComponent<P>`, `P`为`props`的类型.

`FunctionComponent`中已经规定好了`props`的类型`PropsWithChildren`; 函数返回值`ReactElement | null`的类型; 静态属性: `propTypes`, `contextTypes`, `defaultProps`, `displayName`.

`type PropsWithChildren<P> = P & { children?: ReactNode | undefined };`

```tsx
interface AppProps {
  value?: string;
}

const App2: React.FC<AppProps> = ({ value = "", children }) => {
  return (
    <>
      <div>{value}</div>
      {children}
    </>
  );
};

export default App2;
```

## hooks

### useState

`useState`使用泛型定义类型, 不定义类型会进行自动推断. 需要注意在初始值设置为`null`时需要显示地声明类型`type | null`.

```tsx
const [state, setState] = useState(""); // state的类型为string，自动推断
const [state, setState] = useState<string>(); // state的类型为 string | undefined
const [state, setState] = useState<string>(""); // state的类型为 string
const [state, setState] = useState<string | null>(null); // state的类型为 string | null
```

### useRef

`useRef`当初始值为`null`时有两种创建方式:

```ts
const ref1 = React.useRef<number>(null);
const ref2 = React.useRef<number | null>(null);
```

这两种的区别在于:

- 第一种的`ref1.current`是只读的, 并且可以传递给内置的 ref 属性, 绑定 DOM 元素
- 第二种的`ref2.current`是可变的

```ts
const ref1 = useRef<number>(null);
const ref2 = useRef<number | null>(null);

ref1.current = 0; // 无法分配到 "current" ，因为它是只读属性。ts(2540)
ref2.current = 0;
```

这两种方式在使用时都需要进行类型检查, 在某些特定情况下可以通过`!`断言省去类型检查:

```ts
const ref3 = useRef<HTMLInputElement>(null);
const ref4 = useRef<HTMLInputElement | null>(null);

// ref3.current.focus(); // 对象可能为 "null"。ts(2531)
ref3.current?.focus();
ref4.current?.focus();

if (xxxx) {
  ref3.current!.focus();
}
```

### useMemo/useCallback

### 自定义hooks

## defaultProps

## Types or Interface

## Props

## 参考

[还算完整的 React+TS 类型](https://blog.csdn.net/imber___zsk/article/details/121580559)
