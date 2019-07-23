<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        极光推送
      </div>
    </div>
    <div class="searchAll">
      <el-button type="" size='mini' @click='toAdd' class="publicMidBtn">添加推送</el-button>
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
          prop="title"
          label="标题"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="发布时间"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="250">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toOutSome(scope.row.id)'>部分推送</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toOutAll(scope.row.id)'>全部推送</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toAdd(scope.row.id)'>修改</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDel(scope.row.id)'>删除</el-button>
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
import {basePropeList, basePropeDel, basePropeSendAll} from '@/API'
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
      searchName: '',
      searchPhone: '',
      cellStyle:{
        'line-height': '16px;'
      },
    }
  },
  beforeMount(){
    this.getList();
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    toOutSome(jiid){
      this.$router.push({name: 'basePropePeople', params: {
        id: jiid
      }})
    },
    toDel(id) {
      let params = {
        id
      }
      if(confirm('是否删除？')){
        basePropeDel(params).then((data)=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('删除成功');
            this.getList()
          }
        })
      }
    },
    toOutAll(id) {
      let params = {
        id
      }
      if(confirm('是否推送？')){
        basePropeSendAll(params).then((data)=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('推送成功');
            this.getList()
          }
        })
      }
    },
    toAdd(id) {
      if(id){
        this.$router.push({name: 'basePropeAdd', params: {
          id
        }})
      }else{
        this.$router.push({name: 'basePropeAdd'})
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
      basePropeList(params).then(data=>{
        // console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.list);

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
  .publicSmalBtn{
    background-color: #FF7E03;
    color: #fff;
    font-size: 12px;
    padding: 4px 2px 3px 1px;
  }
  .publicMidBtn{
    background-color: #FF7E03;
    color: #fff;
    font-size: 12px;
  }
}
</style>
