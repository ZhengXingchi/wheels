<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        APP登录日志
      </div>
    </div>
    <div class="searchAll">
      <el-input v-model="searchPhone" placeholder="请输入电话号码" class='search' size="mini"></el-input>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList()' class="publicMidBtn"></el-button>
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
          prop="user.userName"
          label="用户名"
          >
        </el-table-column>
        <el-table-column
          prop="appVersion"
          label="APP版本"
          >
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP地址"
          >
        </el-table-column>
        <el-table-column
          prop="loginTime"
          label="登录时间"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='del(scope.row.id)' >删除</el-button>
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
import {backAPPLoginList, backstageDelApp} from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      pages: {
        pageNo: 1,
        pageSize: 10,
      },
      searchPhone: '',
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
    del(id){
      let params = {
        id
      }
      if(confirm('您确定要删除这条日志吗？')){
        backstageDelApp(params).then(data=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('成功');
            this.getList();
          }else{
            this.$message('失败')
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
      if(this.searchPhone){
        params.phoneNumber = this.searchPhone
      }else{
        params.phoneNumber = ''
      }
      backAPPLoginList(params).then(data=>{
        // console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.list);
        this.pageAll = data.data.data.total;
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
