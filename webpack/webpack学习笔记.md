# webpack 学习笔记

## 一、webpack概述

**webpack** 是一个用于应用程序的**前端资源构建工具**和**静态模块打包工具**

- 资源构建工具

  - 浏览器不支持处理 `ES6`语法 、`TypeScript` 和 `less` 、`scss` 等内容，需要多种工具转换，分别维护麻烦费事
  - **构建工具**——将多种转换工具集成，把源代码转换成发布到线上的可执行`HTML`、 `CSS`、 `JavaScript`代码

- 静态模块打包

  - 入口文件中引入各种资源，形成依赖关系图；
  - 根究依赖关系图将资源按照先后顺序引入，形成 `chunk `（代码块）;
  - 将代码块进行各项操作（打包），如`less`到 `css`
  - 将打包后的资源( `bundle`)输出

  > webpack 将前端的所有资源文件(js/json/css/img/less/...)作为模块处理
  >
  > 它将根据内部构建一个依赖图进行静态分析，打包生成对应的静态资源(bundle)

  ![1592060494435](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592060494435.png)

  

## 二、webpack核心概念

**入口(entry)**

- 指示 `webpack` 以哪个文件为入口起点开始打包，分析构建内部依赖图

- 默认值是 `./src/index.js`

  ```js
  module.exports = {
    entry: './path/to/my/entry/file.js'
  };
  ```

**输出(output)**

- 指示 `webpack` 打包后的资源 `bundle` 输出的位置，以及如何命名
- 默认值是 `./dist/main.js`，其他生成文件默认放置在 `./dist` 文件夹中

```js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  }
};
```

**loader**

- webpack 只能理解 JavaScript 和 JSON 文件

- 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块

- **loader** 两个属性

  - `test` 属性，识别出哪些文件会被转换
  - `use` 属性，定义出在进行转换时，应该使用哪个 loader

  ```js
  module.exports = {
    module: {
      rules: [
        { test: /\.txt$/, use: 'raw-loader' }
      ]
    }
  };
  ```

**插件(plugin)**

- 插件用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量

