import Vue from 'vue'
import Router from 'vue-router'


import login from '@/page/login'
import manage from '@/page/index'
import home from '@/page/home'
import editPassword from '@/page/editPassword'
// 系统设置
import systemRet from '@/page/systemRet'//利率设置
import systemRetAdd from '@/page/systemRetAdd'//利率设置
import systemParam from '@/page/systemParam'//参数设置
import systemAgreement from '@/page/systemAgreement'//合同模板
import systemNote from '@/page/systemNote'//短信模板
import riskSet from '@/page/riskSet'//短信模板
// 权限与角色管理
import managerPeo from '@/page/managerPeo'//系统管理员
import managerPeoAdd from '@/page/managerPeoAdd'//系统管理员
import managerRole from '@/page/managerRole'//角色列表
import managerRoleDetail from '@/page/managerRoleDetail'//角色列表
// import managerRoleAdd from '@/page/managerRoleAdd'//角色列表
import managerRoleAdd from '@/page/role/managerRoleAdd'//系统管理员
import managerDepartment from '@/page/managerDepartment'//部门列表
/**
 * 渠道管理
 */
import canals from '@/page/canals'
import cancelDetailList from '@/page/cancelDetailList'
import canalsMember from '@/page/canalsMember'
import canalsChange from '@/page/canalsChange'
import canalRealTime from '@/page/components/canal/canalRealTime'
import channelReport from '@/page/channel/channelReport'
import totalReport from '@/page/channel/totalReport'
import channelReportDetail from '@/page/channel/channelReportDetail'
/**
 * 会员认证模块
 */
import member from '@/page/member'//会员类表
import memberList from '@/page/memberList'//会员类表
import blackMemberList from '@/page/user/blackMemberList'//黑名单会员类表
import memberNoList from '@/page/memberNoList'//未认证类表
import memberMyList from '@/page/memberMyList'//我的会员类表
import auditing from '@/page/auditing'
import auditing2 from '@/page/auditing2'
import auditingLiuRecord from '@/page/auditingLiuRecord'
import riskIndex from '@/page/riskIndex'
import basicTaobaoAddress from "@/page/basicTaobaoAddress"
import basicTaobaoBuy from "@/page/basicTaobaoBuy"
import udUserInfo from "@/page/udUserInfo"
/**
 * 贷款管理模块
 */
import loanIdenti from "@/page/loanIdenti";//查看认证信息
import loanWaitingList from "@/page/loan/loanWaitingList"//待放款列表
import loanAlreadyList from "@/page/loan/loanAlreadyList"//已放款列表
import loanNoRepayList from "@/page/loan/loanNoRepayList"//待还款列表
import loanRepayedList from "@/page/loan/loanRepayedList"//已款列表
import loanUserList from "@/page/loan/loanUserList" //借款用户列表
import loanMyList from "@/page/loan/loanMyList"//我的放款列表
import loanManagement from "@/page/loan/loanManagement"//我的放款列表

// 催收模块
import callAllList from '@/page/callAllList'
import callZero from '@/page/callS0'
import callOne from '@/page/callS1'
import callTwo from '@/page/callS2'
import callThree from '@/page/callS3'
import callPMy from '@/page/callPMy'
import callTongDun from '@/page/callTongDun'
import callTaobao from '@/page/callTaobao'
import callPhone from '@/page/callPhone'
import callRecord from '@/page/callRecord'
import callAddCallRecord from '@/page/callAddCallRecord'
import callDetail from '@/page/callDetail'
import callOrderTransferRecord from '@/page/callOrderTransferRecord'
import callDerate from '@/page/callDerate' //减免审核


//数据统计
import dataFinance from '@/page/dataFinance'
import dataAccountsDue from '@/page/dataAccountsDue'
import dataCanal from '@/page/dataCanal'
import dataCall from '@/page/dataCall'
import dataAllOrder from '@/page/dataAllOrder'
import getAuditCount from '@/page/getAuditCount'
import flowControl from '@/page/flowControl'

import collectionAssessReport from '@/page/statistics/collectionAssessReport'
import collectionReport from '@/page/statistics/collectionReport'

