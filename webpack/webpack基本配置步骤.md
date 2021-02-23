# webpack基本配置步骤

## 一、工作环境准备

- 安装 `node npm Git`

  ```shell
  node --version
  npm --version
  ```

- 配置 node npm Git 相关环境变量



## 二、配置基本的开发环境

### 2.1 项目初始化 

```shell
npm init -y
```

在根目录生成 `package.json` 文件

### 2.2 安装 webpack 插件

```shell
npm install webpack webpack-cli -g
npm install webpack webpack-cli --sace-dev
```

### 2.3 创建开发环境配置文件

项目根目录创建 `webpack.dev.conf.js` 文件，作为开发环境的 webpack 配置文件

```js
//webpack.dev.config.js
const path = require('path');

module.exports = {
  // 入口文件配置项，可配置不同入口
  entry: './src/index.js',
  // 输出文件配置
  output: {
    // 生成文件的根目录，需要绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 指定在浏览器中所引用的「生成资源文件的共用路径」，例如生成 css、js、img、字体图标等
    publicPath: '',
    // 定义输出文件名规则
    filename: 'js/[name].[contenthash:10].js',
  },
  // 使用生产模式构建项目
  mode: 'development',
};
```



### 2.4 优化开发环境打包命令

```json
"scripts": {
    "dev": "webpack --config webpack.dev.conf.js"
}
```



### 2.5 测试运行

- 添加入口文件 `src/index.js`

  ```js
  // webpack 项目入口文件
  document.getElementById('app').innerHTML = 'Webpack works';
  ```

- 打包构建 `npm run dev`

- 手动在构建目录添加 `dist/index.html`

  ```html
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Document</title>
    </head>
    <body>
      <div id="app"></div>
      <script type="text/javascript" src="./js/main.373c3dd70e.js" charset="utf-8"></script>
    </body>
  </html>
  ```



### 目前配置文件

```js
const path = require('path');

module.exports = {
  // 入口文件配置项，可配置不同入口
  entry: './src/index.js',
  // 输出文件配置
  output: {
    // 生成文件的根目录，需要绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 指定在浏览器中所引用的「生成资源文件的共用路径」，例如生成 css、js、img、字体图标等
    publicPath: '',
    // 定义输出文件名规则
    filename: 'js/[name].[contenthash:10].js',
  },
  // 使用生产模式构建项目
  mode: 'development',
};
```



## 三、html-webpack-plugin

