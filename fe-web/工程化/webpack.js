/* 
参考：
  https://blog.didiyun.com/index.php/2019/03/01/webpack/
  https://juejin.cn/column/6978684601921175583  webpack 知识点专栏
webpack 的一些基础配置和优化方向，目的是起到构建打包流程的合理化
基础配置参考 c端项目即可
1: happypack 开启多进程处理loader
2: loader配置及自定义loader
3: plugin优化功能，自定义plugin
4: 提取公共依赖 dll | externals
5: 理解 chunkhash 和 contenthash

*/


/* 实际操作
webpack作为打包工具，需要了解其插件机制和核心流程，还有一些主要概念
更加实际的是在项目中会做哪些具体的优化和配置,这些调整有通性，前提是了解webpack工作机制，以及结合具体项目的出发点
 静态资源压缩， nginx开启gzip
 文件变更提示，alpha测试回归

*/


/* 理解loader
loader 的功能：把源模块转换成通用模块（最终是js模块）
loader实现参考：
https://juejin.im/post/5a698a316fb9a01c9f5b9ca0#heading-19
https://champyin.com/2020/01/28/%E6%8F%AD%E7%A7%98webpack-loader/
1: loader实现，单一功能，整体是一个模块，导出是一个函数
2: 在webpack中的配置例子及参数解释
*/

// 帮助读取loader的options配置
const loaderUtils = require('loader-utils')
import { validateOptions } from 'schema-utils';

function myWebpackLoader(suource) {
  const options = loaderUtils.getOptions(this)
  const callback = this.async() // 定义为异步处理的loader

  // 处理source，返回结果
  this.callback(null, result)

  // 如果是最后的loader，需要输出js
  return 'module.exports = ' + JSON.stringify(source);

}

/* 
plugin 实现参考
https://champyin.com/2020/01/12/%E6%8F%AD%E7%A7%98webpack-plugin/
vue-admin项目已实现

*/
const fs = require('fs')
const path = require('path')

class webpackDepsGraphs {
  constructor() {
    this.platArray = []
    this.resultArray = []
  }
  // 递归收集依赖
  depsHandler() {
    const dataHandler_ = function(optArray, sourceItem) {
      optArray.some(resultItem => {
        if (sourceItem.issuer === resultItem.path) {
          resultItem.deps.push({
            type: 'module',
            path: sourceItem.path,
            rootPath: resultItem.rootPath
              ? resultItem.rootPath
              : resultItem.path,
            deps: []
          })
          return true
        } else {
          if (resultItem.deps.length) {
            // 定义尾递归优化
            dataHandler_(resultItem.deps, sourceItem)
          }
        }
      })
    }
    const that = this
    this.platArray.forEach(sourceItem => {
      if (sourceItem.issuer === '') {
        // that.resultArray.push({
        //   type: 'template',
        //   path: sourceItem.path,
        //   deps: []
        // })
      } else if (sourceItem.issuer === null) {
        that.resultArray.push({
          type: 'entry',
          path: sourceItem.path,
          deps: []
        })
      } else {
        dataHandler_(that.resultArray, sourceItem)
      }
    })
  }

  afterResolve(result, callback) {
    const { resourceResolveData } = result
    const {
      context: { issuer },
      path
    } = resourceResolveData
    if (
      path.indexOf('mtbike-vue/node_modules') === -1 &&
      path.indexOf('mtbike-vue/build') === -1
    ) {
      // 从打包文件中获取源数据
      this.platArray.push({ issuer, path })
    }

    callback()
  }
  // 插件必备
  apply(compiler) {
    // 在哪个钩子绑定，参数可以拿到compilation，cb
    compiler.hooks.normalModuleFactory.tap('webpackDepsGraph', nmf => {
      // 这里是 compilation 的钩子
      nmf.hooks.afterResolve.tapAsync(
        'webpackDepsGraph',
        // 提供对应的回调函数
        this.afterResolve.bind(this)
      )
    })

    compiler.hooks.done.tap('webpackDepsGraph', () => {
      this.depsHandler()
      fs.writeFile(
        path.resolve(__dirname, '../../changFiles/deps.json'),
        JSON.stringify(this.resultArray),
        function(err) {
          if (err) {
            console.log(err)
          } else {
            console.log(`Updated deps files.`)
          }
        }
      )
    })
  }
}

module.exports = webpackDepsGraphs
