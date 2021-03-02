const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//设置node环境
process.env.NODE_ENV = 'development';

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //css中引用的图片前添加公共路径
              publicPath: '../',
            },
          },
          'css-loader',
          // postcss默认配置
          // 'postcss-loader'
          // postcss自定义配置
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  //postcss插件 - 寻找packe.json中browserslist的配置, 通过配置加载指定css兼容性样式
                  require('postcss-preset-env'),
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: 'webpack-demo-2021',
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      //对输出的css文件重命名
      filename: 'css/index.css',
    }),
    new OptimizeCssAssetsWebpackPlugin(),
  ],
  // 开发服务器
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    hot: true,
    open: false,
    port: 3000,
  },
};
