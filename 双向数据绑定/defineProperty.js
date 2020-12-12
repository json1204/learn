class Observer {
  constructor(data) {
    for (let key of Object.keys(data)) {
      if (typeof (data[key]) === 'object') {
        data[key] = new Observer(data[key])
      }
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get () {
          console.log('访问了' + key)
          return data[key]
        },
        set (val) {
          console.log('设置了' + val)
          if (val !== data[key]) {
            data[key] = val
            console.log('新的' + key + '是' + val)
          }
        }
      })
    }

  }
}

const obj = {
  age: '18',
  a: []
}
const app = new Observer(obj)
app.age = 20
console.log(app.age)

app.name = 'Jack'
console.log(app.name)

// 设置了20
// 新的age是20
// 访问了age
// 20

// Jack

app.a = []
app.a.push(3)
app.a[0] = 1
app.a = [1, 2, 3]

// 设置了
// 新的a是

// 访问了a

// 访问了a

// 设置了1,2,3
// 新的a是1,2,3