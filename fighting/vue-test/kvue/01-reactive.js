// 传入对象obj，给他定义一个属性key，它的初始值是val
// 该属性未来的访问会被拦截，这样就实现了响应式
function defineReactive(obj, key, val) {
  // 向下递归遍历
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", key);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", key);
        val = newVal;
        // 有了变化就应该触发update方法
        update()
      }
    },
  });
}

// 自动设置一个对象的所有属性为响应式的

// Vue.set/delete
// 属性动态新增和删除


// 数组响应式
// 思考题：7个mutation方法：push、pop。。。