- 使用插件

  - 需要 `require()` 获取，然后把它添加到 `plugins` 数组中
  - 多数插件可以通过选项(option)自定义
  - 也可以通过使用 `new` 操作符来创建一个插件实例，多次使用同一个插件

  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin'); 
  // 为应用程序生成HTML文件，并自动注入所有生成的 bundle
  const webpack = require('webpack'); 
  // 用于访问内置插件
  
  module.exports = {
    module: {
      rules: [
        { test: /\.txt$/, use: 'raw-loader' }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({template: './src/index.html'})
    ]
  };
  ```

**模式(mode)**

- 指示 webpack 使用相应模式的配置
-  `mode` 参数 `development`, `production` 或 `none` 

![1592062770825](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592062770825.png)



## 三、webpack 简单使用

### (一)简单使用

```shell
npm init -y //初始化
npm i webpack wepack-cli -g //全局安装
npm i webpack wepack-cli -D //本地安装
```

**文件目录结构**

![1592063459220](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592063459220.png)

```shell
//运行指令
webpack ./src/index.js -o ./dist/main.js --mode=development //开发环境
webpack ./src/index.js -o ./dist/main.js --mode=production //生产环境
```

**打包构建结果**

![1592063670856](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592063670856.png)

——生产环境 `./dist/main.js`将会被压缩

**运行打包文件**

```shell
node ./dist/main.js
```

### (二)其他测试

**入口文件导入其他资源**

```js
//入口文件
//webpack使用 处理js资源 成功
function add(x, y) {
  return x + y;
}
console.log(add(2, 3));

//webpack使用 处理json资源 成功
import data from './data.json';
console.log(data);

//webpack使用 处理css资源等其他 打包失败
import './index.css';
```

![1592064391641](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592064391641.png)

- **存在问题**
  - 不能编译打包 css、img 等文件
  - 不能将 js 的 es6 基本语法转化为 es5 以下语法



## 四、webpack 开发环境的基本配置

### (一)创建配置文件

- 创建文件 `webpack.config.js`

- 配置内容

  -  webpack 遵循 CommonJS 模块规范
  - use 数组中 loader 执行顺序：从右到左、从下到上、依次执行

  ```js
  const path = require('path'); // node 内置核心模块，用来处理路径问题
  module.exports = {
    entry: './src/index.js', //入口文件
    output: {
      path: path.resolve(__dirname, 'dist'), //输出文件路径
      filename: 'main.js', //输出文件名
    },
    //loader配置
    module: {
      //文件匹配规则
      rules: [
        { test: /\.txt$/, use: 'raw-loader' }
      ],
    //plugins配置
    plugins: [
      //
    ],
    //模式
    mode: 'development',
  };
  ```

- 运行指令: `webpack`

### (二)打包样式资源

- 下载对应loader

  ```shell
  npm i style-loader css-loader
  ```

- 配置文件——文件匹配规则

  - `css-loader`: 将css文件变成commonjs模块加载到js中,内容是样式字符串
  - `style-loader`:创建style标签，将js中的样式资源插入，添加到head中生效

  ```js
   module: {
      //文件匹配规则
      rules: [
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }
      ]
    }
  ```

- 样式生效

  ![1592102217705](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592102217705.png)

  ![1592102875017](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592102875017.png)

> 处理less资源 需要下载 less-loader 和 less

### (三)**打包** **HTML** **资源** 

- 创建html文件

  ![1592103171879](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592103171879.png)

- 使用 plugin 处理html资源

  - 下载 `html-webpack-plugin`

    ```shell
    npm i html-webpack-plugin -D
    ```

  - 引入 `html-webpack-plugin`

    ```js
    //webpack.config.js
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    ```

- 修改配置文件—— plugin 

  ```js
  plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      })
  ]
  ```

  - `html-webpack-plugin`作用
    - 默认会创建一个空的 HTML，自动引入打包输出的所有资源（JS/CSS）
    - 生成创建html入口文件，配置**N**个`html-webpack-plugin`可以生成**N**个页面入口

- 运行指令: `webpack`

### (四)打包图片资源 

- 创建文件

  ![1592203202864](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592203202864.png)

- 下载安装 loader 包 

  ```shell
  npm install url-loader file-loader --save-dev
  ```

- 修改配置文件

  ```js
  //支持样式中使用背景图片
  rules: [
    {
      test: /\.(jpg|png|gif)$/,
      //使用url-loader还需要安装file-loader
      loader: 'url-loader',
      options: {
        //图片小于8kb 进行base64处理
        limit: 8 * 1024
        //关闭 url-loader 的 es6 模块化，使用 commonjs 解析
        esModule: false,
        //[hash:10]图片hash值前10位  [ext]取文件原来扩展名
        name: '[hash:10].[ext]',
      }
    }
  ]
  ```

  - **base64**
    - 优点：减少请求数量，用于缓解服务器压力
    - 缺点：图片体积增加，文件请求速度变慢
  - 默认不能处理html中直接使用图片

  ```shell
  npm install html-loader --save-dev
  ```

  ```js
  {
      test: /\.html$/,
      loader: 'html-loader',
  }
  ```

  - `html-loader`——**用于处理html文件的img图片**，负责引入图片让 `url-loader`处理

- 运行指令: `webpack`

### (五)打包其他资源 

```js
  {
    // 排除 css/js/html 资源
    exclude: /\.(css|js|html|less)$/,
    loader: 'file-loader',
    options: { name: '[hash:10].[ext]' },
  },
```



## 五、webpack devServer

- webpack-dev-server 能够用于快速开发应用程序
  - 功能：自动化编译、自动化打开浏览器、自动化刷新浏览器
  - 特点：只会在内存中编译打包，不会有任何输出
  - 安装包： `npm install webpack-dev-server -D`
  - 启动指令： `npx webpack-dev-server`  

```js
//开发服务器配置
devServer: {
    //告诉服务器从哪里提供内容。提供静态文件时才需要
    contentBase: path.resolve(__dirname, 'dist'),
    //启动gzip压缩
    compress: true,
    //端口号
    port: 3000,
    //自动打开默认浏览器
    open: true,
    //代理某些 URL,用于同域名下发送 API 请求
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
      },
    }
},
```

<img src="C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592467943083.png" alt="1592467943083" style="zoom:67%;" />

<img src="C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592468343973.png" alt="1592468343973" style="zoom:67%;" />



## 六、webpack 开发环境的配置

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', 
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'main.js', 
  },
  module: {
    rules: [
      //处理css资源
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      //处理less资源
      { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
      //处理图片资源
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
  }
}
```

