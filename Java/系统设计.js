/**
 * 1. 如何设计权限系统
 *   1.1 用户注册：用户输入注册信息（如用户名、密码、手机号等），后端进行数据校验和存储，注册成功后返回注册结果。
 *      收集表单数据，其中密码加盐传输，写入用户表
 *      同步角色表，提供默认角色

     1.2 用户登录：用户输入登录信息（如用户名、密码、验证码等），后端进行身份验证和授权，登录成功后返回登录结果和访问令牌（如 JWT）。
        这里一般有两种形式 session和jwt
        session：服务端将用户凭证放在会话信息中,下一次请求客户端会在cookie中携带（劣势：例如跨站点脚本攻击（XSS）和跨站点请求伪造攻击（CSRF））
        现代 Web 应用通常使用 JSON Web Token（JWT）来管理用户的身份验证状态，而不是使用会话和 cookie，此时服务端会采用jwt校验token信息
        常用权限管理方案
      个人信息管理：用户可以查看和修改个人信息（如昵称、头像、地址等），后端进行数据查询和修改，返回修改结果。
      密码管理：用户可以修改密码，后端进行密码校验和修改，返回修改结果。
      安全设置：用户可以设置安全相关选项（如绑定手机号、设置密保问题等），后端进行数据存储和校验，返回设置结果。
      第三方登录：用户可以使用第三方账号（如微信、QQ、微博等）登录，后端进行第三方授权和数据存储，返回登录结果和访问令牌。
      以上是用户模块的一般流程，具体实现时需要考虑以下几个方面：
      1.1 数据库设计：需要设计用户表和相关的辅助表（如角色表、权限表等），并进行数据迁移和初始化。
      1.2 接口设计：需要设计用户模块的接口，包括注册接口、登录接口、个人信息接口等，需要考虑接口参数、返回值、异常处理等。
      1.3 身份验证和授权：需要使用身份验证和授权技术（如 Spring Security、JWT 等）实现用户身份验证和授权功能，保证用户只能访问其具有权限的资源和功能。
      1.4 数据校验和存储：需要对用户输入的数据进行校验和存储，保证数据的合法性和安全性。

第三方登录：需要使用第三方登录技术（如 OAuth2）实现第三方授权和数据存储，保证用户可以使用第三方账号登录。
 *
 *
 *
 *
 */

/**
 * 1. 开发领域内后端系统，该如何展开
 *    1.1 设计propmt：假如你是资深架构师，我是一名刚工作的软件工程师，我想
 *      实现一套电商领域的后端业务，应该包含哪些模块，请给出技术方案。注意：此时
 *      不要提供代码细节，方案最好以表格的形式给出
 *      ======》业务模块划分和技术方案结论如下：
        模块名称	功能描述	技术方案
        用户模块	用户注册、登录、个人信息管理等	Spring Boot、Spring Security、JWT、MySQL、Redis
        商品模块	商品分类、商品列表、商品详情、商品评价等	Spring Boot、MySQL、Elasticsearch
        订单模块	下单、支付、退款、订单查询等	Spring Boot、MySQL、Redis、RabbitMQ
        购物车模块	添加商品、修改商品、删除商品、结算等	Spring Boot、Redis
        物流模块	物流查询、物流跟踪、物流信息管理等	Spring Boot、MySQL、Redis
        优惠券模块	优惠券领取、优惠券使用、优惠券查询等	Spring Boot、MySQL、Redis
        活动模块	秒杀活动、促销活动、团购活动等	Spring Boot、MySQL、Redis、RabbitMQ
        数据统计模块	用户行为分析、商品销售分析、订单分析等	Spring Boot、MySQL、Elasticsearch、Kibana
 *
 *
 *
 */
