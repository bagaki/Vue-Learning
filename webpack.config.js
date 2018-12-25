const path = require('path')
const webpack = require('webpack')
// 導入在内存中生成 HTML 頁面的插件
// 只要是插件，都一定要放到 plugins 節點中去
// 這個插件的兩個作用：
//  自動在内存中根據指定頁面生成一個内存的頁面
//  自動 吧打包好的 bundle.js追加到頁面中
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: path.join(__dirname, './src/main.js'),
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        disableHostCheck: true,
        open: true,
        port: 3000,
        // contentBase: 'src',
        hot: true
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin(), // new一個熱更新的模塊對象，這是啓用熱更新的第三步
        new htmlWebpackPlugin({  //創建一個 在内存中生成 HTML 頁面的插件
            template: path.join(__dirname, './src/index.html'),  // 指定 模板頁面，將來會根據指定的頁面路徑，去生成内存中的頁面
            filename: 'index.html'  // 指定生成的也沒面名稱
        })
    ],
    module: {   // 這個節點，用於配置 所有第三方模塊加載器
        rules: [  // 所有第三方模塊匹配規則
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },  // 調用順序從右到左
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: 'url-loader?limit=37625&name=[hash:8]-[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg|woff|woff2)$/,
                use: 'url-loader'
            },
            {
                test: /\.js$/,
                use: { loader: 'babel-loader' },
                exclude: /node_modules/
            },// 配置Babel來轉換高級的ES語法
            {
                test: /\.vue$/,
                use: "vue-loader"
            },
        ]
    },
    resolve: {
        alias: {
            "vue$": "vue/dist/vue.js"
        }
    }
}