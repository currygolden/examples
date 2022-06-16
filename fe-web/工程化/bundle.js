/*
 * @Author: your name
 * @Date: 2022-04-11 14:16:47
 * @LastEditTime: 2022-06-14 17:05:31
 * @LastEditors: liyu liyu38@meituan.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/fe-web/工程化/bundle.js
 * 如果要建设研发套件，需要做什么，参考阅读如下
 * 1. https://cloud.tencent.com/developer/article/1555982 npm install 原理
 * 2. https://www.jiangruitao.com/babel/introduction/ babel 教程
 * 3. https://www.ruanyifeng.com/blog/2016/10/npm_scripts.html npm script
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
 *          "typings": 告诉第三方模块从哪里获取类型定义，一般都是集中化管理
 *          1.  npm install 的安装流程
 *            1.1 3.x 以后扁平结构，范围版本不满足则在子目录安装，这一步称为构建依赖树，主要是理解一个一个依赖的处理，遇到相同依赖不同版本会出现不一样的结果（依赖的不确定性导致lock文件的必要性）
 *            1.2 lock 文件描述的信息
 *              dependencies：只有子依赖的依赖和当前已安装在根目录的  node_modules 中的依赖冲突之后，才会有这个属性
 *              integrity： hash 完整性
 *              resolved： 包的来源
 *            1.3 lock.json 中已经缓存了每个包的具体版本和下载链接，不需要再去远程仓库进行查询，然后直接进入文件完整性校验环节，减少了大量网络请求
 *              对于app应用，需要把lock.json发布出去，以获取在不同环境和CI过程相同的结果
 *              对于npm包而言，由于lock.json会固定版本，此时install 无法共享范围版本，造成依赖冗余（这句话要理解npm install 的原理）
 *            1.4 package-lock.json的处理
 *                如何理解npm 和 yarn 混用会造成的问题，yarn.lock 和package-lock.json有什么区别
 *            1.5 扁平化，缓存，与lcok文件冲突的处理
 *      2.1.2 镜像管理
 *      2.1.3 npm run/ bin目录的意义
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
 *      4.1.4.6 babel-plugin-transform-runtime: 从语法和api转换考虑，主要解决提供运行时的api和一些helper, 避免修改全局对象&重复打包相同依赖
 *
 * ==============================>
 * 5.基于 lerna 的项目结构
 *   5.1 主要解决什么问题
 *    其实目的还是做更好的工程化，将基建和业务分离，业务作为独立的repo,基建作为合并的 lerna 项目
 *    统一基建的公共能力，避免重复建设
 *    有依赖的项目自动link, 有助于本地调试，主要是互相依赖的多子包管理方案（可以自动更新依赖）
 *   5.2 一些主要场景（lerna 一些基本命令）
 *    npm包管理: lerna Bootstrap 为所有子包安装依赖，并且自动link(本地调试优势)，需要注意几个问题
 *      1. lerna add 和 npm install 都是安装依赖，但是出发点不一样
 *      2. semver 的依赖版本预期安装到根目录（有点像 npm i 的扁平化管理，不知道lerna 能否支持）
 *      3. publish: 会对比子包的更新，从而更新version，相应的更新在其它项目的引用（相比npm publish 一个个修改维护）
 *      4. clean: 删除全部的node_module 文件（怎么处理缓存和log 文件）
 *  5.3 直观上的好处
 *    构建发布脚本可以复用，共同建设
 *    更方便的多包管理模式（自动处理之前 npm 单独发包的一些问题，看起来不是新东西）
 *    在产出层面有可规划的方案，有助于沉淀团队基建能力
 *
 */
