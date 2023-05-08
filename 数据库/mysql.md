### 登陆本地mysql服务器
1. 安装启动mysql
2. mac 上使用Sequel Pro 作为可视化数据库操作工具
3. 在Sequel Pro使用sql文件创建并初始化表结构 file-import
host： 127.0.0.1
port： 3306
username： root
password：  111111

### 有关数据库语句
1. 包括数据库连接、创建、修改、删除数据库和表等操作（基于可视化工具操作）

### SQL 语句和常用函数
1. 包括查询语句、更新语句、删除语句、子查询、聚合函数、分组等使用方法
   




### 表中的所有字段
```
SELECT * FROM table
SELECT id FROM table
```
#### mysql密码 
- fish123

### 提供列的别名
SELECT name, id, salary * 12 "year salary" FROM table
- 双引号


### 去除重复行
```
SELECT DISTINCT id FROM table
```
### 空值参与运算
- null 参与计算得到null, 本身不是0

### 着重号 ``
命名跟数据库关键词相同，使用着重号

### 查询常数
```
SELECT 123, id, name FROM table;
```
会填充默认值

### 显示表结构
DESCRIBE table

### 过滤数据
SELECT * FROM table WHERE id = 12

### 排序
- 无排序操作，按添加顺序返回
- 使用 ORDER BY xx ASC/DESC 对数据排序
```
SELECT 123, id, name 
FROM table
ORDER BY id ASC
```

### 分页
- LIMIT 实现分页 LIMIT a(偏移量), b（条目数）

### 分表查询
- 笛卡尔积错误,缺少多表连接条件
- 多表查询时，每个字段钱指明所在的表，此时可以给表提供别名
- 如果提供别名则必须使用，否则报错
- 如果存在n个表的查询，至少需要n-1个连接条件
- 等值/非等值连接，自连接/非自连接
- 内连接：合并有同一列两个以上的表的行数据，结果不包含不匹配的行
- 外连接：类似集合的交集部分，左外，右外，满外连接,一共有7种组合方式（理解7种的实现，实现JOIN UNION 的常见语法）
- 使用UNION关键词合并多查询结果，UNION ALL：重复部分不去重，查询效率比前者高
```
// 笛卡尔错误
SELECT id, name 
FROM table1, table2

// 连接条件
SELECT id, name 
FROM table1, table2
WHERE table1.id = table2.id

// SQL99语法实现内连接
SELECT name,id,city
FROM table1 t1 JOIN table2
ON t1.id = t2.id
JOIN table3 t3
ON t3.id = t2.id

// SQL99语法实现外连接
SELECT name,id,city
FROM table1 t1 LEFT JOIN table2
ON t1.id = t2.id
RIGHT JOIN table3 t3
ON t3.id = t2.id

```

### GROUP BY
- 根据属性对查询结果分类
- SELECT中出现在主函数的字段必须出现在GROUP BY，反之可以没有
```
SELECT name,id,AVG(year)
FROM table1
GROUP BY name,id
```

### HAVING
- 如果过滤条件出现主函数，需要使用HAVING替换WHERE
- 此时HAVING需要在GROUP BY 的后面
- 如果过滤条件没有出现主函数，尽量使用WHERE，效率更高
```
SELECT id,MAX(year)
FROM table
GROUP BY id
HAVING MAX(year) > 1000
```

### 小结SELECT99语法一般写法
- 明确一般SQL语句的书写顺讯
- 对应书写顺讯应该是怎样的执行顺序
- 执行从连表-过滤-分组-过滤-select-排序等流程
```
SELECT c1,c2,c3
FROM table1 LEFT JOIN table2
ON table1.id = table2.id
WHERE 不包含聚合函数的过滤条件
GROUP BY c1,c2
HAVING 包含聚合函数的过滤条件
ORDER BY
LIMIT
```

### 子查询
- 一段查询语句可以当类似变量条件
- 通常可以通过自连接实现

```
SELECT year,height
FROM table
WHERE (
    SELECT height
    FROM table
    WHERE year = 1000
    ) > height
```
### 常见问题总结
1. 请简述数据库中索引的作用及其类型，如何创建索引？
2. 请解释什么是数据库事务？请至少列举三种数据库隔离级别。
3. 如何优化 SQL 查询语句的性能？
4. 请简述表的范式（Normalization）和反范式（Denormalization）的概念及其区别。
5. 如何进行 MySQL 数据库的备份和恢复？备份的方法有哪些？
6. 请问如何避免 SQL 注入攻击？如何防范其他的数据安全问题？
7. SQL 分组查询中，HAVING 与 WHERE 的区别是什么？
8. 如何进行 MySQL 数据库的性能优化？请至少列举三种优化方式。
9. 如何创建 MySQL 数据库的用户和授权？
10. 如何进行 MySQL 数据库在线迁移及其原理？
