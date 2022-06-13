# 代码规范

`ESLint`主要用于**检查代码的风格并给出提示**, 而代码格式化可以使用`Prettier`.

## eslit 配置

安装 eslint

```bash
pnpm i eslint -D
pnpm i eslint-plugin-react@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest -D
```

生成配置文件

```bash
npx eslint --init
```

配置文件参考

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-explicit-any": "warn",
  },
};
```

### 配置说明

#### parser - 解析器

Eslint 底层使用`Espress`解析 AST, 但是不支持`Typescript`.

社区提供`@typescript-eslint/parser`, 专门为了`TypeScript`的解析, 将`TS`代码转换为`Espress`能够识别的格式.

#### parserOptions - 解析器选项

对上述解析器进行定制, 默认支持 ES5 语法.

- ecmaVersion: 配置 ES 支持版本
- sourceType: 默认为`script`,
- ecmaFeatures: 使用额外的语言特性

#### rules - 具体代码规则

具体规则配置, 键值对形式.

- `off`或者`0`: 关闭
- `warn`或者`1`: 警告
- `error`或者`2`: 报错

#### plugins

添加插件来支持特定规则, 比如`@typescript-eslint/eslint-plugin`扩展 TS 的代码规则.

```js
// .eslintrc.js
module.exports = {
  // 添加 TS 规则，可省略`eslint-plugin`
  plugins: ["@typescript-eslint"],
};
```

#### extends - 继承配置

继承另一份`ESLint`配置, 主要分下面三种情况:

- 从`ESLint`本身继承
- 从类似`eslint-config-xxx`的 npm 包继承
- 从`ESLint`插件继承

```js
// .eslintrc.js
module.exports = {
  "extends": [
    // 第1种情况
    "eslint:recommended",
    // 第2种情况，一般配置的时候可以省略 `eslint-config`
    "standard"
    // 第3种情况，可以省略包名中的 `eslint-plugin`
    // 格式一般为: `plugin:${pluginName}/${configName}`
    "plugin:react/recommended"
    "plugin:@typescript-eslint/recommended",
  ]
}
```

#### envs 和 globals

`运行环境`和`全局变量`

```js
// .eslint.js
module.export = {
  env: {
    browser: "true",
    es2021: true,
    node: "true",
  },
};
```

引入第三方库时需要在`globals`配置中声明全局变量, 有 3 种情况

- `"writable"`或者`true`, 表示变量可重写
- `"readonly"`或者`false`, 表示变量不可重写
- `"off"`, 表示禁用该全局变量

```js
// .eslintrc.js
module.exports = {
  globals: {
    // 不可重写
    $: false,
    jQuery: false,
  },
};
```

## prettier 配置

安装 prettier

```bash
pnpm i prettier -D
```

项目根目录新建`.prettierrc.js`

```js
// .prettierrc.js
module.exports = {
  printWidth: 80, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, // 一个 tab 代表几个空格数，默认为 2 个
  useTabs: false, //是否使用 tab 进行缩进，默认为false，表示用空格进行缩减
  singleQuote: true, // 字符串是否使用单引号，默认为 false，使用双引号
  semi: true, // 行尾是否使用分号，默认为true
  trailingComma: "none", // 是否使用尾逗号
  bracketSpacing: true, // 对象大括号直接是否有空格，默认为 true，效果：{ a: 1 }
};
```

## 解决 eslint 和 prettier 的冲突

使用`eslint-config-prettier`和`eslint-plugin-prettier`解决`eslint`和`prettier`的冲突

- `eslint-config-prettier` 的作用是关闭 eslint 中与 prettier 相互冲突的规则。
- `eslint-plugin-prettier` 的作用是赋予 eslint 用 prettier 格式化代码的能力。

安装依赖:

```bash
pnpm i eslint-config-prettier eslint-plugin-prettier -D
```

在`.eslinrc.js`中加入配置:

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    // 1. 接入 prettier 的规则
    "prettier",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // 2. 加入 prettier 的 eslint 插件
  plugins: ["react", "@typescript-eslint", "prettier"],
  rules: {
    // 3. 注意要加上这一句，开启 prettier 自动修复的功能
    "prettier/prettier": "error",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "@typescript-eslint/ban-ts-comment": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "react/react-in-jsx-scope": "off",
  },
};
```

在 package.json 中定义脚本:

```json
{
  "scripts": {
    // 省略已有 script
    "lint:script": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./"
  }
}
```

## vite 中接入 eslint

通过 vite 插件在开发阶段进行 eslint 扫描, 命令行中显式代码的规范问题

安装 eslint 插件

```bash
pnpm i vite-plugin-eslint -D
```

配置 vite.config.ts

```ts
// vite.config.ts
import viteEslint from "vite-plugin-eslint";

// 具体配置
{
  plugins: [
    // 省略其它插件
    viteEslint(),
  ];
}
```

## Stylelint

```bash
pnpm i stylelint stylelint-prettier stylelint-config-prettier stylelint-config-recess-order stylelint-config-standard stylelint-config-standard-scss -D
```

添加配置文件`.stylelintrc.js`

```js
// .stylelintrc.js
module.exports = {
  // 注册 stylelint 的 prettier 插件
  plugins: ["stylelint-prettier"],
  // 继承一系列规则集合
  extends: [
    // standard 规则集合
    "stylelint-config-standard",
    // standard 规则集合的 scss 版本
    "stylelint-config-standard-scss",
    // 样式属性顺序规则
    "stylelint-config-recess-order",
    // 接入 Prettier 规则
    "stylelint-config-prettier",
    "stylelint-prettier/recommended",
  ],
  // 配置 rules
  rules: {
    // 开启 Prettier 自动格式化功能
    "prettier/prettier": true,
  },
};
```

在 package.json 中添加脚本:

```json
{
  "scripts": {
    // 整合 lint 命令
    "lint": "npm run lint:script && npm run lint:style",
    // stylelint 命令
    "lint:style": "stylelint --fix \"src/**/*.{css,scss}\""
  }
}
```

在 VSCode 中安装`Stylelint插件`.

## vite 中继承 stylelint 配置

安装依赖

```bash
pnpm i @amatlash/vite-plugin-stylelint -D
```

修改配置文件

```ts
import viteStylelint from "@amatlash/vite-plugin-stylelint";

// 具体配置
{
  plugins: [
    // 省略其它插件
    viteStylelint({
      // 对某些文件排除检查
      exclude: /windicss|node_modules/,
    }),
  ];
}
```

## husky+lint-staged 的 git 提交工作流集成

```安装依赖
npm install husky -D
```

https://juejin.cn/book/7050063811973218341/section/7058853948060336163

## 参考

https://segmentfault.com/a/1190000040948561

[解决 Eslint 和 Prettier 之间的冲突](https://juejin.cn/post/7012160233061482532)
