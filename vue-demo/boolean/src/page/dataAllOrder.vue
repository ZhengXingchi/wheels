<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        总订单列表
      </div>
    </div>
    <div class="searchAll">
      <span>借款时间：</span>
      <el-date-picker
        v-model="borrowTime"
        type="daterange"
        align="right"
        value-format='yyyy-MM-dd'
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateOption"
        size='mini'
        class="dateStyle"
        >
      </el-date-picker>
      <span>实际还款时间：</span>
      <el-date-picker
        v-model="trueTime"
        type="daterange"
        align="right"
        value-format='yyyy-MM-dd'
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateOption"
        size='mini'
        class="dateStyle"
        >
      </el-date-picker>
      <span>订单编号：</span>
      <el-input v-model="searchNumber" placeholder="请输入订单编号" class='search' size="mini"></el-input>
      <span>还款状态：</span>
      <el-select v-model="selectRepay" size='mini' class="selectChoice">
        <el-option label="全部" value=""></el-option>
        <el-option label="正常已还款" value="0"></el-option>
        <el-option label="展期已还款" value="1"></el-option>
        <el-option label="逾期已还款" value="2"></el-option>
        <el-option label="正常待还款" value="3"></el-option>
        <el-option label="展期待还款" value="4"></el-option>
        <el-option label="逾期待还款" value="5"></el-option>
      </el-select>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">查询</el-button>
    </div>
    <div class="allMoney">
      <span class="title">订单总金额：</span>
      <span class="content">{{allMoney}}</span>
      <span>元</span>
      <span class="title">服务费总金额：</span>
      <span class="content">{{allServeMoney}}</span>
      <span>元</span>
      <span class="title">展期费总金额：</span>
      <span class="content">{{allExtend}}</span>
      <span>元</span>
      <span class="title">减免总金额：</span>
      <span class="content">{{allJian}}</span>
      <span>元</span>
      <span class="title">滞纳金总金额：</span>
      <span class="content">{{allStayMoney}}</span>
      <span>元</span>
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
          prop='orderId'
          label="订单编号"
          width="80"
          >
        </el-table-column>
        <el-table-column
          prop="giveTime"
          label="借款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="isOld"
          label="客户类型"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="borrowMoney"
          label="借款金额"
          width='150'
          >
        </el-table-column>
        <el-table-column
          prop="realMoney"
          label="本金金额"
          width='150'
          >
        </el-table-column>
        <el-table-column
          prop="needPayMoney"
          label="应还金额"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="realPayMoney"
          label="实际还款金额"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="wateMoney"
          label="服务费"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="extendMoney"
          label="展期费"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='extendNum'
          label="展期次数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='overdueDays'
          label="逾期天数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='overdueMoney'
          label="滞纳金"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='reduceMoney'
          label="减免金额"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='limitPayTime'
          label="应还款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop='realPayTime'
          label="实际还款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop='payType'
          label="还款渠道"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='payStatus'
          label="还款状态"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='orderCount'
          label="订单数"
          width='100'
          >
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
    </div>
  </div>
</template>
<script>
import {dataAllOrderList, dataAllOrderData} from '@/API'
export default {
  data: () => ({
    cellStyle:{
      'line-height': '16px;'
    },
    userList: [],
    pageNo: 1,
    pageSize: 10,
    pageAll: 1,
    searchPhone: '',
    searchNumber: '',
    selectRepay: '',
    borrowTime: '',
    trueTime: '',
    allMoney: 0,//订单总金额
    allServeMoney: 0,//服务费总金额
    allExtend: 0,//展期总金额
    allStayMoney: 0,//滞纳金总金额
    allJian: 0,//减免总金额
    dateOption: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          picker.$emit('pick', [start, end]);
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date();
          const start = new Date();
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
          picker.$emit('pick', [start, end]);
        }
      }]
    },
  }),
  mounted() {
    //do something after mounting vue instance
    this.getList()
  },
  methods: {
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    getList(isOr) {
      if(isOr === 0){
        this.pageNo = 1
      }
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        phone: this.searchPhone,
        orderId: this.searchNumber,
        repayStatus: this.selectRepay
      };
      if(this.borrowTime){
        params.gmtDatetime = this.borrowTime[0] + `~` + this.borrowTime[1]
      }else{
        params.gmtDatetime = ''
      }
      if(this.trueTime){
        params.realPayTime = this.trueTime[0] + `~` + this.trueTime[1]
      }else{
        params.realPayTime = ''
      }
      dataAllOrderList(params).then(data=>{
        this.userList = data.data.data.records
        for(let i = 0; i<this.userList.length; i++){
          if(this.userList[i].payType == 1){
            this.userList[i].payType = '易宝'
          }else if(this.userList[i].payType == 2){
            this.userList[i].payType = '支付宝'
          }else if(this.userList[i].payType == 3){
            this.userList[i].payType = '微信'
          }


          if(this.userList[i].isOld == 0){
            this.userList[i].isOld = '新增'
          }else if(this.userList[i].isOld == 1){
            this.userList[i].isOld = '续贷'
          }
        }

        this.pageAll = data.data.data.total
      })
      let paramsT = {
        phone: this.searchPhone,
        orderId: this.searchNumber,
        repayStatus: this.selectRepay
      }
      if(this.borrowTime){
        paramsT.gmtDatetime = this.borrowTime[0] + `~` + this.borrowTime[1]
      }else{
        paramsT.gmtDatetime = ''
      }
      if(this.trueTime){
        paramsT.realPayTime = this.trueTime[0] + `~` + this.trueTime[1]
      }else{
        paramsT.realPayTime = ''
      }
      dataAllOrderData(paramsT).then(data=>{
        this.allMoney = (+data.data.data.orderMoney || 0).toFixed(2)
        this.allServeMoney = (+data.data.data.wateMoney || 0).toFixed(2)
        this.allExtend = (+data.data.data.extendMoney || 0).toFixed(2)
        this.allStayMoney = (+data.data.data.overdueMoney || 0).toFixed(2)
        this.allJian = (+data.data.data.reduceMoney || 0).toFixed(2)
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
      width: 100px;
      margin-right: 20px;
    }
    .search{
      width: 140px;
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
}
</style>