### (一)打包文件的分类

![1592473086674](C:\Users\yu13\AppData\Roaming\Typora\typora-user-images\1592473086674.png)

```js
entry: './src/js/index.js', //入口文件
output: {
    path: path.resolve(__dirname, 'dist'), //输出文件路径
    filename: 'js/main.js', //输出文件名
},
    ...
{
    test: /\.(jpg|png|gif)$/,
    loader: 'url-loader',
    options: {
    limit: 8 * 1024,
    name: '[hash:10].[ext]',
    outputPath: 'img',
}
```

## 七、webpack 生产环境的配置

### (一)抽离css文件

```shell
npm install mini-css-extract-plugin -D
```

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
	...
	
{
    test: /\.css$/,
    use: [
      // style-loader 创建 style 标签，将样式放入 
      //取代 style-loader 提取 js 中的 css 成单独文件
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../', 
          //CSS中引用的图片前添加公共路径
        },
      },
      // 将 css 文件整合到 js 文件中
      'css-loader',
    ]
}
  	...
plugins: [
    new MiniCssExtractPlugin({
        // 对输出的 css 文件进行重命名
        filename: 'css/index.css',
    }),
],
```



### (二)CSS兼容性处理

- CSS兼容性处理使用postcss 
  - `posrcss-loader` 
  - `postcss-preset-env`——帮助postcss找到package.json中browerslist里面的配置，通过配置加载指定的CSS兼容性

```shell
npm install --save-dev postcss-loader postcss-preset-env
```

```js
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          ident: 'postcss',
          plugins: () => [
            require('postcss-preset-env')(),
          ],
        },
      },
    ]
  }
```

```json
//package.json
"browserslist": { 
    //开发环境设置node环境变量 process.env.NODE_ENV = "development"
    "development":
      [ 
        "last 1 chrome version", 
        "last 1 firefox version",
        "last 1 safari version" 
      ],
    "production":
      [ 
        ">0.2%",
        "not dead", 
        "not op_mini all" 
      ]
  }
```



### (三)压缩CSS

```shell
npm install --save-dev optimize-css-assets-webpack-plugin
```

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' )
	...
// 压缩 css 
new OptimizeCssAssetsWebpackPlugin()
```

### (四)JS语法检查

- 检查目标：只检查自己写的源代码，第三方的库是不用检查的
- 设置检查规则：package.json中eslintConfig中设置

```shell
npm install --save-dev eslint-loader eslint
```

```js
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader',
    options: {
      // 自动修复eslint的错误
      fix: true
    }
  }
```

- **设置检查规则**

```shell
npm install --save-dev  eslint eslint-config-airbnb-base eslint-plugin-import
```

```json
 "eslintConfig": {
    "extends": "airbnb-base"
  }
```

- eslint忽略警告

```js
//eslint-disable-next-line
console.log('出现eslint警告')
```



### (五)JS兼容性处理

JS文件中使用ES6及其以上的语法，而webpack的默认配置不会对ES6进行转义 而为让如IE浏览器等低版本浏览器可以执行，使用**babel**对JS代码进行兼容性处理

```shell
npm install -D babel-loader @babel/core @babel/preset-env
```

**JS兼容处理规则**

- @babel/preset-env

  - 只能转换基本语法，如promise不能转换

  ```js
  //webpack.config.js
  {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      },
    }
  ```

- @babel/polyfill

  - 处理全部兼容性问题，代码体积较大 400Kb

  ```shell
  npm i @babel/polyfill -D
  ```

  ```js
  //index.js
  import "@babel/polyfill"
  ```

- core-js 

  - 按需加载兼容问题处理方案

  ```shell
  npm i core-js -D
  ```

  ```js
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        // 预设：指示babel做怎么样的兼容性处理
        presets: [
          [
            '@babel/preset-env',
            {
              // 按需加载
              useBuiltIns: 'usage',
              // 指定core-js版本
              corejs: {
                version: 3
              },
              // 指定兼容性做到哪个版本浏览器
              targets: {
                chrome: '60',
                firefox: '60',
                ie: '9',
                safari: '10',
                edge: '17'
              }
            }
          ]
        ]
      }
    }
  ```

### (六)JS和html压缩处理

生产环境下自动压缩JS代码

```js
plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true
      }
    })
],
mode: 'production'
```



## 八、webpack 性能优化

