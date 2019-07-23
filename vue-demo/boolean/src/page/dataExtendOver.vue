<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        清算中心
      </div>
    </div>
    <div class="searchAll">
      <span>手机号</span>
      <el-input v-model="searchPhone" placeholder="请输入手机号" class='search' size="mini"></el-input>
      <span>借款人</span>
      <el-input v-model="searchName" placeholder="请输入借款人" class='search' size="mini"></el-input>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">查询</el-button>
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          label="序号"
          type='index'
          width="50"
          >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="借款人"
          width='110'
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width='130'
          >
        </el-table-column>
        <el-table-column
          prop="realMoney"
          label="借款本金"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="wateMoney"
          label="服务费"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="needPayMoney"
          label="应还金额"
          width='130'
          >
        </el-table-column>
        <el-table-column
          prop="overdueDays"
          label="逾期天数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="giveTime"
          label="放款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="limitPayTime"
          label="应还款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop='isOld'
          label="客户类型"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='orderStatus'
          label="还款状态"
          width='100'
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='openExtend(scope.row)'>续期</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='openOver(scope.row)'>结清</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='openAmend(scope.row)'>修改订单</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          @size-change="sizeChange"
          :current-page.sync="pageNo"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="10"
          layout="sizes, total, prev, pager, next, jumper"
          :total="pageAll">
        </el-pagination>
      </div>
      <el-dialog
        title="结清"
        :visible.sync="overOrder"
        width="65%"
        >
        <div class="overOrder">
          <div class="itemCon" v-for="(value, key, index) in overAll" :key="key">
            <span>{{key}}：</span>{{value}}
          </div>
          <div class="itemCon">
            <span>还款金额：<i style='color:red'>*</i></span>
            <el-input v-model="overGiveMoney" class='search' size="mini"></el-input>
          </div>
          <div class="itemCon">
            <span>还款类型：<i style='color:red'>*</i></span>
            <el-select v-model="overSelectType" placeholder="请选择" size='mini' class="selectChoice">
              <el-option label="正常还款" value="1"></el-option>
              <el-option label="逾期还款" value="2"></el-option>
              <el-option label="减免还款" value="3" v-if='false'></el-option>
            </el-select>
          </div>
          <div class="itemCon">
            <span>还款渠道：<i style='color:red'>*</i></span>
            <el-select v-model="overSelectFrom" placeholder="请选择" size='mini' class="selectChoice">
              <!-- <el-option label="易宝" value="1"></el-option>
              <el-option label="支付宝" value="2"></el-option>
              <el-option label="微信" value="3"></el-option> -->
              <el-option label="支付宝转账" value="11"></el-option>
              <el-option label="微信转账" value="12"></el-option>
              <el-option label="银行卡转账" value="13"></el-option>
              <el-option label="线下收款" value="14"></el-option>
            </el-select>
          </div>
          <div class="itemCon">
            <span>实际还款时间：<i style='color:red'>*</i></span>
            <el-date-picker
              v-model="overRealDate"
              type="date"
              placeholder="选择日期"
              align="right"
              value-format='yyyy-MM-dd'
              :picker-options='pickerOptions'
              size='mini'
              style='width:150px;'
              >
            </el-date-picker>
            <el-time-picker
              v-model="overRealTime"
              :picker-options="timeOptions"
              placeholder="选择时间"
              value-format='HH:mm:ss'
              size='mini'
              style='width:150px;'
              >
            </el-time-picker>
          </div>
          <div class="">
            <div class="title">
              备注
            </div>
            <el-input
              type="textarea"
              placeholder="备注内容100字以内"
              v-model="overMessage"
              maxlength='100'
              >
            </el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveOver">保 存</el-button>
          <el-button @click="closeAll">关 闭</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="续期"
        :visible.sync="extendOrder"
        width="65%"
        >
        <div class="overOrder">
          <div class="itemCon">
            <span>展期类型：<i style='color:red'>*</i></span>
            <el-select v-model="extendSelectType" placeholder="请选择" size='mini' class="selectChoice">
              <el-option label="正常续期" value="1"></el-option>
              <el-option label="逾期续期" value="2"></el-option>
            </el-select>
          </div>
          <div class="itemCon">
            <span>还款渠道：<i style='color:red'>*</i></span>
            <el-select v-model="extendSelectFrom" placeholder="请选择" size='mini' class="selectChoice">
              <!-- <el-option label="易宝" value="1"></el-option>
              <el-option label="支付宝" value="2"></el-option>
              <el-option label="微信" value="3"></el-option> -->
              <el-option label="支付宝转账" value="11"></el-option>
              <el-option label="微信转账" value="12"></el-option>
              <el-option label="银行卡转账" value="13"></el-option>
              <el-option label="线下收款" value="14"></el-option>
            </el-select>
          </div>
          <!-- <div class="itemCon" v-for="(value, key, index) in extendAll" :key="key">
            <span>{{key}}：</span>{{value}}
          </div> -->
          <div class="itemCon">
            <span>续期费：<i style='color:red'>*</i></span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              class="selectChoice"
              v-model="extendWateMoney">
           </el-input>
          </div>
          <div class="itemCon">
            <span>续期天数：<i style='color:red'>*</i></span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              class="selectChoice"
              v-model="extendDays">
           </el-input>
          </div>
          <div class="itemCon">
            <span>收款时间：<i style='color:red'>*</i></span>
            <el-date-picker
              v-model="extendGetDate"
              type="date"
              placeholder="选择日期"
              align="right"
              value-format='yyyy-MM-dd'
              :picker-options='pickerOptions'
              size='mini'
              style='width:150px;'
              >
            </el-date-picker>
            <el-time-picker
              v-model="extendGetTime"
              :picker-options="timeOptions"
              placeholder="选择时间"
              value-format='HH:mm:ss'
              size='mini'
              style='width:150px;'
              >
            </el-time-picker>
          </div>
          <div class="">
            <div class="title">
              备注
            </div>
            <el-input
              type="textarea"
              placeholder="备注内容100字以内"
              v-model="extendMessage"
              maxlength='100'
              >
            </el-input>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="saveExtend">保 存</el-button>
          <el-button @click="closeAll">关 闭</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改订单"
        :visible.sync="PayMoney"
        width="40%"
        >
        <div class="overOrder">
          <div class="itemCon">
            <span>修改应还金额：<i style='color:red'>*</i></span>
            <el-input
              size="mini"
              placeholder="请输入内容"
              class="selectChoice"
              v-model="moneyDays">
           </el-input>
          </div> 
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="amendExtend">保 存</el-button>
          <el-button @click="closeAll">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { dataExtendOverList, dataExtendOverSaveExtend, dataExtendOverSaveOver,dataExtendOverAmendExtend } from '@/API'
