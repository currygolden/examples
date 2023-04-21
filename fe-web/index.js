/**
 * https://juejin.cn/post/6844904116339261447 （导读）
 * 描述 fe 项目基础架构
 * 0. 全生命周期规范，参考团队现状寻找可提升的方向
 *  0.1 从需求评审，开发，上线等一系列规范
 *  0.2 定义指标，量化数据结果产出
 * 1.业务层
 *  1.1 pc/h5/小程序/微前端/垂直领域（有价值才有业务土壤）
 *    1.1.1 如何评价业务领域是否有价值，有前景
 *  1.2 在垂直领域积累能力
 *  业务场景抽象性建设
 * 2.公共层（基础建设，基础物料）
 *  2.1 组件库
 *  2.2 方法库
 *  2.3 跨端物料复用
 *  2.4 微前端体系
 *  开发效率指标衡量
 * 3.开发构建
 *  3.1 本地启动
 *  3.2 数据mock
 *  3.3 打包构建治理
 * 4.CI/CD
 * 5.项目管理
 * 6.部署 nginx,docker,k8s
 * 7.工具化 集成式cli(从初始化到项目开发到公共配置到CI/CD到部署等)
 *  7.1 脚手架核心和插件式工具
 *  7.2 参考市场开源工具
 * 8.稳定性治理
 *  8.1 监控，埋点，稳定性指标，性能指标收集
 *  8.2 结合业务特征监控体系建设
 *  8.3 性能优化专项治理
 * 9. node.js 能力建设
 *  9.1 社区前沿node实践
 *  9.2 node 全栈开发
 */


/**
 * @description 具体的刻意练习指的是什么（前面是关于大方向，宏观认识）
 * 1. 基于vue/react/小程序框架下基础组件，业务组件的封装
 *   1.1 业务模型基于组件设计，组件机构和代码设计模式是工程师的基础，这个和框架无关，属于需要沉淀的能力
 * 2. 流程优化能力
 *   2.1 借助工具和社区方案，落地能够实际提效的办法
 * 3. 领域设计能力
 *   3.1 web子领域众多，结合业务实际特征，体系化设计方案，落地方案
 * 4. 注意不要以有涯随无涯
 *   4.1 领域细节的实现是不可穷尽的，也没有人可以做到样样都精通
 *   4.2 关注核心能力的积累，沉淀体系化的思维模型，在商业需要的时候深入细节
 * 5. 基于这个思路，有针对性设计日常的项目规划
 *
 */
