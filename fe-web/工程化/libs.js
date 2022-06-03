/*
 * @Author: liyu38 liyu38@meituan.com
 * @Date: 2022-05-31 14:30:08
 * @LastEditors: liyu38 liyu38@meituan.com
 * @LastEditTime: 2022-05-31 18:25:32
 * @FilePath: /examples/fe-web/工程化/libs.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * 研发资源的套件化属于工程化的范畴，这里包含常见lib的实现
 * 1. axios封装
 * 
 * 
  */



/**
 * 1. ts+axios的封装实践
 *  1.1 同一个项目使用相似的配置创建axios实例
 *  1.2 有哪些相同的配置
 *     withCredentials配合后端处理跨域,xsrfCookieName，xsrfHeaderName 读取特定的cookie作为token(接口权限)
 *     timeout，全局请求，响应拦截钩子等
 *     配置选项来自与类似声明文件
 *  1.3 feature 支持
 *    1.3.1 全局的请求&响应拦截
 *    1.3.2 无权限sso登出
 *    1.3.3 特定场景owl监控
 *    1.3.4 取消重复请求
 *  1.4 原理介绍
  */