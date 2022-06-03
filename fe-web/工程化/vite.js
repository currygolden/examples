/*
 * @Author: your name
 * @Date: 2022-04-15 17:48:21
 * @LastEditTime: 2022-05-31 09:55:42
 * @LastEditors: liyu38 liyu38@meituan.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/fe-web/工程化/vite.js
 * 参考阅读：
 * 1. https://juejin.cn/post/7012880929102233637 vue2 传统项目迁移vite
 */
/**
 * 1. vue2 项目迁移vite
 *  1.1 根据index.html 确认服务器根目录
 *  1.2 import() 动态引入不支持
 *  1.3 .vue 文件引入文件名不能省略
 * 
 * 
 * 2. vite解读
 *  2.1 类似import&type=module 的模块（即esmodule）写法，在浏览器原生支持的背景下，打包工作由浏览器接管
 * 
  */