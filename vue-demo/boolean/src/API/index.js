import axios from "axios";
import Cookie from "js-cookie";

// const urlcore = process.env.API;
// 测试接口
//const urlcore = "//api.maoyan.hongyds.com";
//const urlcore = "//api.jinli.luzuang.com";
//const urlcore = "//127.0.0.1:8080";
// const urlcore = "//api-yanshi.luzuang.com";
// const mockUrl = '//127.0.0.1:8001';
let config = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8"
  }
};
// 获取登录信息
export function getthisLogin() {
  const url = urlcore + "/admin/admin/getThisLogin";
  return axios.get(url);
}
// 获取登录电话信息
export function getPhones() {
  const url = urlcore + "/admin/sysConfig/selectAll?";
  return axios.get(url);
}

// 七陌电话呼出接口 https://developer.7moor.com/v2docs/dialout/
export function callPhone(params, account, authorization) {
  const url = "//apis.7moor.com/v20160818/call/dialout/" + account;
  console.log(url);
  let headers = {
    'Authorization': authorization,
    'Content-Type': 'application/json;charset=utf-8'
  }
  // console.log(headers);
  return axios.post(url, params, {headers:headers});
}

export function getPhonesCode(params) {
  const url = urlcore + "/admin/user/adminGetPhoneCode";
  return axios.get(url, {
    params: params
  });
}

export function toLogin(params) {
  const url = urlcore + "/admin/user/login";
  return axios.get(url, { params });
}

export function toLoginOut() {
  const url = urlcore + "/admin/admin/logout";
  return axios.get(url);
}
//修改登录密码
export function editMyPassword(params) {
  const url = urlcore + "/admin/admin/updataPasswordByLogin";
  return axios.post(url,params);
}
//首页
/**
 * 首页统计
 * @returns {AxiosPromise<any>}
 */
export function getIndexGeneralStatic(){
  const url = urlcore + "/admin/shouYeStatistics/shouYeStatistics";
  //const url = mockUrl+'/admin/shouYeStatistics/shouYeStatistics';
  return axios.post(url);
}
/**
 * 借款趋势图
 */
export function getIndexLoanChart(params){
  const url = urlcore + "/admin/shouYeStatistics/fangKuanTongJi";
  //const url = mockUrl+'/api/shouYeStatistics/fangKuanTongJi';
  return axios.post(url,params);
}
/**
 * 还款趋势图
 */
export function getIndexRepayChart(params){
   const url = urlcore + "/admin/shouYeStatistics/huiKuanTongJi";
  //const url = mockUrl+'/api/shouYeStatistics/huiKuanTongJi';
  return axios.post(url,params);
}
//end 首页
// 首页获取数据
export function userCount() {
  const url = urlcore + "/admin/index/selectSumAuthInfo";
  return axios.get(url);
}
export function loanData() {
  const url = urlcore + "/admin/index/selectSumGiveMoneyInfo";
  return axios.get(url);
}
export function fengKong() {
  const url = urlcore + "/admin/index/selectRiskManagement";
  return axios.get(url);
}
export function shoukuan() {
  const url = urlcore + "/admin/index/selectRapaymentStatistics";
  return axios.get(url);
}
export function qudaoCount() {
  const url = process.env.NODE_ENV=="development"?'http://127.0.0.1:8092':location.origin;
  return axios.get(url+"/api/channelCount");
  // return axios.get("https://admin-fengnyj.51luz.com/api/channelCount");
}
export function init() {
  const url = urlcore + "/admin/index/statementSelect";
  return axios.get(url);
}
export function getYear(params) {
  const url = urlcore + "/admin/index/findMoneyStatistics";
  return axios.get(url, { params });
}
// 系统设置
// 利率设置
export function systemRetList(params) {
  const url = urlcore + "/admin/paramSetting/selectAllType";
  return axios.get(url, { params });
}
export function setRiskList(params) {
  const url = urlcore + "/admin/sysConfig/setRiskConfig";
  return axios.get(url, { params });
}
export function selectSysList(params) {
  const url = urlcore + "/admin/sysConfig/selectSysConfigByKey";
  return axios.get(url, { params });
}
export function systemRetStop(params) {
  const url = urlcore + "/admin/paramSetting/stopUsing";
  return axios.get(url, { params });
}
export function systemRetDelete(params) {
  const url = urlcore + "/admin/paramSetting/GoDeleteUpdate";
  return axios.get(url, { params });
}
export function systemRetAddSearch(params) {
  const url = urlcore + "/admin/paramSetting/selectOne";
  return axios.get(url, { params });
}
export function systemRetAdd(params) {
  const url = urlcore + "/admin/paramSetting/addAndShow";
  return axios.post(url, params);
}
export function systemRetSave(params) {//保存按钮
  const url = urlcore + "/admin/sysConfig/xuButton";
  return axios.get(url, {params});
}
export function systemRetUpdate(params) {
  const url = urlcore + "/admin/paramSetting/update";
  return axios.post(url, params);
}
export function systemAgreeContert(params) {
  const url = urlcore + "/admin/agreement/selectOneByType";
  return axios.get(url, { params });
}
export function systemNoteContert(params) {
  const url = urlcore + "/admin/msgModel/selectOneByType";
  return axios.get(url, { params });
}
export function systemNoteChange(params) {
  const url = urlcore + "/admin/msgModel/update";
  return axios.post(url, params);
}
// 参数设置
export function systemParamTong(params) {
  const url = urlcore + "/admin/sysConfig/updateTongdun";
  return axios.get(url, { params });
}
export function systemParamXuqi(params) {
  const url = urlcore + "/admin/sysConfig/updateXuQi";
  return axios.get(url, { params });
}
export function systemParamPicture(params) {//保存支付图片
  const url = urlcore + "/admin/sysConfig/savePicture";
  return axios.post(url, params);
}
export function systemParamMoney(params) {
  const url = urlcore + "/admin/sysConfig/updateMoney";
  return axios.get(url, { params });
}
export function systemParamNianlin(params) {
  const url = urlcore + "/admin/sysConfig/updateParam";
  return axios.get(url, { params });
}
export function setRiskAgeNianlin(params) {
  const url = urlcore + "/admin/sysConfig/setRiskAge";
  return axios.get(url, { params });
}
export function systemParamPhone(params) {
  const url = urlcore + "/admin/sysConfig/setAllPhone";
  return axios.post(url, params);
}

