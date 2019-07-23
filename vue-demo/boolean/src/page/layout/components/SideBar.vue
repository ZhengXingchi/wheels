<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :show-timeout="200" router
      :default-active="$route.name"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      :unique-opened=true
    >
      <el-menu-item index="/"><svg-icon  icon-class="dashboard" /><span slot="title">首页</span></el-menu-item>
      <el-submenu :index="moduList[0]" v-if='trueOrFalse[0]'>
        <template slot="title"><svg-icon icon-class="tree" /><span>系统设置</span></template>
        <!--<el-menu-item index="systemRetAdd">利率配置</el-menu-item>-->
        <el-menu-item index="systemAgreement">协议模板</el-menu-item>
        <el-menu-item index="systemNote" v-if='false'>短信模板</el-menu-item>
        <el-menu-item index="systemParam">参数设置</el-menu-item>
        <el-menu-item index="riskSet">风控设置</el-menu-item>
      </el-submenu>
      <el-submenu :index="moduList[1]" v-if='trueOrFalse[1]'>
        <template slot="title" ><svg-icon icon-class="lock" /><span>权限与角色管理</span></template>
        <el-menu-item index="managerPeo">系统管理员</el-menu-item>
        <el-menu-item index="managerRole">角色列表</el-menu-item>
        <el-menu-item index="managerDepartment">部门列表</el-menu-item>
      </el-submenu>
      <el-submenu :index="moduList[2]" v-if='trueOrFalse[2]'>
        <template slot="title"><svg-icon icon-class="peoples" /><span>渠道商管理</span></template>
        <el-menu-item index="canals">渠道商列表</el-menu-item>
        <el-menu-item index="canalRealTime">渠道商实时统计</el-menu-item>
         <el-menu-item index="dataCanal">渠道商历史统计</el-menu-item>
        
        <el-menu-item index="channelReport">渠道统计报表</el-menu-item>
        <!-- <el-menu-item index="newMember">用户数据</el-menu-item> -->
      </el-submenu>
      <el-submenu :index="moduList[3]" v-if='trueOrFalse[3]'>
        <template slot="title"><svg-icon icon-class="user" /><span>会员管理</span></template>
        <!-- <el-menu-item index="member">会员列表</el-menu-item> -->
        <el-menu-item index="memberList">会员列表</el-menu-item>
        <el-menu-item index="blackMemberList">黑名单列表</el-menu-item>
        <el-menu-item index="memberNoList">未认证列表</el-menu-item>
        <el-menu-item index="memberMyList">我的会员列表</el-menu-item>
      </el-submenu>
      <el-submenu :index="moduList[4]" v-if='trueOrFalse[4]'>
        <template slot="title"><svg-icon icon-class="list" /><span>信审管理</span></template>
        <el-menu-item index="auditing">信审管理</el-menu-item>
        <el-menu-item index="auditing2">我的信审列表</el-menu-item>
      </el-submenu>
      <el-submenu :index="moduList[5]" v-if='trueOrFalse[5]'>
        <template slot="title"><svg-icon icon-class="money" /><span>贷款管理</span></template>
        <el-menu-item index="loanUserList">放款用户列表</el-menu-item>
        <el-menu-item index="loanWaitingList">待放款列表</el-menu-item>
        <el-menu-item index="loanAlreadyList">已放款列表</el-menu-item>
        <!-- <el-menu-item index="loanNoRepayList">待还款列表</el-menu-item> -->
        <!-- <el-menu-item index="loanRepayedList">已还款列表</el-menu-item> -->
        <el-menu-item index="loanMyList">我的放款列表</el-menu-item>
      </el-submenu>
      <el-submenu :index="moduList[6]" v-if='trueOrFalse[6]'>
        <template slot='title'><svg-icon icon-class="shopping" /><span>催款管理</span></template>
        <el-menu-item index="callAllList">催收总列表</el-menu-item>
        <el-menu-item index="callPMy">我的催收列表</el-menu-item>
        <el-menu-item index="callDerate">减免审核</el-menu-item>
      </el-submenu>
      <el-submenu :index="moduList[7]" v-if='trueOrFalse[7]'>
        <template slot='title'><svg-icon icon-class="chart" /><span>数据统计</span></template>
        <el-menu-item index="totalReport" v-if="versionMenu">系统统计汇总报表</el-menu-item>
        <el-menu-item index="dataFinance">每日放款统计</el-menu-item>
        <el-menu-item index="dataCall">每日收款统计</el-menu-item>
        <el-menu-item index="dataHadToday">贷后当日回款</el-menu-item>
        <el-menu-item index="dataHadAll">贷后总回款</el-menu-item>
        <el-menu-item index="collectionReport" v-if="versionMenu">催收统计</el-menu-item>
        <el-menu-item index="collectionAssessReport" v-if="versionMenu">催收绩效</el-menu-item>
        <el-menu-item index="flowControl" v-if="versionMenu">流量监控</el-menu-item>
        <!-- <el-menu-item index="getAuditCount">信审统计</el-menu-item> -->
      </el-submenu>
      <!--<el-menu-item index="dataExtendOver"><svg-icon icon-class="table" /><span slot="title">财务中心</span></el-menu-item>-->
      <el-submenu index="14" v-if='trueOrFalse[7]'>
        <template slot='title'><svg-icon icon-class="table" /><span>财务中心</span></template>
        <el-menu-item index="dataExtendOver"><span>订单结清</span></el-menu-item>
        <el-menu-item index="riskStatistics">风控费用统计</el-menu-item>
        <el-menu-item index="msgStatistics">短信费用统计</el-menu-item>
        <!--<el-menu-item index="dataAllOrder">总订单列表</el-menu-item>-->
        <!--<el-menu-item index="dataNormalBack">正常待还客户列表</el-menu-item>-->
        <!--<el-menu-item index="dataExtendBack">展期待还客户列表</el-menu-item>-->
        <!--<el-menu-item index="dataOverdueBack">逾期待还客户列表</el-menu-item>-->
        <!--<el-menu-item index="dataNormalHadBack">正常已还客户列表</el-menu-item>-->
        <!--<el-menu-item index="dataExtendHadBack">展期已还客户列表</el-menu-item>-->
        <!--<el-menu-item index="dataOverdueHadBack">逾期已还客户列表</el-menu-item>-->


      </el-submenu>
      <el-submenu :index="moduList[8]" v-if='trueOrFalse[8]'>
        <template slot='title'><svg-icon icon-class="documentation" /><span>信息管理</span></template>
        <el-menu-item index="messageManage">信息管理</el-menu-item>
      </el-submenu>
      <!-- <el-submenu :index="moduList[9]" v-if='trueOrFalse[9]'>
        <template slot='title'><i class=""><img src="../assets/preferential.png" alt=""></i>优惠券设置</template>
        <el-menu-item index="preferential">优惠券设置</el-menu-item>
        <el-menu-item index="preferentialPeople">优惠人员管理</el-menu-item>
      </el-submenu> -->
      <el-submenu :index="moduList[10]" v-if='trueOrFalse[10]&&false'>
        <template slot='title'><svg-icon icon-class="documentation" /><span>广告管理</span></template>
        <el-menu-item index="advert">广告发布与管理</el-menu-item>
      </el-submenu>
      <el-submenu :index="moduList[11]" v-if='trueOrFalse[11]'>
        <template slot='title'><svg-icon icon-class="documentation"/><span>基本信息</span></template>
        <el-menu-item index="basePrope">极光推送</el-menu-item>
        <el-menu-item index="explain" >用户反馈信息</el-menu-item>
        <el-menu-item index="baseAbout">关于我们</el-menu-item>
      </el-submenu>
      <!-- <el-submenu :index="moduList[12]" v-if='trueOrFalse[12]'>
        <template slot='title'><i class=""><img src="../assets/stageLogin.png" alt=""></i>登录日志</template>
        <el-menu-item index="backstageLogin">后台管理登录日志</el-menu-item>
        <el-menu-item index="backstageAPP">App登入日志</el-menu-item>
      </el-submenu> -->

    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { mapGetters } from 'vuex'
    export default {
        data:()=>({
          moduList: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14'],
          versionMenu:false,
          trueOrFalse:[]
        }),
      props:{
        menus:{
          type:Object,
          default:[]
        }
      },
      computed: {
        ...mapGetters([
          'sidebar'
        ]),
        isCollapse() {
          return !this.sidebar.opened
        },
        
      },
      watch:{
        menus:function(){
          this.isOnMenu()
        }
      },
      beforeMount(){
        this.isOnMenu();
        this.checckVersion();
        console.log("version:"+this.checckVersion());
      },
      methods:{
          checckVersion:function(){
            let cVersion = this.$compareVersions(version,'2.1.2');
            this.versionMenu = cVersion==-1?false:true;
            return cVersion;
          },
          isOnMenu:function(){
            let arr = []
            this.trueOrFalse = []
            // console.log(this.menuList);
            let objlength = Object.keys(this.menus).length
            for(let i in this.menus){
              arr.push(this.menus[i])
            }
            // console.log(arr);
            this.trueOrFalse = this.trueOrFalse.concat(arr);
          }
      }
    }
</script>

<style scoped>

</style>