开发环境性能优化

- 优化打包构建速度
- 优化代码调试

生产环境性能优化

- 优化打包构建速度
- 优化代码运行性能



### (一)热模块替换 HMR

HMR (hot module replacement) 某个模块发送变化，只会重新打包这个模块，而不是全部模块重新打包，提升代码构建速度

```js
devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
    hot: true //启动热更新
}
```

修改webpack的配置，需要重新启动 `webpack-dev-server`服务

- html文件

  - 默认不能使用热更新，但是只有一个html模块，因此，不需要HMR

  ```js
  entry: ['./src/index.js', './src/index.html']
  ```

- css文件

  - 可以使用热更新，`style-loader`内部实现

- js文件

  - 默认不能使用热更新，需要修改js代码，添加支持HMR功能的代码
  - 注意：HMR功能对js的处理，只能处理非入口js文件的其他文件



### (二)source-map

一种提供源代码到构建后代码映射的技术，如果构建后代码出错，可以通过映射追踪到源代码错误

```js
devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    open: true,
    hot: true //启动热更新
}
devtool: "source-map"
```

```
source-map：外部
  错误代码准确信息 和 源代码的错误位置
inline-source-map：内联
  只生成一个内联source-map
  错误代码准确信息 和 源代码的错误位置
hidden-source-map：外部
  错误代码错误原因，但是没有错误位置
  不能追踪源代码错误，只能提示到构建后代码的错误位置
eval-source-map：内联
  每一个文件都生成对应的source-map，都在eval
  错误代码准确信息 和 源代码的错误位置
nosources-source-map：外部
  错误代码准确信息, 但是没有任何源代码信息
cheap-source-map：外部
  错误代码准确信息 和 源代码的错误位置 
  只能精确的行
cheap-module-source-map：外部
  错误代码准确信息 和 源代码的错误位置 
  module会将loader的source map加入
```

devtool的取值

```
[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
```

- 内联和外部的区别：1. 外部生成map文件，内联没有 2. 内联构建速度更快
- 开发环境：速度快，调试更友好
  - 速度快 eval>inline>cheap
  - 调试更友好 souce-map > cheap-module-souce-map > cheap-souce-map
  - **eval-souce-map**
- 生产环境：源代码隐藏 ，内联让代码体积变大，生产环境不使用
  - nosources-source-map 全部隐藏
  - hidden-source-map 只隐藏源代码，会提示构建后代码错误信息



### (三)oneOf

使用oneOf，文件匹配命中后不会继续匹配其他loader

oneOf数组中不能使用两个配置去处理同一类型的文件，只会匹配一个，多个配置项可以提至oneOf之外

```js
  module: {
    rules: [
      {
        // 在package.json中eslintConfig --> airbnb
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        // 以下loader只会匹配一个
        // 注意：不能有两个配置处理同一种类型文件
        oneOf: [
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },
          /*
            正常来讲，一个文件只能被一个loader处理。
            当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序：
              先执行eslint 在执行babel
          */
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {version: 3},
                    targets: {
                      chrome: '60',
                      firefox: '50'
                    }
                  }
                ]
              ]
            }
          },
          {
            test: /\.(jpg|png|gif)/,
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: '[hash:10].[ext]',
              outputPath: 'imgs',
              esModule: false
            }
          },
          {
            test: /\.html$/,
            loader: 'html-loader'
          },
          {
            exclude: /\.(js|css|less|html|jpg|png|gif)/,
            loader: 'file-loader',
            options: {
              outputPath: 'media'
            }
          }
        ]
      }
    ]
  },
```



### (四)缓存

**babel缓存**

设置`cacheDirectory: true`，让babel第二次打包构建时，对未修改的文件使用缓存

```js
{
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'usage',
            corejs: { version: 3 },
            targets: {
              chrome: '60',
              firefox: '50'
            }
          }
        ]
      ],
      // 开启babel缓存, 第二次构建时，会读取之前的缓存
      cacheDirectory: true
    }
},
```

**文件资源缓存**

```js
//服务器 server.js
const express = require('express');

const app = express();
// express.static向外暴露静态资源
// maxAge 资源缓存的最大时间，单位ms
app.use(express.static('dist', { maxAge: 1000 * 3600 }));

app.listen(3000);

```

```shell
nodemon server.js
```

​     *hash: 每次wepack构建时会生成一个唯一的hash值。*

