<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        广告列表
      </div>
    </div>
    <div class="searchAll">
      <el-button type="" size='mini' @click='getList()' class="publicMidBtn">添加广告</el-button>
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
          prop="imgUrl"
          label="图片"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="linkUrl"
          label="链接地址"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='orderDetail(scope.row.id)'>1</el-button>
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
import {advertList} from '@/API'
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
    getList(isOr) {
      let params = {};
      params.id = '';

      if(!isOr){
        params.current = 1
      }else{
        params.current = isOr
      }
      advertList(params).then(data=>{
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
  .allTitle{
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
