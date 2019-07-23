<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        角色功能列表
      </div>
    </div>
    <div class="searchAll">
      <div class="groupName">
        组名: {{groupName}}
      </div>
      <el-input v-model="searchFirst" placeholder="请输入一级目录" class='search' size="mini"></el-input>
      <el-input v-model="searchSecond" placeholder="请输入二级目录" class='search' size="mini"></el-input>
      <!-- <el-input v-model="searchthird" placeholder="请输入功能" class='search' size="mini"></el-input> -->
      <el-button type="" icon="el-icon-search" size='mini' @click='getList()' class="publicMidBtn"></el-button>
      <el-button type="" size='mini' @click='beBack' class="publicMidBtn">返回</el-button>
    </div>
    <div class="list">
      <el-table :data="managerList"
                style="width: 100%"
                :cell-style='cellStyle'
                height='550'
                >
        <el-table-column
          prop="id"
          label="ID"
          width="90"
          >
        </el-table-column>
        <el-table-column
          prop="secondMenu.firstMenu.firstMenuName"
          label="一级目录"
          >
        </el-table-column>
        <el-table-column
          prop="secondMenu.menuName"
          label="二级目录"
          >
        </el-table-column>
        <el-table-column
          prop="urlName"
          label="功能"
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
import {managerProDetailList} from '@/API'
export default {
  data: () => {
    return {
      groupName: '',
      managerList: [],
      pageNo: 1,
      pageSize: 10,
      id: '',
      pageAll: 1,
      searchFirst: '',
      searchSecond: '',
      searchthird: '',
      cellStyle:{
        'line-height': '16px;'
      },
    }
  },
  beforeMount(){
    if(!isNaN(this.$route.params.id)){
      this.id = this.$route.params.id
      this.groupName = this.$route.params.groupName
    }
    this.getList();
  },
  methods: {
    sizeChange(size){
      this.pageSize = size;
      this.getList();
    },
    beBack() {
      this.$router.go(-1)
    },
    getList() {
      let params = {};
      params.id = this.id
      // params.id = 11
      if(this.searchFirst){
        params.firstMenuName = this.searchFirst
      }else{
        params.firstMenuName = ''
      }
      if(this.searchSecond){
        params.secondMenuName = this.searchSecond
      }else{
        params.secondMenuName = ''
      }
      if(this.searchthird){
        // params.thirdMenuName = this.searchthird
        params.thirdMenuName = ''
      }else{
        params.thirdMenuName = ''
      }
      params.pageSize = this.pageSize;
      params.pageNo = this.pageNo;
      managerProDetailList(params).then(data=>{
        console.log(data);
        let arr = []
        this.managerList =  arr.concat(data.data.data.list)
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
      .groupName{
        margin-bottom: 10px;
      }
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
      .choice{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
