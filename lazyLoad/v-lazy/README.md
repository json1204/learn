# v-lazyload

一个基于 vue 的图片懒加载插件

## 使用方法

1、安装指令

```bash
npm install v-lazyload -D
# or
yarn add v-lazyload -D
```

2、注册指令

```js
import LazyLoad from 'v-lazyload'

Vue.use(LazyLoad, {
  default: 'xxx.jpg',
})
```

3、使用指令

```html
<!-- 将原来的src换成v-lazy指令 -->
<img v-lazy="yyy.jpg" />
```
