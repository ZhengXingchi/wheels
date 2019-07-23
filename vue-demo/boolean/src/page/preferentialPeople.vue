<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        会员列表
      </div>
    </div>
    <div class="searchAll">
      <el-input v-model="searchName" placeholder="请输入姓名" class='search' size="mini"></el-input>
      <el-input v-model="searchPhone" placeholder="请输入手机号码" class='search' size="mini"></el-input>
      <el-button type="" icon="el-icon-search" size='mini'  @click='getList()' class="publicMidBtn">搜索</el-button>
      <el-button type="" icon="el-icon-search" size='mini' @click='sureOut' v-if='id' class="publicMidBtn">确认发放</el-button>
      <el-button type="" icon="el-icon-search" size='mini' @click='sureOut(1)' v-if='id' class="publicMidBtn">全员发放</el-button>
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                ref="multipleTable"
                @selection-change="handleSelectionChange"
                >
        <el-table-column
          v-if="id"
          type="selection"
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
          prop="userName"
          label="姓名"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width='150'
          >
        </el-table-column>
        <el-table-column
          prop="couponAllCount"
          label="优惠券总数"

          >
        </el-table-column>
        <el-table-column
          prop="couponUseCount"
          label="使用总数"

          >
        </el-table-column>
        <el-table-column
          prop="couponPastCount"
          label="过期数"
          >
        </el-table-column>
        <el-table-column
          prop="couponPastCount"
          label="剩余可用"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="身份状态"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
          v-if='!id'>
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDetail(scope.row.id)'  >优惠券详情</el-button>
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
import {preferentialPeopleList, preferentialOut} from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      multipleSelection: [],
      pages: {
        pageNo: 1,
        pageSize: 10,
      },
      dateTime: '',
      pageAll: 1,
      searchName: '',
      searchPhone: '',
      cellStyle:{
        'line-height': '16px;'
      },
      id: '',
    }
  },
  beforeMount(){
    if(!isNaN(this.$route.params.id)){
      this.id = this.$route.params.id
    }
    this.getList();
  },
  methods: {
    toDetail(id) {
      this.$router.push({name: 'preferentialPeopleDetail', params: {
        id
      }})
    },
    handleSelectionChange(val) {
      console.log(val);
      if(!val){
        val = [];
      }
      this.multipleSelection = [];
      for(let i = 0;i<val.length; i++){
        this.multipleSelection[i] = val[i].id
      }
      console.log(this.multipleSelection);
    },
    sureOut(i){
      if(!this.multipleSelection.length){
        this.$message('请选择用户');
        return
      }
      let params = {};
      params.id = this.id;
      if(i){
        params.allGiveOut = true
        if(confirm('确认发放？')){
          preferentialOut(params).then(data=>{
            if(data.data.code == 'SUCCESS'){
              this.$message('发送成功');
              this.getList();
            }else{
              this.$message('error')
            }
          })
        }
      }else{
        params.allGiveOut = false
        params.userIds = this.multipleSelection
        if(confirm('确认发放？')){
          preferentialOut(params).then(data=>{
            if(data.data.code == 'SUCCESS'){
              this.$message('发送成功');
              this.getList();
            }else{
              this.$message('error')
            }
          })
        }
      };
    },
    getList(isOr) {
      let params = {};
      if(this.searchName){
        params.userName = this.searchName
      }else{
        params.userName = ''
      }
      if(this.searchPhone){
        params.phone = this.searchPhone
      }else{
        params.phone = ''
      }
      params.authStatus = ''

      if(!isOr){
        params.current = 1
      }else{
        params.current = isOr
      }
      preferentialPeopleList(params).then(data=>{
        // console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.list);
        for(let i = 0; i<this.userList.length; i++){
          if(this.userList[i].status == 1){
            this.userList[i].status = '正常'
          }else if(this.userList[i].status == 2){
            this.userList[i].status = '黑名单'
          }else if(this.userList[i].status == 3){
            this.userList[i].status = '禁用'
          }else if(this.userList[i].status == 4){
            this.userList[i].status = '被拒绝'
          }
        }
        this.pageAll = data.data.data.total;
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
