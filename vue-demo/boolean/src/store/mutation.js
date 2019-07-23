import router from '../router'
import { getToken, setToken, removeToken } from '@/utils/auth'
const mutations = {
  // 修改state
  SETROLE (state, role){
    state.Id = role.Id;//用户角色id
    state.Name = role.Name;
    state.userId = role.userId//用户id
  },
  SET_TOKEN(state, token) {
    state.token = token;
    setToken(token);
  },
  // 修改identi的id以及审核状态
  SETIDENTI (state, identi){
    if(identi.Id){
      state.identiID = identi.Id;
    }
    if(identi.ifLoan){
      state.ifLoan = identi.ifLoan;
    }
  },
  // 修改标签状态
  // 添加标签
  GETTABSTO (state, item){
    if(!item.meta.tabs[1]) {
      return
    }
    if(state.tabsList.length == 0){
      let params = {
        name: item.name,
        title: item.meta.tabs[1],
        classN: 'tab light'
      }
      state.tabsList.push(params)
      let a = []
      state.tabsList = a.concat(state.tabsList);
    }
    for(let i = 0; i < state.tabsList.length; i++){
      state.tabsList[i].classN = 'tab'
      if(item.meta.tabs[1] == state.tabsList[i].title){
        for(let j = 0; j < state.tabsList.length; j++){
          state.tabsList[j].classN = 'tab'
        }
        state.tabsList[i].classN = 'tab light'
        break
      }
      if(i == state.tabsList.length-1){
        let params = {
          name: item.name,
          title: item.meta.tabs[1],
          classN: 'tab light'
        }
        state.tabsList.push(params)
        let a = []
        state.tabsList = a.concat(state.tabsList);
      }
      if(state.tabsList.length > 10){
        state.tabsList.shift();
      }
    }
  },
  // 标签跳转
  GETCLOSE (state, index) {
    if(state.tabsList[index].classN != 'tab'){
      if(state.tabsList.length-1 < 1){
        return
      }
      if(index == 0){
        state.tabsList.shift()
        state.tabsList[index].classN = 'tab light'
        router.replace({name: state.tabsList[index].name})
      }else{
        router.replace({name: state.tabsList[index-1].name})
        state.tabsList[index-1].classN = 'tab light'
        let arr = []
        for(let i = 0; i<state.tabsList.length; i++){
          if(i != index){
            arr.push(state.tabsList[i]);
          }
        }
        state.tabsList = [];
        state.tabsList = arr.concat(state.tabsList)
      }
    }else{
      let arr = []
      for(let j = 0; j<state.tabsList.length; j++){
        if(j != index){
          arr.push(state.tabsList[j]);
        }
      }
      state.tabsList = [];
      state.tabsList = arr.concat(state.tabsList)
    }
  },
  // 预留一个标签，其余关闭
  CLOSETABS (state) {
    let arr = []
    for(let i = 0; i < state.tabsList.length ; i++){
      if(state.tabsList[i].classN != 'tab'){
        arr.push(state.tabsList[i])
      }
    }
    state.tabsList = [];
    state.tabsList = arr.concat(state.tabsList)
  },
  // 关闭详细信息标签
  CLOSELOANIDENTI (state) {
    let a=0;
    let oldTabList = JSON.parse(JSON.stringify(state.tabsList));
    for(let i = 0; i < oldTabList.length; i++){
      if(oldTabList[i].name == 'loanIdenti'){
        a +=1;
        state.tabsList.splice(i,1);
      }
      if(oldTabList[i].name == 'riskIndex'){
        a +=1;
        state.tabsList.splice(i,1);
      }
    }
    
    router.go(-a);
  },
  // 清除所有标签
  CLOSEALLTABS (state) {
    state.tabsList = []
  },

  // 保存催收Id
  SETCALLID(state,id){
    state.callId = id
  },
  // 保存催收订单Id
  SETCALLIDID(state,id){
    state.callIdID = id
  },
  CLOSECUISHOU (state) {
    let a;
    for(let i = 0; i < state.tabsList.length; i++){
      if(state.tabsList[i].name == 'callAddCallRecord'){
        a = i
      }
    }
    state.tabsList.splice(a,1)
  },
}

export default mutations
