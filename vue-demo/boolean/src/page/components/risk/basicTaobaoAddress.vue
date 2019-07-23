<template>
  <div class="allPage">
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="id"
          label="ID"
          width="110"
          >
        </el-table-column>
        <el-table-column
          prop="address"
          label="淘宝地址"
          >
        </el-table-column>
        <el-table-column
          prop="receiverName"
          label="收货人"
          >
        </el-table-column>
        <el-table-column
          prop="receiverPhone"
          label="手机号码"
          >
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
import {basicTaoRecordList} from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      pages: {
        pageNo: 1,
        pageSize: 50,
      },
      pageAll: 1,
      cellStyle:{
        'line-height': '16px;'
      },
    }
  },
  props:{
    userId:{
      type:String,
      default:0
    },
    isLoaded:{
      type:Boolean,
      default:false
    }
  },
  watch:{
    isLoaded:function(val){
      if(val) this.getList();
    }
  },
  methods: {
    getList(isOr) {
      let params = {};
      params.userId = this.userId;
      params.pageSize = 10;
      if(!isOr){
        params.pageNo = 1;
      }else{
        params.pageNo = isOr;
      }
      basicTaoRecordList(params).then(data=>{
        this.userList = data.data.data.list;
        for(let i = 0;i<this.userList.length; i++){
          this.userList[i].name = this.$route.params.name
        }
        this.pageAll = data.data.data.total;
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../style/publicSass.scss';
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
      .choice{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
