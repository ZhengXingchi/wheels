<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        利率配置
      </div>
    </div>
    <div class="searchAll">
      <el-select v-model="select" size='mini' class="selectChoice" onchange="getList">
        <el-option label="全部" value="''"></el-option>
        <el-option label="可用" value="1"></el-option>
        <el-option label="已禁用" value="2"></el-option>
      </el-select>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList()' class="publicMidBtn"></el-button>
      <el-button type="" size='mini' @click='toAdd' class="publicMidBtn">添加利率配置</el-button>
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
          prop="limitDays"
          label="贷款期限"
          width='115'
          >
        </el-table-column>
        <el-table-column
          prop="interestPercent"
          label="利息（‰）"
          width='95'>
        </el-table-column>
        <el-table-column
          prop="placeServePercent"
          label="平台服务费（％）"
          width='135'
          >
        </el-table-column>
        <el-table-column
          prop="msgAuthPercent"
          label="信息认证费（％）"
          width='135'
          >
        </el-table-column>
        <el-table-column
          prop="riskServePercent"
          label="风控服务费"
          width="95">
        </el-table-column>
        <el-table-column
          prop="riskPlanPercent"
          label="风险准备金（％）"
          width="135">
        </el-table-column>
        <el-table-column
          prop="allowDays"
          label="容限期"
          width="80">
        </el-table-column>
        <el-table-column
          prop="allowPercent"
          label="容限期日利率"
          width="120">
        </el-table-column>
        <el-table-column
          prop="overduePercent"
          label="逾期日利率（％）"
          width="135">
        </el-table-column>
        <el-table-column
          prop="uptDatetime"
          label="生成时间"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width='80'
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toAdd(scope.row.id)'>修改</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toStop(scope.row.id)'>禁用</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDelete(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import {systemRetList, systemRetStop, systemRetDelete} from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      select: '',
      cellStyle:{
        'line-height': '16px',
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
    getList(isOr) {
      let params = {}
      if(this.select){
        params.status = this.select
      }else{
        params.status = ''
      }
      systemRetList(params).then(data=>{
        this.userList = data.data.data.list;
        for(let i = 0; i<this.userList.length;i++){
          if(this.userList[i].status == 1){
            this.userList[i].status = '可用'
          }else if(this.userList[i].status == 2){
            this.userList[i].status = '已禁用'
          }
        }
        this.pageAll = data.data.data.total;
      })
    },
    toAdd(id) {
      console.log(id);
      this.$router.push({name: 'systemRetAdd', params: {
        id: id
      }})
    },
    toStop(id) {
      let params = {}
      params.id = id
      if(confirm('您确定要停用该贷款类型吗？')){
        systemRetStop(params).then(data=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('停用成功');
            this.getList()
          }else{
            this.$message('error')
          }
        })
      }
    },
    toDelete(id) {
      let params = {}
      params.id = id
      if(confirm('您确定要删除该贷款类型吗？')){
        systemRetDelete(params).then(data=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('删除成功');
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
