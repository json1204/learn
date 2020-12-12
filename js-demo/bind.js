Function.prototype.myBind = function (myobj, ...args) {
  if (typeof this !== 'function') {
    throw 'caller must be a function'
  }
  let self = this
  let fnNop = function () { } // 定义一个空函数
  let bound = function () {
    // 检测 New , 如果当前函数的this指向的是构造函数中的this 则判定为new 操作
    let _this = this instanceof self ? this : myobj
    self.apply(_this, args.concat(Array.prototype.slice.call(arguments)))
  }

  if (this.prototype) {
    fnNop.prototype = this.prototype;
  }

  bound.prototype = new fnNop();
  return bound
}

this.num = 9
var mymodule = {
  num: 81,
  getNum: function () {
    console.log(this.num)
  }
}

mymodule.getNum() // 81

var getNum = mymodule.getNum
getNum() // 9, 因为在这个例子中，"this"指向全局对象

var boundGetNum = getNum.myBind(mymodule)
boundGetNum() // 81