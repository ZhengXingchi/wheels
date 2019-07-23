<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        详细信息
      </div>
    </div>
    <div class="personDetail">
      <table border='1' style='width:100%'>
        <tr>
          <td>借款人姓名：</td>
          <td style="width:100px;">{{detailObject.userName}}</td>
          <td>借款人手机号码：</td>
          <td style="width:100px;">{{detailObject.phone}}</td>
          <td>身份证号码：</td>
          <td style="width:100px;">{{detailObject.identityNum}}</td>
        </tr>
        <tr>

          <td>银行名称：</td>
          <td style="width:100px;">{{detailObject.bankName}}</td>

          <td>银行卡号：</td>
          <td style="width:100px;">{{detailObject.bankcardno}}</td>
          <td>预留手机号码：</td>
          <td style="width:100px;">{{detailObject.bankPhone}}</td>
        </tr>
        <tr>
          <td>性别：</td>
          <td colspan='2' v-if="detailObject.sex == 1">男</td>
          <td colspan='2' v-if="detailObject.sex == 2">女</td>
          <td colspan='2' v-if="!detailObject.sex"></td>
          <!-- <td colspan='2'></td> -->
          <td>现居住时长:</td>
          <td colspan='2'>{{""}}</td>
        </tr>
        <tr>
          <td>婚姻：</td>
          <td >{{detailObject.marry}}</td>
          <td>学历:</td>
          <td >{{detailObject.study}}</td>

          <td>邮箱</td>
          <td >{{""}}</td>

        </tr>
        <tr>
          <td>QQ：</td>
          <td>{{detailObject.qq}}</td>
          <!-- <td>行业：</td>
          <td>{{""}}</td> -->
          <td>公司：</td>
          <td>{{detailObject.workCompany}}</td>
          <td>公司地址：</td>
          <td>{{detailObject.workPlace}}</td>
        </tr>
        <tr>
          <td>身份证照片：</td>
          <td colspan="2">
            <img :src="detailObject.identityFront || defaultSrc" alt="点击放大" class="myImg" @click='openImg'>
          </td>
          <td colspan="2">
            <img :src="detailObject.identityBack || defaultSrc" alt="点击放大" class="myImg" @click='openImg'>
          </td>
          <td colspan="2">
            <img :src="detailObject.faceUrl || defaultSrc" alt="点击放大" class="myImg" @click='openImg'>
          </td>
          
        </tr>
        <!-- <tr>
          <td>身份证地址：</td>
          <td colspan="5">{{detailObject.addressDetails}}</td>
        </tr> -->
        <tr>
          <td>现居住地址：</td>
          <td colspan="5">{{detailObject.addressDetails}}</td>
        </tr>
        <tr>
          <td>欠款金额：</td>
          <td colspan="2">{{backDetailObject.needPayMoney}}</td>
          <td >欠款本金：</td>
          <td colspan="2">{{backDetailObject.borrowMoney}}</td>
        </tr>
        <tr>
          <td>欠款滞纳金</td>
          <td colspan="2">{{backDetailObject.overdueMoney}}</td>
          <td>已还金额</td>
          <td colspan="2">{{backDetailObject.realPayMoney}}</td>
        </tr>
        <tr>
          <td>借款时间：</td>
          <td colspan="2">{{backDetailObject.giveTime}}</td>
          <td>应还时间：</td>
          <td colspan="2">{{backDetailObject.limitPayTime}}</td>
        </tr>
        <tr>
          <td>逾期天数</td>
          <td colspan="2">{{backDetailObject.overdueDays}}</td>
          <td>承诺还款时间</td>
          <td colspan="2">{{backDetailObject.promistRepayTime}}</td>
        </tr>
        <tr>
          <td>最后登录时间</td>
          <td colspan="2">{{detailObject.lastLoginTime}}</td>
          <td>客户来源</td>
          <td colspan="2"></td>
        </tr>
      </table>

    </div>
    <div class="list">
      <div class="title">
        还款详情
      </div>
      <el-table :data="backDetailList" style="width: 100%" :cell-style='cellStyle'>
        <el-table-column
          prop="realReturnMoney"
          label="实还本金"
          >
        </el-table-column>
        <el-table-column
          prop="realFineMoney"
          label="实还罚息"
          >
        </el-table-column>
        <el-table-column
          prop="lessBorrowMoney"
          label="剩余应还本金"
          >
        </el-table-column>
        <el-table-column
          prop="lessPayMoney"
          label="剩余应还罚息"
          >
        </el-table-column>
        <el-table-column
          prop="payMethod"
          label="还款方式"
          >
        </el-table-column>
        <el-table-column
          prop="returnTime"
          label="还款时间"
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="list">
      <div class="title">
        代扣记录
      </div>
      <el-table :data="moneyGiveList" style="width: 100%" :cell-style='cellStyle'>
        <el-table-column
          prop="gmtDatetime"
          label="创建时间"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="user.userName"
          label="借款人姓名"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="user.phone"
          label="借款人电话"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="loanOrder.pressStatus"
          label="催收状态"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="loanOrder.needPayMoney"
          label="欠款金额"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="loanOrder.realPayMoney"
          label="已还金额"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="money"
          label="扣款金额"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="repayStatus"
          label="扣款状态"
          width="150"
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="list">
      <div class="title">
        S0备注
      </div>
      <el-table :data="kefuList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="id"
          label="时间"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="id"
          label="备注标签"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="id"
          label="备注内容"
          width="150"
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="list">
      <div class="title">
        借款记录
      </div>
      <el-table :data="backDetailList" style="width: 100%" :cell-style='cellStyle'>
        <el-table-column
          prop="orderNumber"
          label="订单编号"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="giveTime"
          label="借款时间"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="lastPayTime"
          label="最后还款时间"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="realPayMoney"
          label="已还金额"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="shouldMoney"
          label="应还金额"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="overdueDays"
          label="累计逾期天数"
          width="150"
          >
        </el-table-column>
      </el-table>
    </div>
    <!-- 打开图片 -->
    <el-dialog :visible.sync="imgShow" width="40%">
      <img :src="imgSrc" alt="" style='width:100%;height:450px;'>
    </el-dialog>

    <!-- 催收记录 -->
    <el-dialog title="催收记录" :visible.sync="collectBoole" width="60%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="collectBoole = false">取 消</el-button>
        <el-button type="primary" @click="collectBoole = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex'
