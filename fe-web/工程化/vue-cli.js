/*
 * @Author: your name
 * @Date: 2022-03-05 12:32:18
 * @LastEditTime: 2022-06-01 09:58:43
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/fe-web/工程化/vue-cli.js
 */
/**
 * 1. 比较好的cli工具，可借鉴可拓展
 *  1.1 cli可以基于内核管理，将流程标准化
 *  1.2 从规范，资产，开发至上线的生命周期都可以通过插件来调度
 * 2. 架构规范：实现自动化项目创建流程（自动接入基础服务），抽象场景模板满足多场景定制化需求
 *  2.1 monorepo,子包独立部署
 *  2.2 这里需要区分库/js工具和组件，后者需要打包压缩，不要直接传到npm
 *  2.3 实现类似vue/npm的全局命令或者局部命令(npm link), 看package.json下的bin字段
 * 3. create 命令
 *  3.1 适用commander处理命令行参数
 *  3.2 create 之前判断目录，执行 creator.create
 *  3.3 解析 Creator 类
 *    3.2.1 node.js下模块化的常见适用
 *    3.2.2 自定义的环境变量
 *    3.2.3 大量的预设参数合并过程（todo）
 *    3.2.4 继承于 eventEmitter
 *    3.2.5 构造类主要处理预设插件和定义回调函数（需要拓展）
 *    3.2.6 命令行交互可以拓展，自定义了拓展类
 *    3.2.7 根据命令行参数解析预设配置，确定包管理工具
 *    根据插件类型 解析插件，提前分析依赖，暴露监听函数
 *    初始化git 操作
 *    激活 generator
 *
 *
 *
 * 4. add 插件
 *  4.1 这也是微内核/插件机制最吸引的特点
 *
 *
 * 8. 以 vue serve 介绍 cli 插件
 *  8.1 导出也是典型的cli-service 结构
 *    判断是否在沙盒容器内（微前端的隔离容器概念）
 *
 * 9. generator
 *  属于cli-service 的一部分，可以用来修改依赖，修改模版文件达到规范化的目的
 *  规范化 控制台的输出结构
 *  配置文件规范化，比如哪些配置文件是可以识别的，这里定义了文件转化类ConfigTransform
 *  GeneratorAPI
 *    1. 使用ejs来渲染html
 *    2. 文件模版可以增加中间件处理文件
 *    3. 以及其它对文件的处理流程
 *
 * 10. 插件介绍
 *  10.1 必须遵循 vue-cli-plugin-<name> 或者 @scope/vue-cli-plugin-<name> 这样的命名惯例
 *  10.2 插件内的 generator 将会在两种场景下被调用
 *    10.2.1 在一个项目的初始化创建过程中，如果 CLI 插件作为项目创建 preset 的一部分被安装
 *    10.2.2 插件在项目创建好之后通过 vue invoke 独立调用时被安装。
 *    10.2.3 GeneratorAPI允许一个 generator 向 package.json 注入额外的依赖或字段，并向项目中添加文件。（增加依赖或者修改模版结构）
 *    10.2.4 cli 的插件可以做哪些事情
 *  10.3 Service 插件
 *    10.3.1 扩展/修改不同环境的内部webpack配置
 *  10.4 开发插件例子
 *    10.4.1 https://juejin.cn/post/6844903824742678541
 *    10.4.2 CLI 插件应该总是包含一个 service 插件 做为主的导出，并且他能够选择性的包含 generator, prompt 文件 和 Vue UI 集成
 *  10.5 插件体系的设计
 *    10.5.1 微内核体系和插件机制
 *    10.5.2 https://juejin.cn/post/6844903774180360206（插件系统设计例子）
 *    10.5.3 webpack/babel/vue/rome/better-scorll 都有插件机制
 *  10.6 插件解读
 *    10.6.1 eslint-plugin
 *    service: plugin api & options(来自vue.config.js),必选
 *      index.js：可以修改 webpack 配置，可以定义cli service的命令
 *        根据api插件生成基础的 eslint 配置
 *        获取依赖的eslint version,这里的包加载可以是本地文件，node包，node包下的具体文件
 *        处理 eslint的缓存配置，修改 eslintWebpackPlugin 的配置
 *        添加 lint 插件命令，解析命令行的参数
 *          lint.js 主要处理合并参数之后，函数式调用eslint校验，类似rollup的过程,具体的执行逻辑暂不关注
 *        修改已有的 service & 指定环境变量
 *    Generator：为项目扩展包依赖，创建新的文件或者编辑已经存在的文件时
 *      调用时期
 *      Generator.js/index.js的3个参数 generatorApi, invoke 参数/预设的配置，整个 preset
 *      拓展了package.json 文件,修改或新增editorConfig文件
 *    prompt: 预设的用户命令行交互，选项作为Generator的参数
 *    结果：该插件实现了一键化项目配置eslint的能力，在历史项目实践问题不大
 *
 *
 *  10.7 cli-shared-utils
 *    spinner 统一的命令行loading
 *    logger  统一的命令行信息输出
 *
 *
 *
 *  npm 包汇总
 *    globby 做文件目录的检索,glob的递进
 *    strip-ansi 做编码的转换
 *    readline node自带的文件读取
 *    ora 更加优雅的 loading
 *
 *
 *  monorepo+lerna 方案
 *
 */
