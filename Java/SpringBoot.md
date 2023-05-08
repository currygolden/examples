#### 相关问题汇总
Spring Boot 的优点及自动配置原理等。

Spring Boot 中的 Web 开发相关问题，如 Spring MVC、RESTful API 设计等。

Spring Boot 中的数据库相关问题，如 JPA 的使用及多数据源配置等。

Spring Boot 中的缓存技术、消息队列等相关问题。

Spring Boot 中的部署及性能优化问题，如如何优化 Spring Boot 应用性能等。

Spring Boot 中的自动配置原理是什么？

如何在 Spring Boot 中集成 MyBatis 或 JPA？

Spring Boot 如何支持多数据源？

如何在 Spring Boot 中使用 Redis 缓存？

Spring Boot 中的 @RestController 和 @Controller 有什么区别？

Spring Boot 中的 HTTP GET 和 POST 方法有什么区别？

Spring Boot 如何解决跨域问题？

Spring Boot 中如何配置 Swagger 文档？

Spring Boot 如何监控应用的性能？

如何优化 Spring Boot 应用的性能？

如何在 Spring Boot 中实现请求过滤器？

Spring Boot 中的第三方日志框架有哪些？

如何实现 Spring Boot 的热部署功能？

如何在 Spring Boot 中处理文件上传？

如何在 Spring Boot 中集成 Spring Security 来实现认证和授权？


#### 依赖版本变化
- 2.x与3.x版本管理的差异，是统一管理还是自定义管理
- spring官方starter&自定义starter,类似于批量依赖管理
- 如何实现自动装配（编译时能力）
    - 自动添加依赖，配置所需要的能力
    - 默认主程序所在包目录及子目录自动组件扫描
    - 按需加载（一个starter里的包不会都使用）
- @configuration
    - 配置类@bean给ioc容器注册组件
    - 配置类本身也是组件
    - 外部调用配置类的方法，始终都是从容器中获取的实例（？）
    - proxyBeanMethod属性有什么用
- @import
    - 添加组件，自动调用类的无参构造器
- @conditional
- 如何实现debug模式，可以获取哪些信息
    - 装配是否生效

### 常见注解说明
1. @Configuration：告诉 Spring 这个类是一个配置类，需要被 Spring 容器扫描并处理其中的 Bean 定义
2. @AllArgsConstructor：处理class构造方法的声明，从而实现参数的自动装配（减少重复代码量），如果是public修饰符，且该类必须带有一个默认构造方法
   1. 如果是私有变量，需要定义setter/getter，这种大量重复工作由注解实现，此注解主要完善构造函数部分
   2. final修饰的变量不可修改
3. @PropertySource("classpath:admin.properties")： 从哪个路径加载属性，在初始赋值使用
4. @ConfigurationProperties：读取属性时配置属性的特征比如前缀等
5. @data：实现class属性的自定义拓展，可以生成setter/getter以及常见方法拓展



### 核心知识体系梳理
1. 什么是Spring Boot
   1. 基于 Spring 框架的快速开发脚手架，通过自动化配置来简化 Spring 应用的配置工作，开发者不需要手动配置每个组件的参数
   2. 自动化配置：
      1. 自动扫描和加载：启动时会自动扫描所有的 jar 包，一旦发现了某个 jar 包中的类实现了某个条件注解，Spring Boot 就会自动“调用”这个类实现对应的配置方法
      2. 条件判断：自动化配置使用条件注解来判断是否需要进行某种组件的自动配置
      3. 自动配置：当自动化配置触发之后，Spring Boot 会根据自动配置类中所定义的配置进行默认配置，同时，开发者可以通过特定的配置文件来引用或覆盖默认的自动化配置（例如 application.properties 文件中的设置），从而实现对自动化配置的修改或扩展。
      4. 要避免使用过多的依赖和组件，因为这会使得应用程序的启动和运行变得缓慢和不稳定
   3. 嵌入式容器：Spring Boot 包含嵌入式容器，可以让开发者在开发阶段轻松地启动和测试应用程序，并且可以方便地打包成可执行的 JAR 文件，部署到服务器上。
   4. 自动化依赖管理：Spring Boot 使用 Maven 或 Gradle 进行依赖管理，提供一系列 "Starter" 工具，可以简化依赖管理的工作，使开发者更专注于业务逻辑的实现。
   5. Spring Boot 应用的常见配置方式主要有两种：application.yml 和 application.properties。（应用级别的配置文件）
   6. @PropertySource 和 @ConfigurationProperties两种属性注入的方式
#### 有关mybatis
1. 实体层（entity）:看起来是描述数据库表结构，一张表对应一个实体（？）
2. DAO层：定义接口层，有哪些方式可以访问数据库（ DAO 层进行数据存储和查询等操作，操作数据库的地方）
    1. 在mybatis-plus框架里，DAO操作数据逻辑继承于基类和自定义实现
    2. 自定义实现可以是xxxDao.xml的文件，也可以在DAO文件里基于注解
3. service层：调用DAO的接口，处理一些业务逻辑（数据的整理，主要业务逻辑区域）
    1. 这里是具体描述业务逻辑的地方，是消费DAO的模块
    2. 一般会统一定义接口，然后提供实现类
4. controller层：接收客户端请求，处理客户端的响应
    4.1 根据接口，处理输入，输出，做好信息包裹


https://gitee.com/liner123/newgulimall （项目实践）
#### spring boot 常见问题
1. pom文件是如何做依赖管理的 
2. 在项目里常见的pom配置项用到的有哪些
3. 主函数入口提供了哪些信息
    3.1 根据pom配置框架自动装配了很多组件到ioc容器
4. 如何实现主程序及其子目录实现包结构扫描，自动读取所有组件
    4.1 支持配置扫描路径
5. 如何实现按需加载各种配置项
6. 常见底层注解有哪些，使用场景是什么
    6.1 @configuration：告诉boot这是一个配置类，在配置类里如下使用注解
        @Bean: 往容器中添加组件，是单实例
        配置类本身也是组件
        proxyBeanMethods参数有什么用？什么是full,lite模式
    6.2 @import：往容器中添加组件，区别是名称是全路径