使用 `html-webpack-plugin`[**插件**](https://www.npmjs.com/package/html-webpack-plugin)

在 `dist` 目录下创建了一个 `index.html` 文件，并且手动在里面引入了生成的 `bundle.js` 文件

- 安装插件

  ```html
  npm install html-webpack-plugin -D
  ```

- 创建插件参照的模板文件 `src/index.html`

  ```html
  <!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <title><%= htmlWebpackPlugin.options.title%></title>
  </head>
  <body>
      <div id="app"></div>
  </body>
  </html>
  ```

  - 使用 `html-webpack-plugin` 插件动态配置网页标题 `<%= htmlWebpackPlugin.options.title%>`

- 配置文件引入插件

  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  ```

- 配置文件新增 `plugins` 配置项，并使用 `HtmlWebpackPlugin` 插件

  ```js
  // 插件配置项
  plugins: [
      new HtmlWebpackPlugin({
          filename: 'index.html',//输出文件的名称
          template: path.resolve(__dirname, 'src/index.html'),//模板文件的路径
          title:'webpack-demo',//配置生成页面的标题
      }),
  ]
  ```



### 目前配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件配置项，可配置不同入口
  entry: './src/index.js',
  // 输出文件配置
  output: {
    // 生成文件的根目录，需要绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 指定在浏览器中所引用的「生成资源文件的共用路径」，例如生成 css、js、img、字体图标等
    publicPath: '',
    // 定义输出文件名规则
    filename: 'js/[name].[contenthash:10].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //输出文件的名称
      template: path.resolve(__dirname, 'src/index.html'), //模板文件的路径
      title: 'webpack-demo', //配置生成页面的标题
    }),
  ],
  // 使用生产模式构建项目
  mode: 'development',
};
```



## 四、开发服务

### 4.1 webpack-dev-server

- 安装 `webpack-dev-server`

  ```shell
  npm install webpack-dev-server -g
  npm install webpack-dev-server -D
  ```

- `webpack-dev-server` 的[配置项](https://www.webpackjs.com/configuration/dev-server/) 

- 修改 `webpack.dev.conf.js` 文件，增加 `webpack-dev-server` 的配置

  ```js
  // 开发服务配置项
  devServer: {
      //告诉服务器从哪里提供内容
      contentBase: path.resolve(__dirname, 'dist'), 
      // 服务开启启用gzip压缩
      compress: true,
      // 指定使用一个 host 默认是 localhost 指定0.0.0.0 则服务器外部可访问
      host: "127.0.0.1"
      // 配置要监听的端口 默认就是8080
      port: '3000',
      // 启用Webpack的模块热替换特性
      hot: true,
      // 编译完成打开浏览器
      open: true,
      // 在浏览页面输出报错信息
      overlay: true,
      // 代理服务器
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          pathRewrite: {
            '^/api': '',
          },
        },
      },
  }
  ```

- 修改 `package.json` 文件

  ```json
  "start": "webpack-dev-server --config webpack.dev.conf.js --color --progress"
  ```

  ```
  ERROR in chunk main [entry] 
  js/[name].[contenthash:10].js Cannot use [chunkhash] or [contenthash] for chunk in 'js/[name].[contenthash:10].js' (use [hash] instead)
  ```

  - 修改配置文件需要重新执行 `npm run start`

### 4.2 获取ip打开浏览器(x)

- 安装相关插件

  ```shell
  npm install opn chalk -D
  ```

- 使用插件

  ```js
  const open = require('opn');//打开浏览器
  const chalk = require('chalk');// 改变命令行中输出日志颜色插件
  ```

- 修改 `devServer`配置

  ```js
  after() {
      open('http://localhost:' + this.port)
      .then(() => {
          console.log(chalk.cyan('成功打开链接： http://localhost:' + this.port));
      })
      .catch(err => {
          console.log(chalk.red(err));
      });
  }
  ```

  

### 4.3 clean-webpack-plugin

如果不使用 dev-server，就需要每次手动删除 `dist`目录

`clean-webpack-plugin`帮助我们每次在重新打包时，移除或清空打包输出目录（`dist`）;

**安装插件**

```shell
npm install --save-dev clean-webpack-plugin
```

**使用插件**

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [
    new CleanWebpackPlugin(),
  ],
```



### 目前配置文件

```js
const path = require('path');
// 输出html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清空dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 入口文件配置项，可配置不同入口
  entry: './src/index.js',
  // 输出文件配置
  output: {
    // 生成文件的根目录，需要绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 指定在浏览器中所引用的「生成资源文件的共用路径」，例如生成 css、js、img、字体图标等
    publicPath: '',
    // 定义输出文件名规则
    filename: 'js/[name].[hash:10].js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //输出文件的名称
      template: path.resolve(__dirname, 'src/index.html'), //模板文件的路径
      title: 'webpack-demo', //配置生成页面的标题
    }),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: '127.0.0.1',
    port: 3000,
    hot: true,
    open: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  // 使用生产模式构建项目
  mode: 'development',
};
```



## 五、配置样式

处理 `css` 的相关技术有 `postcss`、 `scss`、`less`

### 5.1 `.css` 文件的编译

**新增样式文件**：如 `src/css/reset.css`

```css
body {
  margin: 0;
  padding: 0;
  background-color: pink;
}
```

**入口文件引入样式文件**

```js
import './css/reset.css';
```

**安装相关loader**

编译 `.css` 文件，需要用到 `css-loader` 和 `style-loader`

```shell
npm install css-loader style-loader -D
```

- `css-loader` 
  - 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
  - 将css文件变成commonjs模块加载到js中,内容是样式字符串
- `style-loader`
  - 将模块的导出作为样式添加到 DOM 中（在页面添加style标签）
  - 创建style标签，将js中的样式资源插入，添加到head中生效

**修改配置文件，新增 `module`配置项**

```js
// 加载器 loader 配置项
module:{
    rules:[
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }
    ]
},
```



### 5.2`.scss` 文件的编译

**安装相关loader**

```shell
npm install sass-loader node-sass --save-dev
```

**修改解析配置项**

```js
{
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
```



### 5.3 抽离css文件

**安装 [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin) 抽离**

```shell
npm install mini-css-extract-plugin -D
```

**使用插件**

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
	
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



### 5.4 使用 postcss 插件

对于 `CSS3` 的许多特性来说，需要添加各种浏览器兼容前缀

开发过程中，使用`postcss` 处理浏览器样式兼容性，帮你自动添加各种浏览器前缀

**安装相关插件**

```shell
npm install postcss-loader autoprefixer -D
```

**根目录创建postcs的配置项 `postcss.config.js`**

```js
module.exports = {
  plugins: [require('autoprefixer')],
};
```

**修改解析css文件的配置项**

```js
  {
    test: /\.css$/,
    use: [
      //抽离css
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../',
          //CSS中引用的图片前添加公共路径
        },
      },
        
      //解析css
      'css-loader',
        
      //处理css兼容性
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          config: {
            path: './postcss.config.js',
          },
        },
      },
    ],
  },
