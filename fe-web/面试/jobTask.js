/**
 * @description 用star方法描述接触过的项目，理论和实际相结合
 *
 *
 */

/**
 * @description 中台业务场景
 * 1. S：多管理后台项目的微前端体系建设（工程化体系建设）
 *    1.1 开发物料重复建设，无法形成有效沉淀
 *    1.2 基建体系不统一，没有形成最佳实践，业务跟基建耦合
 *    1.3 功能类似需求场景多，开发效率待提高
 *    1.4 多平台融合，建设微前端
 *    1.5 标准化CI/CD流程
 * 2. T：从规范，到参考最佳实践，逐步建设工程化
 *    2.1 结合项目业务特征，典型业务场景，封装公共组件，公共函数包（沉淀演示文档）
 *      2.1.1 典型业务场景抽象，支持一般的json 配置（提高开发效率）
 *      2.1.2 沉淀业务模版（日常业务需求支持模版修改）
 *      2.1.3 不同业务线沉淀可复用业务组件
 *      2.1.4 沉淀常用工具库
 *    2.2 folk第三方cli,基于内核+插件机制建设合适自己的基建场景
 *      2.2.1 讨论，制定规范
 *      2.2.2 从需求评审到最终上线的完善流程能力建设
 *        2.2.2.1 代码规范，流程规范
 *        2.2.2.2 构建打包能力统一，开发物料建设，典型业务场景抽象
 *        2.2.2.3 CI/CD 能力建设
 *        2.2.2.4 node层/serveless建设
 *        2.2.2.5 扩大影响力，建设综合的前端框架（参考umi）
 *      2.2.3 输出可插拔的脚手架，涵盖全生命周期典型需求
 *    2.3 基于业务现状完善微前端体系
 * 3. A.R(回顾)
 * 4. 稳定性&开发效率建设
 *
 * 拆解问题：微前端方案对比，主要做了哪些事情
 */


/**
 * 1. 多子系统的管理端微前端项目
 *  1.1 介绍：历史管理端子系统25+，技术栈包含vue体系，react体系等，在业务发展过程中面临如下问题
 *    1.1.1 多子系统操作跳转无法关联，给运营等使用方带来不便
 *    1.1.2 研发物料重复建设，缺少文档，无法形成有效沉淀
 *    1.1.3 基建体系不统一，没有形成最佳实践，业务跟基建耦合
 *    1.1.4 类似功能需求场景多，开发效率待提高
 *  1.2 解决方案：根据实际场景建立多子系统微前端项目，完善基建建设和提高开发效率
 *    1.2.1 调研企业内部和业界方案，输出技术文档并方案评审
 *    1.2.2 完善基建建设，包含业务组件库沉淀，工具库沉淀，研发工作流标准化等
 *    1.2.3 多系统CI/CD流程规范，打包构建，部署流程标准化
 *    1.2.4 典型业务场景沉淀标准化模版，一定程度提高业务开发效率
 *  1.3 难点分析
 *    1.3.1 调研微前端方案并结合实际技术选型
 *    1.3.2 历史业务迁移微前端业务保证系统稳定性
 *    1.3.3 工作流多项目推广，输出项目规范配置
 *    1.3.4 基座与业务项目的依赖版本管理，基建维护与迭代
 *  1.4 项目成果
 *    1.4.1 历史20+独立系统聚合成一个平台的微前端体系，支持系统级别的业务复用
 *    1.4.2 沉淀部门的通用业务组件库，函数工具库，结合第三方物料标准化研发基建物料
 *    1.4.3 沉淀多场景业务模版，支持快速模版开发，提高业务研发效率
 *    1.4.3 研发工作流标准化，涵盖从需求评审到上线的完整生命流程
 */




/**
 * 3. 工程化体系建设
 *   主要包含三个方面规范建设，基建建设，脚手架自动化
 *   3.1 规范建设
 *    3.1.1 结合部门PMO规范，建立从需求评审，开发，部署，上线，运维的全流程SOP
 *    3.1.2 参考开源方案沉淀项目工作流，eslint，prettier，husky，commitlint等
 *    3.1.3 监控指标建设，业务数据大盘建设，线上业务稳定性治理
 *   3.2 基建建设
 *    3.1.3 打包，构建方案交给脚手架，避免多项目重复建设
 *    3.2.1 业务层之上沉淀工具库，组件库，常用规范配置等
 *    3.2.2 提效方面沉淀物料模版，量化开发时间优化百分比
 *   3.3 脚手架自动化
 *    3.3.1 结合业务现状，参考业界方案沉淀可提效的脚手架
 *    3.3.2 将开发流程主要生命周期由脚手架接管，如新建模版，格式化代码，本地构建等
 *
 */

/**
 * 4. 可视化业务
 *  4.1 背景：QX在移动端，PC端都有较多的可视化业务，如地图工具，图表工具等，除了业务逻辑外存在很多重复的初始化，标准化逻辑
 *  4.2 动作：为了提高业务开发效率，实现研发物料复用，结合实际需求沉淀地图组件和图表组件
 *    4.2.1 地图以企业内部地图为例，沉淀常用业务组件10+，提供组件演示文档，统一打包方案，支持按需引入
 *    4.2.2 图表以echarts为主，沉淀常用hooks逻辑复用
 *    4.2.3 沉淀组件说明文档，内部发布 npm 包
 *  4.3 收益
 *    4.3.1 类似可视化业务通过业务组件实现简单调用，提高开发效率
 *    4.3.2 组件提供单元测试，形成部门的最佳实现，达到有效积累
 *    4.3.3 完善类型声明，支持历史业务和新业务调用
 */
