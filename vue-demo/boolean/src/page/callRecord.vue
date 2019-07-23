<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        催收记录
      </div>
    </div>
    <div class="tabs">
      <el-table
        :data="userList"
        highlight-current-row
        style="width: 100%"
        :cell-style='cellStyle'
        height='600'
        >

        <el-table-column
          prop="index"
          label="序号"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="id"
          label="催收记录编号"
          >
        </el-table-column>
        <el-table-column
          prop="connectName"
          label="联系人姓名"
          >
        </el-table-column>
        <el-table-column
          prop="connectType"
          label="联系人类型"
          >
        </el-table-column>
        <el-table-column
          prop="connectRelation"
          label="联系人关系"
          >
        </el-table-column>
        <el-table-column
          prop="connectPhone"
          label="联系人电话"
          >
        </el-table-column>
        <el-table-column
          prop="level"
          label="跟进等级"
          >
        </el-table-column>
        <el-table-column
          prop="pressStatus"
          label="操作时
          催收状态"
          >
        </el-table-column>
        <el-table-column
          prop='pressType'
          label="催收类型"
          width='160'
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop='content'
          label="催收内容"
          width='360'
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop='admin.userName'
          label="催收员"
          width='80'
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop='gmtDatetime'
          label="创建时间"
          width='80'
          align="center"
          >
        </el-table-column>
      </el-table>
      <br>
      <div class="choice">
        <!-- <el-pagination
          @current-change="getList"
          background
          @size-change="sizeChange"
          :current-page.sync="pageNo"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="10"
          layout="sizes, total, prev, pager, next, jumper"
          :total="pageAll">
        </el-pagination> -->
        <br><br>
      </div>
    </div>

  </div>
</template>
<script>
import {callPPassCallRecordList} from "@/API"
import { mapMutations, mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      userList: [],//数据列表
      pageNo: 1,//当前页
      pageSize: 10,//每页条数
      pageAll: 1,//总页数
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
      id: 'GetCallId',//用户id
      idID: 'GetCallIdID'//订单id
    })
  },
  methods:{
    getList() {
      callPPassCallRecordList({
        orderId:this.idID,
        current:this.pageNo,
        pageSize:this.pageSize,
        }).then(data=>{
          console.log("催收记录111",data.data.data);
          console.log("催收记录",data.data.data.list);
          data.data.data.forEach((element,i) => {
            data.data.data[i].index = i+1
            switch(data.data.data[i].pressStatus){
              case 0:
                data.data.data[i].pressStatus = "未催收"
              break
              case 1:
                data.data.data[i].pressStatus = "催收中"
              break
              case 2:
                data.data.data[i].pressStatus = "催收成功"
              break
            }

          });
          this.userList = data.data.data

      })
    },
    sizeChange(size){
      // this.pageSize = size;
      this.getList();
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
