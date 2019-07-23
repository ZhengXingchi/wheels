# vue-jinyuanbao-admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8001
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 20190122
待放款列表：默认显示待放款数据。被拒绝订单不再显示提额，打款，拒绝，审计，添加记录操作
放款：对于有过历史订单的用户，打款做时间判断处理，距离上次打款小于1，不允许再次打款。
信审管理:需要人审信息增加分配和转派功能
首页:增加今日数据统计和累计数据统计以及放款和还款趋势图分析，原渠道实时分析功能放到渠道管理模块
修复已放款列表:实还金额取值错误,未还款金额为0
修复若干其它bug
当前版本v2.0
## 计划更新 v2.1.3
增加：
1、全站统计
2、催收统计
3、催收绩效
4、用户操作时序图展示
5、新风控处理
6、新增加风控处理中
7、搜索时间bug修复
8、不同版本显示菜单不同
9、优化会员管理查询功能
10、增加黑名单用户管理，移除黑名单
## 计划更新 v2.1.4
1、信审增加领件功能
2、催收增加领件功能
3、优化催收管理用户信息页面
4、用户管理增加信审资料查看功能
5、信审管理信审过的用户不在显示
6、调整权限管理
7、移除s0,s1,s2菜单
8、信审页面增加兼容老风控
9、扣量备份渠道来源
10、修复系统订单时间更新bug