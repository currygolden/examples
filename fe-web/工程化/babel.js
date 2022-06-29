/**
 * @description babel总结
 * 参考资料
 * 将代码转为AST https://astexplorer.net/
 * babel流程介绍 https://juejin.cn/post/6844903956905197576
 * 介绍babel的一些配置 https://www.jiangruitao.com/babel/babel-preset-env/
 * babel 官网
 * babel github插件例子
 *
 */

/**
 * 1. babel的工作流程
 *   1.1 编译的作用是生成字节码或者AST,表现层跟平台无关，V8在执行js会涉及到编译，babel作为web端主流编译工具主要做了以下事情
 *   1.2 词法分析，将源码分割成Token数组，数组item是某一类数据结构，描述token信息
 *   1.3 语法分析：将Token数组转换成AST(AST有对应构造函数得出，描述AST的数据结构)
 *      @babel/parser
 *   1.4 转换：基于目标的AST操作，语法转换，压缩等，插件基于访问者模式（跟webpack的钩子函数）
 *      @babel/traverse
 *   1.5 生成： AST 转换回字符串形式的Javascript，还会生成Source Map
 *      @babel/generator
 *   1.6 @babel/core是内核模式，调度整个生命周期，以上阶段都借助插件能力
 * 2. babel架构模式
 *   2.1 基于核心包和子包的设计，核心流程是处理AST(如果涉及开发插件肯定要了解AST数据结构)
 * 3. babel插件
 *   3.1 具体去看插件实现即可，包括流程规范&具体逻辑，babel本身会调度插件和preset
 *   3.2 插件是访问者模式（跟钩子函数的差别是？）
 * 4. babel 常见配置
 *   4.1 预设&插件
 *      对于数组的配置，二者的生效顺序是不同的
 *      @babel/polyfill： 官方的polyfill集合
 *      @babel/preset-env：预设插件集合，目前脚手架都会内置
 *        targets： 目标浏览器范围
 *        useBuiltIns：和polyfill的行为有关，最后具体把哪些polyfill依赖引入进来
 *        corejs： 2｜3，看起来是从哪个公共库里获取polyfill
 *        modules：预期获得目标的模块类型
 *      @babel/runtime：在做语法转换时的公共依赖包（避免每次转换都要重复注入），但是自动注入的过程需要下面依赖包
 *      @babel/plugin-transform-runtime：
 *          1. 自动引入语法转换的工具函数
 *          2. 对于polyfill选项避免全局修改属性或者原型，引入babel的子包实现
 *
 *
 *
 *
 *
 */



