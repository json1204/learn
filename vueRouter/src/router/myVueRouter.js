let Vue = null
// class HistoryRoute {
//     constructor(){
//         this.current = null
//     }
// }
class HistoryRoute {
    constructor() {
        this.current = null
    }
}
class VueRouter {
    constructor(options) {
        this.mode = options.mode || "hash"
        this.routes = options.routes || [] //你传递的这个路由是一个数组表
        this.routesMap = this.createMap(this.routes)
        this.history = new HistoryRoute();
        this.init()
        console.log(this.routesMap);
    }
    // 新增代码
    init(){
        if (this.mode === "hash"){
            // 先判断用户打开时有没有hash值，没有的话跳转到#/
            location.hash? '':location.hash = "/";
            window.addEventListener("load",()=>{
                debugger
                this.history.current = location.hash.slice(1)
            })
            window.addEventListener("hashchange",()=>{
                debugger
                this.history.current = location.hash.slice(1)
            })
        } else{
            location.pathname? '':location.pathname = "/";
            window.addEventListener('load',()=>{
                // debugger
                this.history.current = location.pathname
            })
            window.addEventListener("popstate",()=>{
                // debugger
                this.history.current = location.pathname
            })
        }
    }


    createMap(routes){
        return routes.reduce((pre,current)=>{
            pre[current.path] = current.component
            return pre;
        },{})
    }

}
VueRouter.install =function (v) {
    Vue=v
    Vue.mixin({
        beforeCreate(){
            console.log(this.$options,'22')
            if (this.$options && this.$options.router){ // 如果是根组件
                this._root = this; //把当前实例挂载到_root上
                this._router = this.$options.router;
                Vue.util.defineReactive(this,"xxx",this._router.history)
            }else { //如果是子组件
                this._root= this.$parent && this.$parent._root
            }
            Object.defineProperty(this,'$router',{
                get(){
                    debugger
                    return this._root._router
                }
            })
            Object.defineProperty(this,'$route',{
                get(){
                    debugger
                    return this._root._router.history.current
                }
            })


        }
    })



    // Vue.component('router-link',{
    //     render(h){
    //         return h('a',{},'首页')
    //     }
    // })
    // Vue.component('router-link',{
    //     props:{
    //         to:String
    //     },
    //     render(h){
    //         let mode = this._self._root._router.mode;
    //         let to = mode === "hash"?"#"+this.to:this.to
    //         return h('a',{attrs:{href:to}},this.$slots.default)
    //     }
    // })


    // Vue.component('router-view',{
    //     render(h){
    //         debugger
    //         let current = this._self._root._router.history.current
    //         let routeMap = this._self._root._router.routesMap;
    //         return h(routeMap[current])
    //     }
    // })


    // Vue.component('router-view',{
    //     render(h){
    //         return h('h1',{},'首页视图')
    //     }
    // })
    Vue.component('router-link',{
        props:{
            to:String
        },
        render(h){
            let mode = this._self._root._router.mode;
            let to = mode === "hash"?"#"+this.to:this.to
            return h('a',{attrs:{href:to},
            on: {
                click:(e)=> {
                    debugger
                    if(mode==='hash'){

                    }else{
                        e.preventDefault()
                        this._self._root._router.history.current = to
                        history.pushState(null, '', to)
                    }
                }
            },
        },this.$slots.default)
        }
    })
    Vue.component('router-view',{
        render(h){
            let current = this._self._root._router.history.current
            let routeMap = this._self._root._router.routesMap;
            return h(routeMap[current])
        }
    })


}
// export default VueRouter

// let Vue = null;
// class HistoryRoute {
//     constructor(){
//         this.current = null
//     }
// }
// class VueRouter {
//     constructor(options) {
//         this.mode = options.mode || "hash"
//         this.routes = options.routes || [] //你传递的这个路由是一个数组表
//         this.routesMap = this.createMap(this.routes)
//         this.history = new HistoryRoute();
//         this.init()

//     }

//     init() {
//         if (this.mode === "hash") {
//             // 先判断用户打开时有没有hash值，没有的话跳转到#/
//             location.hash ? '' : location.hash = "/";
//             window.addEventListener("load", () => {
//                 // debugger
//                 this.history.current = location.hash.slice(1)
//             })
//             window.addEventListener("hashchange", () => {
//                 // debugger
//                 this.history.current = location.hash.slice(1)
//             })
//         } else {
//             location.pathname ? '' : location.pathname = "/";
//             window.addEventListener('load', () => {
//                 debugger
//                 this.history.current = location.pathname
//             })
//             window.addEventListener("popstate", () => {
//                 debugger
//                 this.history.current = location.pathname
//             })
//         }
//     }

//     // init(){
//     //     if (this.mode === "hash"){
//     //         // 先判断用户打开时有没有hash值，没有的话跳转到#/
//     //         location.hash? '':location.hash = "/";
//     //         window.addEventListener("load",()=>{
//     //             this.history.current = location.hash.slice(1)
//     //         })
//     //         window.addEventListener("hashchange",()=>{
//     //             this.history.current = location.hash.slice(1)
//     //         })
//     //     } else{
//     //         location.pathname? '':location.pathname = "/";
//     //         window.addEventListener('load',()=>{
//     //             debugger
//     //             this.history.current = location.pathname
//     //         })
//     //         window.addEventListener("popstate",()=>{
//     //             debugger
//     //             this.history.current = location.pathname
//     //         })
//     //     }
//     // }

//     createMap(routes) {
//         return routes.reduce((pre, current) => {
//             pre[current.path] = current.component
//             return pre;
//         }, {})
//     }

// }
// VueRouter.install = function (v) {
//     Vue = v;
//     Vue.mixin({
//         beforeCreate() {
//             if (this.$options && this.$options.router) { // 如果是根组件
//                 this._root = this; //把当前实例挂载到_root上
//                 this._router = this.$options.router;
//                 Vue.util.defineReactive(this, "xxx", this._router.history)
//             } else { //如果是子组件
//                 this._root = this.$parent && this.$parent._root
//             }
//             Object.defineProperty(this, '$router', {
//                 get() {
//                     debugger
//                     return this._root._router
//                 }
//             });
//             Object.defineProperty(this, '$route', {
//                 get() {
//                     debugger
//                     return this._root._router.history.current
//                 }
//             })
//         }
//     })
//     Vue.component('router-link', {
//         props: {
//             to: String
//         },
//         render(h) {
//             let mode = this._self._root._router.mode;
//             let to = mode === "hash" ? "#" + this.to : this.to
//             return h('a', { attrs: { href: to } }, this.$slots.default)
//         }
//     })
//     // Vue.component('router-view',{
//     //     render(h){
//     //         debugger
//     //         let current = this._self._root._router.history.current
//     //         let routeMap = this._self._root._router.routesMap;
//     //         return h(routeMap[current])
//     //     }
//     // })

//     Vue.component('router-view', {
//         render(h) {
//             debugger
//             let current = this._self._root._router.history.current
//             let routeMap = this._self._root._router.routesMap;
//             return h(routeMap[current])
//         }
//     })

// };

export default VueRouter