​        *问题: 因为js和css同时使用一个hash值。*

​          *如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件）*

​      *chunkhash：根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样*

​        *问题: js和css的hash值还是一样的*

​          *因为css是在js中被引入的，所以同属于一个chunk*

​      *contenthash: 根据文件的内容生成hash值。不同文件hash值一定不一样*    

​      *--> 让代码上线运行缓存更好使用*

为了防止后台文件改变，而浏览器依然获取缓存数据，不能得到数据更新。我们将 JS文件和CSS文件后添加 hash值，用于浏览器比较

- **hash:** 每次wepack构建时会生成一个唯一的hash值

  ```js
  output: {
      filename: 'js/bundle.[hash:10].js',
      path: path.resolve(__dirname, 'dist'),
  },
    ...
  plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/index.[hash:10].css',
      }),
    ],
  ```

  - 问题：每个文件使用相同的hash值，一个文件改变后，所有文件都需要重新加载
  - 如果重新打包，会导致所有缓存失效

- **chunkhash：**根据chunk生成的hash值。如果打包来源于同一个chunk，hash值相同

  ```js
  output: {
      filename: 'js/bundle.[chunkhash:10].js',
      path: path.resolve(__dirname, 'dist'),
  },
    ...
  plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/index.[chunkhash:10].css',
      }),
    ],
  ```

  - 相同问题，因为css是在js中被引入的，同属于一个chunk

- **contenthash：**根据文件的内容生成hash值

  ```js
  output: {
      filename: 'js/bundle.[contenthash:10].js',
      path: path.resolve(__dirname, 'dist'),
  },
    ...
  plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/index.[contenthash:10].css',
      }),
    ],
  ```

  - 不同文件hash值一定不一样，让代码上线运行缓存更好使用
  - 文件内容不改变，hash值不改变



- 作用：去除无用代码，减少代码体

- 开启前提：

  - 必须使用ES6模块化  

  - 开启production环境

- 注意：如果在package.json中配置 `"sideEffects": false`

  - 所有代码都无副作用都进行tree shaking，可能会把`css / @babel/polyfill` 文件删除
  - `"sideEffects": ["\*.css", "\*.less"]`

  ​      

### (五)代码分割 code split

根据入口文件进行代码分割



单入口——单页面应用

```js
entry: "./src/js/index.js",
optimization: {
    splitChunks: {
        chunks: "all"
    }
},
mode: "production"
```

- `splitChunks`：可以将`node_modules`中的运行依赖单独打包为一个chunk输出
- 多入口时，`splitChunks`自动分析各入口释放引入公共文件，如果有将文件单独打包为一个chunk，减少入口文件打包的体积



多入口——多页面应用

```js
entry: {
	mian: "./src/js/index.js",
    test: "./src/ji/test.js"
}
output: {
    filename: 'js/[name].[contenthash:10].js',
    path: path.resolve(__dirname, "dist")
}
```

- 多入口时，不需要在`index.js`引入 `test.js`
- 多个入口可以输出多个 bunle



单入口——动态导入

- 通过js代码，让某个文件被单独打包成一个chunk
- import动态导入语法：能将某个文件单独打包

```js
//index.js

import(/* webpackChunkName: 'test' */ './test.js')
  .then(({ mul, count }) => {
    // 文件加载成功
    // eslint-disable-next-line
    console.log(mul(2, 5));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败');
  });
```



### (六)懒加载和预加载

**正常加载**

- js打包在一个文件中，并行加载

**懒加载**

- 根据用户行为，才会去请求加载对应的文件
- 会对文件进行分割，如果异步加载的逻辑复杂，会出现卡顿的情况

```js
let img = document.querySelector('.img');
img.addEventListener('click', () => {
  import(/*webpackChunkName: 'test'*/ './js/test').then(({ test }) => {
    console.log('你点击了火影');
    console.log(test(2, 2, 22));
  });
});
```

**预加载 prefetch**

- 等其他资源加载完毕，浏览器空闲时，再提前加载js文件 
- 兼容性不好

```js
let img = document.querySelector('.img');
img.addEventListener('click', () => {
  import(/*webpackChunkName: 'test', webpackPrefetch: true */ './js/test').then(({ test }) => {
    console.log('你点击了火影');
    console.log(test(2, 2, 22));
  });
});
```

