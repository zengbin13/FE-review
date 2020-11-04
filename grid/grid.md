## 容器属性

```css
.container {
    display: grid / inline-grid;
}
// 设置网格布局
```

- 设置网格布局后， 不能使用 `float` `displya: inline-block` `display:table-cell` `vertical-align` `column-*`



```css
.container {
    grid-template-columns: 100px 100px 100px;
	grid-template-rows: 100px 100px 100px;
}
// grid-template-columns 定义每一列的列宽
// grid-template-rows 定义每一行的行高
```

- **绝对单位**： `grid-template-columns: 100px 50px 100px`
- **百分比**：`grid-template-rows: 33.33% 33.33% 33.33%`
- **repeat()函数**
  - 构造重复值
  - `grid-template-rows: repeat(3, 100px)`
  - 重复某种模式： `grid-template-rows: repeat(2, 100px 20px 30px)`
- **auto-fill关键字**
  - 容器大小不确定，单元格大小确定，auto-fill 让每一个行放入尽可能多的单元格
  - `grid-template-columns: repeat(auto-fill, 100px)`
- **fr 关键字**
  - 表示比例关系
  - `grid-template-columns: 1fr 1fr`
  - `grid-template-columns: 1fr 2fr 100px`
- **minmax()函数**
  - 表示函数在长度范围的区间
  - `grid-template-columns: 1fr 1fr minmax(100px, 1fr)`
- **auto 关键字**
  - 由浏览器决定长度
  - `grid-template-columns: 100px auto 100px`
- **网格线的名称**
  - 使用方括号指定每根网格线的名字
  - 网格布局允许同一根线具有多个名字
  - ` grid-template-columns: [c1] 100px [c2] 100px [c3] auto [c4];`



```css
.container {
    grid-row-gap: 20px;
    grid-column-gap: 20px;
} 
// grid-row-gap 设置行间距
// grid-column-gap 设置列间距
// grid-gap: <grid-row-gap> <grid-column-gap>;
// 将中间的网格线设置宽度
```

- `grid-gap`属性是`grid-column-gap`和`grid-row-gap`的合并简写形式
- `grid-gap`省略了第二个值,将行间距和列间距设置相同
- 上述三个属性可省略 `grid-`



```css
.container {
    grid-template-areas: 'a b c'
        				 'd e f'
        				 'g h i';
        
} 
.container {
    grid-template-areas: "header header header"
                         "main main sidebar"
                         "footer footer footer"
        
} 
```

![image-20201027192604067](C:\Users\Administrator\Desktop\zengBin\grid\grid.assets\image-20201027192604067.png)

- 允许指定"区域"（area），一个区域由单个或多个单元格组成
- 某些区域不需要利用，则使用"点"（`.`）表示
- 区域的起始网格线，自动命名为`区域名-start`，终止网格线自动命名为`区域名-end`



```css
.container {
    grid-auto-flow: column;
}
// 决定子项目的排列顺序  默认值row  即 '先行后列'
```

![image-20201027193329118](C:\Users\Administrator\Desktop\zengBin\grid\grid.assets\image-20201027193329118.png)

- `row dense`  表示"先行后列"，并尽可能填满
- `column dense`  表示"先列后行"，并尽可能填满

<img src="C:\Users\Administrator\Desktop\zengBin\grid\grid.assets\image-20201027193822802.png" alt="image-20201027193822802" style="zoom:67%;" />

<img src="C:\Users\Administrator\Desktop\zengBin\grid\grid.assets\image-20201027193845298.png" alt="image-20201027193845298" style="zoom:67%;" />

```
.container {
	justify-items: center;
	align-items: center;
	// palce-items: center center;
}
// justify-items属性设置单元格内容的水平位置（左中右）
// align-items属性设置单元格内容的垂直位置（上中下）
// place-items属性是align-items属性和justify-items属性的合并简写形
```

![image-20201027194314094](C:\Users\Administrator\Desktop\zengBin\grid\grid.assets\image-20201027194314094.png)

- 取值 `start` `center` `end` `stretch`
- `place-items: <align-items> <justify-items>;`



```
.container {
	width: 90vw;
	height: 500px;
	
	display:grid;
	justify-content: center;
	align-content: center;
	// palce-content: center center;
}
// justify-content属性是整个内容区域在容器里面的水平位置（左中右）
// align-content属性是整个内容区域的垂直位置（上中下）
// place-content属性是align-content属性和justify-content属性的合并简写
```

- 取值： start | end | center | stretch | space-around | space-between | space-evenly

![image-20201028184704539](C:\Users\Administrator\Desktop\zengBin\grid\grid.assets\image-20201028184704539.png)



```css
.container {
	grid-auto-columns: 200px;
    grid-auto-rows: 50px;
}
//设置浏览器主动创建多余的网格的列宽和行高
```

- 由于指定单元格的网格线，而创建出多余的网格



## 项目属性

```css
.item1 {
	grid-column-start: 1; 左边框所在的垂直网格线
    grid-column-end: 3; 右边框所在的垂直网格线
    grid-row-strat: 1; 上边框所在的水平网格线
    grid-row-end: 3; 下边框所在的水平网格线
}
```

- 可以指定网格线名字 ` grid-column-start: header-start;`
- 使用`span`关键字，表示"跨越" ` grid-column-start: span 2;`



```
.item1 {
	grid-column: 1 / 3;
  	grid-row: 1 / 2;
}
```

- `grid-column: <start-line> / <end-line>;`
- `grid-row: <start-line> / <end-line>;`



```
.item-1 {
  grid-area: e;
}
```

- `grid-area`属性指定项目放在哪一个区域



```
.item {
  justify-self: start | end | center | stretch;
  align-self: start | end | center | stretch;
}
```

- 单独指定设置单元格内容的位置

![image-20201029184444567](C:\Users\Administrator\Desktop\zengBin\grid\grid.assets\image-20201029184444567.png)

