## Fiber

### 含义

Fiber 含义 1 架构

- 老的 React 架构

Reconciler(协调器) Renderer(渲染器)

- 新的 React 结构

Scheduler(调度器) Reconciler(协调器) Renderer(渲染器)

Fiber 含义 2 作为数据结构

FiberRootNode => RootFiber(多个) => App
current, stateNode, child, sibling, return

Fiber 含义 3 作为动态工作单元

### 双缓存

FiberRootNode =≥ { 1. currentFiberTree, 2.workInProgressFiberTree } 通过alternate连接  


### 源码调试流程

1. 从React仓库拉取代码
2. 安装依赖并构建(React ReactDom scheduler)
3. create-react-app创建应用
