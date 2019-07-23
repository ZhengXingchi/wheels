<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        渠道商统计
      </div>
    </div>
    <div class="searchAll">
      <span>时间：</span>
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
      <span>渠道商：</span>
      <el-select v-model="selectWhichCanal" size='mini' class="selectChoice">
        <!-- 需要用for循环调用接口循环 -->
        <el-option label="全部" value=""></el-option>
        <el-option :label="item.name" :value="item.id" v-for='(item, index) in whichCanal' :key='index'></el-option>
      </el-select>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">查询</el-button>
    </div>
    <div class="list">
      <el-table
        :data="userList"
        style="width: 100%"
        :cell-style='cellStyle'
        height='600'
      >
        <el-table-column
          label="序号"
          type='index'
          width="50"
          >
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="70"
          >
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="渠道名称"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="date"
          label="时间日期"
          sortable
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="registerNum"
          sortable
          label="注册人数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="registerAndroidNum"
          sortable
          label="安卓注册人数"
          width='140'
          >
        </el-table-column>
        <el-table-column
          prop="registerIosdNum"
          sortable
          label="IOS注册人数"
          width='140'
          >
        </el-table-column>
        <el-table-column
          prop="basicAuthNum"
          label="个人基本信息"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop="identityAuthNum"
          label="身份认证"
          width='90'
          >
        </el-table-column>
        <el-table-column
          prop="userPhoneAuthNum"
          label="手机认证"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="bankAuthNum"
          label="银行卡认证"
          width='90'
          >
        </el-table-column>
        <el-table-column
          prop="taobaoAuthNum"
          label="淘宝认证数"
          width='90'
          >
        </el-table-column>
        <el-table-column
          prop='zhifubaoAuthNum'
          label="支付宝认证数"
          width='110'
          >
        </el-table-column>
        <el-table-column
          prop='allAuthRate'
          label="全认证率"
          sortable
          width='110'
          >
        </el-table-column>
        <el-table-column
          prop='nameAuthRate'
          label="实名认证率"
          sortable
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop='riskPassNum'
          label="机审通过人数"
          width='110'
          >
        </el-table-column>
        <el-table-column
          prop='riskPassRate'
          label="机审通过率"
          sortable
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop='auditPassNum'
          label="复审通过人数"
          width='110'
          >
        </el-table-column>
        <el-table-column
          prop='auditPassRate'
          label="复审通过率"
          sortable
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop='passOrderNum'
          label="放款人数"
          width='110'
          >
        </el-table-column>
        <el-table-column
          prop='borrowPassRate'
          label="复审放款通过率"
          sortable
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop='finalPassRate'
          label="最终放款率"
          sortable
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop='overDueNum'
          label="逾期人数"
          width='90'
          v-if='false'
          >
        </el-table-column>
        <el-table-column
          prop='firstDayOverDueNum'
          label="首日逾期人数"
          width='130'
          >
        </el-table-column>
        <el-table-column
          prop='overDueRate'
          label="逾期率"
          sortable
          width='90'
          >
        </el-table-column>
        <el-table-column
          prop='overDueMoney'
          label="逾期金额"
          width='90'
          >
        </el-table-column>
        <el-table-column
          prop='gmtDatetime'
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
import {dataCanalList, dataCanalWhichList} from '@/API'
let currentPage=1;
export default {
  data: () => {
    return {
      userList: [],
      pageNo: currentPage,
      pageSize: 10,
      dateTime: '',
      pageAll: 1,
      selectWhichCanal: '',
      whichCanal: [],
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
    if(currentPage>1) this.pageNo=currentPage;
    this.getList();
    dataCanalWhichList().then((data)=>{
      this.whichCanal = data.data.data
    })
  },
  methods: {
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    getList(isOr) {
      if(isOr == 0){
        this.pageNo = 1
      }
      currentPage = this.pageNo;
      let params = {
        channelId: this.selectWhichCanal,
        current:this.pageNo,
        size: this.pageSize
      };
      if(this.dateTime){
        params.gmtDatetime = this.dateTime[0] + `~` + this.dateTime[1]
      }else{
        params.gmtDatetime = ''
      }
      dataCanalList(params).then(data=>{
        // console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.records);
        for(let i = 0; i < this.userList.length; i ++){
          this.userList[i].allAuthRate = this.userList[i].allAuthRate + '%'
          this.userList[i].auditPassRate = this.userList[i].auditPassRate + '%'
          this.userList[i].borrowPassRate = this.userList[i].borrowPassRate + '%'
          this.userList[i].nameAuthRate = this.userList[i].nameAuthRate + '%'
          this.userList[i].riskPassRate = this.userList[i].riskPassRate + '%'
          this.userList[i].finalPassRate = this.userList[i].finalPassRate + '%'
          this.userList[i].overDueRate = this.userList[i].overDueRate + '%'
        }
        this.pageAll = data.data.data.total;
      })
    },
    change(changeWich) {
      if(!changeWich){
        return 'null'
      }else{
        return changeWich
      }
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
