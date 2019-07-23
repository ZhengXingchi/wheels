<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        管理员列表
      </div>
    </div>
    <div class="myBtn">
       <el-button @click='toAdd' size='mini' class="publicMidBtn">添加</el-button>
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
          prop="userName"
          label="管理员账号"
          >
        </el-table-column>
        <el-table-column
          prop="department.department"
          label="部门"
          >
        </el-table-column>
        <el-table-column
          label="状态"
        >
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status==1">启用</el-tag>
            <el-tag type="danger" v-if="scope.row.status==2">禁用</el-tag>
          </template>
        </el-table-column>

        <el-table-column
          prop="tgroup.groupName"
          label="角色类型"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small"  @click='toAdd(scope.row.id)'>修改</el-button>
            <el-button type="text" size="small"  @click='toDel(scope.row.id)'>禁用</el-button>
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
import {managerPeoList, managerProDel} from '@/API'
let currentPage=1;
export default {
  data: () => {
    return {
      pages: {
        pageNo: currentPage,
        pageSize: 10
      }, 
      pageAll: 1,
      userList: [],
      select: '',
      cellStyle:{
        'line-height': '16px',
      },
    }
  },
  beforeMount(){
    if(currentPage>1) this.pages.pageNo=currentPage;
    this.getList();
  },
  methods: {
    toDel(id) {
      let params = {
        id
      }
      if(confirm('您确定要删除？')){
        managerProDel(params).then(data=>{
          if(data.data.code == 'SUCCESS') {
            this.$message('删除成功')
            this.getList()
          }else{
            this.$message('error')
          }
        })
      }
    },
    toAdd(id) {
      if(id){
        this.$router.push({name: 'managerPeoAdd', params: {
          id
        }})
      }else{
        this.$router.push({name: 'managerPeoAdd'})
      }
    },
    getList(isOr) {
      let params = {}
      params.pageSize = 10;
      if(isOr == 0){
         this.pages.pageNo=1
      }else{
        currentPage = this.pages.pageNo;
      }
      // if(isOr){
      //   params.pageNo = isOr
      // }else{
      //   params.pageNo = 1
      // }
      params.pageNo = this.pages.pageNo
      managerPeoList(params).then(data=>{
        console.log(data);
        console.log(params)
        this.userList = data.data.data.list;
        this.pageAll = data.data.data.total;
      })
    }
  },
  beforeRouteEnter(to, from ,next) {
    // console.log(3);
    next(vm => {
      // 通过 `vm` 访问组件实例
      if(from.name === 'managerPeoAdd'){
        vm.getList()
      }
    })
  },
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .myBtn{
      background: #FFF;
      padding: 20px;
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
      .choice{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
