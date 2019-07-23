<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        优惠券列表
      </div>
    </div>
    <div class="searchAll">
      <el-input v-model="searchName" placeholder="请输入名称" class='search' size="mini"></el-input>
      <span>状态：</span>
      <el-select v-model="selectStatus" size='mini' class="selectChoice">
        <el-option label="全部" value="-1"></el-option>
        <el-option label="启用中" value="1"></el-option>
        <el-option label="禁用" value="2"></el-option>
      </el-select>
      <span>类型：</span>
      <el-select v-model="selectType" size='mini' class="selectChoice">
        <el-option label="全部" value="-1"></el-option>
        <el-option label="新用户订单" value="1"></el-option>
        <el-option label="邀请好友奖励" value="2"></el-option>
        <el-option label="自由发放" value="3"></el-option>
      </el-select>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList()' class="publicMidBtn">搜索</el-button>
      <el-button type="" size='mini' @click='toAdd' class="publicMidBtn">添加</el-button>
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
          prop="coupouName"
          label="名称"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="saveMoney"
          label="节约金额"
          >
        </el-table-column>
        <el-table-column
          prop="validTime"
          label="有效时长"

          >
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"

          >
        </el-table-column>
        <el-table-column
          prop="couponStatus"
          label="状态"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toAdd(scope.row.id)'>修改</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toOut(scope.row.id)' v-if='scope.row.type == "自由发放"'>发放</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toChange(scope.row.id, 2)' v-if='scope.row.couponStatus == "启用中" && scope.row.type != "自由发放"'>禁用</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toChange(scope.row.id, 1)' v-if='scope.row.couponStatus == "禁用" && scope.row.type != "自由发放"'>启用</el-button>
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
import {preferentialList, preferentialChange} from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      pages: {
        pageNo: 1,
        pageSize: 10,
      },
      dateTime: '',
      pageAll: 1,
      selectStatus: '',
      selectType: '',
      searchName: '',
      cellStyle:{
        'line-height': '16px;'
      },
    }
  },
  beforeMount(){
    this.getList();
  },
  methods: {
    toOut(id) {
      this.$router.push({name: 'preferentialPeople', params: {
        id
      }})
    },
    toChange(id, status){
      let params = {
        id,
        status,
      }
      preferentialChange(params).then((data)=>{
        if(data.data.code == 'SUCCESS'){
          this.getList();
        }
      })
    },
    toAdd(id){
      if(id){
        this.$router.push({name: 'preferentialAdd', params:{
          id
        }})
      }else{
        this.$router.push({name: 'preferentialAdd'})
      }
    },
    getList(isOr) {
      let params = {};
      if(this.searchName){
        params.realName = this.searchName
      }else{
        params.realName = ''
      }
      if(this.selectStatus){
        params.status = this.selectStatus
      }else{
        params.status = '-1'
      }
      if(this.selectType){
        params.type = this.selectType
      }else{
        params.type = '-1'
      }
      params.pageSize = 10;
      if(!isOr){
        params.pageNo = 1
      }else{
        params.pageNo = isOr
      }
      preferentialList(params).then(data=>{
        // console.log(data);
        let arr = [];
        this.userList = data.data.data.list;
        for(let i = 0; i<this.userList.length; i++){
          if(this.userList[i].couponStatus == 1){
            this.userList[i].couponStatus = '启用中'
          }else{
            this.userList[i].couponStatus = '禁用'
          }
          if(this.userList[i].type == 1){
            this.userList[i].type = '新用户订单'
          }else if(this.userList[i].type == 2){
            this.userList[i].type = '邀请好友奖励'
          }else if(this.userList[i].type == 3){
            this.userList[i].type = '自由发放'
            this.userList[i].couponStatus = '启用中'
          }
        }
        this.userList = arr.concat(data.data.data.list);
        console.log(this.userList);
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
