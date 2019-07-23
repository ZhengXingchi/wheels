<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        应收款查询列表
      </div>
    </div>
    <div class="searchAll">
      订单时间：
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
      <el-input v-model="searchPhone" placeholder="请输入电话号码" class='search' size="mini"></el-input>
      <el-input v-model="searchName" placeholder="请输入姓名" class='search' size="mini"></el-input>
      用户类别：
      <el-select v-model="orderStatus" placeholder="请选择" size='mini' style='width:100px;'>
        <el-option label="全部客户" value=""></el-option>
        <el-option label="未逾期" value="1"></el-option>
        <el-option label="逾期" value="5"></el-option>
      </el-select>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(1)' class="publicMidBtn">搜索</el-button>
    </div>
    <div class="list">
      <div class="right_title">
        <span class="Rname">总金额</span>
        <span class="red">{{allMoney}}</span>
        <span class="Rname">总人数</span>
        <span class="red">{{pageAll}}</span>
      </div>
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                height='550'
                >
        <el-table-column
          prop="id"
          label="ID"
          width="70"
          >
        </el-table-column>
        <el-table-column
          prop="orderNumber"
          label="贷款单号"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="user.userName"
          label="姓名"
          width='80'>
        </el-table-column>
        <el-table-column
          prop="user.phone"
          label="手机号码"
          width='115'
          >
        </el-table-column>
        <el-table-column
          prop="borrowMoney"
          label="贷款金额"
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="订单时间"
          >
        </el-table-column>
        <el-table-column
          prop="limitPayTime"
          label="还款时间"
          >
        </el-table-column>
        <el-table-column
          prop='overdueDays'
          label="逾期天数"
          width='160'
          >
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
  </div>
</template>
<script>
import {dataAccountsDueList} from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      pageNo: 1,
      pageSize: 10,
      dateTime: '',
      pageAll: 1,
      searchPhone: '',
      searchName: '',
      orderStatus: '',
      cellStyle:{
        'line-height': '16px;'
      },
      allMoney: 0,
      allPeople: 0,
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
    }
  },
  beforeMount(){
    this.getList();
  },
  methods: {
    sizeChange(size){
      this.pageSize = size;
      this.getList();
    },
    getList(isOr) {
      let params = {};
      if(this.searchName){
        params.name = this.searchName
      }else{
        params.name = ''
      }
      if(this.dateTime){
        params.gmtDatetime = this.dateTime[0] + `~` + this.dateTime[1]
      }else{
        params.gmtDatetime = ''
      }
      if(this.searchPhone){
        params.phone = this.searchPhone
      }else{
        params.phone = ''
      }
      params.orderStatus = this.orderStatus
      params.pageSize = this.pageSize;
      params.pageNo = this.pageNo;
      dataAccountsDueList(params).then(data=>{
        // console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.acountList);
        this.allMoney = data.data.data.borrowMoney;
        this.pageAll = data.data.data.total;
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
    .selectChoice{
      width: 10%;
      margin-right: 20px;
    }
    .search{
      width: 16.7%;
      margin-right: 20px;
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