```

**添加浏览器兼容性规则**

```json
//package.json
"browserslist": [
    "defaults",
    "not ie < 11",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
]
```



### 5.5 压缩CSS

**安装插件**

```shell
npm install --save-dev optimize-css-assets-webpack-plugin
```

**使用插件**

```js
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' )
	...
// 压缩 css 
new OptimizeCssAssetsWebpackPlugin()
```



### 目前配置文件

```js
const path = require('path');
// 输出html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清空dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 抽离css样式
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css样式
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // 入口文件配置项，可配置不同入口
  entry: './src/index.js',
  // 输出文件配置
  output: {
    // 生成文件的根目录，需要绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 指定在浏览器中所引用的「生成资源文件的共用路径」，例如生成 css、js、img、字体图标等
    publicPath: '',
    // 定义输出文件名规则
    filename: 'js/[name].[hash:10].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              //CSS中引用的图片前添加公共路径
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js',
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              //CSS中引用的图片前添加公共路径
            },
          },
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js',
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //输出文件的名称
      template: path.resolve(__dirname, 'src/index.html'), //模板文件的路径
      title: 'webpack-demo', //配置生成页面的标题
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:10].css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: '127.0.0.1',
    port: 3000,
    hot: true,
    open: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  // 使用生产模式构建项目
  mode: 'development',
};
```





## 六、配置图片、文件、字体

### 6.1 配置图片 - css

**安装相关loader**

```shell
npm install url-loader file-loader -D
```

**修改配置项，解析css中的图片**

```js
{
    test: /\.(png|jp?g|gif|svg)$/,
    use: [
        {
            loader: 'url-loader',
            options: {
                limit: 8 * 1024, // 小于8kb的图片打包成base 64图片
                name:'img/[name].[hash:8].[ext]',
                publicPath:''
            }
        }
    ]
}
```

**css中引入图片**

```css
.img-css {
  display: flex;
  justify-content: space-between;
  div {
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    background-size: cover;
    background-position: center center;
  }
  .box1 {
    background-image: url(../img/vue.jpg);
  }
  .box2 {
    background-image: url(../img/react.png);
  }
  .box3 {
    background-image: url(../img/angular.jpg);
  }
}
```



### 6.2 配置图片 - html

**安装相关loader**

```shell
npm install html-loader -D
```

- **用于处理html文件的img图片**，负责引入图片让 `url-loader`处理

**修改配置项，解析html中的图片**

```js
{
    test: /\.html$/i,
    loader: 'html-loader',
    options: {
      attributes: {
        list: [
          {
            // Tag name
            tag: 'img',
            // Attribute name
            attribute: 'src',
            // Type of processing, can be `src` or `scrset`
            type: 'src',
          },
        ],
      },
    },
  },
