# vue-router

路由将组件映射到路由,渲染到页面上

## router-link

使用 router-link 组件来导航,通过 to 属性指定链接,`<router-link>`默认会渲染成`<a>`标签

## router-view

路由的出口,路由匹配到的组件将渲染在 router-view 上面

## 路由参数

`/user/:username` 的参数通过`$route.params`来获取

## 编程式的导航

除了使用`router-link`创建 a 标签来定义导航链接,还可以借助 router 的实例方法来实现.

注意: 在 Vue 实例内部可以使用`$router`

### router.push(location, onComplete?, onAbort?)

location 参数可以是字符串路径,也可以是地址对象:

如果提供了`path`,`params`会被忽略

```javascript
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' } })
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' } })

const userId = '123'
router.push({ name: 'user', params: { userId } }) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId } }) // -> /user
```

### router.replace(location, onComplete?, onAbort?)

### router.go(n)

前进后退多少步

## 导航守卫

### 全局前置守卫

```javascript
const router = new VueRouter({})
router.beforeEach((to, from, next) => {})
```

### 全局解析守卫

`router.beforeResolve`,与 beforeEach 的区别是在导航被确认之前,同时在所有组件内守卫和异步路由被解析之后被调用

### 全局后置钩子

`router,afterEach((to, from) => {})`

### 路由独享的守卫

可以在路由配置上定义 beforeEnter:

```javascript
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      },
    },
  ],
})
```

### 组件内的守卫

- beforeRouterEnter 组件被渲染之前调用 不能获取 this 实例
- beforeRouterUpdate 当前路由改变,但是组件被复用时调用
- beforeRouterLeave 导航离开组件时调用

### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。

## 路由与组件的懒加载

常见的懒加载有两种方式: *vue 异步组件*和*es 中的 import*

### router.js 文件中使用懒加载

未采用懒加载时,vue 中路由代码如下:

```javascript
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Helloworld'

Vue.use(Router)

export default new Router {
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: HelloWorld
    }
  ]
}
```

vue 异步组件实现懒加载,方法是:`component: resolve=>(require(['地址']), resolve)`

```javascript
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/Helloworld'

Vue.use(Router)

export default new Router {
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: resolve => (require(['@/components/Helloworld'], resolve))
    }
  ]
}
```

es 提出的 import 方法

```javascript
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const HelloWorld = () => import('@/components/Helloworld')

export default new Router {
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: HelloWorld
    }
  ]
}
```

### 组件中使用懒加载

与路由中使用懒加载相同

不使用懒加载:

```vue
<template>
  <hello-world></hello-world>
</template>

<script>
import helloWorld from './helloworld'
export default {
  components: {
    'hello-world': helloWorld,
  },
}
</script>
```

使用异步方法

```vue
<template>
  <hello-world></hello-world>
</template>

<script>
// import helloWorld from './helloworld'
export default {
  components: {
    'hello-world': (resolve) => (['./helloworld'], resolve),
  },
}
</script>
```

使用 import 方法

```vue
<template>
  <hello-world></hello-world>
</template>

<script>
const helloWorld = () => import('./helloworld')
export default {
  components: {
    'hello-world': helloWorld,
  },
}
</script>
```

### 总结

路由和组件常用的两种懒加载方式:

1、vue 异步组件实现路由懒加载

`component: resolve=>(['需要加载的路由的地址'，resolve])`

2、es 提出的 import(推荐使用这种方式)

`const HelloWorld = () => import('需要加载的模块地址')`
