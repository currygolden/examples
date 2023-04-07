/**
 * @description 参考阅读资料
 * 1. https://www.nodejs.red/#/nodejs/base/what-is-nodejs
 * 2. https://www.bookstack.cn/read/Nodejs-Roadmap/_coverpage.md
 * 3. http://doc.ssr-fc.com/ （ssr node 一体化方案）
 * 4. https://midwayjs.org/docs/serverless/migrate_koa （midway node 全栈方案）
 */



/**
 * @description 项目实践
 * 1. https://github.com/Imfdj/egg-beehive/blob/main/README.md
 *
 */






/**
 * 拆解egg-beehive项目
 * @description:数据库设计
 * 1. 在开始具体的curd业务之前，先要准备数据
 *   1.1 使用mysql初始化数据库，提供sql建立表结构
 *   1.2 在egg-Sequelize背景下完善数据库初始化
 *   1.3 借助工具实现CURD MVC的工程模版（一般业务尝试多了都比较类似）
 *   1.4 主要是熟悉egg框架和周围生态，属于实践操作的部分，遇到了具体去练就可以
 * 2. 业务场景分析，具体接口设计
 *    2.1 user表
 *      2.1.1 按关键词查询全部用户（模糊搜索，分页匹配）
 *      2.1.2 按id查询用户
 *    2.2 权限体系
 *      2.2.1 用户注册 邮箱/手机号-验证码 - 创建用户数据
 *        2.2.1.1 配合第三方服务如邮箱，验证码
 *        2.2.1.2 支持第三方如 github 登陆/sso登陆等
 *        2.2.1.3 密码在交互过程中需要加解密
 *        2.2.1.4 logout处理token或session,有一层redis缓存用户信息
 *        2.2.1.5 权限体系借助网关，中间件
 *
 */



/**
 * @description node核心问题
 * 参考：https://juejin.cn/user/1415826704971918
 * 1. koa与express差异，如何理解koa的洋葱圈模型，解析koa库
 *    1.1 现象：洋葱圈模型是指每一个中间件会执行两次，通过next调整函数控制权，让前面的中间件可以使用后面的数据
 *    1.2 compose函数接收中间件数组，开始调用执行第一个中间件，参数是context和第二个调用，将第二个调用作为next传入
 *    1.3 核心：通过手动调用next,调整函数执行权到下一个中间件，此时涉及函数执行栈和异步队列
 *        1.3.1 如果是同步代码，不依赖后续中间件的逻辑，可以在next之前执行
 *        1.3.2 如果有异步逻辑，next本身也是异步，就会有当前事件循环里的异步队列
 *        1.3.3 当中间件和next逻辑执行完，此时函数出栈，按照栈顺序执行next后的逻辑，如果有异步逻辑，同样按异步队列顺序执行
 *        1.3.4 边界场景兼容
 *    1.4 以单元测试和工程体系分析koa,输出思维导图
 * 2. node.js特性
 *    2.1 Javascript 在服务端的运行环境，构建在 chrome 的 V8 引擎之上，基于事件驱动、非阻塞I/O模型，适合于 I/O 密集型的应用场景，高并发应用场景，不适用大量计算，CPU 耗时的操作
 *    2.2 在多核 CPU 系统之上，可以用过 child_process.fork 开启多个进程
 *    2.3 Javascript 是单线程，但是做为宿主环境的 Node.js 并非是单线程的
 */
