/**
 * @description react 学习总结
 * 1: 一些源码资料（社区资料收集阶段）
 *  1.1框架变化的无非是api层面，组件化设计，代码设计思想是不变的，对业务场景的抽象是可复用的
 *    对框架的学习最好是能沉淀一些可复用的思想，设计思路
 *  https://7kms.github.io/react-illustration-series/main/macro-structure： 图解react
 *  https://react.iamkasong.com/ react 技术解密
 *  https://react.jokcy.me/book/api/react.html 源码系列
 *  https://ahooks.js.org/zh-CN 多场景下的hooks
 *  https://juejin.cn/column/6961274930306482206 react技术专栏
 *  https://juejin.cn/post/6844903985338400782 hooks介绍&项目实例
 *  https://github.com/LANIF-UI/dva-boot-admin class组件历史 react 业务
 *  https://github.com/hustcc/echarts-for-react react封装echarts组件例子
 *  https://github.com/HalseySpicy/Hooks-Admin  hooks admin案例
 *    1. admin 业务项目常见模块整理
 *    2. 业务模版，组件沉淀，工具沉淀
 *    3. 前端业务一般实现
 *  https://github.com/didi/react-tmap 对js库的业务封装
 *    1. 常见hooks api使用，基于js/api封装业务逻辑
 *    2. 组件库打包构建方法
 *    3. 组件库文档方案
 *    4. 完善第三方类型声明文件
 *  antd站: react 综合生态
 *  umi: 业界领先脚手架
 *  ice: 案例借鉴
 *
 * 2: 学习目标&时间规划
 *   2.1 react方向及周边技术体系
 *    2.1.1 结合chatgpt和社区资料基本实现知识体系建立
 *   2.2 工程领域具体实践 沉淀典型业务场景实现（管理后台，H5，其它领域等）
 *    2.2.1 提问：有哪些业务场景的实现，可以收获什么
 *      1. react-admin
 *      2. use-shopping-cart 基于hooks实现一定业务复杂度的购物车模块，代码设计，抽象度整理
 *    2.2.2 提问：有哪些技术领域的实现，可收获什么
 *      1. 封装基于地图js库的react组件库，逻辑复用，代码组织方式优化
 *      2. 封装基于echarts的react组件库，熟悉常见组件封装手段
 *      3. react-use-form-state: 基于hooks原生表单的业务封装,组件发布工程领域流程熟悉
 *      4. react-beautiful-dnd
 *      5. react-query
 *      6. react-use/usehooks：一些常见hooks实现
 *
 *   2.2 常见面试问题总结梳理（有一定深度）
 *
 */

/**
 * @description hooks的一些使用
 * 1. 主要分为状态类&副作用类hooks，一共有14种
 *    1.1 对比历史class组件和hooks函数式组件，区别是什么
 *
 * 2. 简单理解常见hooks的使用场景
 *    2.0 hooks 带来什么改变
 *      1. 函数式组件内部状态，生命周期
 *      2. 逻辑复用，代码组织的形式变化，从oop过渡到函数式
 *      3. 提供一些组件组织性能优化的一般实践
 *      4. 很多hooks都有依赖项变化的概念，对于引用类型，内存地址不变则不会体现这种变化
 *    2.1 useState: 提供函数式组件状态
 *      1. 组件自身持有状态
 *      2. 返回值是数组形式：有效的结构赋值使用
 *    2.2 memo: 包裹函数组件是一个高阶组件，如果输入不变组件不重新渲染
 *      1. 出发点是避免组件无意义重新渲染，如果state,props不变化，此时组件不重新渲染，但是这种对比在复杂的时候反而不好应用(计算变化的成本高于重新渲染的成本)
 *         所以memo一般用于简单的组件，类似纯展示类的组件
 *    2.3 useMemo: 类似计算属性，根据依赖值返回计算值，避免一些耗性能的计算
 *      1. 是一个hooks,主要用于处理计算成本高的场景，避免多次计算带来的损耗
 *    2.4 useCallback: 回调函数调用的场景，依赖项变化执行回调
 *      1. 当函数作为props传递，使用useCallback和依赖值可以避免重新创建实例
 *    2.5 useEffect: 处理常见一些副作用场景，与componentDidMount、componentDidUpdate 和 componentWillUnmount传统生命周期作用时机类似
 *      2.5.1 副作用逻辑本身，返回值取消副作用来做GC,依赖项
 *      2.5.2 开发者不用关注每个生命周期的调用，框架层面优化
 *      2.5.3 useEffect 返回的函数会在下次组件更新前执行，依赖是空数组时候有些特殊case
 *    2.6 useRef： 就像是可以在其 .current 属性中保存一个可变值的“盒子”，一般用来访问组件实例
 *      获取dom实例 xxx.current 访问
 *    2.7 useReducer: 可以用来管理组件的复杂状态，用购物车的例子解释就比较清晰
 *      1. const [state, dispatch] = useReducer(reducer, initialState);
 *      2. dispatch去触发具体的reducer逻辑，这部分不用记，购物车的例子看下就明白
 *    2.8 为什么说不要在循环，条件，或者嵌套函数里使用hooks
 *      1. 在条件语句或嵌套函数中使用 Hook，也会导致 Hook 的调用顺序变得不可预测
 *      2. 如果在循环中使用 Hook，每次迭代操作都可能会创建新的 Hook 实例
 *      3. 一般用eslint来避免出现这些基础语法问题
 *    2.9 在使用useState时候修改状态比如setxxx()时候，要注意引用类型的写法，否则组件不会重新渲染
 *      1. 数组的push pop splice 对象的a.b = 1 这种语法
 *    2.10 关于setState的一些理解
 *      1.异步更新，多次修改合并：并不会说修改立刻影响视图，最后一次的修改才体现出来
 *          修改合并：是指在一次事件队列里的修改会加入队列，多次调用体现出最后一次的结果
 *          异步更新：会在requestAnimationFrame的时间间隔里完成重绘，具体结合本地环境
 *      2.可以传递一个回调函数作为第二个参数，做一些状态修改完成后的操作
 *      3.可以传入一个处理函数，该函数会接收前一次的状态值，返回一个新的状态值，这样避免异常覆盖，每次是基于上一次修改
 *    2.11 对闭包陷阱的理解
 *      1. hooks函数很多时候会出现访问外部变量的场景，这就是访问闭包，而按词法作用域可以访问变量/函数的值但是无法跟踪引用，就会出现不同步更新的现象
 *      2. 处理这类问题，可以将变量当hooks的依赖，或者提供引用访问，比如ref/usecallback
 *
 */






