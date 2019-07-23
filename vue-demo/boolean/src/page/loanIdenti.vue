<template>
  <div class="allPage">
    <el-row type="flex" class="row-bg" justify="end" style="margin-bottom: 10px">
      <el-button type="success" @click="goBack" size="mini"> 返回上一页</el-button>
      <!-- <el-button type="success" @click="goNewRisk" size="mini"> 切换到智慧风控</el-button> -->
    </el-row>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基本认证信息" name="base">
        <basic :userId="id" ref="userBasicinfo" v-on:setUserInfo="getUserInfo" v-on:toCom="toCom" :is-loaded="loadingBasic"></basic>

      </el-tab-pane>
      <el-tab-pane label="多头报告" name="duotou">
        <ud-user-info :userIdNumber="idNumber"   :is-loaded="loadingUdun"></ud-user-info>
      </el-tab-pane>
      <!-- <el-tab-pane label="新颜报告" name="xinyan">
        <xinyan-report :userId="id"  :is-loaded="loadingXinyan"></xinyan-report>
      </el-tab-pane> -->
      <el-tab-pane label="淘宝收货地址" name="taobao_adress">
        <basic-taobao-address :userId="id"  :is-loaded="loadingTaobaoAddress"></basic-taobao-address>
      </el-tab-pane>
      <!--淘宝购买记录-->
      <el-tab-pane label="淘宝购买记录" name="taobao_buy_list">
        <basic-taobao-buy :userId="id" v-bind:is-loaded="loadingTaobaoBuyList"></basic-taobao-buy>
      </el-tab-pane>
      <!--end 淘宝购买记录-->
    </el-tabs>

    <div class="tabs">

      <div class="content">

        <div class="contentItem">
          <div class="titletiao">
            <!--<el-button type="primary" size='mini' @click='toRecord' >通话记录</el-button>-->
            <!--<el-button type="primary" size='mini' @click='toMohe' >魔盒报告</el-button>-->
          </div>
        </div>
      </div>



      <div v-if="auth_status!=1" class="content" style="
    position: fixed;
    bottom: 10px;
    width: 400px;
    right: 10px;
    background-color: #ebebec;
">
        <div class="con_title">
          审核意见
        </div>
        <div class="contentItem">
          <div class="titletiao">
            <el-radio-group v-model="passNo">
              <el-radio :label="1">审核通过</el-radio>
              <!-- <el-radio :label="2" v-if='(userStatus != 2) && (userStatus !== 0) && (userStatus != 4)'>暂时拒绝</el-radio> -->
              <el-radio :label="2" v-if='false'>暂时拒绝</el-radio>
              <el-radio :label="3">未通过</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="">
          <textarea name="name" rows="3"   v-model="message" style="resize:none; width:90%;margin-top:10px;" ></textarea>
          <el-checkbox-group v-model="checkBoxArray" size="mini" v-if='passNo == 2'>
            <el-checkbox label="basicMsgAuth">基本信息</el-checkbox>
            <el-checkbox label="identityAuth">身份认证</el-checkbox>
            <el-checkbox label="yysAuth">运营商</el-checkbox>
            <el-checkbox label="bankAuth">银行卡</el-checkbox>
            <el-checkbox label="taobaoAuth">淘宝</el-checkbox>
            <el-checkbox label="zhifubaoAuth">支付宝</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="" style='margin-top:10px;'>
          <el-radio-group v-model="time" v-if='passNo == 3'>
            <el-radio :label="7">7天</el-radio>
            <el-radio :label="14">14天</el-radio>
            <el-radio :label="30">30天</el-radio>
          </el-radio-group>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            <el-button type="danger" @click="gofilse">提 交</el-button>
            <el-button @click="closeIdenti">取 消</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 通讯录 -->
    <el-dialog
      title="通讯录"
      :visible.sync="showCom"
      width="70%"
      >
      <div class="list">
        <el-table :data="userList"
                  style="width: 100%"
                  :cell-style='cellStyle'
                  >
          <el-table-column
            prop="id"
            label="ID"
            width="110"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            label="联系人姓名"
            width='100'
            >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="联系电话"
            >
          </el-table-column>
          <el-table-column
            prop="belongArea"
            label="地区"
            >
          </el-table-column>
          <el-table-column
            prop="callTimes"
            label="通话次数"
            width="120">
          </el-table-column>
          <el-table-column
            prop="callTime"
            label="通话时长"
            width='120'
            >
          </el-table-column>
          <el-table-column
            prop="callCountActive"
            label="主叫次数"
            width="80">
          </el-table-column>
          <el-table-column
            prop="callCountPassive"
            label="被叫次数"
            width="80">
          </el-table-column>
        </el-table>
        <!-- 通讯录 -->
        <div class="block choice">
          <el-pagination
            @current-change="toCom"
            background
            @size-change="sizeChange"
            :current-page.sync="pageNo"
            :page-sizes="[10, 20, 30, 50, 100]"
            :page-size="10"
            layout="sizes, total, prev, pager, next, jumper"
            :total="pageAll">
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCom = false">关 闭</el-button>
      </span>
    </el-dialog>


    <!-- 通话记录 -->
    <el-dialog
      title="通话记录"
      :visible.sync="showRecord"
      width="70%"
      >

      <span slot="footer" class="dialog-footer">
        <el-button @click="showRecord = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { auditingCredit, loanApplyBefore, basicInPhone, basicPhoneRecordList, auditingRefuseF, auditingRefuse,find1WeekByUserPage} from "@/API"
