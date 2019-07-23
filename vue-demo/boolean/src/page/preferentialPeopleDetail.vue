<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        用户优惠券列表
      </div>
    </div>
    <div class="searchAll">
      <el-button type="" size='mini' @click='back' class="publicMidBtn">返回</el-button>
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
          prop="coupon.coupouName"
          label="名称"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="saveMoney"
          label="节约金额"
          width='150'
          >
        </el-table-column>
        <el-table-column
          prop="coupon.validTime"
          label="有效期"

          >
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="获取时间"

          >
        </el-table-column>
        <el-table-column
          prop="pastDatetime"
          label="到期时间"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          >
        </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          :current-page.sync="pageNo"
          @size-change="sizeChange"
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
import {preferentialPeopleDetailList, preferentialOut} from '@/API'
export default {
  data: () => {
    return {
      userList: [],
      pageNo: 1,
      pageSize: 10,
      pageAll: 1,
      cellStyle:{
        'line-height': '16px;'
      },
      id: '',
    }
  },
  beforeMount(){
    if(!isNaN(this.$route.params.id)){
      this.id = this.$route.params.id
    }
    this.getList();
  },
  methods: {
    sizeChange(size){
      this.pageSize = size;
      this.getList();
    },
    back(){
      this.$router.go(-1)
    },
    getList(isOr) {
      let params = {};
      params.userId = this.id
      params.pageSize = this.pageSize
      params.pageNo = this.pageNo
      preferentialPeopleDetailList(params).then(data=>{
        // console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.list);
        for(let i = 0; i<this.userList.length; i++){
          if(this.userList[i].status == 1){
            this.userList[i].status = '正常'
          }else if(this.userList[i].status == 3){
            this.userList[i].status = '禁用'
          }
        }
        this.pageAll = data.data.data.total;
      })
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
    .right_title{
      text-align: right;
      .Rname{
        margin-right: 10px;
      }
      .red{
        color:red;
        margin-right: 10px;
      }
    }
    .choice{
      text-align: center;
      margin-top: 20px;
    }
  }
}
</style>
