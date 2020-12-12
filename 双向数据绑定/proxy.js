// 1.监听新的对象属性
const obj = {
  age: '18',
}

const p = new Proxy(obj, {
  get (target, key, receiver) {
    console.log('访问了' + key)
    return Reflect.get(target, key, receiver)
  },
  set (target, key, val, receiver) {
    console.log('设置了' + key)
    console.log('新的' + key + '是' + val)
    Reflect.set(target, key, val, receiver)
  }
})


p.age = 20
console.log(p.age)

p.name = 'Jack'
console.log(p.name)

// 设置了age
// 新的age是20
// 访问了age
// 20

// 设置了name
// 新的name是Jack
// 访问了name
// Jack


// 2.监听数组push和下标赋值
let arr = []
let arrProxy = new Proxy(arr, {
  get (target, key, receiver) {
    console.log('访问了' + key)
    return Reflect.get(target, key, receiver)
  },
  set (target, key, val, receiver) {
    console.log('新的' + key + '是' + val)
    Reflect.set(target, key, val, receiver)
    return true
  }
})

arrProxy.push(3)
arrProxy[0] = 1
arrProxy[0] = 2

// 访问了push
// 访问了length
// 新的0是3
// 新的length是1

// 新的0是1

// 新的0是2
