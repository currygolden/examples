/*
 * @Author: your name
 * @Date: 2022-04-16 14:23:35
 * @LastEditTime: 2022-04-19 23:32:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/fe-web/工程化/rome.js
 */
/**
 * 1. 企业内部研发平台分析
 *  1.1. rome/cli 介绍
 *    1.1.1 rome全局命令，必然是/bin
 *      包含一些cli 交互的命令
 *      重试/轮询请求
 *      主要由cli&core 组成，后者是service的命令
 *    1.1.2 定义一系列 交互命令，大部分类似于vue/cli
 *      1.1.2.1 接入工程和组建规范校验（但是这个校验具体做什么不清楚，目录还是细节？）
 *      1.1.2.2 create
 *        目录名称有效性校验
 *        已存在同名目录处理
 *        获取安装配置或者预设的配置（create 命令行参数）
 *          无参数 - 有默认配置
 *          读取缓存目录的插件配置
 *          本地插件&远程插件，这里会涉及到一些本地目录读取复制和url下载文件
 *        辅助生成 package.json 文件
 *        辅助生成 readme 文件
 *        辅助安装依赖或者插件，需要判断包管理工具
 *        一个 async 函数内的 await 可以不用每次都捕获，最后调用async catch 即可
 *      1.1.2.3 invoke(注册插件)，这里也自行实现了插件系统
 *        实现Service类，即插件类(具体插件类的流程待梳理)
 *          CLI 插件应该总是包含一个 service 插件 做为主的导出，并且他能够选择性的包含 generator, prompt 文件 和 Vue UI 集成
 *          GeneratorService & RomeService
 *          RomeService：介绍如下
 * 
 *          识别并加载环境变量，支持区分不同的环境隔离
 *          解析文件导入，区分本地/远程文件类型
 *          index.js 作为 service 入口，generator.js/generator/index.js 作为generator入口
 *          rome插件拓展了install 方法，作为启动函数（类似vue 插件）
 *          检测分析 vue/cli 插件和 rome插件
 *          管理 service和generator
 *
 *          GeneratorService：介绍如下
 *          修改package.json/拓展文件目录和写入文件
 *          底层是拓展于vue/cli,所以根据版本维护了RomeDependence即vue/cli里的各种工具包，在此基础上拓展rome的能力
 *          romeGeneratorAPI 继承自 GeneratorAPI
 *          执行插件: 生命周期/插件初始化
 *
 *          service: 介绍如下
 *          给cli提供服务，修改webpack配置
 *          最后由service统一调度，初始化和消费插件，整体实现invoke
 *      1.1.2.4 收敛插件集合，作为预设的preset
 *      1.1.2.5 具体插件的实现和生命周期的挂载（todo：需要自行研究下）@nibfe/vue-cli-plugin 下的插件不少，可以阅读调研下
 *      1.1.2.6 插件机制可以规范化前端基建，将通用能力统一沉淀，自此和业务分层（属于前端架构部分）
 *      1.1.2.7 检查是否最新包以及策略更新包版本
 *  1.2 约定式路由
 *    1.2.1 根据项目目录生成 vue 工程适配的路由文件
 *    1.2.2 参考umi 等
 *  1.3 资源模版
 *    1.3.1 如自动生成页面模版（将某一类业务抽离出来成为典型业务模版）
 *  1.4 同类资源参考
 *    1.4.1 https://github.com/umijs（umi 团队的一系列输出）
 *    1.5.1 阿里飞冰体系 https://ice.work/docs/guide/start/
 *    1.6.1 egg.js 的研发体系（接入node层）
 *  1.5 感受
 *    1.5.1 类似cli&service的能力，可以通过core核心建设工程化能力，需要的拓展通过插件挂载
 *    1.5.2 core的架构涉及和调度能力是一切的核心，而需要支持哪些能力是应用视角和业务视角的关注a
 * 2 资产沉淀和管理
 *  2.1 前面介绍cli 沉淀工程方案，对于物料体系如 组件&函数 该如何形成沉淀
  */


/**
 * 插件架构体系
 *  web 端在优化系统，降低复杂度的时候会使用插件架构，这里介绍常见的几种
 *  bscroll 的插件机制
 *
 *
 */