// 权限与角色管理
// 系统管理员
export function managerPeoList(params) {
  const url = urlcore + "/admin/admin/selectPage";
  return axios.get(url, { params });
}
// 角色列表
export function managerRoleList(params) {
  const url = urlcore + "/admin/tgroup/selectAllGroups";
  return axios.get(url, { params });
}
//获取全部权限
export function managerAllRoleList(params) {
  const url = urlcore+ "/admin/secondMenu/selectAllMenu";
  return axios.get(url,{params});
}
export function managerProDel(params) {
  const url = urlcore + "/admin/admin/deleteOne";
  return axios.get(url, { params });
}
export function managerProDetailList(params) {
  const url = urlcore + "/admin/tgroup/findByPage";
  return axios.post(url, params);
}
export function managerRoleAddList(params) {
  const url = urlcore + "/admin/secondMenu/selectMenuDetail";
  return axios.get(url, { params });
}
export function managerRoleChangeList(params) {
  const url = urlcore + "/admin/tpermission/selectUrlById";
  return axios.post(url, params);
}
export function managerRoleDel(params) {
  const url = urlcore + "/admin/tgroup/deleteOne";
  return axios.post(url, params);
}
export function managerRoleSet(params) {
  const url = urlcore + "/admin/tpermission/setGroupUrl";
  return axios.post(url, params);
}
export function managerDepAddRoleList(params) {
  const url = urlcore + "/admin/tgroup/selectAllGroups";
  return axios.get(url, { params });
}
export function managerDepAddDepList(params) {
  const url = urlcore + "/admin/department/selectDepartmentAll";
  return axios.get(url);
}
export function managerDepAddList(params) {
  const url = urlcore + "/admin/admin/selectOne";
  return axios.get(url, { params });
}
export function managerDepAdd(params) {
  const url = urlcore + "/admin/admin/add";
  return axios.post(url, params);
}
// 部门列表
export function managerDepartmentList(params) {
  const url = urlcore + "/admin/department/findList";
  return axios.get(url, { params });
}
export function managerDepartmentAdd(params) {
  const url = urlcore + "/admin/department/add";
  return axios.post(url, params);
}
export function managerDepartmentDel(params) {
  const url = urlcore + "/admin/department/deleteById";
  return axios.get(url, { params });
}
//渠道管理
// 渠道商获取列表
export function getCanalsList(params) {
  const url = urlcore + "/admin/channel/selectList";
  return axios.get(url, { params });
}
/**
 * 渠道商统计概览
 * @param {pageSize:0,pageNo,time,dateTime,channelName} params 
 * @return axios.post
 */
export function getChannelOverview(params){
  const url = urlcore+"/admin/everydaychannelcount/getOverview";
  return axios.post(url,params);
}
/**
 * 系统总统计包括渠道
 * @param {*} params 
 */
export function getTotalOverview(params){
  const url = urlcore+"/admin/everydaychannelcount/getEverydayOverview";
  return axios.post(url,params);
}
export function getTotalProtection(params){
  const url = urlcore+"/admin/loanOrder/selectOverallPaymentProtection";
  return axios.post(url,params);
}
/**
 * 渠道商注册数据统计
 * @param {*} params 
 */
export function getChannelRegisterCount(params){
  const url = urlcore+"/admin/everydaychannelcount/getRegisterCount";
  return axios.post(url,params);
}
/**
 * 认证数据统计
 * @param {*} params 
 */
export function getChannelAuthenticationCount(params){
  const url = urlcore+"/admin/everydaychannelcount/getAuthenticationCount";
  return axios.post(url,params);
}
/**
 * 审核数据统计
 * @param {*} params 
 */
export function getChannelExaminationCount(params){
  const url = urlcore+"/admin/everydaychannelcount/getExaminationCount";
  return axios.post(url,params);
}
/**
 * 逾期数据统计
 * @param {*} params 
 */
