<template>
  <div class="list">
    <el-table :data="userList"
              style="width: 100%"
              :cell-style='cellStyle'
              >
      <el-table-column
        prop="id"
        label="#ID"
        width="110"
        >
      </el-table-column>
      <el-table-column
        prop="orderShop"
        label="交易店铺"
      >
      </el-table-column>
      <el-table-column
        prop="productName"
        label="商品名称"
        >
      </el-table-column>
      <el-table-column
        prop="receiverName"
        label="收货人"
        width='100'
        >
      </el-table-column>
      <el-table-column
        prop="orderAmount"
        label="订单金额"
        width='100'
        >
      </el-table-column>
      <el-table-column
        prop="orderStatus"
        label="订单状态"
        width='100'
      >
      </el-table-column>
      <el-table-column
        prop="orderTime"
        label="订单时间"
        width='160'
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

</template>
<script>
import {basicTaoBuyList} from '@/API'
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
  props:{
    userId:{
      type:String,
      default:0
    },
    isLoaded:{
      type:Boolean,
      default:false,
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
      params.userId = this.userId
      params.pageSize = 10
      if(!isOr){
        params.pageNo = 1
      }else{
        params.pageNo = isOr
      }
      basicTaoBuyList(params).then(data=>{
        let arr = data.data.data.list
        this.userList = []
        for(let i = 0; i < arr.length; i ++){
          if(arr[i].orderAmount){
            arr[i].orderAmount = ((+arr[i].orderAmount)/100).toFixed(2)
          }
        }
        this.userList = data.data.data.list;
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