import { mapGetters, mapMutations } from 'vuex'

import basic from './components/risk/basic'
import basicTaobaoBuy from './components/risk/basicTaobaoBuy'
import basicTaobaoAddress from './/components/risk/basicTaobaoAddress'
import xinyanReport from './/components/risk/xinyanReport'//新颜报告
import udUserInfo from './/components/risk/udUserInfo'//多头报告
export default {
  name: 'loanIdenti',
  components:{basic,basicTaobaoBuy,basicTaobaoAddress,xinyanReport,udUserInfo},
  data: () => {
    return {
      activeName:'base',
      userStatus: 10,//判断认证状态是否为暂时拒绝
      userList: [],
      userList1: [],
      sevenRList: [],//七天通话记录
      zhiFuBao:{},
      pageNo: 1,
      pageSize: 10,
      pageNo1: 1,
      pageNoSeven: 1,//七天通话记录
      pageSize1: 10,
      pageSizeSeven: 10,//七天通话记录每页页数
      pageAll: 0,
      pageAll1: 0,
      pageAllSeven: 0,//七天通话记录总页数
      cellStyle:{
        'line-height': '16px;'
      },
      message: '',
      passNo: 1,
      showCom: false,
      showSevenR: false,//七天通话记录
      showRecord: false,
      checkBoxArray: [],
      idNumber:'',
      auth_status:0,
      urgentShow:false,
      time: 7,
      xinyanList: {},
      taobaoAddress:{//淘宝收货地址
        list:[],
        pageNo:1,
        pageSize:10,
        pageAll:0,
      },
      loadingTaobaoAddress:false,
      loadingTaobaoBuyList:false,
      loadingXinyan:false,
      loadingUdun:false,
      loadingBasic:true,
    }

  },
  computed:{
    ...mapGetters({
      id: 'GetIdentiId',
      ifLoan: 'GetIfLoan',
      adminId: 'GetRoleUserId'
    })
  },

  methods:{
    ...mapMutations({
      setifLoan: 'SETIDENTI',
      closeIdenti: 'CLOSELOANIDENTI'
    }),
    handleClick(tab, event) {
      console.log(tab, event);
      if(tab.name=='taobao_adress'){
        this.loadingTaobaoAddress=true;
      }
      if(tab.name=='taobao_buy_list'){
        this.loadingTaobaoBuyList=true;
      }
      if(tab.name=='xinyan'){
        this.loadingXinyan=true;
      }
      if(tab.name=='duotou'){
        this.loadingUdun=true;
      }
      if(tab.name=='tongdun'){
        this.toTongD();
      }
    },

    //返回上一页
    goBack(){
      this.$router.go(-1);
    },
    //跳转到新风控
    goNewRisk(){
      let userId = this.id;
      this.$router.push({name: 'riskIndex', params: {
        userId
      }})
    },
    gofilse() {
      let params = {
        userId:this.id,
        adminId: this.adminId
      }
      if(this.message){
        params.userMessage = this.message
      }else{
        this.$message('消息不能为空')
        return
      }
      if(this.passNo == 1){
        if(confirm('确认审核通过')){
          auditingCredit(params).then(data=>{
            if(data.data.code=='SUCCESS'){
              this.closeIdenti()
              this.setifLoan({ifLoan:0})
            }else{
              this.$message(data.data.msg)
            }
          })
        }
      }else if(this.passNo == 2){
        if(this.checkBoxArray.length == 0){
          this.$message('请选择一项')
          return
        }
        params.checkBoxArray = this.checkBoxArray

        if(confirm('确认暂时拒绝')){
          auditingRefuse(params).then((data)=>{
            if(data.data.code=='SUCCESS'){
              this.closeIdenti()
              this.setifLoan({ifLoan:0})
            }else{
              this.$message(data.data.msg)
            }
          })
        }
      }else if(this.passNo == 3){
        params.time = this.time
        if(confirm('确认拒绝' + this.time + '天')){
          auditingRefuseF(params).then((data)=>{
            if(data.data.code=='SUCCESS'){
              this.closeIdenti()
              this.setifLoan({ifLoan:0})
            }else{
              this.$message(data.data.msg)
            }
          })
        }
      }
    },
    toUdUserinfo(){
      let idNum = this.$refs.userBasicinfo.identiList.identityNum
      this.$router.replace({name: 'udUserInfo', params: {
        idNum
      }})
    },

    toCom(){//通讯录
      this.showCom = true
      let params={
        userId:this.id,
        pageNo:this.pageNo,
        pageSize: this.pageSize,
      }
      basicInPhone(params).then(data=>{
        this.userList = data.data.data.list
        this.pageAll = data.data.data.total
      })
    },

    sizeChange(size){
      this.pageSize = size;
      this.toCom();
    },
    sizeChange1(size){
      this.pageSize1 = size;
      this.toRecord();
    },
    getUserInfo(userInfo){
      this.idNumber= userInfo.identityNum;
      this.auth_status= parseInt(userInfo.auth_status);
    },
    toRecord(){
      this.showRecord = true
      let params2 = {};
      // params2.userId = this.id
      params2.userId = this.id
      params2.pageSize = this.pageSize1
      params2.pageNo = this.pageNo1
      basicPhoneRecordList(params2).then(data=>{
        this.userList1 = data.data.data.list;
        this.pageAll1 = data.data.data.total;
      })
    },
  },

}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .tabs{
      background: #fff;
      .btn{
        padding:20px;
      }
      .content{
        padding: 20px;
        .con_title{
          font-size: 16px;
          font-weight: bold;
        }
        .contentItem{
          font-size: 14px;
          color:#686B6D;
          display: inline-block;
          margin-top: 20px;
          margin-right: 10px;
          vertical-align: top;
          .titletiao{
            display: inline-block;
            vertical-align: top;
            color: #999999;
          }
          .substance{
            display: inline-block;
            padding: 0 10px;
            background: #F2F2F2;
          }

        }
      }

    }
    .block{
      text-align: center;
      margin-top: 15px;
    }

  }
.box-card{
  margin-bottom: 10px;
}


</style>
