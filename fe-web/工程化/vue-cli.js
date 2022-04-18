/*
 * @Author: your name
 * @Date: 2022-03-05 12:32:18
 * @LastEditTime: 2022-04-16 16:32:30
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
 * 
 * 
 * 
 * 4. add 插件
 *  4.1 这也是微内核/插件机制最吸引的特点
 * 
 * 
 * 
 * 
 * 10. 插件介绍
 *  10.1 必须遵循 vue-cli-plugin-<name> 或者 @scope/vue-cli-plugin-<name> 这样的命名惯例
 *  10.2 插件内的 generator 将会在两种场景下被调用
 *    10.2.1 在一个项目的初始化创建过程中，如果 CLI 插件作为项目创建 preset 的一部分被安装
 *    10.2.2 插件在项目创建好之后通过 vue invoke 独立调用时被安装。
 *    10.2.3 GeneratorAPI允许一个 generator 向 package.json 注入额外的依赖或字段，并向项目中添加文件。（增加依赖或者修改模版结构）
 *  10.3 Service 插件
 *    10.3.1 扩展/修改不同环境的内部webpack配置
 *  10.4 开发插件例子
 *    10.4.1 https://juejin.cn/post/6844903824742678541
 *  10.5 插件体系的设计
 *    10.5.1 微内核体系和插件机制
 *    10.5.2 https://juejin.cn/post/6844903774180360206（插件系统设计例子）
 *    10.5.3 webpack/babel/vue/rome/better-scorll 都有插件机制
 */