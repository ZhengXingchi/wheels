<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        每日收款统计
      </div>
    </div>
    <div class="searchAll">
      <span>选择时间：</span>
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
      class="dateStyle"
      >
    </el-date-picker>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">查询</el-button>
    </div>
    <div class="allMoney">
      <span class="title">展期费总金额：</span>
      <span class="content">{{allMoney}}</span>
      <span>元</span>
      <span class="title">展期总笔数：</span>
      <span class="content">{{allPeople}}</span>
      <span>笔</span>
      <span class="title">收款总金额：</span>
      <span class="content">{{getAllMoney}}</span>
      <span>元</span>
      <span class="title">收款总笔数：</span>
      <span class="content">{{getAllPeople}}</span>
      <span>笔</span>
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          type='index'
          label="序号"
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="repayNum"
          label="还款人数"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="newRepayNum"
          label="新增客户还款数"
          >
        </el-table-column>
        <el-table-column
          prop="newRepayMoney"
          label="新增客户还款金额"
          >
        </el-table-column>
        <el-table-column
          prop="oldRepayNum"
          label="续贷客户还款数"
          >
        </el-table-column>
        <el-table-column
          prop="oldRepayMoney"
          label="续贷客户还款金额"
          >
        </el-table-column>
        <el-table-column
          prop="extendNum"
          label="展期笔数"
          >
        </el-table-column>
        <el-table-column
          prop="extendMoney"
          label="展期金额"
          >
        </el-table-column>
        <el-table-column
          prop="repayMoney"
          label="当日收款总金额"
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="数据更新时间"
          width='160'
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
import {dataCallList, dataCallAll} from '@/API'
let currentPage=1;
// let dateTimePage='';
export default {
  data: () => {
    return {
      userList: [],
      pageNo: currentPage,
      pageSize: 10,
      dateTime: '',
      pageAll: 1,
      cellStyle:{
        'line-height': '16px;'
      },
      allMoney: 0,
      allPeople: 0,
      getAllMoney: 0,
      getAllPeople: 0,
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
    if(currentPage>1) this.pageNo=currentPage;
    // if(dateTimePage != '') this.dateTime=dateTimePage;
    this.getList();
  },
  methods: {
    sizeChange(size){
      this.pageSize = size;
      this.getList();
    },
    getList(isOr) {
      if(isOr == 0){
        this.pageNo = 1
      }
      currentPage = this.pageNo;
      // if(isOr != 0){
      //   this.dateTimePage = '';
      // }dateTimePage = this.dateTime
      let params = {};
      if(this.dateTime){
        params.gmtDatetime = this.dateTime[0] + `~` + this.dateTime[1]
      }else{
        params.gmtDatetime = ''
      }
      params.current = this.pageNo
      params.size = this.pageSize
      console.log(isOr,2222);
      dataCallList(params).then(data=>{
        console.log(isOr,111);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.records);
        this.pageAll = data.data.data.total;
      })
      dataCallAll(params).then(data=>{
        this.allMoney = (+data.data.data.extendMoney || 0).toFixed(2)
        this.allPeople = data.data.data.extendNum || 0
        this.getAllMoney = (+data.data.data.repayMoney || 0).toFixed(2)
        this.getAllPeople = data.data.data.repayTotal || 0
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
      width: 10%;
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
