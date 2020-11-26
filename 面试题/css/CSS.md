##  CSS 中不同属性设置为百分比%时对应的计算基准

当前元素某CSS属性值 = 基准 * 对应的百分比

- `position: relative / absolute`时， `top/bottom.left/right`基准 **包含块**
- `position: fixed`时， `top/bottom.left/right`基准 **视口**
- 元素的 height 和 width 设置为百分比时，基准为包含块的 height 和 width
- 元素的 **margin 和 padding** 设置为百分比时，基准为**包含块的 width**
- 元素的 border-width，不支持百分比
- 元素的 line-height，基准为自身的 font-size
- 元素的 font-size，基准为父元素字体



## 实现一个宽高自适应的正方形

```css
/*1.第一种方式是利用vw来实现*/
.square {
  width: 10%;
  height: 10vw;
  background: tomato;
}

/*2.第二种方式是利用元素的margin/padding百分比是相对父元素width的性质来实现*/
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
  background: orange;
}

/*3.第三种方式是利用子元素的margin-top的值来实现的*/
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}

.square::after {
  content: '';
  display: block;
  margin-top: 100%;
}
```





## 常见的元素隐藏方式

- **overflow:hidden**
  - 用来隐藏元素溢出部分，占据空间，无法响应点击事件
- **opacity:0**
  - 用来设置元素透明度，当设置成0时就相当于隐藏元素
  - 元素依然存在原来的位置，占据空间也可响应事件
- **visibility:hidden**
  - 被隐藏的元素依然对网页布局起作用
  - 不会响应任何用户交互
-  **display:none**
  - 隐藏元素，渲染树不会包含该渲染对象
  - 元素不会在页面中占据位置，也不会响应绑定的监听事件

- **position**
  - 通过使用绝对定位将元素移除可视区域内，以此来实现元素的隐藏
-  **z-index**
  - 通过 z-index 负值，来使其他元素遮盖住该元素，以此来实现隐藏
- **clip/clip-path** 
  - 裁剪的方法来实现元素的隐藏
  - 元素仍在页面中占据位置，但是不会响应绑定的监听事件
- **transform:scale(0,0)**
  - 将元素缩放为 0
  - 元素仍在页面中占据位置，但是不会响应绑定的监听事件