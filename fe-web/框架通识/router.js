/**
参考文章： https://juejin.cn/post/6844903612930326541
          https://juejin.cn/post/6895882310458343431
          https://juejin.cn/post/6854573222231605256
如何理解vue-router的实现原理

1. 如何实现url变化页面渲染更新但是不刷新浏览器
    1.1 hash 路由修改路径，不会触发向服务器发请求，可以是a 标签，window.location，且hashchange可以监听路由变化
    1.2 pushState&replaceState 都是修改url栈，但是不刷新页面，这俩api 也可以触发 hashchange
    1.3 spa 技术是实现前后端分离的关键吗
2. 基于vue 实现vue-router
    2.1 从调用看router是一个class,可以作为vue 插件，说明有install
    2.2 初始化之后有组件方式调用，说明全局注册了组件
    2.3 将$router&$route 注入全部组件，采用全局mixin,访问组件的路由实例其实代理到根组件了
    2.4 路由的切换对应组件的渲染，添加响应式
    2.5 函数式调用和完善钩子函数

6. csr和ssr的区别
7. vue-router 源码设计
    1. 看 json 文件，入口，类型，脚本，工程化配置都比较完善
      1.1 router是一个class,定义了静态属性等
      1.2 根据路由表创建 createMatcher




    10. 对于node 包，统一了logger类
*/

/**
 * 分析vue-router的功能点，分析源码实现
 *
 *
 */
class VueRouter {
  constructor(options) {
    this.mode = options.mode || 'hash'
    this.routes = options.routes || []
    // 对路由数组的整理
    this.routesMap = this.createMap(this.routes)
    // 当前路由实例
    this.history = new HistoryRoute()
    this,init()
  }
  // 初始化&添加两类监听事件
  init() {
    if (this.mode === 'hash') {
      location.hash ? '' : location.hash = '/'
      window.addEventListener('load', () => {
        this.history.current = location.hash.slice(1)
      })

      window.addEventListener('hashChange', () => {
        this.history.current = location.hash.slice(1)
      })
    } else {
      location.pathname ? '' : location.pathname = '/'
      // 初始化
      window.addEventListener('load', () => {
        this.history.current = location.pathname
      })
      // 修改
      window.addEventListener('popstate', () => {
        this.history.current = location.pathname
      })
    }
  }

  createMap(routes) {
    // 记录组件跟路由信息，提供类似v-dom的格式
    return routes.reduce((pre, cur) => {
      pre[cur.path] = cur.component
      return pre
    }, {})
  }
}

// install 不是this 方法
VueRouter.install = function(v) {
  Vue = v
  // 全局混入属性$router&$route,注意发生的时机
  Vue.mixin({
    beforeCreate() {
      Object.defineProperty(this, $router, {
        get() {
          // 在根组件实例化，所以可以取到
          return this.$root.router
        }
      })

      Object.defineProperty(this, $route, {
        get() {
          // 在根路由实例的一个属性
          return this.$root.router.history.current
        }
      })
    }
  })

  // 实现全局组件
  Vue.component('route-link', {
    props: {
      to: String
    },
    // 实现路由跳转,支持默认slot
    render(h) {
      let mode = this.$root.router.mode
      let to = mode === 'hash' ? '#' + this.to : this.to
      return h('a', {attrs: {href:to}}, this.$slot.default())
    }
  })

  // 根据路由切换，渲染组件
  Vue.component('route-link', {
    render(h) {
      let current = this.$router.history.current
      let routesMap = this.$router.routesMap
      return h(routesMap[current])
    }
  })
}
