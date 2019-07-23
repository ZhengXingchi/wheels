<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        正常待还客户列表
      </div>
    </div>
    <div class="searchAll">
      <span>选择时间：</span>
      <el-date-picker
        v-model="trueTime"
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
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop='time'
          label="时间日期"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="soneNum"
          label="S1回款单数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="soneMoney"
          label="S1回款金额"
          >
        </el-table-column>
        <el-table-column
          prop="stwoNum"
          label="S2回款单数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="stwoMoney"
          label="S2回款金额"
          >
        </el-table-column>
        <el-table-column
          prop="sthreeNum"
          label="S3回款单数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="sthreeMoney"
          label="S3回款金额"
          >
        </el-table-column>
        <el-table-column
          prop='sNum'
          label="总回款单数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop='sMoney'
          label="总回款金额"
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
import { dataHadAll } from '@/API'
export default {
  data: () => ({
    cellStyle:{
      'line-height': '16px;'
    },
    trueTime: '',
    userList: [],
    pageNo: 1,
    pageSize: 10,
    pageAll: 1,
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
    this.getList()
  },
  methods: {
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    getList(isOr) {
      if(isOr === 0){
        this.pageNo = 1
      }
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
      };
      if(this.trueTime){
        params.realPayTime = this.trueTime[0] + `~` + this.trueTime[1]
      }else{
        params.realPayTime = ''
      }
      dataHadAll(params).then(data=>{
        this.userList = data.data.data.list
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
