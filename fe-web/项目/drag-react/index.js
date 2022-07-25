/*
 * @Author: liyu liyu38@meituan.com
 * @Date: 2022-07-22 10:52:47
 * @LastEditors: liyu liyu38@meituan.com
 * @LastEditTime: 2022-07-22 15:27:11
 * @FilePath: /examples/fe-web/项目/drag-react/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/**
 * @description 从0实现移动端拖拽，以下是feature拆分
 * 1: 应用首页
 *    1.1 layout组件，样式管理方案
 *    1.2 登陆表单（没有设计权限系统）
 * 2: 编辑页
 *    2.1 用 react-dnd 实现了拖拽容器区
 *    2.2 左侧的组件列表区域
 *      2.2.1 懒加载组件配合 React.Suspense 做具体节点的loading状态
 *
 */
