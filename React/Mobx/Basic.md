# Mobx 文档

## observable state

使对象转化为 observable

`makeObservable(target, annotations?, options?)`

- `observable` 存储 state
- `action` 将方法标记为可以修改 state 的 action
- `computed` 标记由 state 派生出的 getter

`makeAutoObservable(target, overrides?, options?)`

`observable(source, overrides?, options?)`

## actions

用法:

- `action` (注解)
- `action(fn)`
- `action(name, fn)`

`action.bound`

## computed

## reactions


