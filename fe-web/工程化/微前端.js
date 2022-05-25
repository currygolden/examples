/*
 * @Author: liyu38 liyu38@meituan.com
 * @Date: 2022-05-07 15:31:23
 * @LastEditors: liyu38 liyu38@meituan.com
 * @LastEditTime: 2022-05-12 16:34:32
 * @FilePath: /examples/fe-web/工程化/微前端.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 1. 在业务中落地微前端实际遇到什么问题，或者说micro的目标是
 *    解耦巨石应用
 *    落地微前端，根据业务或者模块拆分系统，可以更好的维护
 *    独立开发，独立部署，独立上线
 *    与技术栈无关
 *    形成开发体系
 *  1.1 主应用+子应用体系采用怎样的运行时框架
 *    社区：乾坤，静态资源版本
 *  1.2 
 * 2. 微前端体系
 *  2.1 治理体系
 *    应用管理 依赖管理 产物管理 版本发布 灰度方案 私有化
 *  2.2 运行时容器
 *    应用加载 生命周期 路由同步 应用通信 隔离沙箱 异常处理
 *  2.3 开发配套
 *    文档 脚手架 dev 构建 发布 devtools(CI/CD)
 *  2.4 微物料
 *    粒度不一的资源体系
 * 
 * 
 * 
 * 
 * 
 * 
 *  3. 一些方案实践和回顾
 *    3.1 edc/cli 出发点是组件即服务，将单vue 文件或者jsx 文件构建生成的静态资源解析成具有完整生命周期的应用（js->app）
 *      根据静态资源实现版本管理，统一发布，部署，但是热更新问题很大
  */