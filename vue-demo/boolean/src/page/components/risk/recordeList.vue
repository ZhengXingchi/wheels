<template>
  <div class="list">
    <el-table :data="recodeList"
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
        prop="phoneNo"
        label="联系电话"
      >
      </el-table-column>
      <el-table-column
        prop="commPlac"
        label="地区"
      >
      </el-table-column>
      <el-table-column
        prop="callTimes"
        label="通话次数"
        width="120">
      </el-table-column>
      <el-table-column
        prop="callTime"
        label="通话时长"
        width='120'
      >
      </el-table-column>
      <el-table-column
        prop="callCountActive"
        label="主叫次数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="callCountPassive"
        label="被叫次数"
        width="80">
      </el-table-column>
    </el-table>
    <div class="block choice">
      <el-pagination
        @current-change="toRecord"
        background
        @size-change="sizeChange"
        :current-page.sync="pageNo"
        :page-sizes="[10, 20, 30, 50, 100]"
        :page-size="10"
        layout="sizes, total, prev, pager, next, jumper"
        :total="toTal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        data:()=>{
          return {
            recodeList:[],
            pageNo:1,
            toTal:0,
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
          if(val) this.getXinyan();
        }
      },
    }
</script>

<style scoped>

</style>
