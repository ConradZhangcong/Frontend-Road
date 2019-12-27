// 创建一个Mvvm构造函数
function Mvvm (options = {}) {
  // vm.$options 将所有属性挂载到vm对象的$options上
  this.$options = options
  let data = this._data = this.$options.data
  // 数据劫持
  observe(data)
  // 使用this代理this._data
  for (let key in data) {
    Object.defineProperty(this, key, {
      configurable: true,
      get () {
        return this._data[key]
      },
      set (newVal) {
        this._data[key] = newVal
      }
    })
  }
  // 编译
  new Complie(options.el, this)
}

// Observe-数据劫持构造函数
function Observe (data) {
  let dep = new Dep()
  // 遍历对象添加get,set属性
  for (let key in data) {
    let val = data[key]
    observe(val)
    Object.defineProperty(data, key, {
      configurable: true,
      get () {
        Dep.target && dep.addSub(Dep.target) // 数据改变时调用addSub 将Watcher添加到订阅事件中
        return val
      },
      set (newVal) {
        if (val === newVal) return
        val = newVal
        observe(newVal) // 对对象属性的值进行数据劫持
        dep.notify() // 让所有watcher的update方法执行
      }
    })
  }
}

// 方便递归调用
function observe (data) {
  if (!data || typeof data !== 'object') return
  return new Observe(data)
}

// 创建Complie构造函数
function Complie (el, vm) {
  vm.$el = document.querySelector(el)
  let fragment = document.createDocumentFragment()
  while (child = vm.$el.firstChild) {
    fragment.appendChild(child)
  }

  // 对el里面的内容进行替换
  function replace (frag) {
    Array.from(frag.childNodes).forEach(node => {
      let txt = node.textContent
      let reg = /\{\{(.*?)\}\}/g
      if (node.nodeType === 3 && reg.test(txt)) {
        function replaceTxt () {
          node.textContent = txt.replace(reg, (matched, placeholder) => {
            new Watcher(vm, placeholder, replaceTxt)
            return placeholder.split('.').reduce((val, key) => {
              return val[key]
            }, vm)
          })
        }
        replaceTxt()
      }
      if (node.nodeType === 1) {
        let nodeAttr = node.attributes
        nodeAttr.length && Array.from(nodeAttr).forEach(attr => {
          let name = attr.name
          let exp = attr.value
          if (name.includes('v-')) {
            node.value = vm[exp]
          }
          // 监听data变化
          new Watcher(vm, exp, newVal => {
            node.value = newVal
          })
          // 监听inuput变化
          node.addEventListener('input', e => {
            let newVal = e.target.value
            vm[exp] = newVal
          })
        })
      }
      if (node.childNodes && node.childNodes.length) {
        replace(node)
      }
    })
  }
  replace(fragment)
  vm.$el.appendChild(fragment)
}

// 发布订阅模式
function Dep () {
  this.subs = []
}

Dep.prototype = {
  addSub (sub) {
    this.subs.push(sub)
  },
  notify () {
    this.subs.forEach(sub => sub.update())
  }
}

// 监听函数 通过Watcher类创建的实例,都有用update方法
function Watcher (vm, exp, fn) {
  this.fn = fn
  this.vm = vm
  this.exp = exp
  Dep.target = this
  let arr = exp.split('.')
  let val = vm
  arr.forEach(key => {
    val = val[key] // 调用get方法 去get方法订阅事件
  })
  Dep.target = null
}

Watcher.prototype.update = function () {
  let arr = this.exp.split('.')
  let val = this.vm
  arr.forEach(key => {
    val = val[key]
  })
  this.fn()
}