export function getChannelOverdueCount(params){
  const url = urlcore+"/admin/everydaychannelcount/getOverdueCount";
  return axios.post(url,params);
}
//渠道商修改获取列表
export function canalsGetUser(params) {
  const url = urlcore + "/admin/channel/selectOne";
  return axios.get(url, { params });
}
export function cancelDetailList(params) {
  const url = urlcore + "/admin/loanOrder/channelSelectLoanOrder";
  return axios.get(url, { params });
}
export function canalsAdd(params) {
  const url = urlcore + "/admin/channel/add";
  return axios.post(url, params, config);
}
export function canalsUpdate(params) {
  const url = urlcore + "/admin/channel/update";
  return axios.post(url, params, config);
}
export function canalsDel(params) {
  const url = urlcore + "/admin/channel/deleteOne";
  return axios.get(url, { params });
}
export function canalsMemberList(params) {
  const url = urlcore + "/admin/channel/findMyMember1";
  return axios.get(url, { params });
}
//end 渠道管理
//会员列表函数
export function selectUserList(params) {
  //分页查询会员列表
  const url = urlcore + "/admin/user/selectUserList";
  return axios.get(url, { params });
}
/**
 * 获取黑名单用户列表
 * @param {*} params 
 */
export function getBlackMemberList(params) {
  const url = urlcore + "/admin/user/selectBlackUserList";
  return axios.post(url,params);
}
/**
 * 异常黑名单
 * @param {*} params 
 */
export function removeBlackMember(params) {
  const url = urlcore + "/admin/user/moveOutBlackList";
  return axios.post(url,params);
}
export function selectCallList(params) {
  //查询拨打记录
  const url = urlcore + "/admin/user/selectCallList";
  return axios.get(url, { params });
}
export function addCallResult(params) {
  //添加拨打记录
  const url = urlcore + "/admin/user/addCallResult";
  return axios.post(url, params);
}
export function selectUnAuthUserList(params) {
  //查询未认证用户列表
  const url = urlcore + "/admin/user/selectUnAuthUserList";
  return axios.get(url, { params });
}
export function selectMyAuthUserList(params) {
  //查询我的会员列表
  const url = urlcore + "/admin/user/selectMyAuthUserList";
  return axios.get(url, { params });
}
export function listTelephonist(params) {
  //查询话务员列表
  const url = urlcore + "/admin/user/listTelephonist";
  return axios.get(url, { params });
}
export function distributionMember(params) {
  //话务员分配
  const url = urlcore + "/admin/user/distributionMember";
  return axios.post(url, params);
}
export function reDistributionMember(params) {
  //话务员转派
  const url = urlcore + "/admin/user/reDistributionMember";
  return axios.post(url, params);
}
export function listDialDistributeRecordHistory(params) {
  //流转记录
  const url = urlcore + "/admin/user/listDialDistributeRecordHistory";
  return axios.get(url, { params });
}
export function UserJoinBlack(params) {
  const url = urlcore + "/admin/loanOrder/joinBlackList";
  return axios.get(url, { params });
}
export function UserForbidden(params) {
  //会员禁止
  const url = urlcore + "/admin/loanOrder/stopUse";
  return axios.get(url, { params });
}
export function UserRecover(params) {
  //会员恢复
  const url = urlcore + "/admin/loanOrder/recoverUse";
  return axios.get(url, { params });
}

// 信审模块
export function auditingUserList(params) {
  const url = urlcore + "/admin/userZhifubao/findList";
  return axios.get(url, { params });
}
/**
 * 信审领件
 * @param {*} params 
 */
export function toMyAuditing(params) {
  const url = urlcore + "/admin/user/auditorLingJian";
  return axios.post(url, params );
}
/**
 * 用户时序图
 * @param {*} params 
 */
export function getUserTimeLine(params) {
  const url = urlcore + "/admin/user/timeSeries";
  return axios.get(url, { params });
}
//获取用户基本认证信息
export function userRiskBaseInfo(params){
  const url = urlcore + "/admin/user/userDetil";
  return axios.get(url, { params });
}
//获取用户三方风控结果
export function userRiskInfo(params){
  const url = urlcore + "/admin/userTaobao/getRiskresultShow";
  return axios.get(url, { params });
}
/**
 * 用户淘宝数据
 * @param {*} params 
 */
export function userTaobaoInfo(params){
  const url = urlcore + "/admin/userTaobao/getTaoBaoCallback";
  return axios.get(url, { params });
}
//分配额度
export function giveUserMoneyById(params) {
  const url = urlcore + "/admin/user/setMoney";
  return axios.get(url, { params });
}
//风控拒绝用户
export function auditingNoPassUserList(params) {
  // const url = urlcore + "/admin/user/selectRiskList";
  const url = urlcore + "/admin/userZhifubao/findList";
  return axios.get(url, { params });
}
//风控决绝结果
export function auditingRiskRecord(params) {
   const url = urlcore + "/admin/user/riskDetil";
  return axios.get(url, { params });
}
//审核记录结果
export function auditingRefuseRecord(params) {
  const url = urlcore + "/admin/auditRecord/selectAuditRecord";
  return axios.get(url, { params });
}
//用户历史订单
export function userHistoryOrder(params) {
  const url = urlcore + "/admin/loanOrder/viewHistoryOrder";
  return axios.post(url,  params);
}
/**
 * 数据魔盒免密码登录
 *
 * @export
 * @returns
 */
export function getMoheToken(){
  const url = urlcore + "/admin/other/getMoheToken";
  return axios.get(url);
}
/**
 *获取有盾用户画像
 * @param params
 * @export
 * @returns axios
 */