import {loanIdentiList,callRepayDetailList,callPingppIdsList,callRepayDetailSList} from "@/API"
import CallRecordList from '@/page/callRecord'
export default {
  data: () => ({
    detailObject:{},//基础信息
    backDetailList:[],//还款详情
    backDetailObject:{},//还款详情
    moneyGiveList: [],//代扣记录
    kefuList: [],// S0
    borrowList: [],//借款记录
    imgSrc:'',//图片
    imgShow:false,
    collectBoole:false,//催收记录
    defaultSrc: require('../assets/default.png'),
    cellStyle:{'line-height': '16px;'},
  }),
  computed:{
    ...mapGetters({
      id: 'GetCallId',
      idID: 'GetCallIdID'//订单id
    })
  },
  methods:{
    // continueClick(row) {//需还记录
    //   console.log(row);
      
    // },
    collectClick(row) {//催收记录
      // console.log("催收记录",row);
      this.collectBoole = true;
      this.$router.replace({name: 'callRecord'})
    },
    detailApi(){//详情接口
      loanIdentiList({
        userId:this.id
      }).then((res)=>{
        console.log("详情接口",res)
        console.log("详情接口",res.data.data)
        this.detailObject = res.data.data
      })
    },
    //查询借款和还款信息
    RepayApi(){//查询借款和还款信息
      callRepayDetailList({
        userId:this.id
      }).then((res)=>{
        console.log("查询借款和还款信息对象",res)
        console.log("查询借款和还款信息对象",res.data.data)
        this.backDetailObject = res.data.data;
        console.log("对象",this.backDetailObject)
      })
    },
    //查询借款和还款信息
    RepaySApi(){//查询借款和还款信息
      callRepayDetailSList({
        userId:this.id
      }).then((res)=>{
        console.log("查询借款和还款信息",res)
        console.log("查询借款和还款信息",res.data.data)
        let list=[];
        res.data.data.forEach((element,i) => {
          switch(res.data.data[i].orderStatus){
            case 5:     //逾期
              res.data.data[i].realReturnMoney = 0;//实还本金
              res.data.data[i].lessBorrowMoney = res.data.data[i].borrowMoney;  //剩余应还本金
              res.data.data[i].realFineMoney = res.data.data[i].realPayMoney; //实还罚金
              res.data.data[i].returnTime = res.data.data[i].extendTime; //还款时间
              res.data.data[i].lessPayMoney = res.data.data[i].overdueMoney; //剩余应还罚息
              res.data.data[i].lastPayTime = res.data.data[i].extendTime; //最后还款时间
              res.data.data[i].shouldMoney = res.data.data[i].needPayMoney; //应还金额
              break;
            case 6:     //已还
              res.data.data[i].realReturnMoney = res.data.data[i].borrowMoney;//实还本金
              res.data.data[i].lessBorrowMoney = 0;  //剩余应还本金
              res.data.data[i].realFineMoney = res.data.data[i].realPayMoney - res.data.data[i].borrowMoney; //实还罚金
              res.data.data[i].returnTime = res.data.data[i].realPayTime; //还款时间
              res.data.data[i].lessPayMoney = 0; //剩余应还罚息
              res.data.data[i].lastPayTime = res.data.data[i].realPayTime; //最后还款时间
              res.data.data[i].shouldMoney = 0; //应还金额
              break;
          }
          switch(res.data.data[i].payType){
            case 1:
              res.data.data[i].payMethod = "易宝支付"
              break;
            case 2:
              res.data.data[i].payMethod = "支付宝支付"
              break;
          }
            
        });
        this.backDetailList = res.data.data;
      })
    },
    //代扣记录
    deductedApi(){//代扣记录接口
      callPingppIdsList({
        orderId:this.idID
      }).then((res)=>{
        console.log("代扣记录",res)
        console.log("代扣记录",res.data.data)
        res.data.data.forEach((element,i) => {
          if(res.data.data[i].loanOrder.pressStatus == "1"){
            res.data.data[i].loanOrder.pressStatus = "催收中"
          }
          if(res.data.data[i].loanOrder.pressStatus == "2"){
            res.data.data[i].loanOrder.pressStatus = "已成功"
          }
          if(res.data.data[i].loanOrder.pressStatus == "0"){
            res.data.data[i].loanOrder.pressStatus = "未催收"
          }
          if(res.data.data[i].repayStatus == "1"){
            // loanOrder.pressStatus
            res.data.data[i].repayStatus = "发起"
          }
          if(res.data.data[i].repayStatus == "2"){
            res.data.data[i].repayStatus = "失败"
          }
          if(res.data.data[i].repayStatus == "3"){
            res.data.data[i].repayStatus = "成功"
          }
        });
        this.moneyGiveList = res.data.data
      })
    },
    openImg(e) {
      this.imgShow = true;
      this.imgSrc = e.target.src;
      console.log("图片路径",this.imgSrc)
    },
  },
  mounted(){
    this.detailApi()
    this.deductedApi()
    this.RepayApi()
    this.RepaySApi()
  },
  components:{
    "CallRecordList": CallRecordList
  }
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
.allPage{
  background: #fff;
  .personDetail{
    padding:20px;
  }
  .list{
    padding:0 20px 10px;
    .title{
      font-weight: bold;
    }
  }
  .myImg{
    width: 50px;
    height:50px;
    position: relative;
    top:0px;
    left:30%;
    cursor: pointer;
  }
}
</style>
