<template>
    <div class="allPage">
        <div class="searchAll">
        <el-row>
          <el-col :span="24">
            <el-date-picker
              v-model="registerTime"
              type="daterange"
              align="right"
              value-format='yyyy-MM-dd'
              unlink-panels
              range-separator="至"
              start-placeholder="注册开始日期"
              end-placeholder="注册日期"
              :picker-options="dateOption"
              size='mini'
              style='width:350px;'
            >
            </el-date-picker>
            <el-input v-model="searchName" placeholder="借款人姓名" class='search' size="mini"></el-input>
            <el-input v-model="searchPhone" placeholder="输入手机号码" class='search'  size="mini"></el-input>
            <el-button type="primary" icon="el-icon-search" size="mini" @click='getList(0)' >查询</el-button>
          </el-col>
        </el-row>
      </div>
        <el-table
        :data="users"
        style="width: 100%"
        border>
        <el-table-column
            prop="userId"
            label="#"
            width="180">
        </el-table-column>
        <el-table-column
            prop="gmtDatetime"
            label="注册日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="姓名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="手机号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="channelName"
            label="渠道"
            width="180">
        </el-table-column>
      
            <el-table-column
                
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="removeBlack(scope.row.userId,scope.$index)" type="text" size="small">设为正常</el-button>
                    
                </template>
            </el-table-column>
        </el-table>
        <div class="block choice">
        <el-pagination
            @current-change="getList"
            background
            :current-page.sync="pageNo"        
            :page-size="10"
            layout="sizes, total, prev, pager, next, jumper"
            :total="pageAll">
        </el-pagination>
        </div>
    </div>
</template>

<script>
import{getBlackMemberList,removeBlackMember} from '@/API'
let currentPage=1;
    export default {
        data() {
            return {
                users:[],
                pageNo:currentPage,
                pageSize:10,
                pageAll:0,
                searchPhone: '',
                channelName:'',
                searchName: '',
                registerTime: '',
                dateOption: {
                   shortcuts: [{
                     text: '最近一周',
                     onClick(picker) {
                       const end = new Date();
                       const start = new Date();
                       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                       picker.$emit('pick', [start, end]);
                     }
                   }, {
                     text: '最近一个月',
                     onClick(picker) {
                       const end = new Date();
                       const start = new Date();
                       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                       picker.$emit('pick', [start, end]);
                     }
                   }, {
                     text: '最近三个月',
                     onClick(picker) {
                       const end = new Date();
                       const start = new Date();
                       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                       picker.$emit('pick', [start, end]);
                     }
                   }]
                },
            }
        },
       async mounted(){
           if(currentPage>1) this.pageNo=currentPage;
           await this.getList();
        },
        methods: {
            getList(isOr) {
                if(isOr==0){
                    this.pageNo=1
                }
                currentPage = this.pageNo;
                let params={
                    pageNo: this.pageNo,
                    pageSize: this.pageSize,
                    phone: this.searchPhone,
                    userName: this.searchName,
                };
                if(this.registerTime){
                      params.gmtDatetime = this.registerTime[0] + `~` + this.registerTime[1]
                }else{
                      params.gmtDatetime = ''
                    }
                getBlackMemberList(params).then(res=>{
                    this.users = res.data.data.list;
                    this.pageAll = res.data.data.total;
                });
            },
            removeBlack(userid,index){
                let params={};
                params.id=userid;
                removeBlackMember(params).then(res=>{
                    if(res.data.data!=true){
                        this.$message('移除失败');
                    }else{
                        this.users.splice(index,1);
                        this.$message('已移除黑名单');
                    }
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
.allPage{
    margin:30px;
    .searchAll{
      background-color: white;
      padding:20px;
      span{
        margin-left: 10px;
      }
      .selectChoice{
        width: 100px;
        margin-right: 20px;
      }
      .search{
        width: 130px;
        margin-right: 20px;
      }
    }
  }
</style>