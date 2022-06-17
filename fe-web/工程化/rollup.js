/*
 * @Author: your name
 * @Date: 2022-04-15 17:48:10
 * @LastEditTime: 2022-06-16 22:58:28
 * @LastEditors: liyu38 liyu38@meituan.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/fe-web/工程化/rollup.js
 * 主要参考就是官方文档
 */
/**
 * 1. 阅读rollup打包工具father-build，熟悉rollup工具，总结ts
 *   1.1 了解目录下的tsconfig.json
 *     直观的看很清楚monorepo
 *     入口逻辑区分了单个package还是lerna模式打包
 *   1.2 father-build作为工具，命令集中在bin/，实际的命令逻辑都在lib&src
 *    1.2.1 新建types.d.ts 作为集中的类型声明文件（常见ts）
 *      type interface  interface a extends b
 *      约束配置，参数格式
 *      定义泛型数组
 *    1.2.2 获取打包设置参数
 *      入口文件
 *      根目录配置/用户配置参数/命令行覆盖参数/自定义配置参数
 *      使用 json-scheme 校验json的格式
 *      启动函数有默认值，用户的配置参数被统一接收到args来处理，有利于后续的类型管理
 *      最终组合，合并生成最终的打包参数配置 getBundleOpts，配置校验 validateBundleOpts
 *      调用自定义的 rollup 函数（这里的函数组合形式比较奇怪），可以自定义watcher观测对象，在配置调整时重新触发打包
 *    1.2.3 babel
 *      获取babel 打包配置（输出产物兼容浏览器，api差异，对输出目标的运行环境会有一定约束），会约束参数类型，返回是babel预设插件集&常用babel插件
 *      一般用第三方包 会维护一个业务的选项类型（标准api+自定义参数）
 *      @babel/register 函数式的写法，调用前面获取的babel 配置参数,也就是注册babel
 *      用户自定义配置见 configFileList 类似 vue.config.js
 *      使用scheme配置 + ajv 校验大的配置文件
 *    1.2.4 rollup 函数式打包配置
 *      区分多入口&是否监听文件变化而重新打包
 *      rollup -> build 函数
 *      提供根据入口修改参数配置的能力
 *      生成最终的rollup打包配置 getRollupConfig，可以看到可选入参是 bundleOpts，固定的返回值格式是 RollupOptions
 *      这里可以看到开发者对暴露的选项配置以及api设计的思考
 *      rollup插件配置
 *      babel插件&预设配置
 *      处理 global&output.external
 *   1.3 汇总常用 node 包工具
 *    1.3.1 利用yParser 解析命令行参数
 *    1.3.2 利用 chalk 命令行颜色输出，且随机色
 *    1.3.3 ajv 作为json格式的校验工具
 *    1.3.4 update-notifier 判断是否有可更新/升级的包
 *    1.3.5 slash 处理window下的路径
 *    1.3.6 path 处理路径
 *    1.3.7 fs 判断文件目录或者具体文件是否存在
 *    1.3.7 tempDir 获取系统的临时目录
 *
 *  2.自定义工具函数
 *    2.1 获取目标文件的路径
 *    2.2 lerna 包的一些处理
 *
 *  3.ts的使用经验
 *    3.1 函数的默认参数，类型定义
 *    3.2 解构函数形参，定义类型
 *
 *
 *  4. 整体结构视角总结
 *    4.1 整体而言项目比较充实，ts类型定义充分，目标是对rollup打包场景做通用性封装，具有实用性和可拓展性
 *    4.2 在开始处理打包逻辑之前处理用户配置&默认配置&收敛常用配置（这里体现出）
 *      4.2.1 利用json 处理规范校验，json 字段拓展支持用户自定义， 配置的选项通过ts 规范参数类型 getUserConfig
 *      4.2.2 打包场景支持一般项目和monorepo 项目，支持使用rollup 或者babel打包 build()
 *        babel 打包的分支暂时不太熟悉
 *      4.2.3 由于rollup需要借助babel能力，所以需要提前配置注册babel(基本上就是常见配置json和使用到的babel 插件) getBabelConfig & registerBabel
 *      4.2.4 确认rollup打包的公共配置，配置rollup插件记忆函数式调用的入参来源
 *      4.2.5 暴露打包入口函数，实际执行打包逻辑的地方
 *      4.2.5 实际的入口结合到bin/xxx,做成cli/全局命令的格式
 *    4.3 需要了解rollup和babel的架构设计，配置原则和函数式调用
 *      4.3.1 功能函数模块拆分清晰，整体设计低耦合
 *      4.3.2 整体基建部分可借鉴，pr流程清晰, script 脚本功能清晰
 */
