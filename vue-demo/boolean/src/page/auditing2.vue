<template>
  <div class="allPage">

    <div class="searchAll">
      <el-row >
        <el-col :span="24">
          <span>注册时间：</span>
          <el-date-picker
            v-model="registerTime"
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
          <span>机审时间：</span>
          <el-date-picker
            v-model="riskTime"
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
          <span>姓名：</span>
          <el-input v-model="searchName" placeholder="借款人姓名" class='search' size="mini"></el-input>
          <span>手机号：</span>
          <el-input v-model="searchPhone" placeholder="输入手机号码" class='search'  size="mini"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top:10px;">
        <el-col :span="24">
          <span>渠道商:</span>
          <el-input v-model="channelName" placeholder="请输入渠道商名称" class='search' style='width:120px;' size="mini" clearable></el-input>
          <span>信审状态：</span>
          <el-select v-model="selectStatus" size='mini' class="selectChoice">
            <el-option label="全部" value=""></el-option>
            <el-option label="未审核" value="0"></el-option>
            <el-option label="审核通过" value="1"></el-option>
            <el-option label="暂时拒绝" value="2"></el-option>
            <el-option label="不通过" value="3"></el-option>
            <el-option label="二次审核" value="4"></el-option>
          </el-select>
          <span>决策建议：</span>
          <el-select v-model="selectAdvice" size='mini' class="selectChoice">
            <el-option label="全部" value=""></el-option>
            <el-option label="天启决策" value="1"></el-option>
            <el-option label="云息决策" value="2"></el-option>
          </el-select>
          <el-button type="primary"  size='mini' @click='getList(0)'>查询</el-button>
        </el-col>
      </el-row>

    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="userId"
          label="ID"
          width="120"
          >
        </el-table-column>
        <el-table-column
          prop='userName'
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width="140">
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="渠道商"
          width="140">
        </el-table-column>
        <el-table-column
          prop="isOld"
          label="客户类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="注册时间"
          width="160">
        </el-table-column>
        <el-table-column
          prop="uptDatetime"
          label="机审时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="money"
          label="借款额度"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop="adminAuditName"
          label="信审员"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop="adminAuditId"
          label="分配状态"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop="authStatus"
          label="审核状态"
          width='120'
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="220">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDetail(scope.row.userId)'>查看信息</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='openAuditRecord(scope.row.userId)'>审核记录</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toLiuRecord(scope.row.userId)'>流转记录</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          :current-page.sync="pageNo"
          @size-change="sizeChange"
          :page-size="10"
          :page-sizes="[10, 20, 30, 50, 100]"
          layout="sizes, total, prev, pager, next, jumper"
          :total="pageAll">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="审核记录"
      :visible.sync="auditiRecord"
      width="60%"
      >
      <el-table :data="auditiRecordList"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="gmtDatetime"
          label="审核时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop='reason'
          label="通过/拒绝原因"
          >
        </el-table-column>
        <el-table-column
          prop='adminAuditName'
          label="审核员"
          width="120">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="auditiRecord = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {auditingMyList, auditingRecordList } from "@/API"
import { mapMutations, mapGetters } from 'vuex'
export default {
  data: () => ({
    pageNo: 1,
    pageSize: 10,
    pageAll: 1,
    userList: [],
    peopleList: [],
    auditiRecordList: [],
    searchPhone:'',
    channelName:'',
    selectStatus: '',
    selectPeople: '',
    searchName: '',
    selectAdvice: '',
    cellStyle:{
      'line-height': '16px;'
    },
    auditiRecord: false,//审核记录
    registerTime: '',
    riskTime: '',
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
  beforeMount() {
    this.getList()
  },
  computed: {
    ...mapGetters({
      id: 'GetRoleUserId'
    }),
  },
  methods: {
    ...mapMutations({
      setIdenti: 'SETIDENTI',
    }),
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    // 打开审核记录
    openAuditRecord(id) {
      this.auditiRecord = true
      let params = {
        userId: id
      }
      auditingRecordList(params).then(data=>{
        this.auditiRecordList = data.data.data
      })
    },
    toDetail(id){
      this.setIdenti({Id:id, ifLoan:1})
      this.$router.push({name:'loanIdenti'})
    },
    toLiuRecord(id){
      this.setIdenti({Id:id, ifLoan:1})
      this.$router.push({name:'auditingLiuRecord'})
    },
    //获取信审员
    getList(isOr) {
      if(isOr == 0){
        this.pageNo = 1
      }
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        phone: this.searchPhone,
        userName: this.searchName,
        authStatus:this.selectStatus,
        adminAuditId: this.id,
        advice: this.selectAdvice,
        channelName:this.channelName
      }
      if(this.registerTime){
        params.gmtDatetime = this.registerTime[0] + `~` + this.registerTime[1]
      }else{
        params.gmtDatetime = ''
      }
      if(this.riskTime){
        params.uptDatetime = this.riskTime[0] + `~` + this.riskTime[1]
      }else{
        params.uptDatetime = ''
      }
      auditingMyList(params).then((data)=>{
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.list);
        for(let i = 0;i<this.userList.length; i++){
          switch(this.userList[i].authStatus){
            case '0':
              this.userList[i].authStatus = '未审核';
              break;
            case '1':
              this.userList[i].authStatus = '审核通过';
              break;
            case '2':
              this.userList[i].authStatus = '暂时拒绝';
              break;
            case '3':
              this.userList[i].authStatus = '不通过';
              break;
            case '4':
              this.userList[i].authStatus = '二次审核';
              break;
          }
          switch(this.userList[i].isOld){
            case '0':
              this.userList[i].isOld  = '新增'
              break
            case '1':
              this.userList[i].isOld  = '续贷'
              break
          }
          switch(this.userList[i].adminAuditId){
            case '0':
              this.userList[i].adminAuditId  = '未分配'
              break
            case '1':
              this.userList[i].adminAuditId  = '已分配'
              break
          }
        }
        this.pageAll = data.data.data.total
      })
    },
  },
  beforeRouteEnter(to, from ,next) {
    // console.log(3);
    next(vm => {
      // 通过 `vm` 访问组件实例
      if(from.name === 'loanIdenti'){
        vm.getList()
      }
    })
  },
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .searchAll{
      background-color: white;
      padding:20px;
      span{
        margin-left: 10px;
      }
      .selectChoice{
        width: 100px;
        margin-right: 20px;
      }
      .search{
        width: 130px;
        margin-right: 20px;
      }
    }
    .list{
      padding: 5px;
      background-color: #fff;
      .choice{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
