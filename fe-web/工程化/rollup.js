/*
 * @Author: your name
 * @Date: 2022-04-15 17:48:10
 * @LastEditTime: 2022-06-13 21:54:57
 * @LastEditors: liyu38 liyu38@meituan.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /examples/fe-web/工程化/rollup.js
 * 主要参考就是官方文档
 */
/**
 * 1. 阅读rollup打包工具father-build，熟悉rollup工具，总结ts
 *   1.1 了解目录下的tsconfig.json
 *   1.2 father-build作为工具，命令集中在bin/，实际的命令逻辑都在lib&src
 *    1.2.1 新建types.d.ts 作为集中的类型声明文件（常见ts）
 *      type interface  interface a extends b
 *      约束配置，参数格式
 *      定义泛型数组
 *    1.2.2 获取打包设置参数
 *      入口文件
 *      根目录配置/用户配置参数/命令行覆盖参数
 *    1.2.3 babel
 *      获取babel 打包配置（输出产物兼容浏览器，api差异）
 *      一般用第三方包 会维护一个业务的选项类型（标准api+自定义参数）
 *      输出 兼容性的babel配置
 *      @babel/register 支持函数式的写法
 *      用户自定义配置见 configFileList 类似 vue.config.js
 *      使用scheme配置 + ajv 校验大的配置文件
 *    1.2.4 rollup 函数式打包配置
 *   1.3 汇总常用 node 包工具
 *    1.3.1 利用yParser 解析命令行参数
 *    1.3.2 利用 chalk 命令行颜色输出，且随机色
 *    1.3.3 ajv 作为json格式的校验工具
 *    1.3.4 update-notifier 判断是否有可更新/升级的包
 *    1.3.5 slash 处理window下的路径
 *
 *
 *
 *
 */