export function getUdUserinfo(params){
  const url = urlcore + "/admin/userIdentity/userUdDspInfo";
  return axios.get(url,{ params });
}
export function auditingAlot(params) {
  const url = urlcore + "/admin/user/distribute";
  return axios.post(url, params);
}
export function auditingChange(params) {
  const url = urlcore + "/admin/user/redeploy";
  return axios.post(url, params);
}
export function auditingSelectPeople(params) {
  const url = urlcore + "/admin/admin/informationReviewList";
  return axios.get(url, { params });
}
export function auditingLiuList(params) {
  const url = urlcore + "/admin/userFlowRecord/selectUserFlowRecord";
  return axios.get(url, { params });
}
export function auditingRecordList(params) {
  const url = urlcore + "/admin/auditRecord/selectAuditRecord";
  return axios.get(url, { params });
}
export function auditingTemporaryList(params) {
  const url = urlcore + "/admin/userZhifubao/temporaryAllRefuseUserList";
  return axios.get(url, { params });
}
export function auditingMyList(params) {
  const url = urlcore + "/admin/userZhifubao/findMyList";
  return axios.get(url, { params });
}
export function auditingMyTemporaryList(params) {
  const url = urlcore + "/admin/userZhifubao/temporaryMyRefuseUserList";
  return axios.get(url, { params });
}
export function auditingLinQu() {
  const url = urlcore + "/admin/user/selectLinQuInfo";
  return axios.get(url);
}
export function auditingApply(params) {
  const url = urlcore + "api/user/applyAuthAuditList";
  return axios.get(url, { params });
}
export function auditingCredit(params) {
  const url = urlcore + "/admin/userZhifubao/addHuabei";
  return axios.get(url, { params });
}
export function auditingUrgent(params) {
  const url = urlcore + "/admin/userPhoneList/selectEmInfo";
  return axios.get(url, { params });
}
export function auditingRefuse(params) {
  const url = urlcore + "/admin/userZhifubao/temporaryRefuse";
  return axios.post(url, params, config);
}
export function auditingRefuseF(params) {
  const url = urlcore + "/admin/userZhifubao/foreverRefuse";
  return axios.post(url, params, config);
}
export function find1WeekByUserPage(params) {
  //七天通话记录
  const url = urlcore + "/admin/userPhoneList/find1WeekByUserPage";
  return axios.get(url, { params });
}
// 新颜报告
export function auditingNewYan(params) {
  const url = urlcore + "/admin/loanOrder/selectXinYan";
  return axios.get(url, { params });
}

// 基本信息认证
export function basicInList(params) {
  const url = urlcore + "/admin/userBasicMsg/findByPage";
  return axios.get(url, { params });
}
export function basicInDetail(params) {
  const url = urlcore + "/admin/userBasicMsg/selectOneDetails";
  return axios.get(url, { params });
}
export function basicInPhone(params) {
  const url = urlcore + "/admin/userPhoneList/findByUserPage";
  return axios.get(url, { params });
}
// 身份认证
export function basicIdentList(params) {
  const url = urlcore + "/admin/userIdentity/findByPage";
  return axios.get(url, { params });
}
export function basicIdentDetail(params) {
  const url = urlcore + "/admin/userIdentity/selectOne";
  return axios.get(url, { params });
}

export function basicPhoneRecordList(params) {
  const url = urlcore + "/admin/userPhoneRecord/findByUserIdPage";
  return axios.get(url, { params });
}
// 银行认证
export function basicBankList(params) {
  const url = urlcore + "/admin/userBank/findByPage";
  return axios.get(url, { params });
}
// 淘宝认证
export function basicTaokList(params) {
  const url = urlcore + "/admin/userTaobao/findByPage";
  return axios.get(url, { params });
}
export function basicTaoRecordList(params) {
  //同盾报告
  const url = urlcore + "/admin/userTaobaoAddress/findByAddressPage";
  return axios.get(url, { params });
}
export function basicTaoBuyList(params) {
  const url = urlcore + "/admin/userTabaoGoods/findByGoodsPage";
  return axios.get(url, { params });
}
export function basicZhifubaoOne(params) {
  const url = urlcore + "/admin/userZhifubao/selectOne";
  return axios.get(url, { params });
}

export function exportExcel(params) {
  const url = urlcore + "/admin/user/makeExcle";
  return axios.get(url, { params });
}
// 贷款管理
export function loanMachineList(params) {
  //待放款列表
  const url = urlcore + "/admin/loanOrder/userSelectToGiveMoneyOrder";
  return axios.get(url, { params });
}
export function transferTopassMoneyList(params) {
  //转派
  const url = urlcore + "/admin/loanOrder/transferTopassMoneyList";
  return axios.post(url, params);
}
export function passMoneyAuditRecords(params) {
  //添加终审记录
  const url = urlcore + "/admin/passMoneyAuditRecords/add";
  return axios.post(url, params);
}
export function selectAuditRecords(params) {
  //查询终审记录
  const url = urlcore + "/admin/passMoneyAuditRecords/selectAuditRecords";
  return axios.get(url, { params });
}