```



### 6.3 配置图片 - js

修改 `src/index.js` 文件

```js
//index.js
import react from './img/react.png';
document.querySelector('.img-js').innerHTML = `<img scr=${react}>`;
```



### 6.4 配置字体图标、音频、视频

**字体图标**

- 下载字体图标文件到 `fonts` 文件夹
- `css、less、scss` 任一文件夹中引用图标库，页面中引用字体图标对应的类即可

**配置loader**

```js
  {
    // 文件依赖配置项——字体图标
    test: /\.(woff|woff2|svg|eot|ttf)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'fonts/[name].[ext]?[hash:8]',
          publicPath: '',
        },
      },
    ],
  },
  {
    // 文件依赖配置项——音频
    test: /\.(wav|mp3|ogg)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'audios/[name].[ext]?[hash:8]',
          publicPath: '',
        },
      },
    ],
  },
  {
    // 文件依赖配置项——视频
    test: /\.(ogg|mpeg4|webm)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: 'videos/[name].[ext]?[hash:8]',
          publicPath: '',
        },
      },
    ],
  },
```

 

### 目前配置文件

```js
const path = require('path');
// 输出html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 清空dist文件夹
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 抽离css样式
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 压缩css样式
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  // 入口文件配置项，可配置不同入口
  entry: './src/index.js',
  // 输出文件配置
  output: {
    // 生成文件的根目录，需要绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 指定在浏览器中所引用的「生成资源文件的共用路径」，例如生成 css、js、img、字体图标等
    publicPath: './',
    // 定义输出文件名规则
    filename: 'js/[name].[hash:10].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              //CSS中引用的图片前添加公共路径
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js',
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              //CSS中引用的图片前添加公共路径
            },
          },
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jp?g|gif|svg)/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: 'img/[name].[hash:10].[ext]',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // 文件依赖配置项——字体图标
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[ext]?[hash:8]',
              publicPath: '',
            },
          },
        ],
      },
      {
        // 文件依赖配置项——音频
        test: /\.(wav|mp3|ogg)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'audios/[name].[ext]?[hash:8]',
              publicPath: '',
            },
          },
        ],
      },
      {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'videos/[name].[ext]?[hash:8]',
              publicPath: '',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', //输出文件的名称
      template: path.resolve(__dirname, 'src/index.html'), //模板文件的路径
      title: 'webpack-demo', //配置生成页面的标题
    }),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:10].css',
    }),
    // new OptimizeCssAssetsWebpackPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: '127.0.0.1',
    port: 3000,
    hot: true,
    open: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  // 使用生产模式构建项目
  mode: 'development',
};
```



## 七、初步优化开发环境

### 7.1 增加 `sourcemap`

开发过程中，代码出错需要进行时调试，但是webpack打包后文件不适合调试

可以在 `webpack` 中增加 `devtool` 配置，来向浏览器暴露我们的源码，让我们可以在源码的基础上进行调试 

[sourcemap](https://www.webpackjs.com/configuration/devtool/)：不同的值会明显影响到构建(build)和重新构建(rebuild)的速度

**增加配置项**

```js
// 开发工具
devtool: 'eval-source-map',
```



### 7.2 增加文件资源缓存机制

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



**修改输出配置项**

```js
// 输出文件配置项
output:{
    path:path.resolve(__dirname,"dist"),
    filename: 'js/[name].[hash:10].js',
    chunkFilename: 'js/[name].[chunkhash:10].js',
    publicPath:""
},
```



### 7.3 增加模块热更新

现阶段我们每次修改页面，页面都会自动整体刷新

```js
const webpack = require('webpack');
	...
