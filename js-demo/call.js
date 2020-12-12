let obj = {
  name: 'JoJo',
}
function foo () {
  console.log(this.name)
}
obj.fn = foo
obj.fn() // log: JoJo

Function.prototype.myCall = function (myObj, ...args) {
  if (typeof this !== 'function') {
    throw 'caller must be a function'
  }

  let obj = myObj || window
  obj._fn = this
  let res = obj._fn(...args)
  Reflect.deleteProperty(obj, '_fn')
  return res
}

let obj = {
  name: 'JoJo',
}
function foo () {
  console.log(this.name)
}
foo.myCall(obj) // JoJo