export function selectGiveMoneyMan(params) {
  //放款员列表
  const url = urlcore + "/admin/admin/selectGiveMoneyMan";
  return axios.get(url, { params });
}
export function allotToPassMoneyList(params) {
  //分配贷催收订单
  const url = urlcore + "/admin/loanOrder/allotToPassMoneyList";
  return axios.post(url, params);
}
export function selectPassedMoneyLoanOrder(params) {
  //已放款列表
  const url = urlcore + "/admin/loanOrder/selectPassedMoneyLoanOrder";
  return axios.get(url, { params });
}
export function loanUserList(params) {
  //借款用户列表
  const url = urlcore + "/admin/user/loanUserList";
  return axios.post(url, params);
}
export function extendList(params) {
  //续期记录
  const url = urlcore + "/admin/loanOrder/extendList";
  return axios.get(url, { params });
}
export function xuQiButton(params) {
  //是否可以续期
  const url = urlcore + "/admin/loanOrder/xuQiButton";
  return axios.post(url, params);
}
export function selectMyPassLoanOrder(params) {
  //我的放款列表
  const url = urlcore + "/admin/loanOrder/selectMyPassLoanOrder";
  return axios.get(url, { params });
}
export function loanMachineRecover(params) {
  const url = urlcore + "/admin/user/thisRecover";
  return axios.get(url, { params });
}
export function loanToUnder(params) {
  const url = urlcore + "/admin/user/payOrder";
  return axios.get(url, { params });
}
export function loanToYibao(params) {
  //易宝打款
  const url = urlcore + "/admin/user/eBPayByHand";
  return axios.get(url, { params });
}
export function agencyDeduction(params) {
  //分配贷催收订单
  const url = urlcore + "/admin/loanOrder/agencyDeduction";
  return axios.post(url, params);
}
export function loanClear(params) {
  const url = urlcore + "/admin/user/repayOrder";
  return axios.get(url, { params });
}
export function loanToBad(params) {
  const url = urlcore + "/admin/loanOrder/dropBadDebt";
  return axios.get(url, { params });
}

export function loanApplyOld(params) {
  const url = urlcore + "/admin/loanOrder/selectOldOrder";
  return axios.get(url, { params });
}
export function loanApplyBefore(params) {
  const url = urlcore + "/admin/loanOrder/selectOneByEvaNum";
  return axios.get(url, { params });
}
export function loanApplyDetail(params) {
  const url = urlcore + "/admin/loanOrder/selectOneDetail";
  return axios.get(url, { params });
}
export function loanApplyAgree(params) {
  //我的放款列表中的 通过
  const url = urlcore + "/admin/loanOrder/thisAgree";
  return axios.get(url, { params });
}
export function loanApplyReject(params) {
  //我的放款列表中的 拒绝
  const url = urlcore + "/admin/loanOrder/thisRefuse";
  return axios.get(url, { params });
}
export function loanRenew(params) {
  const url = urlcore + "/admin/user/xuqiOrderByHand";
  return axios.get(url, { params });
}
export function loanGetLess(params) {
  const url = urlcore + "/admin/loanOrder/subOverdueMoney";
  return axios.get(url, { params });
}
export function loanRemoveBlack(params) {
  const url = urlcore + "/admin/user/moveOutBlackList";
  return axios.get(url, { params });
}
export function loanApplyAlotList() {
  const url = urlcore + "/admin/loanOrder/selectAllPassMan";
  return axios.get(url);
}
export function loanApplyAlotSet(params) {
  const url = urlcore + "/admin/loanOrder/setUpPassMan";
  return axios.get(url, { params });
}

export function loanIdentiList(params) {
  //催收列表详情接口
  const url = urlcore + "/admin/user/userDetil";
  return axios.get(url, { params });
}
export function loanIdentiLinkman(params) {
  const url = urlcore + "/admin/userBasicMsg/selectOneDetailsByUserId";
  return axios.get(url, { params });
}
export function loanIdentiIdentity(params) {
  const url = urlcore + "/admin/userIdentity/selectOneDetailsByUserId";
  return axios.get(url, { params });
}
export function loanIdentiBank(params) {
  const url = urlcore + "/admin/userBank/selectByUserId";
  return axios.get(url, { params });
}
export function loanIdentibusiness(params) {
  const url = urlcore + "/admin/userPhone/selectOne";
  return axios.get(url, { params });
}
//订单详情接口
export function callDetail(params) {
  const url =
    urlcore + "/admin/orderCirculationHistory/selectOrderCirculationHistory";
  return axios.get(url, { params });
}

