
document.getElementById('aBtn').onclick=function(){
  //异步加载A
  require.ensure([], function(){//当A.js需要依赖于B.js的时候，需要在[]中加入
      let A = require('./A.js');
      alert(A)
  })
}


document.getElementById('bBtn').onclick=function(){
  //异步加载b
  require.ensure([], function(){
      let B = require('./B.js');
      alert(B)
  })
}