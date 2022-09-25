const path = require('path');
const webpack = require('webpack');
module.exports = {
    //entry: './WPB2/scripts/out/index.js', // 打包对入口文件，期望打包对文件入口。 这里配置tsc05.ts的位置
    entry: './WPB2/scripts/out/test/noiseTest.js',
    output: {
        filename: 'index.js', // 输出文件名称
        path: path.resolve(__dirname, './WPB2/scripts/mix/') //获取输出路径
    },
    mode: "production", // 整个mode 可以不要，模式是生产坏境就是压缩好对，这里配置开发坏境方便看生成对代码
    //   module:{
    //   rules: [{
    //       test: /\.tsx?$/,
    //       use: 'ts-loader',
    //       exclude: /node_modules/
    //     }]
    //   },
    //   resolve: {
    //     extensions: ['.js']      // 解析对文件格式
    //   }
    experiments: {
        outputModule: true
    },
    externalsType: "module",
    externals: {
        "mojang-minecraft": "mojang-minecraft",
        "mojang-minecraft-ui": "mojang-minecraft-ui"
    }
}