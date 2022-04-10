<template>
  <div id="app">
    <ul>
      <!-- 定义路由hash -->
      <!-- <li><a href="#/home">home</a></li>
      <li><a href="#/about">about</a></li> -->

      <!-- 定义路由history
      <li><a href="/home">home</a></li>
      <li><a href="/about">about</a></li> -->
      <!-- 渲染路由对应的 UI -->
      <!-- <div id="routeView"></div> -->

    <div id="nav">
      <router-link to="/home">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    </ul>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
    // HelloWorld,
  },
  mounted() {
    // this.hashFn()
    // this.historyfn()
  },
  methods: {
    hashFn() {
      let routerView = document.querySelector("#routeView");
      window.addEventListener("hashchange", () => {
        let hash = location.hash;
        routerView.innerHTML = hash;
      });
      window.addEventListener("DOMContentLoaded", () => {
        if (!location.hash) {
          //如果不存在hash值，那么重定向到#/
          location.hash = "/";
        } else {
          //如果存在hash值，那就渲染对应UI
          let hash = location.hash;
          routerView.innerHTML = hash;
        }
      });
    },
    historyfn() {
      let routerView = document.querySelector("#routeView");
      window.addEventListener("DOMContentLoaded", onLoad);
      window.addEventListener("popstate", () => {
        // 浏览器前进后退
        routerView.innerHTML = location.pathname;
      });
      function onLoad() {
        routerView.innerHTML = location.pathname;
        var linkList = document.querySelectorAll("a[href]");
        linkList.forEach((el) =>
          el.addEventListener("click", function (e) {
            e.preventDefault();
            history.pushState(null, "", el.getAttribute("href"));
            routerView.innerHTML = location.pathname;
          })
        );
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
