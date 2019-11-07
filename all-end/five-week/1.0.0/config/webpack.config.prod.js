const webpackMerge=require('webpack-merge')
const baseWebpackConfig=require('./webpack.config.base.js')
const TerserWebpackPlugin=require('terser-webpack-plugin')
const webpackConfig=webpackMerge(baseWebpackConfig,{
  mode:'production',
  optimization:{
    minimizer:[new TerserWebpackPlugin({
      terserOptions:{
        warnings:false,
        compress:{
          warnings:false,
          drop_console:false,
          dead_code:true,
          drop_debugger:true
        },
        output:{
          comments:false,
          beautify:false
        },
        mangle:true
      },
      parallel:true,
      sourceMap:false
    })],
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          enforce:true
        }
      }
    }
  },
  stats:{children:false,warnings:false}
  
    
})


module.exports=webpackConfig