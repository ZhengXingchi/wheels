<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        贷款管理列表
      </div>
    </div>
    <div class="searchAll">
      <span>打款时间:</span>
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
        style='width:240px;'>
      </el-date-picker>
      &nbsp;
      <span>应还款时间:</span>
      <el-date-picker
        v-model="lpDatetime"
        type="daterange"
        align="right"
        value-format='yyyy-MM-dd'
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateOption"
        size='mini'
        style='width:240px;'>
      </el-date-picker>
      &nbsp;
      <span>实际还款时间:</span>
      <el-date-picker
        v-model="rpDatetime"
        type="daterange"
        align="right"
        value-format='yyyy-MM-dd'
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateOption"
        size='mini'
        style='width:240px;'>
      </el-date-picker>
      <span>手机号:</span>
      <el-input v-model="searchPhone" placeholder="请输入电话号码" class='search' size="mini"></el-input>
      <span>姓名:</span>
      <el-input v-model="searchName" placeholder="请输入借款人姓名" class='search' size="mini"></el-input>
      <span>状态：</span>
      <el-select v-model="selectOrder" size='mini' class="selectChoice">
        <el-option label="全部" value=""></el-option>
        <el-option label="未申请" value="0"></el-option>
        <el-option label="审核中" value="1"></el-option>
        <el-option label="待打款" value="2"></el-option>
        <el-option label="待还款" value="3"></el-option>
        <el-option label="容限期中" value="4"></el-option>
        <el-option label="逾期" value="5"></el-option>
        <el-option label="已还款" value="6"></el-option>
        <el-option label="审核拒绝" value="7"></el-option>
        <el-option label="坏账" value="8"></el-option>
        <el-option label="打款中" value="9"></el-option>
        <el-option label="还款中" value="10"></el-option>
      </el-select>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">搜索</el-button>
      <!-- <el-button type="" icon="el-icon-search" size='mini' @click='exportE()' class="publicMidBtn" >导出Excel</el-button> -->
    </div>
    <div class="list">
      <div class="right_title" v-if='false'>
        <span class="Rname">总金额</span>
        <span class="red">{{allMoney}}</span>
        <span class="Rname">总人数</span>
        <span class="red">{{pageAll}}</span>
      </div>
      <el-table :data="userList"
                style="width: 100%"
                :cell-style='cellStyle'
                height='600'
                >
        <el-table-column
          prop="userId"
          label="用户ID"
          width="70"
          >
        </el-table-column>
        <el-table-column
          prop="id"
          label="订单编号"
          >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width='80'>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width='115'
          >
        </el-table-column>
        <el-table-column
          prop="limitDays"
          label="贷款期限"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="borrowMoney"
          label="贷款金额"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="realMoney"
          label="打款金额"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="needRepayMoney"
          label="应还金额"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="needPayMoney"
          label="应还本金"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="overdueMoney"
          label="滞纳金"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="overdueDays"
          label="逾期天数"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="extendNum"
          label="续期次数"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="打款状态"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="giveTime"
          label="打款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="extendTime"
          label="最新续期时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="limitPayTime"
          label="应还款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="realPayTime"
          label="实际还款时间"
          width='160'
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="350"
          fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toLook(scope.row.userId)' >查看认证信息</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toRecord(scope.row.id)'>续期记录</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toYibao(scope.row.id)'>易宝打款</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toAgree(scope.row.id)'>同意</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='refuse(scope.row.id)'>拒绝</el-button>
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
    <el-dialog
      title="续期记录"
      :visible.sync="showCom"
      width="60%"
      >
      <div class="list">
        <el-table :data="recordList"
                  style="width: 100%"
                  :cell-style='cellStyle'
                  >
          <el-table-column
            prop="id"
            label="ID"
            >
          </el-table-column>
          <el-table-column
            prop="userName"
            label="姓名"
            >
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            >
          </el-table-column>
          <el-table-column
            prop="extendWateMoney"
            label="续期金额"
            >
          </el-table-column>
          <el-table-column
            prop="gmtDatetime"
            label="续期时间"
            >
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCom = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="打款拒绝"
      :visible.sync="showRefuse"
      width="60%"
      >
      <div>
        你确定拒绝打款吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRefuse = false">关 闭</el-button>
        <el-button type="primary" @click="refuseSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {loanMachineList, loanApplyReject, loanToYibao,extendList, exportExcel, loanApplyAgree} from '@/API'
