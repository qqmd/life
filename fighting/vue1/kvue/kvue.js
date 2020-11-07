function defineReactive(obj, key, val) {
  // 向下递归遍历
  observe(val);

  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        observe(newVal)
        val = newVal;
        // update()
      }
    },
  });
}

// 自动设置一个对象的所有属性为响应式的
function observe(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 只要obj是对象，就创建一个伴生的Observer实例
  new Observer(obj)
}

// 根据传入对象类型做相应的响应化处理
class Observer {
  constructor(value) {
    if (Array.isArray(value)) {
      // todo
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    Object.keys(obj).forEach((key) => {
      defineReactive(obj, key, obj[key]);
    });
  }
}

// 将data中的所有属性代理到KVue实例上方便用户使用
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(v) {
        vm.$data[key] = v
      }
    })
  })
}

class KVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // 1.数据响应式
    observe(this.$data)

    // 1.5代理
    proxy(this)
    
    // 2.编译
    new Compile('#app', this)
  }
}

// 将宿主的模板编译，获取它里面的动态内容，找到相关
// 依赖并且生成watcher
// new Compile('#app', vm)
class Compile {
  constructor(el, vm) {
    // 1.获取模板
    this.$el = document.querySelector(el)
    this.$vm = vm

    // 2.执行编译
    this.compile(this.$el)
  }

  // 递归遍历el
  compile(el) {
    // 获取所有子节点
    const childNodes = el.childNodes
    childNodes.forEach(node => {
      // 判断节点类型
      if (node.nodeType === 1) {
        // element
      } else if(this.isInter(node)) {
        // text
        
      }

      // 判断是否存在孩子
      if(node.childNodes) {
        this.compile(node)
      }
    })
    
  }

  // 判断是否是插值绑定 {{xxx}}
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}