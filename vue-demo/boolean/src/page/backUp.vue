<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        备份列表
      </div>
    </div>
    <div class="btnAll">
      <el-button @click='toReduction' class="publicMidBtn">还原</el-button>
      <el-button @click='toBackups' class="publicMidBtn">一键备份</el-button>
    </div>
    <div class="list">
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
          prop="name"
          label="备份详情"
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="备份时间"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='revise(scope.row.id)' >下载</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDel(scope.row.id)' >删除</el-button>
          </template>
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
import {backUpList, backUpBackup, backUpDele} from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      pages: {
        pageNo: 1,
        pageSize: 10,
      },
      pageAll: 1,
      cellStyle:{
        'line-height': '16px;'
      },
    }
  },
  beforeMount(){
    this.getList();
  },
  methods: {
    toReduction(){

    },
    toBackups() {
      if(confirm('您确定备份吗？')){
        backUpBackup().then((data)=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('备份成功');
            this.getList();
          }else{
            this.$message('备份失败')
          }
        })
      }
    },
    toDel() {
      if(confirm('您确定删除记录吗？')){
        backUpDele().then((data)=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('删除成功');
            this.getList();
          }else{
            this.$message('删除失败')
          }
        })
      }
    },
    getList(isOr) {
      let params = {};
      params.pageSize = 10;
      if(!isOr){
        params.pageNo = 1
      }else{
        params.pageNo = isOr
      }
      backUpList(params).then(data=>{
        // console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.list);
        console.log(this.userList);
        for(let i = 0;i<this.userList.length; i++){
          if(this.userList[i].loginTime){
            this.userList[i].loginTime = this.dateChange(this.userList[i].loginTime)
          }
        }
        this.pageAll = data.data.data.total;
      })
    },
    dateChange(date){
      var date = new Date(date);
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
      const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':';
      const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ':';
      const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y+M+D+h+m+s;
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
.allPage{
  .btnAll{
    padding: 20px;
    background: #FFF;
  }
  .searchAll{
    background-color: white;
    padding:20px;
    .selectChoice{
      width: 10%;
      margin-right: 20px;
    }
    .search{
      width: 16.7%;
      margin-right: 20px;
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
