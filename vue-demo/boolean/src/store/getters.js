const getters ={
  sidebar: state => state.app.sidebar,
  GetRoleId:state => state.Id, //用户角色id
  GetRoleName:state => state.Name,
  GetRoleUserId:state => state.userId,
  GetIdentiId:state => state.identiID,
  GetIfLoan:state => state.ifLoan,
  GetTabsList:state => state.tabsList,
  GetCallId:state => state.callId,
  GetCallIdID:state => state.callIdID,//订单id
  visitedViews:state => state.tagsView.visitedViews,
  cachedViews:state => state.tagsView.cachedViews,
  errorLogs: state => state.errorLog.logs,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting
}
export default getters