new webpack.HotModuleReplacementPlugin(),
```





## 八、配置babel7

### 8.1 babel基本配置

- 安装相关插件

  ```shell
  npm install babel-loader @babel/core @babel/preset-env -D
  ```

  ```shell
  npm install @babel/runtime @babel/plugin-transform-runtime -D
  ```

- 修改配置

  ```js
  { 
      test: /\.js$/, 
      exclude: /node_modules/, 
      loader: "babel-loader" 
  }
  ```

- 根目录添加 `.babelrc` 文件

  ```js
  {
    "presets": ["@babel/preset-env"]
  }
  ```

  

### 8.2 babel基本配置

- 安装相关插件

  ```shell
  npm install @babel/runtime @babel/plugin-transform-runtime -D
  ```

- 修改 `.babelrc` 文件

  ```js
  {
    "presets": [
      [
        "@babel/preset-env",
        {
          "modules": false,
          "targets": {
            "browsers": [
              "> 1%",
              "last 2 versions",
              "not ie <= 8"
            ]
          },
          "useBuiltIns": "usage"
        }
      ]
    ],
    "plugins": [
      "@babel/plugin-transform-runtime"
    ]
  }
  ```

- 修改配置项

  ```js
   {
      test: /\.(js|jsx)$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: path.resolve(__dirname, 'src'),
      exclude: /node_modules/,
    }
  ```

### 目配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const open = require('opn'); //打开浏览器
// const chalk = require('chalk'); // 改变命令行中输出日志颜色插件
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    // 生成文件的根目录，需要绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 指定在浏览器中所引用的「生成资源文件的共用路径」，例如生成 css、js、img、字体图标等
    publicPath: './',
    // 定义输出文件名规则
    filename: 'js/[name].[hash:10].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //抽离css
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              //CSS中引用的图片前添加公共路径
            },
          },
          //解析css
          'css-loader',
          //处理css兼容性
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js',
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jp?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024, // 小于8kb的图片打包成base 64图片
              name: 'img/[name].[hash:8].[ext]',
              publicPath: '',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                // Tag name
                tag: 'img',
                // Attribute name
                attribute: 'src',
                // Type of processing, can be `src` or `scrset`
                type: 'src',
              },
            ],
          },
        },
      },
      {
        // 文件依赖配置项——字体图标
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[ext]?[hash:8]',
              publicPath: '',
            },
          },
        ],
      },
      {
        // 文件依赖配置项——音频
        test: /\.(wav|mp3|ogg)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'audios/[name].[ext]?[hash:8]',
              publicPath: '',
            },
          },
        ],
      },
      {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'videos/[name].[ext]?[hash:8]',
              publicPath: '',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      title: 'webpack-demo',
    }),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:10].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    host: '127.0.0.1',
    port: 5000,
    hot: true,
    open: true,
    overlay: true,
    proxy: {
      '/api': {
        target: 'http://localhost:6000',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  // 开发工具
  devtool: 'eval-source-map',
  mode: 'development',
};
```



## 九、配置生产环境

### 9.1 创建生产环境配置文件

- 根目录下新建 `webpack.prod.conf.js` 文件

- 根据开发环境修改以下配置

  - 删除 `devServer` 配置项的代码

  - 修改出口配置——`contenthash`与`webpack-dev-server` 不兼容

    ```js
    //development
    filename: 'js/[name].[hash:10].js'
    //production
    filename: 'js/[name].[contenthash:10].js'
    ```

  - `devtool` 的配置改为 `cheap-module-source-map`

  - 删除 `plugins` 配置中的 `new webpack.HotModuleReplacementPlugin(),` 生产环境已经不需要热加载，不删除会报错

  - 修改 `mode` 配置为 `production`

  - 删除头部引入的关于开发服务的插件

  - `plugins` 中，添加 `new webpack.HashedModuleIdsPlugin()` 实现持久化缓存

