<template>
  <div class="allPage">
    <div class="searchAll">

      <el-input v-model="searchW" placeholder="请输入账号名" class='search' size="mini"></el-input>
      <el-button type="" size="small" class="publicMidBtn" @click='revise' style="float:right;">添加</el-button>
      <el-button type="" size="small" class="publicMidBtn" @click='canalsList(0)' >搜索</el-button>
    </div>
    <el-table :data="canals"
              style="width: 100%"
              stripe
              size="medium"
              :cell-style='cellStyle'>
      <el-table-column
        prop="id"
        label="ID"
        width="70"
        >
      </el-table-column>
      <el-table-column
        prop="name"
        label="渠道商名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="账号"
        width="180">
      </el-table-column>
      <el-table-column
        label="推广链接"
        >
        <template slot-scope="scope">
          <el-input v-model="scope.row.linkUrl" placeholder="Please input" :disabled="true"  style="width:450px;max-width:100%;"/>
          <el-button type="primary" size="small" icon="document" @click="handleCopy(scope.row.linkUrl,$event)">复制链接</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="rate"
        label="拦截率"
        width='80'
        >
      </el-table-column>
      <el-table-column
        prop="proportion"
        label="分成比例"
        width="80">
      </el-table-column>
      <el-table-column
        label="操作"
        width="230">
        <template slot-scope="scope">
          <el-button type="text" size="small"  @click='revise(scope.row.id)' >修改</el-button>
          <el-button type="text" size="small"  @click='del(scope.row.id)'>删除</el-button>
          <el-button type="text" size="small"  @click='userDetail(scope.row.id)'>渠道会员</el-button>
          <el-button type="text" size="small"  @click='orderDetail(scope.row.id)'>渠道订单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block choice">
      <el-pagination
        @current-change="canalsList"
        background
        :current-page.sync="pageNo"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="pageAll">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import {getCanalsList, canalsDel} from '@/API'
import clip from '@/utils/clipboard' // use clipboard directly
let currentPage=1;
export default {
  data: () => ({
    canals: [],
    pageNo: currentPage,
    pageSize: 10,
    loginName: '',
    pageAll: 1,
    cellStyle:{
      'line-height': '16px;'
    },
    searchW: ''
  }),
  beforeMount() {
    if(currentPage>1) this.pageNo=currentPage;
    this.canalsList()
  },
  methods: {
    handleCopy(text, event) {
      clip(text, event)
    },
    canalsList(isOr) {
      if(isOr == 0){
        this.pageNo = 1
      }
      currentPage = this.pageNo;
      let params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        loginName: this.searchW,
      }
      // console.log(2);

      getCanalsList(params).then((data)=>{
        console.log(data);
        this.canals = [];
        this.canals = this.canals.concat(data.data.data.list);
        this.pageAll = data.data.data.total;
      })
    },

    revise(id){
      this.$router.push({
        name: 'canalsChange',
        params: {
          id: id
        }
      })
    },

    del(id){
      // console.log(id);
      let a = confirm('你确定要删除？');
      if(a){
        console.log(2);
        canalsDel({id}).then((data)=>{
          console.log(data);
          if(data.data.code == 'SUCCESS'){
            console.log(1);
            this.canalsList();
          }
        }).catch(()=>{
          this.$message('error')
        })
      }
    },

    userDetail(id){
      this.$router.push({name: 'canalsMember', params: {
        id
      }})
    },

    orderDetail(id){
      console.log(id);
      this.$router.push({name: 'cancelDetailList', params: {
        id
      }})
    }
  },

}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .searchAll{
      background-color: white;
      padding:20px;
      .search{
        width: 16.7%;
        margin-right: 20px;
      }
    }
    .choice{
      text-align: center;
      margin-top: 20px;
    }
  }
</style>
