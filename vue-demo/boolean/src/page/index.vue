<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
    <side-bar class="sidebar-container" :menus="menuList"></side-bar>
    <div class="main-container">
      <navbar :user="loginUserName"/>
      <tags-view/>
      <app-main/>
    </div>
  </div>
</template>
<script>
import { getthisLogin, toLoginOut } from '@/API'
import { mapMutations, mapGetters } from 'vuex'
import {  TagsView,Navbar,SideBar,AppMain } from './layout/components'
import ResizeMixin from './layout/mixin/ResizeHandler'
// import TagsView from "./layout/components/TagsView";
export default {
  components: {TagsView,Navbar,SideBar,AppMain},
  mixins: [ResizeMixin],
  data: () => ({

    menuList:{},
    trueOrFalse:[],
    activeIndex: '1',
    loginUserName:'',
  }),
  beforeMount() {
    this.isOrNotLogin();
    if(this.userName != ''){
      this.$router.replace({name:'home'})
    }
  },
  watch:{
    $route(to,from){
      this.isOrNotLogin();
      // 添加mate数组到标签
      this.getTabsTo(this.$route)
    },
    userName:function(val){
      this.loginUserName=val;
    }
  },
  computed: { 
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    ...mapGetters({
      roleId:'GetRoleId',
      userName: 'GetRoleName',
      tabsList: 'GetTabsList'
    })
  },
  methods: {
    ...mapMutations({
      setRole: 'SETROLE',
      getTabsTo: 'GETTABSTO',
      getClose: 'GETCLOSE',
      closeTabs: 'CLOSETABS',
      closeAllTabs: 'CLOSEALLTABS'
    }),
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    closeLoanIdenti() {
      let a;
      for(let i = 0; i < this.tabsList.length; i ++) {
        if(this.tabsList[i].name == 'loanIdenti') {
          a = i
        }
      }
      this.tabsList[i].splice(a, 1);
    },

    isOrNotLogin() {
      getthisLogin().catch(error=>{
        console.log(error);
      }).then(data=>{
        if(data.status!=200){
          this.$notify.error({
            title: '错误',
            message: '这是一条错误的提示消息'
          });
          return false;
        }
        if(data.data.code != 'SUCCESS'){

          this.setRole({Id: -1, Name: '', userId: null})
          this.$store.dispatch('LogOut').then(() => {
            location.reload()// In order to re-instantiate the vue-router object to avoid bugs
          })
        }else{
          this.setRole({Id: data.data.data.admin.roleId, Name: data.data.data.admin.userName, userId: data.data.data.admin.id})
          this.menuList = data.data.data.menu
          //this.isOnMenu()
        }
      })
    },
    editPassword(){
      this.$router.replace({name: 'editPassword'})
    },
    loginOut(){
      toLoginOut()
      this.$router.replace({name: 'login'})
      this.closeAllTabs()
    },
    getWhere(name, index){
      for(let i = 0; i < this.tabsList.length; i++){
        this.tabsList[i].classN = 'tab'
      }
      this.tabsList[index].classN = 'tab light'
      this.$router.replace({name: name});
    },
  },
  mounted() {
    //do something after mounting vue instance
     console.log(this.userName)
    this.loginUserName = this.userName;
  }
}
</script>
<style lang="scss" scoped>
  @import "../style/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
.downchoice{
  .choicepic{
    width:14px;
    margin-left: 10px;
  }
}

</style>