- 增加开发环境脚本

  ```json
  "build":"webpack --config webpack.prod.conf.js"
  ```

### 目前配置文件

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    filename: 'js/[name].[contenthash:10].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          //抽离css
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
              //CSS中引用的图片前添加公共路径
            },
          },
          //解析css
          'css-loader',
          //处理css兼容性
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js',
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: './postcss.config.js',
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jp?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024, // 小于8kb的图片打包成base 64图片
              name: 'img/[name].[hash:8].[ext]',
              publicPath: '',
            },
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          attributes: {
            list: [
              {
                // Tag name
                tag: 'img',
                // Attribute name
                attribute: 'src',
                // Type of processing, can be `src` or `scrset`
                type: 'src',
              },
            ],
          },
        },
      },
      {
        // 文件依赖配置项——字体图标
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'fonts/[name].[ext]?[hash:8]',
              publicPath: '',
            },
          },
        ],
      },
      {
        // 文件依赖配置项——音频
        test: /\.(wav|mp3|ogg)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'audios/[name].[ext]?[hash:8]',
              publicPath: '',
            },
          },
        ],
      },
      {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'videos/[name].[ext]?[hash:8]',
              publicPath: '',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader?cacheDirectory=true'],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, './src/index.html'),
      title: 'webpack-demo',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:10].css',
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  // 开发工具
  devtool: 'cheap-module-source-map',
  mode: 'production',
};
```



## 十、生产环境代码压缩

### 10.1 压缩js

生产环境配置 `mode:"production"` 就能实现 `js` 的代码压缩

### 10.2 压缩css1

- 安装插件

  ```shell
  npm install optimize-css-assets-webpack-plugin -D
  ```

- 使用插件

  ```js
  const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin' )
  	...
  // 压缩 css 
  new OptimizeCssAssetsWebpackPlugin()
  ```

### 10.3压缩css2

- 安装插件

  ```shell
  npm i uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin -D
  ```

- 使用插件

  ```js
  const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
  const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
  
  optimization: {
      minimizer: [ // 用于配置 minimizers 和选项
          new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true // set to true if you want JS source maps
          }),
          new OptimizeCSSAssetsPlugin({})
      ]
  },
  ```

> 在 `webpack4.x` 新增了 `optimization` 配置:
>
> - `optimization.minimize` 用于控制压缩的开关，开发环境默认关闭，生产环境默认开启
> - `optimization.minimizer` 用于配置压缩项及其配置项
> - `optimization.splitChunks` 用于拆分代码，找到 chunk 中共同依赖的模块,取出来生成单独的 chunk
> - `optimization.runtimeChunk` 将 webpack 生成的 runtime 作为独立 chunk ，runtime 包含在模块交互时，模块所需的加载和解析逻辑（manifest）



### 10.4 压缩html

关于 `html-webpack-plugin` 插件

- `title` : 用于生成的 HTML 文件的标题
- `filename` : 用于生成的 HTML 文件的名称，默认是 index.html 
  - 可以指定子目录（例如:assets/admin.html）
- `template` : 模板的路径。
- `inject` : true | ‘head’ | ‘body’ | false 。把所有产出文件注入到给定的 template 或templateContent。当传入 true 或者 'body' 时所有 javascript 资源将被放置在body 元素的底部，'head' 则会放在 head 元素内
- `favicon` : 给定的图标路径，可将其添加到输出 html 中
- `meta` : 配置 html 文件的 meta 值，可以配置移动端 meta 也可以配置 seo 优化相关 meta
- `minify` : {…} | false   传一个 html-minifier 插件的配置 object 来压缩输出
- `hash` : true | false  如果是 true ，会给所有包含的 scrip t和 css 添加一个唯一的 webpack 编译 hash 值。这对于缓存清除非常有用。
- `cache` : true | false   如果传入 true（默认），只有在文件变化时才发送（emit）文件
- `showErrors` : true | false 。如果传入 true（默认），错误信息将写入 html 页面
- `chunks` : 只允许你添加chunks （例如：只有单元测试块 ）
- `chunksSortMode` : 在 chunk 被插入到 html 之前，你可以控制它们的排序。允许的值 ‘none’ | ‘auto’ | ‘dependency’ | {function} 默认为‘auto’.
- `excludeChunks` : 允许你跳过一些 chunks（例如，不要单元测试的 chunk）.
- `xhtml` : true | false  如果是 true ，会兼容 `xhtml` 文件

```js
new HtmlWebpackPlugin({
    filename: 'index.html',
    template: path.resolve(__dirname, './src/index.html'),
    minify:{
        removeRedundantAttributes:true, // 删除多余的属性
        collapseWhitespace:true, // 折叠空白区域
        removeAttributeQuotes: true, // 移除属性的引号
        removeComments: true, // 移除注释
        collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
    },
    title:'webpack-demo',
    favicon:''
}),
```



## 十一、开发、生产环境的拆分代码

目前打包的 `js` 代码都在一个文件内，会导致该文件体积庞大

项目中不可避免要使用第三方库，比如：`Jquery` `react` `vue` 等等

在项目上线后，依然需要依赖的库相关的 `JS` 代码，我们需要单独拆分出来，并打包到一个文件内，这些代码因为基本不会发生改变，所以单独分离出来，因为有了缓存的缘故，也能加快编译速度

项目中一段代码在很多页面都有调用，这部分代码也需要拆分出来，单独生成一个文件



## 十二、模板解析配置项

```js
// 模版解析配置项
resolve: {
    
    // 设置可省略文件后缀名
    extensions: [' ', '.js', '.json', '.jsx', '.vue'],
        
    // 查找 module 的话从这里开始查找;
    modules: [
        path.resolve(__dirname, 'src'), 							path.resolve(__dirname, 'node_modules')
    ], // 绝对路径;
        
    // 配置路径映射（别名）
    alias: {
      '@': path.resolve('src'),
    },
  },
