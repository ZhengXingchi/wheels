<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        部门列表
      </div>
    </div>
    <div class="searchAll">
      <el-button type="" size='mini' @click='toAdd' class="publicMidBtn">添加</el-button>
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="id"
          label="ID"
          width="120"
          >
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门名称"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDelete(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          :current-page.sync="pageNo"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pageAll">
        </el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
import {managerDepartmentList, managerDepartmentAdd, managerDepartmentDel} from '@/API'
let currentPage=1;
export default {
  data: () => {
    return {
      userList: [],
      pageNo: currentPage,
      pageSize: 10,
      pageAll: 1,
      cellStyle:{
        'line-height': '16px;'
      },
    }
  },
  beforeMount(){
    if(currentPage>1) this.pageNo=currentPage;
    this.getList();
  },
  methods: {
    toAdd() {
      this.$prompt('请输入部门名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if(!value.trim()){
            this.$message('部门名称不能为空')
            return
          }
          let params = {
            id: '',
            department: value
          }
          managerDepartmentAdd(params).then((data)=>{
            if(data.data.code == 'SUCCESS'){
              this.$message('部门添加成功')
              this.getList();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
    },
    toDelete(id) {
      let params = {}
      if(id){
        params.id = id
      }
      if(confirm('您确定要删除吗？')){
        managerDepartmentDel(params).then(data=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('删除成功');
            this.getList()
          }else{
            this.$message('error');
          }
        })
      }
    },
    getList(isOr) {
      if(isOr == 0){
        this.pageNo=1
      }else{
        currentPage = this.pageNo
      }
      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      }

      managerDepartmentList(params).then((data)=>{
        console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.list);
        this.pageAll = data.data.data.total
      })
    },
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
