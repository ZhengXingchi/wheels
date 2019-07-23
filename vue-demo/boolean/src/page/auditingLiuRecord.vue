<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        流转记录
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
          prop="gmtDatetime"
          label="创建时间"
          width='160'
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
          prop='adminAuditName'
          label="当前信审员"
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
import {auditingLiuList} from "@/API"
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
    this.getList()
  },
  computed:{
    ...mapGetters({
      id: 'GetIdentiId',
    })
  },
  methods:{
    getList() {
      auditingLiuList({
        userId: this.id,
      }).then((data)=>{
          this.userList = data.data.data
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
