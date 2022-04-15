/*
 * @Author: your name
 * @Date: 2022-04-11 14:16:47
 * @LastEditTime: 2022-04-14 16:32:08
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/fe-web/工程化/bundle.js
 * 如果要建设研发套件，需要做什么，参考阅读如下
 * 1. https://cloud.tencent.com/developer/article/1555982
 * 2. https://www.jiangruitao.com/babel/introduction/ babel 教程
 */
/**
 * 1. 模块化方案的演进
 *  1.1 当下的现状和存在的问题
 *    1.1.1 ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。
 *    1.1.2 最主要的有 CommonJS 和 AMD 两种。前者用于服务器，后者用于浏览器,而 umd 是兼容这两者
 *    1.1.3 CommonJS 模块就是对象，输入时必须查找对象属性，ES6 模块不是对象，而是通过export命令显式指定输出的代码，再通过import命令输入。
 *    1.1.4 export { firstName, lastName, year }; 可以清楚看到模块输出的内容
 *    1.1.5 import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。（当然这里也区分原始类型和引用类型，不过不好排查）
 *    1.1.6 import语句会执行所加载的模块（意味着模块的依赖会前置）
 *    1.1.7 import在静态解析阶段执行，所以它是一个模块之中最早执行的
 *    1.1.8 import()类似于 Node 的require方法，区别主要是前者是异步加载，后者是同步加载。
 *   2.1 ES6 模块与 CommonJS 模块差异
 *     2.1.1 CommonJS 模块输出的是一个值的拷贝（浅拷贝），ES6 模块输出的是值的引用。
 *      2.1.1.1 拷贝区分原始和引用类型，一旦输出一个值，模块内部的变化就影响不到这个值
 *      2.1.1.2 JS 引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用
 *     2.1.2 CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
 *       2.1.2.1 ES6 模块不是对象，而是通过 export 命令显式指定输出的代码，import时采用静态命令的形式。即在import时可以指定加载某个输出值，而不是加载整个模块
 *  3.1 node 场景
 *    3.1.1 可以在项目的package.json文件中，指定type字段为module，可以在项目的package.json文件中，指定type字段为module，type字段为commonjs，则.js脚本会被解释成 CommonJS 模块
 *    3.1.2 处理循环引用
 * 2. node 包管理的一些方案(npm 教程)
 *     2.1 npm 工具
 *      2.1.1 npm发包和管理
 *        2.1.1.1 输出 dist 格式
 *        2.1.1.2 package.json 常见字段定义
 *          "dependencies": Packages required by your application in production."，这里的文件如果作为依赖包（宿主项目）也会下载到node_module
 *          "devDependencies": Packages that are only needed for local development and testing.
 *          "peerDependencies": 解决核心包依赖的冲突问题，此时保证宿主和当前包的依赖相同，上升到宿主环境
 *          1.  npm install 的安装流程
 *            1.1 3.x 以后扁平结构，范围版本不满足则在子目录安装，这一步称为构建依赖树
 *            1.2 会根据这个依赖结构去下载或拿到缓存中的依赖包
 *            1.3 package-lock.json的处理
 *      2.1.2 镜像管理
 * 3. 打包工具取舍和对比
 * 4. babel 的理解
 *  4.1 Babel是一个工具集，主要用于将ES6版本的JavaScript代码转为ES5等向后兼容的JS代码，从而可以运行在低版本浏览器或其它环境中。（7.x 之后版本差异较大）
 *    4.1.1 ES6是ECMAScript 2015及以后的版本的统称
 *    4.1.2 语法转换如 箭头函数
 *    4.1.3 api 添加，对应的是polyfill
 *    4.1.4 常用子包介绍
 *      4.1.4.1 @babel/cli是Babel命令行转码工具，如果我们使用命令行进行Babel转码就需要安装它。
 *      4.1.4.2 @babel/cli依赖@babel/core，因此也需要安装@babel/core这个Babel核心npm包。
 *      4.1.4.3 @babel/preset-env这个npm包提供了ES6转换ES5的语法转换规则，我们在Babel配置文件里指定使用它
 *      4.1.4.4 polyfill 一般结合现代构建工具形成研发体系
 *      4.1.4.5 preset和plugin， 前者其实就是一系列的插件包
 *
 */
