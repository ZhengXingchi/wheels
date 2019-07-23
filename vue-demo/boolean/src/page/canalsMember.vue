<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        渠道商会员列表
      </div>
    </div>
    <div class="searchAll">
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
        style='width:240px;'>
      </el-date-picker>
      <el-input v-model="searchName" placeholder="请输入姓名" class='search' size="mini"></el-input>
      <el-input v-model="searchPhone" placeholder="请输入电话号码" class='search' size="mini"></el-input>
      <span>机审状态:</span>
      <el-select v-model="selectRisk" size='mini' class="selectChoice">
        <el-option label="全部" value=""></el-option>
        <el-option label="机审通过" value="1"></el-option>
        <el-option label="机审拒绝" value="2"></el-option>
        <el-option label="机审未知" value="0"></el-option>
      </el-select>
      <span>借款状态:</span>
      <el-select v-model="selectOrder" size='mini' class="selectChoice">
        <el-option label="全部" value="11"></el-option>
        <el-option label="借款成功" value="3"></el-option>
        <el-option label="借款失败" value="7"></el-option>
      </el-select>
      <span>信审状态:</span>
      <el-select v-model="selectAuth" size='mini' class="selectChoice">
        <el-option label="全部" value=""></el-option>
        <el-option label="未审核" value="0"></el-option>
        <el-option label="审核通过" value="1"></el-option>
        <el-option label="暂时拒绝" value="2"></el-option>
        <el-option label="不通过" value="3"></el-option>
        <el-option label="二次审核" value="4"></el-option>
      </el-select>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">查询</el-button>
      <el-button type="" size='mini' @click='goback' class="publicMidBtn">返回</el-button>
      <div class="dataTitle" >
        <div class="dataContent">
          实名人数： <span>{{truePeople}}</span> 人
        </div>
        <div class="dataContent">
          认证成功人数： <span>{{passPeople}}</span> 人
        </div>
        <div class="dataContent">
          认证成功率： <span>{{passRate}}</span> %
        </div>
      </div>
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          label='序号'
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="userId"
          label="用户ID"
          width="70"
          >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="注册时间"
          >
        </el-table-column>
        <el-table-column
          prop="riskStatus"
          label="机审状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="authStatus"
          label="信审状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="借款状态"
          width="80">
        </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          :current-page.sync="pageNo"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pageAll">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
import {canalsMemberList} from '@/API'
export default {
  data: () => {
    return {
      channelId: '',
      userList: [],
      searchPhone: '',
      searchName: '',
      selectRisk: '',
      selectOrder: '11',
      selectAuth: '',
      pageNo: 1,
      pageSize: 10,
      pageAll: 1,
      dateTime: '',
      truePeople: 0,
      passPeople: 0,
      passRate: 0,
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
    this.channelId = this.$route.params.id;
    this.getList();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    getList(isOr) {
      if(isOr === 0){
        this.pageNo = 1
      }
      let params = {
        pageNo:this.pageNo,
        pageSize:this.pageSize,
        phone:this.searchPhone,
        userName: this.searchName,
        channelId: this.channelId,
        authStatus: this.selectAuth,
        riskStatus: this.selectRisk,
        orderStatus: this.selectOrder
      }
      if(this.dateTime){
        params.gmtDatetime = this.dateTime[0] + `~` + this.dateTime[1]
      }else{
        params.gmtDatetime = ''
      }
      canalsMemberList(params).then((data)=>{
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.PageDto.list);
        for(let i = 0;i < this.userList.length; i++){
          if(this.userList[i].riskStatus == 0){
            this.userList[i].riskStatus = "机审未知"
          }else if(this.userList[i].riskStatus == 1){
            this.userList[i].riskStatus = "机审通过"
          }else if(this.userList[i].riskStatus == 2){
            this.userList[i].riskStatus = "机审拒绝"
          }

          if(this.userList[i].authStatus == 0){
            this.userList[i].authStatus = "未审核"
          }else if(this.userList[i].authStatus == 1){
            this.userList[i].authStatus = "审核通过"
          }else if(this.userList[i].authStatus == 2){
            this.userList[i].authStatus = "暂时拒绝"
          }else if(this.userList[i].authStatus == 3){
            this.userList[i].authStatus = "不通过"
          }else if(this.userList[i].authStatus == 4){
            this.userList[i].authStatus = "二次审核"
          }

          if(this.userList[i].orderStatus == 3){
            this.userList[i].orderStatus = "借款成功"
          }else if(this.userList[i].orderStatus == 7){
            this.userList[i].orderStatus = "借款失败"
          }
        }
        this.pageAll = data.data.data.PageDto.total;
        this.truePeople = data.data.data.count
        this.passPeople = data.data.data.count1
        this.passRate = (+data.data.data.rate).toFixed(2)
      })
    },

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
        width: 100px;
        margin-right: 20px;
      }
      .search{
        width: 120px;
        margin-right: 20px;
      }
      .dataTitle{
        text-align: right;
        .dataContent{
          display: inline-block;
          margin-left: 10px;
          span{
            color: red;
          }
        }
      }
    }
    .list{
      background: #fff;
      padding: 5px;
      .choice{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
