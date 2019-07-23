<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        信息分类列表
      </div>
    </div>
    <div class="button">
      <el-button class="publicMidBtn" @click='toAdd' >添加</el-button>
    </div>
    <div class="searchAll">
      <span>帮助中心列表</span>
    </div>
    <div class="list">
      <el-table :data="helpList"
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
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="发布时间"
          >
        </el-table-column>
        <el-table-column
          label="管理"
          width='200'>
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toAdd(scope.row.id)' >查看/修改</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='del(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="searchAll">
      <span>新闻中心列表</span>
    </div>
    <div class="list">
      <el-table :data="centerList"
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
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="发布时间"
          >
        </el-table-column>
        <el-table-column
          label="管理"
          width='200'>
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toAdd(scope.row.id)' >查看/修改</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='del(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {messageHelpList, messageCenterList, messageDelete} from '@/API'
export default {
  data: () => {
    return {
      helpList: [],
      centerList: [],
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
    toAdd(id) {
      if(id){
        this.$router.push({name: 'messageManageAdd', params: {
          id
        }})
      }else{
        this.$router.push({name: 'messageManageAdd'})
      }
    },
    getList() {
      messageHelpList().then(data=>{
        console.log(data);
        this.helpList = [];
        this.helpList = this.helpList.concat(data.data.data.records);

      })
      messageCenterList().then(data=>{
        console.log(data);
        this.centerList = [];
        this.centerList = this.centerList.concat(data.data.data.records);

      })

    },
    del(id){
      let params = {
        id
      };
      if(confirm('您确定要删除吗')){
        messageDelete(params).then(data=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('删除成功')
            this.getList()
          }else{
            this.$message('error')
          }
        })

      }
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
    .button{
      background: #FFF;
    }
  }
</style>
