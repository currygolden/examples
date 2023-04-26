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
 *  https://github.com/HalseySpicy/Hooks-Admin  hooks admin案例
 *  antd站: react 综合生态
 *  umi: 业界领先脚手架
 *  ice: 案例借鉴
 *
 * 2: 学习目标&时间规划
 *   2.1 react方向及周边技术体系，沉淀典型业务场景实现（管理后台，H5，其它领域）
 *   2.2 核心周边技术选型以及评价
 *
 */

/**
 * @description hooks的一些使用
 * 1. 主要分为状态类&副作用类hooks，一共有14种
 *    1.1 对比历史class组件和hooks函数式组件，区别是什么
 *
 * 2. 简单理解常见hooks的使用场景
 *    2.1 useState: 提供函数式组件状态
 *    2.2 memo: 包裹函数组件，如果输入不变组件不重新渲染
 *    2.3 useMemo: 类似计算属性，根据依赖值返回计算值，避免一些耗性能的计算
 *    2.4 useCallback: 回调函数调用的场景，依赖项变化执行回调
 *
 *    2.5 useEffect: 处理常见一些副作用场景，与componentDidMount、componentDidUpdate 和 componentWillUnmount传统生命周期作用时机类似
 *      2.5.1 副作用逻辑本身，返回值取消副作用来做GC,依赖项
 *      2.5.2 开发者不用关注每个生命周期的调用，框架层面优化
 *    2.6 useRef： 就像是可以在其 .current 属性中保存一个可变值的“盒子”，一般用来访问组件实例
 *      获取dom实例 xxx.current 访问
 *
 */


/**
 * @description react18.x router6.x redux 技术点拆解
 * 1. 路由模块
 *   1.1 代码组织的每一处模块化都不错
 *   1.2 配合全局状态做路由权限管理
 *   1.3 模拟实现组件懒加载
 * 2. 数据流模块
 *    2.1 拆分redux模块
 *
 *
 *
 */
