
document.getElementById('aBtn').onclick = function () {
  //异步加载A
  import('./A').then((data) => {
    alert(data.A);
  });
}


document.getElementById('bBtn').onclick = function () {
  //异步加载b
  import('./B').then((data) => {
    alert(data.B);
  });
}