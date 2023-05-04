/**
 * @description：带着目的阅读vue组件库
 * 1. https://www.naiveui.com/zh-CN/os-theme （naiveui 及周边）
 *
 */



/**
 * 1. 受控与非受控组件实现
 *   1.1 回顾一下组件输入与输出的绑定关系
 *   在vue2.x里v-model会编译成：value和@input ，对于自定义组件只要在绑定值变化时输出input事件即可
 *   value.sync会被编译成：value和 @update:value事件，类似于v-model,常见的结合计算属性实现双向绑定
 *   在vue3.x里出于api统一废弃value.sync，统一使用v-model,编译的结果有些差异，描述如下
 *      1. v-model会编译成：modelValue和update:modelValue（在html里表现为小横线：model-value），所以自定义组件内部需要做对应兼容
 *      2. v-model:abc会编译成：value=abc,@update:abc,类似于.sync
 *      3. v-model的修饰符（结合业务场景）
 *   2.1 什么受控与非受控：只监听变化，不可以赋值称为非受控
 *   对于不同的组件库表现不一样，value是undefined/null
 *  ========
 * 2. 模版语法还是jsx: https://cn.vuejs.org/guide/extras/render-function.html
 *    当dom结构高度灵活的时候，可以采用jsx,h函数
 * 3. sfc组件的定义是defineComponents还是<script setup>
 *    一般业务组件使用后者即可，编译时优化可以避免冗余写法
 *    而函数的写法 1. 类型检查增强 2. 返回值是一个组件构造函数
 *    两种写法的对比差异具体可以参考组件库
 * 4. 基于组件库封装业务组件时，如何保证可拓展的灵活性
 *    在实际处理业务逻辑中，只会定义常用的props，methods 在需要拓展的时候，用v-bind="$attrs", v-on="$listners",可以保证原来组件的功能
 * 5. 组件通信的设计经验
 *    组件通信方式较多，最终预期达到可维护，不重复，结构清晰，可拓展、
 * 6. 组件文件目录的设计格式
 *    组件单元测试
 *
 * 7. 组件库样式模块的管理设计
 *
 * 8. pnpm管理多子包，多子目录空间
 *
 * 9. 完整工作流设计
 *
 * 10.基于具体组件实现表单业务/列表业务
 *   10.1 可以抽离业务模版，新的业务增删改对应业务逻辑即可（需要基础业务组件支持）
 *   10.2 尝试部分低代码业务
 *   10.3 社区可用的重型表单，列表组件（核心是远离低水平重复）
 *
 *
 *
 *
 *
 *
 * 2. 业务组件实现分析
 *   2.1 轮播图
 *
 */
