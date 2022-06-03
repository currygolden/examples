/*
 * @Author: your name
 * @Date: 2022-04-15 17:48:21
 * @LastEditTime: 2022-06-03 18:16:23
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










 /**
  * 用问题来推动学习或许目的性更强
  * 1. vite的优势和当前打包工具存在的问题是
  * 2. 浏览器支持 esmodule 意味着什么
  * 3. 历史常见为什么需要打包，而 esmodule 在开发环境为什么可以不打包
  * 4. 浏览器可以识别 esmodule，但是不识别非js文件，所以实际的打包过程🈶由浏览器完成
  * 5. 总体来看， vite包含什么，由什么组成
  * 6. 什么是 npm 依赖解析和预构建
  * 7. vite 构建过程中是如何处理源码和依赖的
  *
  *
  *
  */
