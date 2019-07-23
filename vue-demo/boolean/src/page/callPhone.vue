<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        通话记录
      </div>
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="id"
          label="编号"
          width="110"
          >
        </el-table-column>
        <el-table-column
          prop="name"
          label="联系人姓名"
          width="110"
          >
        </el-table-column>
        <el-table-column
          prop="link"
          label="联系人关系"
          width="110"
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          >
        </el-table-column>
        <el-table-column
          prop="belongArea"
          label="归属地"
          >
        </el-table-column>
        <el-table-column
          prop="callTimes"
          label="联系次数"
          width="120">
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
import { basicInPhone } from '@/API'
import { mapMutations, mapGetters } from 'vuex'
export default {
  data: () => ({
    userList: [],
    pageAll:1,
    pageNo:1,
    pageSize:10,
    cellStyle:{
      'line-height': '16px;'
    },
  }),
  mounted(){
    this.getList()
  },
  computed: {
    ...mapGetters({
      id: 'GetCallId'
    })
  },
  methods: {
    sizeChange(size) {
      this.pageSize = size;
      this.getList(0);
    },
    getList(isOr){
      if(isOr == 0){
        this.pageNo = 1
      }
      this.showCom = true
      let params={
        userId:this.id,
        pageNo:this.pageNo,
        pageSize: this.pageSize,
      }
      basicInPhone(params).then(data=>{
        this.userList = data.data.data.list
        this.pageAll = data.data.data.total
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';

</style>