// 催款管理
// 催收分配列表
export function callAllList(params) {
  const url = urlcore + "/admin/loanOrder/selectMyAllPassingOrders";
  return axios.post(url, params);
}
export function MoneyManList(params) {
  const url = urlcore + "/admin/admin/selectPressMoneyMan";
  return axios.post(url, params);
}
export function callPManList(params) {
  //获取催收员接口
  const url = urlcore + "/admin/admin/selectPressMoneyMan";
  return axios.post(url, params);
}
export function callOrderChange(params) {
  //分配
  const url = urlcore + "/admin/loanOrder/allocationList";
  return axios.post(url, params);
}
export function callOrderChangeChange(params) {
  //转派
  const url = urlcore + "/admin/loanOrder/transferOrders";
  return axios.post(url, params);
}
export function callOrderDerate(params) {
  //减免申请
  const url = urlcore + "/admin/orderReduce/addOrderReduce";
  return axios.post(url, params);
}
export function callDerateList(params) {
  //减免审核列表
  const url = urlcore + "/admin/orderReduce/listOrderReduce";
  return axios.get(url, { params });
}
export function callDeratePass(params) {
  //减免审核通过
  const url = urlcore + "/admin/orderReduce/agreeOrderReduce";
  return axios.post(url, params);
}
export function callDerateReject(params) {
  //减免审核拒绝
  const url = urlcore + "/admin/orderReduce/disagreeOrderReduce";
  return axios.post(url, params);
}
// 查询运营商基本信息
export function callCarr(params) {
  const url = urlcore + "/admin/userPhone/selectOne";
  return axios.get(url, { params });
}
// 查看通讯录列表
export function callAddressList(params) {
  const url = urlcore + "/admin/userPhoneList/findByUserId";
  return axios.get(url, { params });
}
// 催收记录列表
export function callRecordList(params) {
  // const url = urlcore + "/admin/loanOrder/selectPressRecords";
  const url = urlcore + "/admin/pressRecords/selectPressRecordsList";
  return axios.get(url, { params });
}
//添加催收记录展示接口
export function addCallRecordList(params) {
  const url = urlcore + "/admin/loanOrder/selectOne";
  return axios.get(url, { params });
}
//订单流转记录
export function callTransferList(params) {
  const url = urlcore + "/admin/orderCirculationHistory/selectOrderCirculationHistory";
  return axios.get(url, { params });
}
//催收领件
export function toMyCall(params) {
  const url = urlcore + "/admin/pressStatistics/pressLingjian";
  return axios.get(url, { params });
}
//s0
export function callSZeroList(params) {
  const url = urlcore + "/admin/loanOrder/selectSzeroOrders";
  return axios.post(url, params);
}
//s1
export function callSSoneList(params) {
  const url = urlcore + "/admin/loanOrder/selectSoneOrders";
  return axios.post(url, params);
}
// s2
export function callSTwoList(params) {
  const url = urlcore + "/admin/loanOrder/selectStwoOrders";
  return axios.post(url, params);
}
//s3
export function callSThreeList(params) {
  const url = urlcore + "/admin/loanOrder/selectSthreeOrders";
  return axios.post(url, params);
}

//运营商
export function callUserPhoneList(params) {
  const url = urlcore + "/admin/userPhone/selectOne";
  return axios.get(url, { params });
}
//代扣记录
export function callPingppIdsList(params) {
  const url = urlcore + "/admin/pingppIds/selectAutoDucetHistory";
  return axios.get(url, { params });
}
//查询借款和还款信息
export function callRepayDetailList(params) {
  const url = urlcore + "/admin/loanOrder/selectUserRepayDetail";
  return axios.get(url, { params });
}
//查询借款和还款信息
export function callRepayDetailSList(params) {
  const url = urlcore + "/admin/loanOrder/selectUserLoanOrderDetail";
  return axios.get(url, { params });
}
//我的催收列表
export function callMyList(params) {
  const url = urlcore + "/admin/loanOrder/selectMyOrders";
  return axios.post(url, params);
}

export function callPPassList(params) {
  const url = urlcore + "/admin/loanOrder/selectHandleAllPassingOrders";
  return axios.get(url, { params });
}
export function callPPassCallRecordList(params) {
  const url = urlcore + "/admin/loanOrder/selectPressRecords";
  return axios.get(url, { params });
}
export function callPPassCallRecordAdd(params) {
  //添加催收记录列表
  const url = urlcore + "/admin/pressRecords/addRecord";
  return axios.post(url, params);
}
export function callPPassCalltaobaoList(params) {
  const url = urlcore + "/admin/userTaobaoAddress/selectTaobaoAddress";
  return axios.get(url, { params });
}
export function callPMyPassList(params) {
  const url = urlcore + "/admin/loanOrder/selectMyHandleAllPassingOrders";
  return axios.get(url, { params });
}
export function callPMyPassBack(params) {
  const url = urlcore + "/admin/loanOrder/pressSucc";
  return axios.get(url, { params });
}
export function callPMyPassFalse(params) {
  const url = urlcore + "/admin/loanOrder/pressFail";
  return axios.get(url, { params });
}
export function callPMyPassLong(params) {
  const url = urlcore + "/admin/loanOrder/pressXuqi";
  return axios.get(url, { params });
}
export function callPBadList(params) {
  const url = urlcore + "/admin/loanOrder/badDebtList";
  return axios.get(url, { params });
}
export function callPBlackList(params) {
  const url = urlcore + "/admin/user/selectAllBlackList";
  return axios.get(url, { params });
}

