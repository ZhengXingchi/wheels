<template>
  <div class="allPage">
    <div class="searchAll">
      <el-date-picker
        v-model="borrowTime"
        type="daterange"
        align="right"
        value-format="yyyy-MM-dd"
        unlink-panels
        range-separator="至"
        start-placeholder="借款时间-开始日期"
        end-placeholder="借款时间-结束日期"
        :picker-options="dateOption"
        size="mini"
        class="dateStyle"
      ></el-date-picker>
      <el-date-picker
        v-model="trueTime"
        type="daterange"
        align="right"
        value-format="yyyy-MM-dd"
        unlink-panels
        range-separator="至"
        start-placeholder="还款时间-开始日期"
        end-placeholder="还款时间-结束日期"
        :picker-options="dateOption"
        size="mini"
        class="dateStyle"
      ></el-date-picker>
      <el-input v-model="searchNumber" placeholder="请输入订单编号" class="search" size="mini"></el-input>
      <el-input v-model="searchUsername" placeholder="请输入用户名" class='search' size="mini"></el-input>
      <el-input v-model="searchPhone" placeholder="请输入手机号" class='search' size="mini"></el-input>
      <el-button type icon="el-icon-search" size="mini" @click="getList(0)" class="publicMidBtn">查询</el-button>
      <el-radio-group v-model="orderStatus" size="small" fill="#67C23A" style="margin-left:20px;">
        <!-- <el-radio-button label="normal">正常已还</el-radio-button>
        <el-radio-button label="delayRepayed">展期已还</el-radio-button>
        <el-radio-button label="overdueRepayed">逾期已还</el-radio-button> -->
      </el-radio-group>
    </div>
    <el-row style="margin-left:20px">
      <el-col :span="24" v-if="orderStatus=='normal'">
        <el-form label-position="left" inline class="total-table-expand">
          <el-form-item label="已还总金额：">
            <span>{{payedTotal.normal.orderMoney}}</span>
          </el-form-item>
          <el-form-item label="已收服务费总金额：">
            <span>{{payedTotal.normal.wateMoney}}</span>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" v-if="orderStatus=='delayRepayed'">
        <el-form label-position="left" inline class="total-table-expand">
          <el-form-item label="展期已还总金额：">
            <span>{{payedTotal.delay.orderMoney}}</span>
          </el-form-item>
          <el-form-item label="展期已收服务费总金额：">
            <span>{{payedTotal.delay.wateMoney}}</span>
          </el-form-item>
          <el-form-item label="已收展期总金额：">
            <span>{{payedTotal.delay.extendMoney}}</span>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="24" v-if="orderStatus=='overdueRepayed'">
        <el-form label-position="left" inline class="total-table-expand">
          <el-form-item label="逾期已还总金额：">
            <span>{{payedTotal.overdue.orderMoney}}</span>
          </el-form-item>
          <el-form-item label="服务费总金额：">
            <span>{{payedTotal.overdue.wateMoney}}</span>
          </el-form-item>
          <el-form-item label="滞纳金总金额：">
            <span>{{payedTotal.overdue.extendMoney}}</span>
          </el-form-item>
          <el-form-item label="减免总金额：">
            <span>{{payedTotal.overdue.reduceMoney}}</span>
          </el-form-item>
          <el-form-item label="展期总金额：">
            <span>{{payedTotal.overdue.overdueMoney}}</span>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="list">
      <el-table :data="userList" style="width: 100%" :cell-style="cellStyle">
        <el-table-column label="序号" type="index" width="50"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="80"></el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column prop="orderId" label="订单编号" width="80"></el-table-column>
        <el-table-column prop="giveTime" label="借款时间" width="160"></el-table-column>
        <el-table-column prop="isOld" label="客户类型" width="80"></el-table-column>
        <el-table-column prop="borrowMoney" label="借款金额" width="150"></el-table-column>
        <el-table-column prop="realMoney" label="本金金额" width="150"></el-table-column>
        <el-table-column prop="needPayMoney" label="应还金额" width="160"></el-table-column>
        <el-table-column prop="realPayMoney" label="实际还款金额" width="160"></el-table-column>
        <el-table-column prop="wateMoney" label="服务费" width="100"></el-table-column>
        <el-table-column prop="payStatus" label="还款状态" width="100"></el-table-column>
        <el-table-column prop="limitPayTime" label="应还款时间" width="160"></el-table-column>
        <el-table-column prop="realPayTime" label="实际还款时间" width="160"></el-table-column>
        <el-table-column prop="payType" label="还款渠道" width="100"></el-table-column>
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
          :total="pageAll"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { dataRepayedList, dataNormalHadBackData,dataExtendHadBackData,dataOverdueHadBackData } from "@/API";
