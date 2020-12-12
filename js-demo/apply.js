let obj = {
  name: 'JoJo',
}
function foo () {
  console.log(this.name)
}
obj.fn = foo
obj.fn() // log: JoJo

Function.prototype.myApply = function (myObj, args) {
  if (typeof this !== 'function') {
    throw 'caller must be a function'
  }

  let obj = myObj || window
  obj._fn = this
  let res = obj._fn(args)
  Reflect.deleteProperty(obj, '_fn')
  return res
}

let obj = {
  name: 'JoJo',
}
function foo () {
  console.log(this.name)
}
foo.myApply(obj, []) // JoJo

var array1 = [1, 2, 3]
var array2 = [4, 5, 6]
Array.prototype.push.apply(array1, array2)
console.log(array1)