export function dataAccountsDueList(params) {
  const url = urlcore + "/admin/loanOrder/selectAccountReceivable";
  return axios.get(url, { params });
}
// 数据统计 每日财务统计List
export function dataFinanceList(params) {
  const url = urlcore + "/admin/GiveMoneyStatistic/getPage";
  return axios.get(url, { params });
}
export function dataFinanceAll(params) {
  const url = urlcore + "/admin/GiveMoneyStatistic/getTotal";
  return axios.get(url, { params });
}
export function dataCallList(params) {
  const url = urlcore + "/admin/RepayMoneyStatistics/getPage";
  return axios.get(url, { params });
}
export function getAuditCountList(params) {
  const url = urlcore + "/admin/user/getAuditCount";
  return axios.post(url,  params);
}
export function dataCallAll(params) {
  const url = urlcore + "/admin/RepayMoneyStatistics/getTotal";
  return axios.get(url, { params });
}
// 数据统计 流量控制
export function selectUserlList(params) {
  const url = urlcore + "/admin/user/selectUserStatisticsByHourSql";
  return axios.get(url, { params });
}
// 每日渠道List
export function dataCanalList(params) {
  const url = urlcore + "/admin/channelStatistics/getPage";
  return axios.get(url, { params });
}
export function dataCanalWhichList() {
  const url = urlcore + "/admin/channelStatistics/selectAllChannelList";
  return axios.get(url);
}
// 今日待还列表
export function dataTodayList(params) {
  const url = urlcore + "/admin/loanOrder/unpayList";
  return axios.post(url, params);
}
export function dataHadToday() {
  const url = urlcore + "/admin/loanOrder/overduePay";
  return axios.post(url);
}
export function dataHadAll(params) {
  const url = urlcore + "/admin/loanOrder/overduePayAll";
  return axios.post(url, params);
}
// 订单总列表
export function dataAllOrderList(params) {
  const url = urlcore + "/admin/loanOrder/getOrderTotalList";
  return axios.get(url, { params });
}
export function dataAllOrderData(params) {
  const url = urlcore + "/admin/loanOrder/getOrderTotalHead";
  return axios.get(url, { params });
}
/**
 * 根据订状态获取待还列表
 * @param {请求参数} params 
 * @param {订单状态} type 
 */
export function dataNoRepayList(params,type) {
  let url;
  if(type=='todayRepay' || type==undefined || type==null){
    url = urlcore + "/admin/loanOrder/getNormalUnrepaymentList";
  }else if(type=='delayRepay'){
    url = urlcore + "/admin/loanOrder/getExpectationUnrepaymentList";
  }else if(type=='overdueRepay'){
    url = urlcore + "/admin/loanOrder/getOverdueUnrapaymentList";
  }else{
    url = urlcore + "/admin/loanOrder/getNormalUnrepaymentList";
  }
  return axios.get(url, { params });
}

export function dataNormalBackData(params) {
  const url = urlcore + "/admin/loanOrder/getNormalUnrepaymentListHead";
  return axios.get(url, { params });
}

export function dataExtendBackData(params) {
  params.needPayTime = '';
  const url = urlcore + "/admin/loanOrder/getExpectationUnrepaymentHead";
  return axios.get(url, { params });
}

export function dataOverdueBackData(params) {
  params.needPayTime = '';
  const url = urlcore + "/admin/loanOrder/getOverdueUnrapaymentHead";
  return axios.get(url, { params });
}
/**
 * 已还订单列表
 * @param {入参} params 
 * @param {类型} type 
 */
export function dataRepayedList(params,type) {
  let url;
  if(type=='normal' || type==undefined || type==null){
    url = urlcore + "/admin/loanOrder/getNormalRepaymentList";
  }else if(type=='delayRepayed'){
    url = urlcore + "/admin/loanOrder/getExpectationRepaymentList";
  }else if(type=='overdueRepayed'){
    url = urlcore + "/admin/loanOrder/getOverdueRapaymentList";
  }else{
    url = urlcore + "/admin/loanOrder/getNormalRepaymentList";
  }
  return axios.get(url, { params });
}

export function dataNormalHadBackData(params) {
  const url = urlcore + "/admin/loanOrder/getNormalRepaymentHead";
  return axios.get(url, { params });
}

export function dataExtendHadBackData(params) {
  const url = urlcore + "/admin/loanOrder/getExpectationRepaymentHead";
  return axios.get(url, { params });
}

export function dataOverdueHadBackData(params) {
  const url = urlcore + "/admin/loanOrder/getOverdueRapaymentHead";
  return axios.get(url, { params });
}

//贷款管理结束
// 清算中心
export function dataExtendOverList(params) {
  const url = urlcore + "/admin/loanOrder/getUnrepayOrder";
  return axios.get(url, { params });
}

/**
 * 风控统计
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function dataRiskStaticList(params) {
  const url = urlcore + "/admin/riskReportLog/selectRiskSumDetail";
  return axios.post(url,params);
}

/**
 * 风控每日汇总统计
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function dataRiskStaticListByDay(params) {
  const url = urlcore + "/admin/riskReportLog/selectRiskSumByday";
  return axios.post(url,params);
}

/**
 * 风控总调用统计
 * @returns {AxiosPromise<any>}
 */
export function dataRiskTotal() {
  const url = urlcore + "/admin/riskReportLog/selectRiskSumTotal";
  return axios.post(url);
}
/**
 * 短信调用详情
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function dataSmsStaticList(params) {
  const url = urlcore + "/admin/sms/smsSendRecordList";
  return axios.post(url,params);
}
//统计
/**
 * 催收统计
 * @param {*} params 
 */
export function collectionReportList(params) {
  const url = urlcore + "/admin/everydaychannelcount/getPressMoneyCount";
  return axios.post(url,params);
}
/**
 * 催收绩效
 * @param {*} params 
 */
export function collectionAssessReportList(params) {
  const url = urlcore + "/admin/everydaychannelcount/getPressMoneyAchievements";
  return axios.post(url,params);
}
/**
 * 短信调用日汇总列表
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function dataSmsStaticListByDay(params) {
  const url = urlcore + "/admin/sms/smsStatistical";
  return axios.get(url,{params});
}

/**
 * 短信调用总数统计
 * @param params
 * @returns {AxiosPromise<any>}
 */
