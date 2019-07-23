<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        今日待还列表
      </div>
    </div>
    <div class="searchAll">
      <span>手机号码：</span>
      <el-input v-model="searchPhone" placeholder="" class='search' size="mini"></el-input>
      <span>姓名：</span>
      <el-input v-model="searchName" placeholder="" class='search' size="mini"></el-input>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">查询</el-button>
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="userId"
          label="用户ID"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="user.userName"
          label="姓名"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="user.phone"
          label="手机号"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop="borrowMoney"
          label="借款金额"
          >
        </el-table-column>
        <el-table-column
          prop="limitPayTime"
          label="应还时间"
          >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="还款状态"
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
import { dataTodayList } from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      pageNo: 1,
      pageSize: 10,
      searchPhone: '',
      searchName: '',
      pageAll: 1,
      cellStyle:{
        'line-height': '16px;'
      },
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
      if(isOr == 0){
        this.pageNo = 1
      }
      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        type: 0,
        name: this.searchName,
        phone: this.searchPhone
      };

      dataTodayList(params).then(data=>{
        // console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.pageDto.list);
        for(let i = 0; i < this.userList.length; i++){
          if(this.userList[i].orderStatus == 3){
            this.userList[i].orderStatus = '待还款'
          }else if(this.userList[i].orderStatus == 6){
            this.userList[i].orderStatus = '已还款'
          }
        }
        this.pageAll = data.data.data.pageDto.total;
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
