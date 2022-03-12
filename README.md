# simple-filter-multiple-conditions

### 简易多条件筛选功能思路：

过滤器：filter

筛选前的数组：array

筛选后的数组：filteredArray

1. 条件对象（每一个条件都被抽象为一个对象，并且具备两个属性）
    1. 属性1 - type：条件所属类型
    2. 属性2 - text：条件内容
2. 判断并处理选中的条件（只针对同类型单选的情况）
    1. 过滤器中存在同类型同内容的条件 → 清除该条件
    2. 过滤器中存在同类型不同内容的条件 → 用新条件替换
    3. 其他情况 → 添加新条件（push）
3. 遍历过滤器，生成筛选后的数组
    
    ```jsx
    let filteredArray = array;
    filter.forEach(item => {
        if (item.type) {
          filteredArray = filteredArray.filter(array => array[item.type] === item.text);
        }
    });
    ```
    
4. 渲染经过筛选后的数组
