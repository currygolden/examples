/**
 * @description 参考阅读资料
 * 1. https://www.nodejs.red/#/nodejs/base/what-is-nodejs
 * 2. https://www.bookstack.cn/read/Nodejs-Roadmap/_coverpage.md
 */



/**
 * @description 项目实践
 * 1. https://github.com/Imfdj/egg-beehive/blob/main/README.md
 *
 */






/**
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
 * 1. koa与express差异，如何理解koa的洋葱圈模型
 *
 */
