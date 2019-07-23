<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        订单流转记录
      </div>
    </div>
    <div class="tabs">
      <br><br>
      <el-table
        :data="userList"
        highlight-current-row
        style="width: 100%"
        :cell-style='cellStyle'
        height='600'
        >
        <el-table-column
          label='序号'
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          prop="beforeStatus"
          label="操作前状态"
          width='90'>
        </el-table-column>
        <el-table-column
          prop="afterStatus"
          label="操作后状态"
          width='115'
          >
        </el-table-column>
        <el-table-column
          prop="opertionType"
          label="操作类型"
          width='100'
          >~
        </el-table-column>
        <el-table-column
          prop="overdueStatus"
          label="催收组"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="创建时间"
          width='150'
          >
        </el-table-column>
        <el-table-column
          prop="opertionObject"
          label="操作人"
          >
        </el-table-column>
        <el-table-column
          prop='opertionRemarks'
          label="操作备注"
          width='160'
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop='pressMoneyName'
          label="当前催收员"
          width='160'
          align="center"
          >
        </el-table-column>
      </el-table>
      <br>
    </div>

  </div>
</template>
<script>
import {callTransferList} from "@/API"
import { mapMutations, mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      userList: [],//数据列表
      cellStyle:{//样式
        'line-height': '16px;'
      },
    }

  },
  beforeMount(){
    if(this.$route.params.id){
      // this.id = this.$route.params.id
      console.log(this.$route.params.id,"dlkasjfkdsj")
    }
    this.getList()
  },
  computed:{
    ...mapGetters({
      id: 'GetCallId',
      idID: 'GetCallIdID'//订单id
    })
  },
  methods:{
    getList() {
      callTransferList({
        orderId:this.idID,
        }).then((response)=>{
          let data=response.data;
          console.log("订单流转记录",data.data);
          data.data.forEach((element,i) => {
            // data.data[i].index = index+1;
          });
          this.userList = data.data
          // this.pageAll = data.data.total;//总页数
          // console.log(data.data.total)
      })
    },
  },

}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .tabs{
      background: #fff;
      .choice{
        text-align: center;
      }
    }
  }
</style>