let currentPage=1;
export default {
  data: () => ({
    cellStyle: {
      "line-height": "16px;"
    },
    orderStatus: "normal",
    userList: [],
    pageNo: currentPage,
    pageSize: 10,
    pageAll: 1,
    searchPhone: "",
    searchNumber: "",
    searchUsername:"",
    borrowTime: "",
    payedTotal: {
      normal: { orderMoney: 0, wateMoney: 0 },
      delay: { orderMoney: 0, wateMoney: 0, extendMoney: 0 },
      overdue: {
        orderMoney: 0,
        overdueMoney: 0,
        reduceMoney: 0,
        wateMoney: 0,
        extendMoney: 0
      }
    },
    trueTime: "",
    allMoney: 0,
    allServeMoney: 0,
    dateOption: {
      shortcuts: [
        {
          text: "最近一周",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近一个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit("pick", [start, end]);
          }
        },
        {
          text: "最近三个月",
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit("pick", [start, end]);
          }
        }
      ]
    }
  }),
  watch: {
      orderStatus(newValue, oldValue) {
        if(newValue!=oldValue){
            this.userList = [];
            this.pageNo = 1;
            this.pageSize = 10;
            this.pageAll = 1;
            this.getList();
        }
      }
  },
  mounted() {
    if(currentPage>1) this.pageNo=currentPage;
    //do something after mounting vue instance
    this.getList();
  },
  methods: {
    sizeChange(size) {
      this.pageSize = size;
      this.getList(0);
    },
    getList(isOr) {
      if (isOr === 0) {
        this.pageNo = 1;
      }
      currentPage = this.pageNo;
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        phone: this.searchPhone,
        orderId: this.searchNumber,
        userName:this.searchUsername
      };
      if (this.borrowTime) {
        params.gmtDatetime = this.borrowTime[0] + `~` + this.borrowTime[1];
      } else {
        params.gmtDatetime = "";
      }
      if (this.trueTime) {
        params.realPayTime = this.trueTime[0] + `~` + this.trueTime[1];
      } else {
        params.realPayTime = "";
      }
    dataRepayedList(params,this.orderStatus).then(data => {
        this.userList = data.data.data.records;
        for (let i = 0; i < this.userList.length; i++) {
          let payType = parseInt(this.userList[i].payType);
          switch(payType){
            case 1:
              this.userList[i].payType = "银行卡还款";
              break;
            case 2:
              this.userList[i].payType = "ping++支付宝";
              break;
            case 3:
              this.userList[i].payType = "ping++微信";
              break;
            case 11:
              this.userList[i].payType = "支付宝转账";
              break;
            case 12:
              this.userList[i].payType = "微信转账";
              break;
            case 13:
              this.userList[i].payType = "银⾏卡转账";
              break;  
            case 14:
              this.userList[i].payType = "线下收款";
              break;  
            default:
              break;  
          }
       
          if (this.userList[i].isOld == 0) {
            this.userList[i].isOld = "新增";
          } else if (this.userList[i].isOld == 1) {
            this.userList[i].isOld = "续贷";
          }
        }

        this.pageAll = data.data.data.total;
      });
    if(this.pageNo==1){
        let paramsT = {
            phone: this.searchPhone,
            orderId: this.searchNumber,
            userName:this.searchUsername
        };
        if (this.borrowTime) {
            paramsT.gmtDatetime = this.borrowTime[0] + `~` + this.borrowTime[1];
        } else {
            paramsT.gmtDatetime = "";
        }
        if (this.trueTime) {
            paramsT.realPayTime = this.trueTime[0] + `~` + this.trueTime[1];
        } else {
            paramsT.realPayTime = "";
        }
        if(this.orderStatus=='normal'){
            dataNormalHadBackData(paramsT).then(data => {
                this.payedTotal.normal.orderMoney = (+data.data.data.orderMoney || 0).toFixed(2);
                this.payedTotal.normal.wateMoney = (+data.data.data.wateMoney || 0).toFixed(2);
            });
        }else if(this.orderStatus=='delayRepayed'){
            dataExtendHadBackData(paramsT).then(data => {
                this.payedTotal.delay.orderMoney = (+data.data.data.orderMoney || 0).toFixed(2);
                this.payedTotal.delay.wateMoney = (+data.data.data.wateMoney || 0).toFixed(2);
                this.payedTotal.delay.extendMoney = (+data.data.data.extendMoney || 0).toFixed(2);
            });
        }else if(this.orderStatus=='overdueRepayed'){
            dataOverdueHadBackData(paramsT).then(data => {
                this.payedTotal.overdue.orderMoney = (+data.data.data.orderMoney || 0).toFixed(2);
                this.payedTotal.overdue.wateMoney = (+data.data.data.wateMoney || 0).toFixed(2);
                this.payedTotal.overdue.extendMoney = (+data.data.data.extendMoney || 0).toFixed(2);
                this.payedTotal.overdue.reduceMoney = (+data.data.data.reduceMoney || 0).toFixed(2);
                this.payedTotal.overdue.overdueMoney = (+data.data.data.overdueMoney || 0).toFixed(2);
            });
        }
       
    }
      
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/publicSass.scss";

.allPage {
  .searchAll {
    background-color: white;
    padding: 20px;
    .selectChoice {
      width: 100px;
      margin-right: 20px;
    }
    .search {
      width: 140px;
      margin-right: 1px;
    }
  }
  .allMoney {
    background: #fff;
    .title {
      padding-left: 20px;
    }
    .content {
      color: red;
    }
  }
  .list {
    background: #fff;
    padding: 5px;
    .right_title {
      text-align: right;
      .Rname {
        margin-right: 10px;
      }
      .red {
        color: red;
        margin-right: 10px;
      }
    }
    .choice {
      text-align: center;
      margin-top: 20px;
    }
  }
    .total-table-expand {
        font-size: 0;
        background-color: #99a9bf26;
        margin-bottom: 5px;
        padding-left:10px;
    }
    .total-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .total-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 20%;
        span{
            color:red;
            display: block;
        }
    }
    .total-table-expand .el-form-item span:after{
        content: "元";
        padding-left:5px;
    }
}
</style>