```

- `extensions` 配置可省略文件后缀名的文件类型，在引用文件的时，可以省略后缀名
- `alias` 配置路径映射，在引用文件时，通过别名简化复杂的路径引用
- `modules` 告诉 webpack 解析模块时应该搜索的目录，可以通过这个配置设置要从哪里找这些文件



## 十三、移动端适配配置

- 设置viewport

  ```html
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no" />
  ```

  - 在所有移动端页面`head` 里加入该`meta`

- 其他相关插件

  ```shell
  npm install postcss-aspect-ratio-mini postcss-write-svg postcss-px-to-viewport -D
  ```

  - `postcss-aspect-ratio-mini`：主要用来处理固定宽高比
  - `postcss-write-svg`：主要用来处理1像素边框问题（对圆角处理未实现）
  - `postcss-px-to-viewport`：将`px`单位自动转换成`viewport`单位

- 修改`postcss.config.js` 文件

  ```css
  module.exports = {
    parser: 'postcss-scss',
    plugins: {
      'autoprefixer':{},
      "postcss-aspect-ratio-mini": {}, // 主要用来处理元素容器宽高比
      "postcss-write-svg": { utf8: false }, // 用来画1像素线
      'postcss-px-to-viewport': {
        viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750 
        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置 
        unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除） 
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw 
        selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名 
        minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值 
        mediaQuery: false // 允许在媒体查询中转换`px`
      }
    }
  }
  ```

  



## 十四、yarn 替代npm方案

```shell
npm install yarn -g
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global

yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```