export function dataSmsStatisticaltotal() {
  const url = urlcore + "/admin/sms/smsStatisticaltotal";
  return axios.get(url,{});
}

/**
 * 获取短信和风控余额
 * @returns {AxiosPromise<any>}
 */
export function getFengKongYuE() {
  const url = urlcore + "/admin/YuE/FengKongYuE";
  return axios.get(url,{});
}
export function dataExtendOverSaveExtend(params) {
  const url = urlcore + "/admin/loanOrder/xuqi";
  return axios.post(url, params);
}
export function dataExtendOverSaveOver(params) {
  const url = urlcore + "/admin/loanOrder/repayOrder";
  return axios.post(url, params);
}
export function dataExtendOverAmendExtend(params) {
  const url = urlcore + "/admin/loanOrder/modifyNeedPayMoney";
  return axios.get(url, {params});
}

// 信息管理列表
export function messageHelpList() {
  const url = urlcore + "/admin/helpCenter/selectPage1";
  return axios.get(url);
}
export function messageCenterList() {
  const url = urlcore + "/admin/helpCenter/selectPage2";
  return axios.get(url);
}
export function messageAdd(params) {
  const url = urlcore + "/admin/helpCenter/add";
  return axios.post(url, params);
}
export function messageUpdate(params) {
  const url = urlcore + "/admin/helpCenter/update";
  return axios.post(url, params);
}
export function messageAddGet(params) {
  const url = urlcore + "/admin/helpCenter/selectOne";
  return axios.get(url, { params });
}
export function messageDelete(params) {
  const url = urlcore + "/admin/helpCenter/delete";
  return axios.get(url, { params });
}

// 优惠券管理
export function preferentialList(params) {
  const url = urlcore + "/admin/coupon/findByPage";
  return axios.get(url, { params });
}
export function preferentialGet(params) {
  const url = urlcore + "/admin/coupon/selectOne";
  return axios.get(url, { params });
}
export function preferentialAdd(params) {
  const url = urlcore + "/admin/coupon/add";
  return axios.post(url, params);
}
export function preferentialUpdate(params) {
  const url = urlcore + "/admin/coupon/update";
  return axios.post(url, params);
}
export function preferentialChange(params) {
  const url = urlcore + "/admin/coupon/updateStatus";
  return axios.get(url, { params });
}
export function preferentialOut(params) {
  const url = urlcore + "/admin/coupon/giveOut";
  return axios.post(url, params);
}
export function preferentialPeopleDetailList(params) {
  const url = urlcore + "/admin/userCoupon/findByUserPage";
  return axios.get(url, { params });
}
// 优惠券人员管理
export function preferentialPeopleList(params) {
  const url = urlcore + "/admin/user/selectUserList";
  return axios.get(url, { params });
}
export function advertList(params) {
  const url = urlcore + "/admin/eachPicture/selectAll";
  return axios.get(url, { params });
}
export function basePropeList(params) {
  const url = urlcore + "/admin/pushMsg/selectPage";
  return axios.get(url, { params });
}
export function basePropeGet(params) {
  const url = urlcore + "/admin/pushMsg/selectOne";
  return axios.get(url, { params });
}
export function basePropeAdd(params) {
  const url = urlcore + "/admin/pushMsg/add";
  return axios.post(url, params);
}
export function basePropeDel(params) {
  const url = urlcore + "/admin/pushMsg/deleteOne";
  return axios.get(url, { params });
}
export function basePropeSendAll(params) {
  const url = urlcore + "/admin/pushMsg/sendMsgToAll";
  return axios.get(url, { params });
}
export function basePropeSome(params) {
  const url = urlcore + "/admin/pushMsg/sendMsgToSome";
  return axios.get(url, { params });
}
export function baseUserContent(params) {
  const url = urlcore + "/admin/agreement/selectOneByType";
  return axios.get(url, { params });
}
export function baseChangeContent(params) {
  const url = urlcore + "/admin/agreement/update";
  return axios.post(url, params);
}
export function baseAboutContert(params) {
  const url = urlcore + "/admin/aboutXed/selectOneByType";
  return axios.get(url, { params });
}
export function baseAboutChangeContert(params) {
  const url = urlcore + "/admin/aboutXed/update";
  return axios.post(url, params);
}
export function selectPageList(params) {
  const url = urlcore + "/admin/payFeedback/selectPage";
  return axios.get(url, { params });
}

// 后台登录日志
export function backstageLoginList(params) {
  const url = urlcore + "/admin/loginRecord/selectAdminLoginRecords";
  return axios.get(url, { params });
}
export function backAPPLoginList(params) {
  const url = urlcore + "/admin/userLoginLog/selectAppLoginRecords";
  return axios.get(url, { params });
}
export function backstageDel(params) {
  const url = urlcore + "/admin/loginRecord/deleteOne";
  return axios.get(url, { params });
}
export function backstageDelApp(params) {
  const url = urlcore + "/admin/userLoginLog/deleteOne";
  return axios.get(url, { params });
}
export function backUpList(params) {
  const url = urlcore + "/admin/backupCopy/selectBackupFile";
  return axios.get(url, { params });
}
export function backUpBackup(params) {
  const url = urlcore + "/admin/backupCopy/backup";
  return axios.get(url);
}
export function backUpDele(params) {
  const url = urlcore + "/admin/backupCopy/deleteOne";
  return axios.get(url, { params });
}
