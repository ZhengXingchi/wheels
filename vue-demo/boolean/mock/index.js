const Mock = require('mockjs');//mockjs 导入依赖模块
    const util = require('./util');//自定义工具模块
    //返回一个函数
    module.exports = function(app){
        //监听http请求
        app.get('/user/auditingNoPassUserList', function (rep, res) {
            //每次响应请求时读取mock data的json文件
            //util.getJsonFile方法定义了如何读取json文件并解析成数据对象
            var json = util.getJsonFile('./auditingNoPassUserList.json');
            //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
            res.json(Mock.mock(json));
        });
        app.get('/user/auditingRefuseRecord', function (rep, res) {
            //每次响应请求时读取mock data的json文件
            //util.getJsonFile方法定义了如何读取json文件并解析成数据对象
            var json = util.getJsonFile('./auditingRefuseRecord.json');
            //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
            res.json(Mock.mock(json));
        });
        app.get('/admin/shouYeStatistics/shouYeStatistics',function(rep,res){
          var json = util.getJsonFile('./shouYeStatistics/shouYeStatistics.json');
          //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
          res.json(Mock.mock(json));
        });
      app.get('/api/shouYeStatistics/huiKuanTongJi',function(rep,res){
        var json = util.getJsonFile('./shouYeStatistics/huiKuanTongJi.json');
        //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
        res.json(Mock.mock(json));
      });
      app.get('/api/shouYeStatistics/fangKuanTongJi',function(rep,res){
        var json = util.getJsonFile('./shouYeStatistics/fangKuanTongJi.json');
        //将json传入 Mock.mock 方法中，生成的数据返回给浏览器
        res.json(Mock.mock(json));
      });
      //访问权限
      app.get('/api/permission',function(rep,res){
        var json = util.getJsonFile('./perMission.json');
        res.json(Mock.mock(json));
      });
    }
