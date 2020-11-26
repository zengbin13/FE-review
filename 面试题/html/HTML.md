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



## 扫描二维码登录网页是什么原理

> https://juejin.cn/post/6844904111398191117

> 移动端基于 token 的认证机制
>
> ![image-20201124173240616](C:\Users\Administrator\Desktop\zengBin\面试题\html\HTML.assets\image-20201124173240616.png)

**二维码扫码登录的流程图**

![image-20201124173528207](C:\Users\Administrator\Desktop\zengBin\面试题\html\HTML.assets\image-20201124173528207.png)

- 扫码登录可以分为三个阶段：**待扫描、已扫描待确认、已确认**

**待扫描（1-5）**

1. PC 端携带**设备信息**向服务端发起生成二维码请求，服务端会生成唯一的**二维码 ID（UUID）**
2. PC 端将二维码ID以二维码的形式展示，并启动定时器**轮询查询二维码的状态**
3. 若移动端未扫描，一段时间后二维码将失效

**已扫描待确认阶段（6-10）**

> 手机扫码后，PC 端的二维码状态变成已扫码，请在手机端确认

1. 移动端扫描二维码，获取二维码 ID，**将手机端登录的信息凭证（token）和 二维码 ID 作为参数发送给服务端**
2. 服务端接受请求后，将 token 与二维码 ID 关联 ，**并生成一次性 token返回给移动端**
3. PC 端轮询到二维码的状态已变化，将 PC 端的二维码更新为已扫描

**已确认（11-15）**

1. 移动端携带临时 token ，确认登录
2. **服务端校对完成后，更新二维码状态 并给 PC 端生成一个正式的 token**



## Chrome 中的 Waterfall 

> https://blog.csdn.net/csdn_girl/article/details/54911632
>
> https://blog.csdn.net/carian_violet/article/details/84954360

**瀑布中各项内容的含义**

<img src="C:\Users\Administrator\Desktop\zengBin\面试题\html\HTML.assets\image-20201125114557718.png" alt="image-20201125114557718" style="zoom:80%;" />

- **排队 / Queueing**： 以下情况，浏览器会把当前请求放入队列中进行排队
  - 有**更高优先级**的请求时
  - 和目标服务器已经建立了**6个TCP链接**（最多6个，适用于HTTP / 1.0和HTTP / 1.1）  
  - 浏览器正在硬盘缓存上简单的分配空间   

- **停滞 / Stalled**：  请求会因为上面的任一个原因而阻塞
- **DNS查询 / DNS Lookup：**浏览器正在解析IP地址
- **初始连接 / Initial Connection** - 在浏览器发送请求之前, 必须建立TCP连接.
  - 该过程仅仅发生在瀑布图中的开头几行, 否则导致性能问题
- **SSL / TLS协商**：若页面是通过SSL / TLS等安全协议加载资源，这段时间就是浏览器建立安全连接的过程
  - 目前谷歌将HTTPS作为其搜索排名因素之一，SSL / TLS协商的使用越来越普遍
- **Request sent**. The request is being sent.
- **Waiting (TTFB)**. 浏览器等待响应第一个字节到达的时间. 包含来回的延迟时间和服务器准备响应的时间.
- **Content Download**. The browser is receiving the response.



**性能优化**

- **减少所有资源的加载时间.** 亦即减小瀑布图的宽度. 瀑布图越窄, 网站的访问速度越快
- **减少请求数量** 也就是降低瀑布图的高度. 瀑布图越矮越好
- 通过优化资源请求顺序来加快渲染时间，将**开始渲染线**向左移

- **Time To First Byte (TTFB)** -
  - TTFB 是浏览器请求发送到服务器的时间+服务器处理请求时间+响应报文的第一字节到达浏览器的时间.
  - 用来判断你的web服务器是否性能不够, 或者说你是否需要使用CDN.





## 如何实现浏览器内多个标签页之间的通信

> https://segmentfault.com/a/1190000011538416