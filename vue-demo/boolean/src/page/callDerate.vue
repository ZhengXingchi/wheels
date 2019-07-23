<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        减免审核列表
      </div>
    </div>
    <div class="searchAll">
      <span>手机号：</span>
      <el-input v-model="searchPhone" placeholder="请输入手机号" class='search' size="mini"></el-input>
      <span>借款人：</span>
      <el-input v-model="searchName" placeholder="请输入借款人" class='search' size="mini"></el-input>
      <span>申请时间：</span>
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
      <span>审核时间：</span>
      <el-date-picker
        v-model="autingTime"
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
      <span>审核状态:</span>
      <el-select v-model="selectStatus" size='mini' class="selectChoice">
        <el-option label="全部" value=""></el-option>
        <el-option label="待审核" value="0"></el-option>
        <el-option label="审核通过" value="1"></el-option>
        <el-option label="审核拒绝" value="2"></el-option>
      </el-select>
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
          prop='userName'
          label="借款人"
          width="80"
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="applyName"
          label="申请人"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="申请时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="reduceStatus"
          label="审核状态"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="uptDatetime"
          label="审核时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="reduceMoney"
          label="减免金额"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          >
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="审核人"
          width='100'
          >
        </el-table-column>

        <el-table-column
          label="操作"
          width="150"
          align="center"
          fixed='right'
          >
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toPass(scope.row.id)' >通过</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toReject(scope.row.id)' >拒绝</el-button>
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
    </div>
  </div>
</template>
<script>
import {callDerateList, callDeratePass, callDerateReject} from '@/API'
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
    searchName: '',
    borrowTime: '',
    autingTime: '',
    selectStatus: '',
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
    this.getList(0)
  },
  methods: {
    // 拒绝审核
    toReject(id) {
      let params = {
        id:id
      }
      if(confirm('确定要拒绝审核？')){
        callDerateReject(params).then(data=>{
          if(data.data.code === 'SUCCESS'){
            this.getList()
          }else{
            this.$message(data.data.msg)
          }
        })
      }
    },
    // 通过审核
    toPass(id) {
      let params = {
        id:id
      }
      if(confirm('确定要通过审核？')){
        callDeratePass(params).then(data=>{
          if(data.data.code === 'SUCCESS'){
            this.getList()
          }else{
            this.$message(data.data.msg)
          }
        })
      }
    },
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    getList(isOr) {
      let regPhone = /^1[34578]\d{9}$/
      if(this.searchPhone){
        if(!(regPhone.test(this.searchPhone))){
          this.$message('请填写正确的手机号码')
          return
        }
      }
      if(isOr === 0){
        this.pageNo = 1
      }
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        phone: this.searchPhone,
        userName: this.searchName,
        status: this.selectStatus
      };
      if(this.borrowTime){
        params.gmtDatetime = this.borrowTime[0] + `~` + this.borrowTime[1]
      }else{
        params.gmtDatetime = ''
      }
      if(this.autingTime){
        params.uptDatetime = this.autingTime[0] + `~` + this.autingTime[1]
      }else{
        params.uptDatetime = ''
      }
      callDerateList(params).then(data=>{
        this.userList = data.data.data.records
        for(let i = 0; i < this.userList.length; i++){
          if(this.userList[i].reduceStatus == 0){
            this.userList[i].reduceStatus = '待审核'
          }else if(this.userList[i].reduceStatus == 1){
            this.userList[i].reduceStatus = '审核通过'
          }else if(this.userList[i].reduceStatus == 2){
            this.userList[i].reduceStatus = '审核拒绝'
          }
        }
        this.pageAll = data.data.data.total
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