import { mapMutations } from 'vuex'
export default {
  data: () => {
    return {
      userList: [],
      recordList: [],
      pageNo: 1,
      pageSize: 10,
      pageAll: 1,
      dateTime: '',
      lpDatetime: '',//应还款时间
      rpDatetime: '',//实际还款时间

      searchPhone: '',
      searchName: '',
      selectOrder:'2',
      selectReturn: '',
      selectPayto: '',
      cellStyle:{
        'line-height': '16px;'
      },
      showCom: false,
      showRefuse: false,//打款拒绝
      refuseId:'',//打款拒绝
      allMoney: 0,
      allPeople: 0,
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
    toAgree(id) {
      let params = {
        id
      };
      if(confirm('您确定通过吗？')){
        loanApplyAgree(params).then((data)=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('同意成功');
            this.getList();
          }else{
            this.$message(data.data.msg)
          }
        })

      }
    },
    toYibao(id) {
      let params = {
        id
      };
      if(confirm('您确定打款吗')){
        loanToYibao(params).then((data)=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('打款成功');
            this.getList();
          }else{
            this.$message(data.data.msg)
          }
        })

      }
    },
    sizeChange(size){
      this.pageSize = size;
      this.getList();
    },
    toRecord(id) {
      this.showCom = true
      let params={
        orderId:id
      }
      extendList(params).then(data=>{
        console.log("续期记录",data)
        this.recordList = data.data.data
      })
    },
    exportE() {
      let params = {}
      params.type = 1
      exportExcel().then(data=>{
        if(data.data.success == true) {
  					window.location.href=data.msg;
  					this.$message("导出成功!")
  				} else {
  					if(data.data.msg != '空数据') {
  						this.$message(data.msg);
  					} else {
  						this.$message(data.msg);
  					}
  				}
      }).catch(()=>{
        this.$message('error')
      })
    },
    toLook(id) {
      this.setIdenti({Id:id, ifLoan:0})
      this.$router.push({name: 'loanIdenti'})
    },
    getList(isOr) {
      if(isOr == 0){
        this.pageNo = 1;
      }
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        phone: this.searchPhone,
        userName: this.searchName,
        orderStatus: this.selectOrder,
      };
      if(this.dateTime){//打款时间
        params.gmtDatetime = this.dateTime[0] + `~` + this.dateTime[1]
      }else{
        params.gmtDatetime = ''
      }
      if(this.lpDatetime){//应还款时间
        params.lpDatetime = this.lpDatetime[0] + `~` + this.lpDatetime[1]
      }else{
        params.lpDatetime = ''
      }
      if(this.rpDatetime){//实际还款时间
        params.rpDatetime = this.rpDatetime[0] + `~` + this.rpDatetime[1]
      }else{
        params.rpDatetime = ''
      }
      loanMachineList(params).then(data=>{
        console.log("贷款管理",data.data.data.records);
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.records);
        for(let i = 0; i<this.userList.length; i++){
          this.userList[i].limitPayTime = this.userList[i].limitPayTime ? this.userList[i].limitPayTime.slice(0,16) : 'null'
          this.userList[i].giveTime = this.userList[i].giveTime ? this.userList[i].giveTime.slice(0,16) : ''
          this.userList[i].requestPayTime = this.userList[i].requestPayTime ? this.userList[i].requestPayTime.slice(0,16) : 'null'
          switch(this.userList[i].orderStatus){
            case '0':
              this.userList[i].orderStatus = '未申请'
              break
            case '1':
              this.userList[i].orderStatus = '审核中'
              break
            case '2':
              this.userList[i].orderStatus = '待打款'
              break
            case '3':
              this.userList[i].orderStatus = '待还款'
              break
            case '4':
              this.userList[i].orderStatus = '容限期中'
              break
            case '5':
              this.userList[i].orderStatus = '逾期'
              break
            case '6':
              this.userList[i].orderStatus = '已还款'
              break
            case '7':
              this.userList[i].orderStatus = '审核拒绝'
              break
            case '8':
              this.userList[i].orderStatus = '坏账'
              break
            case '9':
              this.userList[i].orderStatus = '打款中'
              break
            case '10':
              this.userList[i].orderStatus = '还款中'
              break
          }

        }
        this.pageAll = data.data.data.total;
      })
    },
    refuse(id) {//拒绝
      this.showRefuse = true;
      console.log("lkdsfk",id)
      this.refuseId = id
    },
    refuseSure(){//拒绝
      let params = {}
      params.id = this.refuseId;
      loanApplyReject(params).then((data)=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('拒绝成功');
          this.getList();
          this.showRefuse = false
        }else{
          this.$message(data.data.msg)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/publicSass.scss';
.allPage{
  .searchAll{
    background-color: white;
    padding:20px;
    .selectChoice{
      width: 100px;
      margin-right: 10px;
    }
    .search{
      width: 140px;
      margin-right: 10px;
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
