# 开启装饰器语法

```bash
npm i @babel/plugin-proposal-decorators @babelplugin-proposal-class-properties
```

```js
// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { legacy: true }],
          ["@babel/plugin-proposal-class-properties"],
        ],
      },
    }),
  ],
});
```

