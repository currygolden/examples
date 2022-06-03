/* 
参考：
  https://blog.didiyun.com/index.php/2019/03/01/webpack/
  https://juejin.cn/column/6978684601921175583  webpack 知识点专栏
  https://juejin.cn/post/6859569958742196237 import模块是如何解析的
  https://juejin.cn/post/7054752322269741064 rollup和webpack 打包产物的比较
webpack 的一些基础配置和优化方向，目的是起到构建打包流程的合理化
基础配置参考 c端项目即可
1: happypack 开启多进程处理loader
2: loader配置及自定义loader
3: plugin优化功能，自定义plugin
4: 提取公共依赖 dll | externals
5: 理解 chunkhash 和 contenthash

*/

/**
 * 1. webpack 核心流程有哪些，各阶段主要做了什么
 *  1.1 初始化准备
 *    初始化参数：从配置文件、 配置对象、Shell 参数中读取，与默认配置结合得出最终的参数（会有scheme格式的校验）
 *    创建 Compiler 对象（编译管理器），Compilation则是每次热更新触发编译都会生成
 *    初始化编译环境：用户自定义插件，自带内置插件
 *    根据配置中的 entry 找出所有的入口文件，将入口文件转换为 dependence 对象（此时不是树形结构，entry 的依赖暂时识别不了）
 *  1.2 构建阶段
 *    根据 dependence 对象创建 module 对象（module简单理解就是最小编译单元，由具体文件对应）
 *    module 对象最终的识别需要借助loader转为js文件，JS 解释器将内容转换为 AST 对象
 *      同样对每一个 module 创建dependence，这样就形成了完整的依赖树结构（到底编译出的module是什么）
 *      import/require 经过webpack打包以后变成一些Map对象，key为模块路径，value为模块的可执行函数
 *  1.3 生成阶段
 *    seal: 将 module 按规则组织成 chunks(这步是可以修改输出内容的最后机会)
 *      entry 及 entry 触达到的模块，组合成一个 chunk
 *      使用动态引入语句引入的模块，各自组合成一个 chunk
 *      entry.runtime 单独组织成一个 chunk
 *    写入文件系统(emitAssets)：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统
 * 2. loader理解
 *  2.1 用来做文件转化，最终生成js文件,js文件进一步被解析成ast,递归entry里的步骤
 *  2.2 单一原则，关注输入和输出
 * 3. plugin架构
 *  3.1 webpack 打包过程暴露出多类型的钩子函数，包括初始化，构建，生成三个阶段
 *  3.2 钩子函数是基于tabpable，不止于一般的发布订阅逻辑，钩子函数拓展了同步，异步，循环和熔断场景
 *  3.3 插件是一个具有apply方法的class,关注 注册的钩子函数和阶段的compliation(webpack产物)
 * 4. 什么是runtime和manifest
 *    runtime: 在模块交互时，连接模块所需的加载和解析逻辑(调度，管理模块的逻辑)，webapck 打包生成的代码有很多处理特定场景的实现（自定义模块化处理commonjs,异步加载，缓存等）
 *    manifest：字面理解就是一系列文件组成的清单
 * 5. hmr 的实现
 * 6. 实际工程中webpack的打包优化
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