/**
 * @description: common Q
 * 1. 组件化
 *  1.1 react事件特征
 *    1.1.1: 绑定事件冒泡到document,交由事件合成层处理，冒泡事件对象包含原生事件和拓展对象，前者正常处理，后者合成层调度
 *    1.1.2: 调用e.preventDefault 防止冒泡（特殊）
 *    1.1.3: 合成事件处理浏览器差异，提供事件处理的跨平台能力
 *    1.1.4: 起到内存优化的目的：不同节点监听事件和同一节点
 *  1.2 HOC/render props/hooks
 *    HOC: 输出组件，输出组件，基于基础组件拓展组件功能的目的，类似继承&多态
 *    render props：组件的render函数从props中获取，由消费方决定具体渲染逻辑
 *      1.通过 props 属性传递一个函数来控制组件的渲染，达到UI层面的灵活性
 *      2.逻辑层面通过组件实现复用
 *      3.缺点是属性的来源容易混乱
 *    hooks: 函数式组件使用state，组合代码的一种形式
 *  1.3 class与函数式组件区别
 *    1. 组合优于继承，性能优化避免多次渲染的差异
 *    2. 各有特点，函数式也是代码组织和复用的一种形式
 *    3. 性能表现要结合实际，都有特定优化的手段
 *  1.4 绑定事件的方式和区别
 *    1. 常见的jsx事件绑定方式，区别在于this是否清晰，是否有内存浪费
 *    2. 代码写法形成约定，class/函数式的写法区别
 *  1.5 常见hooks的使用经验
 *    1. 见前面hooks段落
 *  1.6 组件通信
 *    1. 组件通信的方案比较多，核心是做到可维护，容易管理
 *    2. react里组件子组件到父组件传参是回调函数，跟vue类似
 *    3. 多层级相对复杂的组件通信可以是context/reducer,或者全局状态管理
 *  1.7 React 组件的渲染方式有哪些？它们的区别是什么？
 *    1.DOM 渲染的优点是可以实现动态更新和交互效果，缺点是首次加载速度较慢，对 SEO 不友好。
 *    2.服务端渲染是指在服务器端使用 JavaScript 将组件渲染成 HTML 字符串，然后将 HTML 字符串发送给浏览器端，浏览器端只需要将 HTML 字符串解析成 DOM 元素即可
 *  1.8 React 组件的生命周期有哪些方法？它们的作用是什么？
 *    1. 17版本前后略有差异，主要区分挂载，更新，卸载三个阶段对应的钩子函数
 *    2. 可以有针对性做一些避免重复渲染的优化
 *    3. 初始化获取业务接口，更新时对比数据，卸载时GC优化
 *  1.9 什么是 Error Boundaries？它有什么作用？
 *    1. 类似Vue.config.errorHandler()，处理错误场景，避免程序崩溃
 *    2. 业务里的实践是可以提供全局容器
 *
 *
 * 2. 数据流管理
 *    2.1 redux是什么，该如何使用
 *      store: const store = createStore(rootReducer) 基于reducer创建store,描述全局状态
 *      action: 包含type和payload的对象，定义了一种修改store的行为，但是不可直接修改state
 *      reducer: 参数包含state和action，根据不同的action来修改state
 *      middleware: 在基础能力上拓展的中间件，比如持久化，支持异步能力等
 *    2.2 一般场景利用useContext通信（业务维度）
 *    2.3 利用useContext&useReducer做状态管理
 *
 * 3.react router
 * 4.
 *
 *
 */




/**
 * @description: 项目练手计划（刻意练习有目的）
 * 1. 常见组件hooks方案实现
 *    1.1 封装腾讯地图组件
 *    1.2 封装echarts业务组件
 * 2. antd常见组件实现
 * 3. ahooks实现
 * 4. hooks-admin业务丰富
 *    1. hooks-admin/16.x之前admin
 * 5. 移动端实现
 *    1. chatgpt项目实现
 *
 *
 */

/**
 * @description react常见问题汇集
 * 1. 语雀通识类问题
 * 2. 社区经典文章
 * 3. chatgpt问答梳理（结合社区体系总结梳理）
 *
 *
 */
