<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        订单详情
      </div>
    </div>
    <div class="searchAll">
      <span>借款时间：</span>
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
      <el-input v-model="searchPhone" placeholder="请输入电话号码" class='search' size="mini"></el-input>
      <el-input v-model="searchName" placeholder="请输入渠道商" class='search' size="mini"></el-input>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList()' class="publicMidBtn"></el-button>
      <span>状态：</span>
      <el-select v-model="selectStatus" size='mini' class="select" @change='getList()'>
        <el-option label="请选择" value="-1"></el-option>
        <el-option label="审核中" value="1"></el-option>
        <el-option label="待打款" value="2"></el-option>
        <el-option label="待还款" value="3"></el-option>
        <el-option label="已还款" value="6"></el-option>
        <el-option label="逾期" value="4"></el-option>
        <el-option label="审核失败" value="7"></el-option>
        <el-option label="坏账" value="8"></el-option>
        <el-option label="打款中" value="9"></el-option>
      </el-select>
      <el-button type=""  size='mini' @click='goback' class="publicMidBtn">返回</el-button>
    </div>
    <div class="list">
      <div class="right_title">
        <span class="Rname">总人数</span>
        <span class="red">{{pageAll}}</span>
      </div>
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
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
          prop="limitDays"
          label="贷款期限"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="borrowMoney"
          label="借款金额"
          >
        </el-table-column>
        <el-table-column
          prop="realMoney"
          label="打款金额"
          >
        </el-table-column>
        <el-table-column
          prop="needPayMoney"
          label="应还金额"
          >
        </el-table-column>
        <el-table-column
          prop="'李浩'"
          label="审核人"
          >
        </el-table-column>
        <el-table-column
          prop='gmtDatetime'
          label="借款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop='user.channel.name'
          label="所属渠道商"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='channelProfit'
          label="分成"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop='orderStatus'
          label="状态"
          width='100'
          >
        </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          :current-page.sync="pages.pageNo"
          :page-size="pages.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pageAll">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {cancelDetailList} from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      pages: {
        pageNo: 1,
        pageSize: 10,
      },
      dateTime: '',
      pageAll: 1,
      searchPhone: '',
      searchName: '',
      selectStatus: '',
      cellStyle:{
        'line-height': '16px;'
      },
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
    console.log(this.$route.params.id);
    if(this.$route.params.id){
      this.getList();
    }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getList(isOr) {
      let params = {};
      if(this.searchName){
        params.userName = this.searchName
      }else{
        params.userName = ''
      }
      params.channelId = this.$route.params.id
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
      if(this.selectStatus){
        params.status = this.selectStatus
      }else{
        params.status = -1
      }
      if(!isOr){
        params.currentPage = 1
      }else{
        params.currentPage = isOr
      }
      cancelDetailList(params).then(data=>{
        // console.log(data.data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.pageDto.list);
        for(let i = 0 ;i < this.userList.length ;i++){
          if(this.userList[i].orderStatus == 1){
            this.userList[i].orderStatus = '审核中'
          }else if(this.userList[i].orderStatus == 2){
            this.userList[i].orderStatus = '待打款'
          }else if(this.userList[i].orderStatus == 3){
            this.userList[i].orderStatus = '待还款'
          }else if(this.userList[i].orderStatus == 6){
            this.userList[i].orderStatus = '已还款'
          }else if(this.userList[i].orderStatus == 5){
            this.userList[i].orderStatus = '逾期'
          }else if(this.userList[i].orderStatus == 7){
            this.userList[i].orderStatus = '审核失败'
          }else if(this.userList[i].orderStatus == 8){
            this.userList[i].orderStatus = '坏账'
          }else if(this.userList[i].orderStatus == 9){
            this.userList[i].orderStatus = '打款中'
          }

        }
        console.log(data.data.data.pageDto);
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