export default {
  data: () => {
    return {
      id: '',
      userList: [],
      pageNo: 1,
      pageSize: 10,
      pageAll: 0,
      searchName: '',
      searchPhone: '',
      cellStyle:{
        'line-height': '16px;'
      },
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() <= new Date().getTime()-3600*24*7000 || time.getTime() > Date.now()
        }
      },
      timeOptions: {
        selectableRange:'00:00:00 - 23:59:59'
      },
      // 结清弹框内容
      overOrder: false,
      overRealTime: '',
      overRealDate: '',
      overGiveMoney: '',
      overMessage: '',
      overSelectFrom: '',
      overSelectType: '',
      overAll:{},
      // 展期弹框内容
      extendOrder: false,
      extendMessage: '',
      extendGetDate: '',
      extendGetTime: '',
      extendSelectType: '',
      extendSelectFrom: '',
      extendAll: {},
      //续期费和天数
      extendWateMoney:'',
      extendDays:'',
      //修改订单
      PayMoney:false,
      moneyDays:''
    }
  },
  beforeMount(){
    this.getList();
  },
  methods: {
    // 设置时间选择
    setTime() {
      let now = new Date()
      let HH, m, s
      HH = now.getHours() > 9 ? now.getHours() : ('0' + now.getHours())
      m = now.getMinutes() > 9 ? now.getMinutes() : ('0' + now.getMinutes())
      s = now.getSeconds() > 9 ? now.getSeconds()  : ('0' + now.getSeconds())
      return "00:00:00 - " + HH + ":" + m + ":" + s
      console.log("00:00:00 - " + HH + ":" + m + ":" + s);
    },
    // 保存续期
    saveExtend(){
      if(!this.extendSelectFrom || !this.extendSelectType || !this.extendGetTime || !this.extendGetDate ||
       !this.extendWateMoney || !this.extendDays){
        this.$message('请填选带星号的选项')
        return
      }
      let params = {
        orderId: this.id,
        extendType: this.extendSelectType,
        repayType: this.extendSelectFrom,
        gmtDatetime: this.extendGetDate + " " + this.extendGetTime,
        remark: this.extendMessage,
        extendWateMoney:this.extendWateMoney,
        extendDays:this.extendDays,
      }
      dataExtendOverSaveExtend(params).then(data=>{
        if(data.data.code === 'SUCCESS'){
          this.$message('续期成功')
          this.getList()
        }else(
          this.$message(data.data.msg)
        )
      })
      this.closeAll()
    },
    // 保存结清
    saveOver(){
      if(!this.overSelectFrom || !this.overSelectType || !this.overRealTime || !this.overGiveMoney || !this.overRealDate){
        this.$message('请填选带星号的选项')
        return
      }
      let params = {
        orderId: this.id,
        money: this.overGiveMoney,
        payStatus: this.overSelectType,
        payType: this.overSelectFrom,
        gmtDatetime: this.overRealDate + ' ' + this.overRealTime,
        remark: this.overMessage
      }

      dataExtendOverSaveOver(params).then(data=>{
        if(data.data.code === 'SUCCESS'){
          this.$message('订单结清成功')
          this.getList()
        }else(
          this.$message(data.data.msg)
        )
      })
      this.overOrder = false
      this.closeAll()
    },
    // 保存修改订单
    amendExtend(){
       if(!this.moneyDays){
        this.$message('请填选带星号的选项')
        return
      }
      let params = {
        orderId: this.id,
        money: this.moneyDays,
      }
      dataExtendOverAmendExtend(params).then(data=>{
        if(data.data.code === 'SUCCESS'){
          // this.$message('修改应还金额成功')
          this.$message({
          message: '修改应还金额成功',
          type: 'success'
        });
          this.getList()
        }else(
          this.$message(data.data.msg)
        )
      })
      this.PayMoney = false
      this.closeAll()
    },
    // 关闭所有
    closeAll(){
      this.overOrder = false
      this.overRealTime = ''
      this.overGiveMoney = ''
      this.overMessage = ''
      this.overSelectFrom = ''
      this.overSelectType = ''
      this.overAll = {}

      this.extendOrder = false
      this.extendMessage = ''
      this.extendGetTime = ''
      this.extendGetDate = ''
      this.extendSelectType = ''
      this.extendSelectFrom = ''
      this.extendAll = {}
      this.extendWateMoney = ''
      this.extendDays = ''
      
      this.PayMoney = false
      this.moneyDays = ''
    },
    // 打开结清
    openOver(row){
      this.timeOptions.selectableRange = this.setTime()
      this.id = row.id
      this.overOrder = true
      this.overAll = {
        '应还金额' : row.needPayMoney,
        '滞纳金' : row.overdueMoney,
        '逾期天数' : row.overdueDays,
        '减免金额' : 0
      }
    },
    // 打开续期
    openExtend(row){
      this.timeOptions.selectableRange = this.setTime()
      this.id = row.id
      this.extendOrder = true
      this.extendAll = {
        '总费用' : row.extendMoney + row.overdueMoney,
        // '续期费' : row.extendMoney,
        '滞纳金' : row.overdueMoney,
        // '逾期天数' : row.overdueDays
      }
    },
    openAmend(row){
      this.id = row.id
      this.PayMoney = true
    },
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    getList(isOr) {
      let nameReg = /^[\u4e00-\u9fa5]{0,}$/
      if( !nameReg.test(this.searchName) ){
        this.$message('请填写正确的姓名')
        return
      }
      if(isNaN(this.searchPhone)){
        let reg = /^1\d{10}$/i
        if(!reg.test(this.searchPhone)){
          this.$message('请填写正确的11位手机号码')
          return
        }
      }
      if(isOr == 0){
        this.pageNo = 1
      }
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        userName: this.searchName,
        phone: this.searchPhone,
      }
      dataExtendOverList(params).then(data=>{
        this.userList = data.data.data.records;
        this.pageAll = data.data.data.total
        for(let i = 0; i<this.userList.length; i++){
          if(this.userList[i].isOld == 0){
            this.userList[i].isOld = '新增'
          }else if(this.userList[i].isOld == 1){
            this.userList[i].isOld = '续贷'
          }
          if(this.userList[i].orderStatus == 3){
            this.userList[i].orderStatus = '待还款'
          }else if(this.userList[i].orderStatus == 5){
            this.userList[i].orderStatus = '逾期'
          }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
.allPage{
  .searchAll{
    background-color: white;
    padding:20px;
    /deep/ .dateStyle{
      width:16%;
    }
    .selectChoice{
      width: 10%;
      margin-right: 20px;
    }
    .search{
      width: 150px;
      margin-right: 1px;
    }
  }
  .allMoney{
    background: #FFF;
    .title{
      padding-left: 20px;
    }
    .content{
      color:red;
    }
  }
  .list{
    background: #fff;
    padding: 5px;
    .right_title{
      text-align: right;
      .Rname{
        margin-right: 10px;
      }
      .red{
        color:red;
        margin-right: 10px;
      }
    }
    .choice{
      text-align: center;
      margin-top: 20px;
    }
  }
  .overOrder{
    .itemCon{
      display: inline-block;
      width: 450px;
      span{
        margin-right: 10px;
      }
      .el-picker-panel{
        left:auto !important;
      }
      .selectChoice{
        width: 100px;
        margin-right: 20px;
        margin-bottom: 10px;
      }
      .search{
        width: 100px;
        margin-right: 1px;
      }
    }
  }
}
</style>
