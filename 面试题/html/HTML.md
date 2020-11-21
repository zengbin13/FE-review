## 网站开发中，如何实现图片的懒加载

> https://q.shanyue.tech/fe/html/1.html#%E6%96%B9%E6%A1%88%E4%B8%80

懒加载——在当前网页，滑动页面到能看到图片的时候再加载图片

**问题拆分：**

1. 如何判断图片出现在当前视口
2. 如何控制图片的加载

#### 方案一

**判断图片在当前视口**

- 使用 `clientTop，offsetTop，clientHeight、scrollTop` 等获取图片静态高度，监听 `window.scroll`事件获取动态高度

**控制图片加载**

- 设置一个临时属性 `data-src`，控制加载时使用 `src` 代替 `data-src`

  ```html
  <img data-src="shanyue.jpg">
  ```

#### 方案二

**判断图片在当前视口**

-  **`Element.getBoundingClientRect()` 方法返回元素的大小及其相对于视口的位置**

  ```js
  // clientHeight 代表当前视口的高度
  img.getBoundingClientRect().top < document.documentElement.clientHeight
  ```

**控制图片加载**

- 使用节流器，提高性能  `lodash.throttle`

```js
//加载可视区域图片
lazyLoad()
//页面滚动时，节流加载
document.addEventListener('scroll', _.throttle(lazyLoad, 1000))

function lazyLoad() {
    let imgs = [...document.querySelectorAll('.img')]
    imgs.forEach(item => {
        if (item.getBoundingClientRect().top < document.documentElement.clientHeight) {
            item.src = item.dataset.src
        }
    })
}
```

#### 方案三

- 利用高级特性Intersection Observer来判断元素是否可见
  - `entry.isIntersecting` 代表目标元素可见

```js
const observer = new IntersectionObserver((changes) => {
  // changes: 目标元素集合
  changes.forEach((change) => {
    // intersectionRatio
    if (change.isIntersecting) {
      const img = change.target
      img.src = img.dataset.src
      observer.unobserve(img)
    }
  })
})

observer.observe(img)
```

#### 方案四

```html
<img src="./images/img1.jpeg" loading='lazy'>
```



> ![image-20201121163330947](C:\Users\Administrator\Desktop\zengBin\面试题\html\HTML.assets\image-20201121163330947.png)





