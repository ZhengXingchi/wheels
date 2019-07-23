<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        贷后当日回款
      </div>
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="s1LoanTotal"
          label="S1回款单数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="s1BorrowMoney"
          label="S1回款金额"
          >
        </el-table-column>
        <el-table-column
          prop="s2LoanTotal"
          label="S2回款单数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="s2BorrowMoney"
          label="S2回款金额"
          >
        </el-table-column>
        <el-table-column
          prop="s3LoanTotal"
          label="S3回款单数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="s3BorrowMoney"
          label="S3回款金额"
          >
        </el-table-column>
        <el-table-column
          prop="sLoanTotal"
          label="总回款单数"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="sBorrowMoney"
          label="总回款金额"
          >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { dataHadToday } from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      cellStyle:{
        'line-height': '16px;'
      },
    }
  },
  beforeMount(){
    this.getList();
  },
  methods: {
    getList(isOr) {

      dataHadToday().then(data=>{
        let arr = []
        arr.push(data.data.data)
        console.log(arr)
        this.userList = arr
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
