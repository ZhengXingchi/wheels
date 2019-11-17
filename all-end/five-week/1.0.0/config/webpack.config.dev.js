const webpackMerge=require('webpack-merge')

const baseWebpackConfig=require('./webpack.config.base.js')

const webpackConfig=webpackMerge(baseWebpackConfig,{
    devtool:'eval-source-map',
    mode:'development',
    stats:{children:false}
})


module.exports=webpackConfig