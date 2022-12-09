### 表中的所有字段
```
SELECT * FROM table
SELECT id FROM table
```

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