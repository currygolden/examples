/**
 * @description vue3 核心知识体系与工程物料
 * 1. vue3 文档 https://vuejs.org/ 及周边生态
 *  1.2 vueuse
 *  1.3. vite
 * 2. 技术方案选型 2.x 3.x 版本
 *  2.1 组合式api带来的逻辑可复用性，核心思想是从多个函数中得到的状态组合起来处理复杂问题
 *  2.2 更好的typescript支持
 *  2.3 组件开发对比(主要介绍3.x的组件开发)
 *    2.3.1 <script setup> 带来的改变
 *    2.3.2 自定义组件本身的输入输出设计
 *      在2.x里可以使用value.sync监听组件的输入输出，但是3.x里此api废弃主要是保持风格一致
 *      在3.x里统一使用v-model:myProp来做双向绑定，组件本身通过myProp获取值，通过监听update:myProp做输出
 *      如果没有参数比如v-model=“xxx”,实际会默认使用modelValue
 *      v-mode支持修饰符，支持参数+修饰符，这些都是编译的语法糖
 *  2.4 其它语法，api是否向3.x靠近
 *    2.4.1 本质上最核心的还是组件化设计的思想，以及代码组织结构，基建的完善性
 *    2.4.2 3.x更好的ts支持，升级3考虑到整体成本，本质上没有多大区别
 * 3. 在vue2.x里使用composition api,使用vueuse
 *    3.1 主要目的是在2.x的vue里使用setup，以及其它的composition api，典型的比如vueuse
 *    3.2 安装符合版本的依赖，Vue.use(composition)
 *    3.3 工具库基建（社区）+ 自身业务特征
 *
 *
 *
 */
