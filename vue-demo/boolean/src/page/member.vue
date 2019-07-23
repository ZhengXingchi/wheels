<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        会员列表
      </div>
    </div>
    <div class="searchAll">
      <span>注册时间：</span>
      <el-date-picker
      v-model="dateTime"
      type="daterange"
      align="right"
      value-format='yyyy-MM-dd'
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="dateOption"
      size='mini'
      style='width:240px;'
      >
      </el-date-picker>
      <el-input v-model="searchName" placeholder="请输入姓名" class='search' style='width:120px;' size="mini"></el-input>
      <el-input v-model="searchPhone" placeholder="请输入电话号码" class='search' style='width:120px;' size="mini"></el-input>
      <span>认证状态：</span>
      <el-select v-model="selectStatus" size='mini' class="selectChoice">
        <el-option label="全部" value=""></el-option>
        <el-option label="未认证" value="0"></el-option>
        <el-option label="认证成功" value="1"></el-option>
      </el-select>
      <span>身份状态：</span>
      <el-select v-model="selectID" size='mini' class="selectChoice">
        <el-option label="全部" value=""></el-option>
        <el-option label="风控未知" value="0"></el-option>
        <el-option label="正常" value="1"></el-option>
        <el-option label="禁用" value="3"></el-option>
        <el-option label="风控拒绝" value="4"></el-option>
      </el-select>
      <span v-if='false'>风控状态：</span>
      <el-select v-model="selectFengkong" size='mini' class="selectChoice" v-if='false'>
        <el-option label="全部" value=""></el-option>
        <el-option label="风控通过" value="1"></el-option>
        <el-option label="风控未知" value="0"></el-option>
        <el-option label="风控拒绝" value="2"></el-option>
      </el-select>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">搜索</el-button>
    </div>
    <div class="list">
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                >
        <el-table-column
          prop="userId"
          label="ID"
          width="100"
          >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop="baiscAuth"
          label="基本认证"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="identityAuth"
          label="身份认证"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="bankAuth"
          label="银行卡认证"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="phoneAuth"
          label="运营商认证"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="taobaoAuth"
          label="淘宝认证"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="zhifubaoAuth"
          label="支付宝认证"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="authStatus"
          label="认证状态"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="riskStatus"
          label="风控状态"
          width='100'
          v-if='false'
          >
        </el-table-column>
        <el-table-column
          prop="userStatus"
          label="账号状态"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="gmtDatetime"
          label="注册时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDetail(scope.row.userId)'>查看信息</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='forbidden(scope.row.userId)' v-if='scope.row.userStatus != "禁用"'>禁用</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" v-if='scope.row.userStatus == "禁用"' @click='recover(scope.row.userId)'>恢复</el-button>
          </template>
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
import {selectUserList, UserJoinBlack, UserForbidden, UserRecover} from '@/API'
import { mapMutations } from 'vuex'
export default {
  data: () => {
    return {
      userList: [],
      searchPhone: '',
      searchName: '',
      selectStatus: '',
      selectFengkong: '',
      selectID: '',
      pageNo: 1,
      pageSize: 10,
      pageAll: 1,
      cellStyle:{
        'line-height': '16px;'
      },
      dateTime: '',
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
  beforeMount(){
    this.getList();
  },
  methods: {
    ...mapMutations({
      setIdenti: 'SETIDENTI'
    }),
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    toDetail(id) {
      this.setIdenti({Id:id, ifLoan:0})
      this.$router.push({name: 'loanIdenti'})
    },
    recover(id) {
      let params = {}
      params.id = id
      if(confirm('您确定要恢复该用户吗')){
        UserRecover(params).then((data)=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('恢复成功');
            this.getList();
          }else{
            this.$message('error')
          }
        })
      }
    },
    changeRenzheng(i){
      if(i == 1){
        return '已认证'
      }else{
        return '未认证'
      }
    },
    getList(isOr) {
      if(isOr == 0){
        this.pageNo = 1
      }
      let params = {
        userName: this.searchName,
        current: this.pageNo,
        size: this.pageSize,
        phone: this.searchPhone,
        userName: this.searchName,
        authStatus: this.selectStatus,
        userStatus: this.selectID,
        // riskStatus: this.selectFengkong
      }
      if(this.dateTime){
        params.gmtDatetime = this.dateTime[0] + `~` + this.dateTime[1]
      }else{
        params.gmtDatetime = ''
      }


      selectUserList(params).then((data)=>{
        // console.log(data);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.list);
        for(let i = 0;i < this.userList.length; i++){
          this.userList[i].baiscAuth = this.changeRenzheng(this.userList[i].baiscAuth);
          this.userList[i].bankAuth = this.changeRenzheng(this.userList[i].bankAuth);
          this.userList[i].identityAuth = this.changeRenzheng(this.userList[i].identityAuth);
          this.userList[i].phoneAuth = this.changeRenzheng(this.userList[i].phoneAuth);
          this.userList[i].taobaoAuth = this.changeRenzheng(this.userList[i].taobaoAuth);
          this.userList[i].zhifubaoAuth = this.changeRenzheng(this.userList[i].zhifubaoAuth);

          if(this.userList[i].userStatus == 1){
            this.userList[i].userStatus = '正常'
          }else if (this.userList[i].userStatus == 0){
            this.userList[i].userStatus = '风控未知'
          }else if (this.userList[i].userStatus == 4){
            this.userList[i].userStatus = '风控拒绝'
          }else if (this.userList[i].userStatus == 3){
            this.userList[i].userStatus = '禁用'
          }
          // if(this.userList[i].riskStatus == 0){
          //   this.userList[i].riskStatus = '风控未知'
          // }else if(this.userList[i].riskStatus == 1){
          //   this.userList[i].riskStatus = '风控通过'
          // }else if(this.userList[i].riskStatus == 2){
          //   this.userList[i].riskStatus = '风控拒绝'
          // }

          if(this.userList[i].authStatus == 0){
            this.userList[i].authStatus = '未认证';
          }else if (this.userList[i].authStatus == 1){
            this.userList[i].authStatus = '认证成功'
          }else if (this.userList[i].authStatus == 2){
            this.userList[i].authStatus = '暂时拒绝'
          }else if (this.userList[i].authStatus == 3){
            this.userList[i].authStatus = '永久拒绝'
          }

        }
        this.pageAll = data.data.data.total
      })
    },
    //禁用会员
    forbidden(id) {
      // console.log(id);
      if(confirm('是否禁用该会员')){
        UserForbidden({id}).then((data)=>{
          // console.log(data);
          this.getList();
        }).catch(()=>{
          this.$message(error)
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