import dataExtendOver from '@/page/dataExtendOver'
import dataTodayWhite from '@/page/dataTodayWhite'
import dataTomorrowWhite from '@/page/dataTomorrowWhite'
import dataHadToday from '@/page/dataHadToday'
import dataHadAll from '@/page/dataHadAll'
import msgStatistics from '@/page/finance/msgStatistics'
import riskStatistics from '@/page/finance/riskStatistics'

import messageManage from '@/page/messageManage'
import messageManageAdd from '@/page/messageManageAdd'

import preferential from '@/page/preferential'
import preferentialAdd from '@/page/preferentialAdd'
import preferentialPeople from '@/page/preferentialPeople'
import preferentialPeopleDetail from '@/page/preferentialPeopleDetail'
import advert from '@/page/advert'
import basePrope from '@/page/basePrope'
import basePropeAdd from '@/page/basePropeAdd'
import basePropePeople from '@/page/basePropePeople'
import baseAbout from '@/page/baseAbout'
import explain from '@/page/explain'
// 登录日志
import backstageLogin from '@/page/backstageLogin'
import backstageAPP from '@/page/backstageAPP'
import backUp from '@/page/backUp'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/login',
      name: 'login',
      component: login
  },{
      path: '/',
      component: manage,
      children: [{
        path: '/',
        name: 'home',
        component: home,
        meta: {
          title:'首页',
          tabs:['数据统计', '统计报表'],
          keep:true
        },
      },
      {
        //修改密码
        path:'/editPassword',
        name:'editPassword',
        component:editPassword,
        meta: {
          title:'修改密码',
          keep:true
        },
      },
        {
          //系统设置
          path:'/system',
          name:'system',
          meta: {
            title:'系统设置',
            keep:true
          },
        },
      {
        //系统设置
        path:'/systemRet',
        name:'systemRet',
        component:systemRet,
        meta: {
          title:'利率设置',
          tabs:['系统设置','利率设置'],
          keep:true
        },
      },{
        path:'/systemRetAdd',
        name:'systemRetAdd',
        component:systemRetAdd,
        meta: {
          title:'利率配置',
          tabs:['系统设置','利率设置','利率配置'],
          keep:true
        },
      },{
        path:'/systemParam',
        name:'systemParam',
        component:systemParam,
        meta: {
          title:'参数配置',
          tabs:['系统设置','参数配置'],
          keep:true
        },
      },{
        path:'/systemAgreement',
        name:'systemAgreement',
        component:systemAgreement,
        meta: {
          title:'协议模板',
          tabs:['系统设置','协议模板'],
          keep:true
        },
      },{
        path:'/systemNote',
        name:'systemNote',
        component:systemNote,
        meta: {
          title:'短信模板',
          tabs:['系统设置','短信模板'],
          keep:true
        },
      },
      {
        path:'/riskSet',
        name:'riskSet',
        component:riskSet,
        meta: {
          title:'风控设置',
          tabs:['系统设置','风控设置'],
          keep:true
        },
      },{
        // 权限与角色管理
        // 系统管理员
        path:'/managerPeo',
        name:'managerPeo',
        component:managerPeo,
        meta: {
          title:'权限与角色管理',
          tabs:['权限与角色管理','系统管理员'],
          keep:true
        },
      },{
        path:'/managerPeoAdd',
        name:'managerPeoAdd',
        component:managerPeoAdd,
        meta: {
          title:'权限与角色管理',
          tabs:['权限与角色管理','系统管理员', '管理员配置'],
          keep:false
        },
      },{
        path:'/managerRole',
        name:'managerRole',
        component:managerRole,
        meta: {
          title:'角色列表',
          tabs:['权限与角色管理','角色列表'],
          keep:true
        },
      },{
        path:'/managerRoleDetail',
        name:'managerRoleDetail',
        component:managerRoleDetail,
        meta: {
          title:'角色详情',
          tabs:['权限与角色管理','角色列表', '角色详情'],
          keep:false
        },
      },{
        path:'/managerRoleAdd',
        name:'managerRoleAdd',
        component:managerRoleAdd,
        meta: {
          title:'角色列表配置',
          tabs:['权限与角色管理','角色列表', '角色列表配置'],
          keep:false
        },
      },{
        path:'/managerDepartment',
        name:'managerDepartment',
        component:managerDepartment,
        meta: {
          title:'部门列表',
          tabs:['权限与角色管理','部门列表'],
          keep:true
        },
      },{
        //渠道商模块
        path: '/canals',
        name: 'canals',
        component: canals,
        meta: {
          title:'渠道商列表',
          tabs:['渠道商管理','渠道商列表'],
          keep:true
        },
      },{
        path: '/cancelDetailList',
        name: 'cancelDetailList',
        component: cancelDetailList,
        meta: {
          title:'渠道商管理-渠道商列表',
          tabs:['渠道商管理','渠道商列表', '订单详情'],
          keep:false
        },
      },{
          path: '/canalRealTime',
          name: 'canalRealTime',
          component: canalRealTime,
          meta: {
            title:'渠道商管理-渠道商实时统计',
            tabs:['渠道商管理','渠道商列表', '渠道商实时统计'],
            keep:true
          },
        },
        {
          path: '/totalReport',
          name: 'totalReport',
          component: totalReport,
          meta: {
            title:'渠道商管理-总统计报表',
            tabs:['渠道商管理','总统计报表'],
            keep:true
          },
        },
        {
          path: '/channelReport',
          name: 'channelReport',
          component: channelReport,
          meta: {
            title:'渠道商管理-渠道统计报表',
            tabs:['渠道商管理','渠道统计报表'],
            keep:true
          },
        },
        {
          path: '/channelReportDetail',
          name: 'channelReportDetail',
          component: channelReportDetail,
          meta: {
            title:'渠道商管理-渠道统计报表',
            tabs:['渠道商管理','渠道统计报表'],
            keep:true
          },
        },
        
        {
        path: '/canalsMember',
        name: 'canalsMember',
        component: canalsMember,
        meta: {
          title:'渠道商列表-会员详情',
          tabs:['渠道商管理','渠道商列表', '会员详情'],
          keep:false
        },
      },{
        path: '/canalsChange',
        name: 'canalsChange',
        component: canalsChange,
        meta: {
          title:'渠道商配置',
          tabs:['渠道商管理','渠道商列表','渠道商配置'],
          keep:false
        },
      },{
        //会员模块
        path: '/member',
        name: 'member',
        component: member,
        meta: {
          title:'会员列表',
          tabs:['会员管理','会员列表'],
          keep:true
        },
      },
      {
        path: '/memberList',
        name: 'memberList',
        component: memberList,
        meta: {
          title:'会员列表',
          tabs:['会员管理','会员列表'],
          keep:true
        },
      },
      {
        path: '/memberNoList',
        name: 'memberNoList',
        component: memberNoList,
        meta: {
          title:'未认证列表',
          tabs:['会员管理','未认证列表'],
          keep:true
        },
      },
      {
        path: '/blackMemberList',
        name: 'blackMemberList',
        component: blackMemberList,
        meta: {
          title:'黑名单会员列表',
          tabs:['会员管理','黑名单会员列表'],
          keep:true
        },
      },
      {
        path: '/memberMyList',
        name: 'memberMyList',
        component: memberMyList,
        meta: {
          title:'我的会员列表',
          tabs:['会员管理','我的会员列表'],
          keep:true
        },
      },
      {
        //客户管理
        path: '/auditing',
        name: 'auditing',
        component: auditing,
        meta: {
          title:'信审管理',
          tabs:['信审管理','信审管理'],
          keep:true
        },
      },{
        //我的信审列表
        path: '/auditing2',
        name: 'auditing2',
        component: auditing2,
        meta: {
          title:'我的信审列表',
          tabs:['信审管理','我的信审列表'],
          keep:true
        },
      },{
        //新认证信息
        path: '/riskIndex',
        name: 'riskIndex',
        component: riskIndex,
        meta: {
          title:'认证信息',
          tabs:['信审管理','认证信息'],
          keep:false
        },
      },{
        //我的信审列表
        path: '/auditingLiuRecord',
        name: 'auditingLiuRecord',
        component: auditingLiuRecord,
        meta: {
          title:'信审管理-流转记录',
          tabs:['信审管理','流转记录'],
          keep:false
        },
      },{
        path: '/basicTaobaoAddress',
        name: 'basicTaobaoAddress',
        component: basicTaobaoAddress,
        meta: {
          title:'信审管理-淘宝地址',
          tabs:['淘宝地址'],
          keep:false
        },
      },{
        path: '/basicTaobaoBuy',
        name: 'basicTaobaoBuy',
        component: basicTaobaoBuy,
        meta: {
          title:'信审管理-淘宝购买记录',
          tabs:['淘宝购买记录'],
          keep:false
        },
      },{
        path: '/udUserInfo',
        name: 'udUserInfo',
        component: udUserInfo,
        meta: {
          title:'信审管理-有盾多头报告',
          tabs:['有盾多头报告'],
          keep:false
        },
      }
      ,{
        path: '/loanIdenti',
        name: 'loanIdenti',
        component: loanIdenti,
        meta: {
          title:'认证信息-查看认证信息',
          tabs:['认证信息', '查看认证信息'],
          keep:false
        },
      },
      {
        // 贷款管理部分
        path: '/loanManagement',
        name: 'loanManagement',
        component: loanManagement,
        meta: {
          title:'贷款管理-放款管理',
          tabs:['贷款管理','放款管理'],
          keep:true
        },
      },
      {
        // 贷款管理部分
        path: '/loanAlreadyList',
        name: 'loanAlreadyList',
        component: loanAlreadyList,
        meta: {
          title:'贷款管理-已放款列表',
          tabs:['贷款管理','已放款列表'],
          keep:true
        },
      },
      {
        path: '/loanWaitingList',
        name: 'loanWaitingList',
        component: loanWaitingList,
        meta: {
          title:'贷款管理-待放款列表',
          tabs:['贷款管理','待放款列表'],
          keep:true
        },
      },
      {
        path: '/loanNoRepayList',
        name: 'loanNoRepayList',
        component: loanNoRepayList,
        meta: {
          title:'贷款管理-待还款列表',
          tabs:['贷款管理','待还款列表'],
          keep:true
        },
      },
      {
        path: '/loanRepayedList',
        name: 'loanRepayedList',
        component: loanRepayedList,
        meta: {
          title:'贷款管理-已还款列表',
          tabs:['贷款管理','已还款列表'],
          keep:true
        },
      },
      {
        path: '/loanMyList',
        name: 'loanMyList',
        component: loanMyList,
        meta: {
          title:'贷款管理-我的放款列表',
          tabs:['贷款管理','我的放款列表'],
          keep:true
        },
      },
      {
        path: '/loanUserList',
        name: 'loanUserList',
        component: loanUserList,
        meta: {
          title:'贷款管理-借款用户列表',
          tabs:['贷款管理','借款用户列表'],
          keep:true
        },
      },
      {
        //催收管理部分
        path: '/callAllList',
        name: 'callAllList',
        component: callAllList,
        meta: {
          title:'催款管理-催收总列表',
          tabs:['催款管理','催收总列表'],
          keep:true
        },
      },{
        path: '/callTaobao',
        name: 'callTaobao',
        component: callTaobao,
        meta: {
          title:'催款管理-淘宝认证',
          tabs:['催款管理','淘宝认证'],
          keep:false
        },
      },{
        path: '/callZero',
        name: 'callZero',
        component: callZero,
        meta: {
          title:'催款管理-S0',
          tabs:['催款管理','S0'],
          keep:true
        },
      },{
        path: '/callOne',
        name: 'callOne',
        component: callOne,
        meta: {
          title:'催款管理-S1',
          tabs:['催款管理','S1'],
          keep:true
        },
      },{
        path: '/callTwo',
        name: 'callTwo',
        component: callTwo,
        meta: {
          title:'催款管理-S2',
          tabs:['催款管理','S2'],
          keep:true
        },
      },{
        path: '/callThree',
        name: 'callThree',
        component: callThree,
        meta: {
          title:'催款管理-S3',
          tabs:['催款管理','S3'],
          keep:true
        },
      },{
        path: '/callPMy',
        name: 'callPMy',
        component: callPMy,
        meta: {
          title:'催款管理-我的催收列表',
          tabs:['催款管理','我的催收列表'],
          keep:true
        },
      },{
        path: '/callTongDun',
        name: 'callTongDun',
        component: callTongDun,
        meta: {
          title:'催款管理-同盾报告',
          tabs:['催款管理','同盾报告'],
          keep:false
        },
      },{
        path: '/callRecord',
        name: 'callRecord',
        component: callRecord,
        meta: {
          title:'催款管理-催收记录',
          tabs:['催款管理','催收记录'],
          keep:false
        },
      },{
        path: '/callAddCallRecord',
        name: 'callAddCallRecord',
        component: callAddCallRecord,
        meta: {
          title:'催款管理-新增催收记录和备注',
          tabs: ['催款管理','新增催收记录和备注'],
          keep: false
        },
      },{
        path: '/callPhone',
        name: 'callPhone',
        component: callPhone,
        meta: {
          title:'催款管理-通讯录',
          tabs:['催款管理','通讯录'],
          keep:false
        },
      },{
        path: '/callDetail',
        name: 'callDetail',
        component: callDetail,
        meta: {
          title:'催款管理-详细信息',
          tabs:['催款管理','详细信息'],
          keep:false
        },
      },{
        path: '/callOrderTransferRecord',
        name: 'callOrderTransferRecord',
        component: callOrderTransferRecord,
        meta: {
          title:'催款管理-订单流转记录',
          tabs:['催款管理','订单流转记录'],
          keep:false
        },
      },{
        path: '/callDerate',
        name: 'callDerate',
        component: callDerate,
        meta: {
          title:'催款管理-减免审核',
          tabs:['催款管理','减免审核'],
          keep:true
        },
      },{
        path: '/dataFinance',
        name: 'dataFinance',
        component: dataFinance,
        meta: {
          title:'数据统计-每日放款统计',
          tabs:['数据统计','每日放款统计'],
          keep:true
        },
      },{
        path: '/dataCanal',
        name: 'dataCanal',
        component: dataCanal,
        meta: {
          title:'数据统计-渠道商统计',
          tabs:['数据统计','渠道商统计'],
          keep:true
        },
      },{
        path: '/dataAccountsDue',
        name: 'dataAccountsDue',
        component: dataAccountsDue,
        meta: {
          title:'数据统计-应收款查询',
          tabs:['数据统计','应收款查询'],
          keep:true
        },
      },{
        path: '/dataCall',
        name: 'dataCall',
        component: dataCall,
        meta: {
          title:'数据统计-每日收款统计',
          tabs:['数据统计','每日收款统计'],
          keep:true
        },
      },
      {
        path: '/getAuditCount',
        name: 'getAuditCount',
        component: getAuditCount,
        meta: {
          title:'数据统计-信审统计',
          tabs:['数据统计','信审统计'],
          keep:true
        },
      },
      {
        path: '/collectionReport',
        name: 'collectionReport',
        component: collectionReport,
        meta: {
          title:'数据统计-催收统计',
          tabs:['数据统计','催收统计'],
          keep:true
        },
      },
      {
        path: '/collectionAssessReport',
        name: 'collectionAssessReport',
        component: collectionAssessReport,
        meta: {
          title:'数据统计-催收绩效统计',
          tabs:['数据统计','催收绩效统计'],
          keep:true
        },
      },{
        path: '/flowControl',
        name: 'flowControl',
        component: flowControl,
        meta: {
          title:'数据统计-流量控制',
          tabs:['数据统计','流量控制'],
          keep:true
        },
      },{
        path: '/dataAllOrder',
        name: 'dataAllOrder',
        component: dataAllOrder,
        meta: {
          title:'财务中心-总订单列表',
          tabs:['财务中心','总订单列表'],
          keep:true
        },
      },{
        path: '/dataExtendOver',
        name: 'dataExtendOver',
        component: dataExtendOver,
        meta: {
          title:'财务中心-清算中心',
          tabs:['财务中心','清算中心'],
          keep:true
        },
      },
      {
        path: '/riskStatistics',
        name: 'riskStatistics',
        component: riskStatistics,
        meta: {
          title:'财务中心-风控统计',
          tabs:['财务中心','风控统计'],
          keep:true
        },
      },
      {
        path: '/msgStatistics',
        name: 'msgStatistics',
        component: msgStatistics,
        meta: {
          title:'财务中心-短信统计',
          tabs:['财务中心','短信统计'],
          keep:true
        },
      },
      {
        path: '/dataTodayWhite',
        name: 'dataTodayWhite',
        component: dataTodayWhite,
        meta: {
          title:'财务中心-今日待还',
          tabs:['财务中心','今日待还'],
          keep:true
        },
      },{
        path: '/dataTomorrowWhite',
        name: 'dataTomorrowWhite',
        component: dataTomorrowWhite,
        meta: {
          title:'财务中心-明日待还',
          tabs:['财务中心','明日待还'],
          keep:true
        },
      },{
        path: '/dataHadToday',
        name: 'dataHadToday',
        component: dataHadToday,
        meta: {
          title:'财务中心-贷后当日回款',
          tabs:['财务中心','贷后当日回款'],
          keep:true
        },
      },{
        path: '/dataHadAll',
        name: 'dataHadAll',
        component: dataHadAll,
        meta: {
          title:'财务中心-贷后总回款',
          tabs:['财务中心','贷后总回款'],
          keep:true
        },
      },{
        path: '/messageManage',
        name: 'messageManage',
        component: messageManage,
        meta: {
          title:'信息管理-信息管理',
          tabs:['信息管理','信息管理'],
          keep:true
        },
      },{
        path: '/messageManageAdd',
        name: 'messageManageAdd',
        component: messageManageAdd,
        meta: {
          title:'信息管理-信息管理配置',
          tabs:['信息管理','信息管理','信息管理配置'],
          keep:false
        },
      },{
        path: '/preferential',
        name: 'preferential',
        component: preferential,
        meta: {
          title:'优惠券设置-优惠券设置',
          tabs:['优惠券设置','优惠券设置'],
          keep:true
        },
      },{
        path: '/preferentialAdd',
        name: 'preferentialAdd',
        component: preferentialAdd,
        meta: {
          title:'优惠券设置-优惠券配置',
          tabs:['优惠券设置','优惠券设置', '优惠券配置'],
          keep:false
        },
      },{
        path: '/preferentialPeople',
        name: 'preferentialPeople',
        component: preferentialPeople,
        meta: {
          title:'优惠券设置-优惠券人员管理',
          tabs:['优惠券设置','优惠券人员管理'],
          keep:true
        },
      },{
        path: '/preferentialPeopleDetail',
        name: 'preferentialPeopleDetail',
        component: preferentialPeopleDetail,
        meta: {
          title:'优惠券设置-优惠券详情',
          tabs:['优惠券设置','优惠券人员管理','优惠券详情'],
          keep:false
        },
      },{
        path: '/advert',
        name: 'advert',
        component: advert,
        meta: {
          title:'广告管理-广告发布与管理',
          tabs:['广告管理','广告发布与管理'],
          keep:false
        },
      },{
        path: '/basePrope',
        name: 'basePrope',
        component: basePrope,
        meta: {
          title:'极光推送',
          tabs:['基本信息','极光推送'],
          keep:true
        },
      },{
        path: '/basePropeAdd',
        name: 'basePropeAdd',
        component: basePropeAdd,
        meta: {
          title:'极光推送配置',
          tabs:['基本信息','极光推送','极光推送配置'],
          keep:false
        },
      },{
        path: '/basePropePeople',
        name: 'basePropePeople',
        component: basePropePeople,
        meta: {
          title:'推送配置',
          tabs:['基本信息','极光推送','推送配置'],
          keep:false
        },
      },{
        path: '/baseAbout',
        name: 'baseAbout',
        component: baseAbout,
        meta: {
          title:'关于我们',
          tabs:['基本信息','关于我们'],
          keep:true
        },
      },{
        path: '/explain',
        name: 'explain',
        component: explain,
        meta: {
          title:'基本信息-用户反馈信息',
          tabs:['基本信息','用户反馈信息'],
          keep:true
        },
      },{
        // 登录日志
        path: '/backstageLogin',
        name: 'backstageLogin',
        component: backstageLogin,
        meta: {
          title:'后台管理登录日志',
          tabs:['登录日志','后台管理登录日志'],
          keep:true
        },
      },{
        // APP日志
        path: '/backstageAPP',
        name: 'backstageAPP',
        component: backstageAPP,
        meta: {
          title:'App登录日志',
          tabs:['登录日志','App登录日志'],
          keep:true
        },
      },{
        path: '/backUp',
        name: 'backUp',
        component: backUp,
        meta: {
          tabs:['系统数据备份','数据备份'],
          keep:true
        },
      }]
    }
  ]
})
