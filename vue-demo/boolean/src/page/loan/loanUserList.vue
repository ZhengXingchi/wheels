<template>
  <div class="allPage">
    <div class="searchAll">
      <el-row >
        <el-col :span="24">
          <span>注册时间:</span>
          <el-date-picker
            v-model="dateTime"
            type="daterange"
            align="right"
            value-format='yyyy-MM-dd'
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="dateOption"
            size='mini'
            style='width:240px;'
          >
          </el-date-picker>
          <el-input v-model="searchName" placeholder="请输入姓名" class='search' style='width:120px;' size="mini" clearable></el-input>
          <el-input v-model="searchPhone" placeholder="请输入电话号码" class='search' style='width:120px;' size="mini" clearable></el-input>
          <el-input v-model="channelName" placeholder="请输入渠道商名称" class='search' style='width:120px;' size="mini" clearable></el-input>
      
          <el-button type="primary" icon="el-icon-search" size='mini' @click='getList(0)'>搜 索</el-button>
        </el-col>
        
      </el-row>
    </div>

    <div class="list">
      <el-table
                border
                ref='refsList'
                :data="userList"
                highlight-current-row
                style="width: 100%"
                :cell-style='cellStyle'
                :row-class-name="tableRowClassName"
                height='600'>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="100"
          >
        </el-table-column>
        <el-table-column
        prop="userName"
          label="姓名"
          width='100'
          >
        </el-table-column>

        <el-table-column
          prop="phone"
          label="手机号码"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="注册时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="loanCount"
          label="借款次数"
          width='100'>
        </el-table-column>
        <el-table-column
          label="历史放款金额"
          width='160'
          >
          <template slot-scope="scope">
            {{scope.row.give_money_list|handleMoneyList}}
          </template>
        </el-table-column>
        <el-table-column
          prop="last_loan_time"
          label="最新借款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          label="最新订单状态"
          width='160'
          >
          <template slot-scope="scope">
            {{scope.row.last_loan_order_status|orderStatusToText}}
          </template>
        </el-table-column>
       
         <el-table-column
      label="操作"
      >
      <template slot-scope="scope">
        <el-button type="text" size="small" class="publicSmalBtn" @click='toAuthor(scope.row.id)' >查看认证信息</el-button>
        <el-button type="text" size="small"  @click='toUserOrderList(scope.row.id,scope.row.userName)'>历史</el-button>
        <el-button type="text" size="small" class="publicSmalBtn" @click='toXuqiRecord(scope.row.id)'>续期记录</el-button>
      </template>
    </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          :current-page.sync="pageNo"
          @size-change="sizeChange"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="10"
          layout="sizes, total, prev, pager, next, jumper"
          :total="pageAll">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      :title="userOrderTitle+'用户历史订单'"
      :visible.sync="isShowUserOrderList"
      width="60%"
    >
      <el-table :data="userOrderList"
                :cell-style='cellStyle'
                border
                show-summary
      >
        <el-table-column
          prop="orderId"
          label="订单"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop='borrowMoney'
          label="借款金额"
        >
        </el-table-column>
        <el-table-column
          prop='needPayMoney'
          label="实还金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop='giveTime'
          label="借款时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop='limitPayTime'
          label="应还时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop='realPayTime'
          label="实还时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态"
          width="80">
          <template slot-scope="scope">
            {{scope.row.orderStatus|orderStatusToText}}
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button @click="isShowUserOrderList = false">关 闭</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="续期记录"
      :visible.sync="showXuqiRecord"
      width="60%"
      >
      <div class="list">
        <el-table :data="recordList"
                  style="width: 100%"
                  :cell-style='cellStyle'
                  >
          <el-table-column
            prop="id"
            label="ID"
            >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名"
            >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            >
          </el-table-column>
          <el-table-column
            prop="extendWateMoney"
            label="续期金额"
            >
          </el-table-column>
          <el-table-column
            prop="gmtDatetime"
            label="续期时间"
            >
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showXuqiRecord = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {loanUserList,userHistoryOrder,extendList} from '@/API'
import _default,{ mapMutations } from 'vuex'
let currentPage=1;
export default {
  data: () => {
    return {
      userList: [],//会员列表
      channelName:'',//渠道商名称
      searchPhone: '',//手机号
      searchName: '',//用户名
      pageNo: currentPage,//当前页
      pageSize: 10,//每页条数
      pageAll: 0,//总条数
      cellStyle:{
        'line-height': '16px;'
      },
      dateTime: '',//时间
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
      icon:{//图片
        refuse:"../../static/img/refuse.svg",
        pass:"../../static/img/pass.svg",
      },
      isShowUserOrderList:false,
      userOrderTitle:'',
      userOrderList:[],
      recordList: [],
      showXuqiRecord:false,
    }
  },
  beforeMount(){
    if(currentPage>1) this.pageNo=currentPage;
    this.getList();//会员列表
  },
  filters:{
    orderStatusToText:function(orderStatus){
      switch(parseInt(orderStatus)){
        case 2:
          return "未放款";
        case 3:
          return  "已放款";
        case 5:
          return "逾期待还";
        case 6:
          return "已结清";
        case 7:
          return "已拒绝";
        case 9:
          return "放款中";
      }
    },
    handleMoneyList:function(moneys){
      if(moneys==null || moneys=="") return "";
      var moneyArr=new Array;
      moneyArr=moneys.split(",");
      moneyArr = moneyArr.map(function(v){
        return v.substring(v.length-v.indexOf(".")+1,0);
      });
      if(moneyArr.length<=0) return "";
      if (moneyArr.length>=3){
        return moneyArr.slice(0,3).join("|")+"..";
      }else{
        return moneyArr.join("|");
      }
    }
  },
  methods: {
    ...mapMutations({
      setIdenti: 'SETIDENTI'
    }),
    tableRowClassName(row,rowIndex){
      if(row.row.last_loan_order_status ==5){
        return 'need-repay-row';
      }
      if(row.row.last_loan_order_status ==2){
        return 'need-paytocard-row';
      }
    },
    getList(isOr) {//分页查询会员列表
      if(isOr == 0){
        this.pageNo = 1
      }
      currentPage = this.pageNo;
      let params = {
        userName: this.searchName,//用户名
        current: this.pageNo,//页码
        size: this.pageSize,//页数
        phone: this.searchPhone,//手机号
        
      }
      if (this.dateTime){
        params.startTime=this.dateTime[0];
        params.endTime=this.dateTime[1];
      }
      let self=this;
      loanUserList(params).then((data)=>{//分页查询会员列表接口
        console.log('会员列表',data);
        data=data.data.data;
        this.userList = [];
        if(data){
          this.userList = data.list
          this.pageAll = data.total
        }

      })
    },
    sizeChange(size){
      this.pageSize = size;
      this.getList();
    },
    toAuthor(id) {//查看认证信息
      this.setIdenti({Id:id, ifLoan:0})
      this.$router.push({name: 'loanIdenti'})
    },
    //用户历史订单
    toUserOrderList(userId,userName){
      this.isShowUserOrderList = true;
      this.userOrderTitle = '#'+userId+'#'+userName+'#';
      let params = {
        userId: userId,
        pageSize:10,
        pageNo:1
      }
      userHistoryOrder(params).then(data=>{
        this.userOrderList = data.data.data.list
      })
    },
    toXuqiRecord(id) {
      this.showXuqiRecord = true
      let params={
        orderId:id
      }
      extendList(params).then(data=>{
        console.log("续期记录",data)
        this.recordList = data.data.data
      })
    },
    toSex(item){//性别
      switch(item.sex){
        case "0":
          return "女"
          break;
        case '1':
          return "男"
          break;
        default:
          return ""
      }
    },
    //认证转为文字
    authToText(status){
      switch(status){
        case 0:
        case "0":
          return "info"
          break;
        case 1:
        case "1":
          return 'success'
          break;
        default:
          return "warning"
      }
    },
    authToIcon(status){
      switch(status){
        case 0:
        case "0":
          return this.icon.refuse
          break;
        case 1:
        case "1":
          return this.icon.pass
          break;
        default:
          return ""
      }
    },


  }
}
</script>
<style>
  .el-table .need-repay-row {
    background: rgb(253, 226, 226);
  }
  .el-table .need-paytocard-row {
    background: #67C23A
;
  }
</style>
