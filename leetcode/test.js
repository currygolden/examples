/**
 * 题目总结
 *  1. 双指针
 *    1.1 数组，链表的遍历
 *    1.2 快慢，三个方向的指针
 *  2. 滑动窗口
 *    1.1 连续序列的最值
 *    1.2 模版写法：
 *      1.2.1 定义窗口左右边界，定义窗口区间
 *      1.2.2 右窗口先行，找到边界
 *      1.2.3 while条件，左边界移动，找到符合条件的区间
 *      1.2.4 一直滑动到结束
 *  3. 回溯算法
 *    3.1 实际是一种递归的DFS，模版写法如下
 *    3.2 定义递归函数，参数是已选序列-currentChoice,待选择列表-choiceList
 *      3.2.1 满足条件，收集结果，退出当前流程
 *      3.2.1 找到迭代条件，满足下一次的已选序列和待选择列表
 *  4. DFS&BFS
 *  9. 排序算法
 *
 *  5. 队列和栈
 *    5.1 典型题目就是 2个队列实现栈和2个栈实现队列，属于会者不难的题型
 *  6. 链表
 *    6.1 简单链表的数据结构
 *    6.2 链表的常见题型
 *  7. 二叉树
 *    7.1 递归和BFS等常见思路，二叉树的常用模版如下
 *    7.2 能否找到递归条件
 *    7.3 当前问题等于什么样的子问题
 *  8. 动态规划
 *    8.1 求最值场景
 */

/**
 * 停车场打开摄像头数量
 * m,n,p: 停车场行列，实际停车数组
 * 考查：遍历二维数组，动作抽象
 */
function countMinMonitors(m, n, parkingLot) {
  // 定义m*n停车场
  const allParingLot = Array.from({length: m}, () => { Array(n).fill(false)})

  // 定义上下左右卡标
  const moveDirectionList = [
    [-1, 0], // 上
    [1, 0], // 下
    [0, -1], // 左
    [0, 1] // 右
  ]

  // 思路：遍历停车场，打开符合要求位置的摄像头
  for (let i = 0; i < parkingLot.length; i++) {
    for (let j = 0; j < parkingLot[0].length; j++) {
      if (parkingLot[i][j] === 1) {
        allParingLot[i][j] = true
      }

      for (const [dx, dy] of moveDirectionList) {
        const x = i + dx
        const y = j + dy
        if (x >= 0 && x < m && y >= 0 && y < n) {
          allParingLot[x][y] = true
        }
      }
    }
  }
}

/**
 * 二维数组找到每一列的最大值
 * matrix: 输入矩阵
 * 考查：如何按照业务实际，按先列后行遍历二维数组
 * 实现：先操作列，后操作行
 */

function getCloumnBig(matrix) {
  if (!matrix || !matrix.length) return null
  const column = matrix[0] && matrix[0].length
  const res = []
  for (let i = 0; i < column; i++) {
    let max = 0
    for (let j = 0; j < matrix.length ; j++) {
      // 感觉这里最核心的是访问方式，这样写就是按列访问
      max = matrix[j][i] > max ? matrix[j][i] : max
    }
    res.push(matrix[j][i])
  }
}

/**
 * @description 每隔一秒1扩散，求最终非1数据
 * 思路：类似打开摄像头题目，但是具体区别在于
 * 1. 如何自己处理输入，输出
 * 2. 还是遍历二维数组，但是每隔一秒执行经过足够长时间停下来该如何实现
 *  2.1 自执行，设置flag
 *
 */

function getSimulationCount(matrix) {
  const moveDirectionList = [
    [-1,0],
    [1,0],
    [0,-1],
    [0,1]
  ]

  const row = matrix.length
  const column = matrix[0].length
  while(true) {
    // 定义flag
    let updated = false
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < column; j++) {
        if (matrix[i][j] === 1) {
          for (const [dx, dy] of moveDirectionList) {
            const x = i + dx
            const y = j + dy
            if (x >=0 && x < row && y >=0 && y < column && matrix[i][j] === 0) {
              matrix[i][j] === 1
              updated = true
            }
          }
        }
      }
    }
    // 如果单次遍历结束都没有修改，则认为经过足够长时间
    if (!updated) break
  }

}


