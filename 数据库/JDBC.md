#### JDBC
- java Database connectivity
- 通用的SQL 数据库存取和操作的公共接口（一组api）,使用标准的方法，方便的访问不同数据库资源
- 相当于 java程序 -》JDBC -》JDBC驱动（具体数据库提供） -》 某数据库（包含特定JDBC驱动）
- 面向程序的api和面向数据的API
- JDBC与数据库模式的好处

#### 数据的持久化
- 将数据保存在可掉电设备中，往往应用到关系型数据库

#### java 程序连接数据库的多种方式
- 其中的一些重复流程类似三段论，可以封装成JDBCUtils
- 使用 PreparedStatement 进行数据库的CRUD
-
- 