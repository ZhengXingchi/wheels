<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        淘宝购买地址
      </div>
    </div>
    <div class="list">
      <el-table :data="addressList"
                style="width: 100%"
                :cell-style='cellStyle'
                >

        <el-table-column
          prop="address"
          label="淘宝地址"
          >
        </el-table-column>
        <el-table-column
          prop="receiverName"
          label="收件人"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop="receiverPhone"
          label="手机号码"
          width='120'
          >
        </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          :current-page.sync="aPageNo"
          :page-size="aPageSize"
          layout="total, prev, pager, next, jumper"
          :total="aPageAll">
        </el-pagination>
      </div>
    </div>

    <div class="allTitle">
      <div class="allTitleStyle">
        淘宝购买记录
      </div>
    </div>
    <div class="list">
      <el-table :data="recordList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="orderShop"
          label="店铺"
          width="200"
          >
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称"
          >
        </el-table-column>
        <el-table-column
          prop="orderAmount"
          label="实付金额"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="orderTime"
          label="支付时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="交易状态"
          width='160'
          >
        </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          :current-page.sync="rPageNo"
          :page-size="rPageSize"
          layout="total, prev, pager, next, jumper"
          :total="rPageAll">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import {basicTaoRecordList, basicTaoBuyList} from '@/API'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data: () => ({
    addressList: [],
    recordList: [],
    aPageNo:1,
    aPageSize:10,
    aPageAll: 1,
    rPageNo:1,
    rPageSize:10,
    rPageAll: 1,
    cellStyle:{
      'line-height': '16px;'
    },
  }),
  computed: {
    ...mapGetters({
      id: 'GetCallId'
    })
  },
  mounted() {
    //do something after mounting vue instance
    this.getList()
  },
  methods: {
    getList(isOr){
      if(isOr==0){
        this.rPageNo = 1
        this.aPageNo = 1
      }
      basicTaoRecordList({
        userId: this.id,
        pageSize: this.aPageSize,
        pageNo: this.aPageNo
      }).then(data=>{
        this.addressList = data.data.data.list;
        for(let i = 0;i<this.addressList.length; i++){
          this.addressList[i].name = this.$route.params.name
        }
        this.aPageAll = data.data.data.total;
      })
      basicTaoBuyList({
        userId: this.id,
        pageSize: this.rPageSize,
        pageNo: this.rPageNo
      }).then(data=>{
        let arr = data.data.data.list
        this.userList = []
        for(let i = 0; i < arr.length; i ++){
          if(arr[i].orderAmount){
            arr[i].orderAmount = ((+arr[i].orderAmount)/100).toFixed(2)
          }
        }
        this.recordList = data.data.data.list;
        this.rPageAll = data.data.data.total;
      })


    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
.allPage{
  .list{
    background: #fff;
  }
}
</style>
