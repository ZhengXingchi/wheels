<template>
  <div class="allPage">
    <!-- <div class="allTitle">
      <div class="allTitleStyle">
        每日放款统计
      </div>
    </div>
    <div class="searchAll">
      <span>放款时间：</span>
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
    </div> -->
    <div class="allMoney">
      <!-- <span class="title">放款总金额：</span>
      <span class="content"></span>
      <span>元</span>
      <span class="title">放款总笔数：</span>
      <span class="content"></span>
      <span>笔</span> -->
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                show-summary
                :summary-method="getSummaries" 
                >
        <el-table-column
          prop="hours"
          label="时间"
          width='140'
          >
        </el-table-column>
        <el-table-column
          prop="regeter_count"
          label="注册人数"
          width='140'
          >
        </el-table-column>
        <el-table-column
          prop="go_risk_count"
          label="认证人数"
          width='140'
          >
        </el-table-column>
        <el-table-column
          prop="register_conversion_percent"
          label="申请转化率"
          width='150'
          >
          <template slot-scope="scope">
            <span v-if="Number(scope.row.register_conversion_percent.replace(/%/g,'')) >= 70" style="color:red">{{ scope.row.register_conversion_percent }}</span>
            <span v-if="Number(scope.row.register_conversion_percent.replace(/%/g,'')) < 70">{{ scope.row.register_conversion_percent }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="risk_passed_status"
          label="认证通过"
          width='150'
          >
        </el-table-column>
        <el-table-column
          prop="risk_need_author_count"
          label="需要人工复审"
          width='140'
          >
        </el-table-column>
        <el-table-column
          prop="risk_passed_conversion_percent"
          label="风控通过转化率"
          width='140'
          >
        </el-table-column>
        <el-table-column
          prop="risk_refuse_count"
          label="风控拒绝"
          width='140'
          >
        </el-table-column>
        <el-table-column
          prop="author_count"
          label="人工复审通过"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop='loaned_count'
          label="下款人数"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop='conversion_percent'
          label="下款率"
          width='140'
          >
        </el-table-column>
        <el-table-column
          prop='back_count'
          label="黑名单率"
          width='120'
          >
          <template slot-scope="scope">
            <span v-if="Number(scope.row.back_count.replace(/%/g,'')) >= 15" style="color:red">{{ scope.row.back_count }}</span>
            <span v-if="Number(scope.row.back_count.replace(/%/g,'')) < 15">{{ scope.row.back_count }}</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="block choice">
        <!-- <el-pagination
          @current-change="getList"
          background
          @size-change="sizeChange"
          :current-page.sync="pageNo"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="10"
          layout="sizes, total, prev, pager, next, jumper"
          :total="pageAll">
        </el-pagination> -->
      </div>
    </div>
  </div>
</template>
<script>
import {selectUserlList} from '@/API'
import { log } from 'util';
let currentPage=1;
export default {
  data: () => {
    return {
      userList: [],
      tableData:[],
      pageNo: currentPage,
      pageSize: 10,
      dateTime: '',
      pageAll: 1,
      channelId:'',
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
    // if(currentPage>1) this.pageNo=currentPage;
    this.getList();
  },
  methods: {
    getSummaries(param) {
      const {
        columns,
        data
      } = param;
      // console.log('param', param)
      //console.log('data', data)
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        if (index === 3) {
          sums[index] = ((sums[2]/sums[1])*100).toFixed(2)+'%';
          return;
        }
        if (index === 6) {
          sums[index] = ((sums[4]/sums[2])*100).toFixed(2)+'%';
          return;
        }
        if (index === 10) {
          sums[index] = ((sums[9]/sums[1])*100).toFixed(2)+'%';
          return;
        }
        if (index === 11) {
          sums[index] = ((this.sum/sums[2])*100).toFixed(2)+'%';
          return;
        }
        const values =data.map(item => {
          return Number(String(item[column.property]).replace(/%/g,''))
          // return Number(item[column.property])
        });
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
      } 
    });
      
      
      return sums;
    },
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    getList() {
      let params = {};
      var date=new Date();
      var year=date.getFullYear();//当前年份
      var month=date.getMonth();//当前月份
      var data=date.getDate();//天
      var time=year+"-"+fnW((month+1))+"-"+fnW(data)+"~"+ year+"-"+fnW((month+1))+"-"+fnW(data);
      function fnW(str){
          var num;
          str>10?num=str:num="0"+str;
          return num;
      }
      params.gmtDatetime = time 
      params.channelId = this.$route.params.channelId
      selectUserlList(params).then(data=>{
        this.userList = [];
        this.userList = this.userList.concat(data.data.data);
        let sum = 0
        this.userList.forEach(item =>{
           sum += item.back_count
          if(item.back_count == 0){
            item.back_count = '0.00' + '%'
          }else{
            item.back_count = ((item.back_count/item.go_risk_count)*100).toFixed(2) + '%'
          } 
        })
        this.sum =sum 
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