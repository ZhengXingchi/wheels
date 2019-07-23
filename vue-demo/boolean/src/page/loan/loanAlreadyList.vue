<template>
  <div class="allPage">
    <div class="searchAll">
      <span>放款时间:</span>
      <el-date-picker
        v-model="search.lendingTime"
        type="daterange"
        align="right"
        value-format='yyyy-MM-dd'
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateOption"
        size='mini'
        class="selectTime" style="width:260px;">
      </el-date-picker>
      <span>应还款时间:</span>
      <el-date-picker
        v-model="search.repaymentTime"
        type="daterange"
        align="right"
        value-format='yyyy-MM-dd'
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateOption"
        size='mini'
        class="selectTime" style="width:260px;">
      </el-date-picker>
      <span>实际还款时间:</span>
      <el-date-picker
        v-model="search.trueTime"
        type="daterange"
        align="right"
        value-format='yyyy-MM-dd'
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateOption"
        size='mini'
        class="selectTime" style="width:260px;">
      </el-date-picker>
      <span>续期时间:</span>
      <el-date-picker
        v-model="search.extendTime"
        type="daterange"
        align="right"
        value-format='yyyy-MM-dd'
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateOption"
        size='mini'
        class="selectTime" style="width:260px;">
      </el-date-picker>
      <br/>
      <br/>
      <el-input v-model="search.name" placeholder="请输入借款人姓名" class='search' size="mini" clearable></el-input>
      <el-input v-model="search.phone" placeholder="请输入电话号码" class='search' size="mini" clearable></el-input>
      <el-input v-model="search.orderId" placeholder="请输入订单编号" class='search' size="mini" clearable></el-input>
      <el-input v-model="search.channelName" placeholder="请输入渠道商名称" class='search' style='width:120px;' size="mini" clearable></el-input>
      <el-input v-model="search.extendNum" placeholder="请输续期次数" class='search' size="mini" clearable></el-input>
      <el-select v-model="search.customerType" size='mini' class="selectChoice" placeholder="客户类型">
        <el-option label="新增" value="0"></el-option>
        <el-option label="续贷" value="1"></el-option>
      </el-select>
      <el-select v-model="search.repaymentState" size='mini' class="selectChoice" placeholder="还款状态">
        <el-option label="待还款" value="0"></el-option>
        <el-option label="已还款" value="1"></el-option>
        <el-option label="还款中" value="10"></el-option>
        <!-- <el-option label="逾期待还" value="2"></el-option>
        <el-option label="逾期已还" value="3"></el-option> -->
      </el-select>
      <el-select v-model="search.payType" size='mini' class="selectChoice" placeholder="还款方式">
        <el-option label="银行卡还款" value="1"></el-option>
        <el-option label="支付宝/微信" value="2"></el-option>
        <el-option label="线下收款" value="14"></el-option>
      </el-select>

      <el-button type="primary" icon="el-icon-search" size='mini' @click='getList(0)'>查询</el-button>
      <el-button type="primary" size='mini' @click='overdueList(0)'>逾期待还</el-button>
      <el-button type="primary" size='mini' @click='yuqiList(0)'>逾期已还</el-button>
    </div>
    <div class="list">
      <el-table
                ref='refsList'
                :data="userList"
                highlight-current-row
                style="width: 100%"
                :cell-style='cellStyle'
                height='600'
                @current-change='toChoiceId'
                @selection-change='changeArr'
                border
                >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column
          type='index'
          label="序号"
          width="50"
          align="center"
          >
        </el-table-column>
        <!-- <el-table-column
          prop="id"
          label="订单编号"
          >
        </el-table-column> -->
        <el-table-column
          label="姓名"
          width="100"
          >
          <template slot-scope="scope">
             <div>{{scope.row.userName}}</div>
             (
               <span v-if="scope.row.isXuqi == '不可续期'" style="color:#F56C6C;">{{scope.row.isXuqi}}</span>
               <span v-if="scope.row.isXuqi == '可续期'" style="color:#E6A23C;">{{scope.row.isXuqi}}</span>
             )
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width='115'
          >
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="渠道商"
          width='115'
        >
        </el-table-column>
        <el-table-column
          prop="limitDays"
          label="贷款期限"
          >
        </el-table-column>
        <el-table-column
          prop="borrowMoney"
          label="贷款金额"
          >
        </el-table-column>
        <el-table-column
          prop="realMoney"
          label="打款金额"
          >
        </el-table-column>
        <el-table-column
          prop="needRepayMoney"
          label="应还金额"
          >
        </el-table-column>
        <el-table-column
          prop="realPayMoney"
          label="实还金额"
          >
        </el-table-column>
        <el-table-column
          prop="overdueMoney"
          label="滞纳金"
          >
        </el-table-column>
        <el-table-column
          prop="overdueDays"
          label="逾期天数"
          >
        </el-table-column>
        <el-table-column
          prop="extendNum"
          label="续期次数"
          >
        </el-table-column>
        <!-- <el-table-column
          prop="giveTime"
          label="放款时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="limitPayTime"
          label="应还款时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="extendTime"
          label="最新续期时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="realPayTime"
          label="实际还款时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="还款状态"
          width='100'
          >
        </el-table-column> -->
        <el-table-column
          prop="isOld"
          label="客户类型"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="放款员"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="orderCount"
          label="订单总数"
          width='100'
          >
        </el-table-column>
        <!-- <el-table-column
          prop="payType"
          label="还款方式"
          width='100'
          >
        </el-table-column> -->
        <el-table-column
          label="操作"
          fixed="right"
          width='240'
          >
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toLook(scope.row.userId)'>查看认证信息</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toRenewalRecord(scope.row.id)'>续期记录</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='auditShow(scope.row)'>审核记录</el-button>
            <el-button type="text" size="small" @click='toUserOrderList(scope.row.phone,scope.row.userName)'>历史</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='open(scope.row)'>是否续期</el-button>
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
    <!-- 审核记录 -->
    <el-dialog
      :visible.sync="showAudit"
      width="60%"
      >
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="信审记录" name="first">
          <el-table
            :data="auditList"
            style="width: 100%">
            <el-table-column
              prop="gmtDatetime"
              label="审核日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="reason"
              label="通过/拒绝原因"
              width="180">
            </el-table-column>
            <el-table-column
              prop="adminAuditName"
              label="审核员">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="终审记录" name="second">
          <el-table
            :data="finalList"
            style="width: 100%">
            <el-table-column
              prop="gmtDatetime"
              label="审核日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="content"
              label="审核结果"
              width="180">
            </el-table-column>
            <el-table-column
              prop="adminName"
              label="放款员">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAudit = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 续期记录 -->
    <el-dialog
      title="续期记录"
      :visible.sync="showRenewal"
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
        <el-button @click="showRenewal = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      :title="userOrderTitle+'用户历史订单'"
      :visible.sync="isShowUserOrderList"
      width="50%"
    >
      <el-table :data="userOrderList"
                :cell-style='cellStyle'
      >
        <el-table-column
          prop="id"
          label="订单"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop="giveTime"
          label="放款时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="limitPayTime"
          label="应还款时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="extendTime"
          label="最新续期时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="realPayTime"
          label="实际还款时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="还款状态"
          width='100'
          >
        </el-table-column>
        <el-table-column
          prop="payType"
          label="还款方式"
          width='100'
          >
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button @click="isShowUserOrderList = false">关 闭</el-button>
        </span>
    </el-dialog>
    <el-dialog
         title="提示"
         :visible.sync="dialogVisible"
         width="30%">
         <span>您确定该用户可以续期</span>
         <span slot="footer" class="dialog-footer">
           <el-button @click="dialogVisible = false">取消</el-button>
           <el-button type="primary" @click="isxuQiButton()">确定</el-button>
         </span>
    </el-dialog>
  </div>
</template>
<script>
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
import {selectPassedMoneyLoanOrder,extendList,selectAuditRecords,auditingRecordList,xuQiButton} from '@/API'
import { mapMutations } from 'vuex'
let currentPage=1;
export default {
  data: () => {
    return {
      userList: [],//已放款列表
      userOrderList:[],//历史
      userOrderTitle:'',
      recordList: [],//续期记录类表
      auditList: [],//审核记录列表
      finalList: [],//终审记录列表
      isShowUserOrderList:false,
      pageNo: currentPage,
      pageSize: 10,
      pageAll: 1,
      search:{//收索部分
        lendingTime:'',//放款时间
        repaymentTime:'',//应还款时间
        trueTime: '',//实际还款时间
        extendTime:'',//续期时间
        extendNum:'', //续期次数
        orderId: '',//订单编号
        name:'',//姓名
        phone:'',//手机号
        customerType:'',//客户类型
        repaymentState:'',//还款状态
        channelName:'',//渠道商编号
        payType:'',
      },
      cellStyle:{
        'line-height': '16px;'
      },
      choiceIdArr:[],//多选数组
      showRenewal: false,//续期记录
      showAudit: false,//审核记录
      dialogVisible : false,//是否续期
      accuseitem: {},
      activeName: 'first',//审核记录tab切换
      allMoney: 0,
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
    if(currentPage>1) this.pageNo=currentPage;
    console.log("page--"+this.pageNo);
    this.getList();
    console.log("mount--");
    console.log("page--mount--"+this.pageNo);
  },

  watch:{
    pageNo:function(newVal,o){
      console.log("pageNo:"+newVal,111);
    }
  },
  methods: {
    ...mapMutations({
      setIdenti: 'SETIDENTI'
    }),
    // 单选选择id
    toChoiceId(row) {
      console.log("单选",row)
      if(!row){
        return
      }
      this.$refs.refsList.clearSelection();//清空选着
      this.$refs.refsList.toggleRowSelection(row);//选着单行
    },
    open(row){//显示终审记录
      this.dialogVisible = true
      this.accuseitem = row.id
      // console.log(row);
    },
    isxuQiButton(){
      let params={
        orderId:this.accuseitem,
        isXuqi:'1'
      }
       xuQiButton(params).then(data=>{//续期记录接口
        console.log(data);
        if(data.data.success == false ){
          this.$message({
          message: '设置可续期失败',
          type: 'success'
        });
        }else{
           this.$message({
          message: '设置可续期成功',
          type: 'success'
        });
        this.getList()
        }
        this.dialogVisible = false
        
      })
    },
    // 选择数组，用于分配
    changeArr(val){
      this.choiceIdArr = []
      for(let i = 0;i< val.length; i++){
        this.choiceIdArr.push(val[i].id)
      }
       console.log('多选',this.choiceIdArr)
    },
    sizeChange(size){//每页条数
      this.pageSize = size;
      this.getList(0);
    },
    toRenewalRecord(id) {//续期记录
      this.showRenewal = true
      let params={
        orderId:id
      }
      extendList(params).then(data=>{//续期记录接口
        this.recordList = data.data.data
      })
    },
    auditShow(row){//显示终审记录
      this.showAudit = true;
      this.auditRecords(row)
    },
    auditRecords(row){//查询终审记录
      selectAuditRecords({//查询终审记录接口
        orderId:row.id,//订单id
      }).then((res)=>{
        // console.log("查询终审记录",res)
        this.finalList = res.data.data
      })
      // 信审记录
      auditingRecordList({
        userId:row.userId
      }).then(data=>{
        this.auditList = data.data.data
      })
    },
    toLook(id) {
      this.setIdenti({Id:id, ifLoan:0})
      this.$router.push({name: 'loanIdenti'})
    },
    // 历史
    toUserOrderList(phone,userName){
      this.isShowUserOrderList = true;
      this.userOrderTitle = '#'+userName+'#';
      let params = {
        phone: phone,
      }
      if(this.search.lendingTime){//放款时间
        params.giveTime = this.search.lendingTime[0] + `~` + this.search.lendingTime[1]
      }else{
        params.giveTime = ''
      }
      if(this.search.repaymentTime){//应还款时间
        params.limitPayTime = this.search.repaymentTime[0] + `~` + this.search.repaymentTime[1]
      }else{
        params.limitPayTime = ''
      }
      if(this.search.trueTime){//实际还款时间
        params.payTime = this.search.trueTime[0] + `~` + this.search.trueTime[1]
      }else{
        params.payTime = ''
      }
      if(this.search.extendTime){//实际还款时间
        params.extendTime = this.search.extendTime[0] + `~` + this.search.extendTime[1]
      }else{
        params.extendTime = ''
      }
      selectPassedMoneyLoanOrder(params).then(res=>{
        this.userOrderList = res.data.data.records
        for(let i = 0; i < this.userOrderList.length; i ++){
          if(this.userOrderList[i].orderStatus == 3){
            this.userOrderList[i].orderStatus = '待还款'
          }else if(this.userOrderList[i].orderStatus == 5){
            this.userOrderList[i].orderStatus = '待还款'
          }else if(this.userOrderList[i].orderStatus == 6){
            this.userOrderList[i].orderStatus = '已还款'
          }else if(this.userOrderList[i].orderStatus == -1){
            this.userOrderList[i].orderStatus = '逾期待还'
          }
          else if(this.userOrderList[i].orderStatus == -2){
            this.userOrderList[i].orderStatus = '逾期已还'
          }else if(this.userOrderList[i].orderStatus == -3){
            this.userOrderList[i].orderStatus = '还款中'
          }
          if(this.userOrderList[i].payType == 1){
            this.userOrderList[i].payType = '银行卡还款'
          }else if(this.userOrderList[i].payType == 2){
            this.userOrderList[i].payType = '支付宝/微信'
          }else if(this.userOrderList[i].payType == 14){
            this.userOrderList[i].payType = '线下收款'
          }

          if(this.userList[i].isXuqi == 0){
            this.userList[i].isXuqi = '不可续期'
          }else if(this.userList[i].isXuqi == 1){
            this.userList[i].isXuqi = '可续期'
          }
        }
      })
    },
    getList(isOr) {//已放款列表
      if(isOr == 0){
        currentPage = 1
      }else{
        currentPage = this.pageNo;
        }
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        phone: this.search.phone,
        userName: this.search.name,
        isOld: this.search.customerType,//客户类型
        operateStatus: this.search.repaymentState,//还款状态
        orderId: this.search.orderId,//订单编号
        channelName:this.search.channelName,//渠道商
        extendNum:this.search.extendNum,//续期次数
        extendTime:this.search.extendTime,//续期时间
        payType:this.search.payType,//还款方式
        type : 0
      };
      
      if(this.search.lendingTime){//放款时间
        params.giveTime = this.search.lendingTime[0] + `~` + this.search.lendingTime[1]
      }else{
        params.giveTime = ''
      }
      if(this.search.repaymentTime){//应还款时间
        params.limitPayTime = this.search.repaymentTime[0] + `~` + this.search.repaymentTime[1]
      }else{
        params.limitPayTime = ''
      }
      if(this.search.trueTime){//实际还款时间
        params.payTime = this.search.trueTime[0] + `~` + this.search.trueTime[1]
      }else{
        params.payTime = ''
      }
      if(this.search.extendTime){//实际还款时间
        params.extendTime = this.search.extendTime[0] + `~` + this.search.extendTime[1]
      }else{
        params.extendTime = ''
      }
      let that = this;
      selectPassedMoneyLoanOrder(params).then(res=>{//已放款列表接口
        this.userList = [];
        // console.log("已放款列表",res.data.data.records);
        res = res.data.data;
        this.userList = res.records;
        for(let i = 0; i < this.userList.length; i ++){
          if(this.userList[i].orderStatus == 3){
            this.userList[i].orderStatus = '待还款'
          }else if(this.userList[i].orderStatus == 5){
            this.userList[i].orderStatus = '待还款'
          }else if(this.userList[i].orderStatus == 6){
            this.userList[i].orderStatus = '已还款'
          }else if(this.userList[i].orderStatus == -1){
            this.userList[i].orderStatus = '逾期待还'
          }
          else if(this.userList[i].orderStatus == -2){
            this.userList[i].orderStatus = '逾期已还'
          }else if(this.userList[i].orderStatus == -3){
            this.userList[i].orderStatus = '还款中'
          }

          if(this.userList[i].isOld == 0){
            this.userList[i].isOld = '新增'
          }else if(this.userList[i].isOld == 1){
            this.userList[i].isOld = '续贷'
          }
          if(this.userList[i].payType == 1){
            this.userList[i].payType = '银行卡还款'
          }else if(this.userList[i].payType == 2){
            this.userList[i].payType = '支付宝/微信'
          }else if(this.userList[i].payType == 14){
            this.userList[i].payType = '线下收款'
          }

          if(this.userList[i].isXuqi == 0){
            this.userList[i].isXuqi = '不可续期'
          }else if(this.userList[i].isXuqi == 1){
            this.userList[i].isXuqi = '可续期'
          }
        }
        that.pageNo=currentPage;
        that.pageAll = res.total;
      })
    },
    overdueList(isOr) {//已放款列表
      if(isOr == 0){
        currentPage = 1
      }
      currentPage = this.pageNo;
      this.search.repaymentState = 2
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        // phone: this.search.phone,
        // userName: this.search.name,
        // isOld: this.search.customerType,//客户类型
        operateStatus: this.search.repaymentState,//还款状态
        // orderId: this.search.orderId,//订单编号
        // channelName:this.search.channelName,//渠道商
      };
      let that = this;
      selectPassedMoneyLoanOrder(params).then(res=>{//已放款列表接口
        this.userList = [];
        console.log("已放款列表",isOr);
        res = res.data.data;
        this.userList = res.records;
        for(let i = 0; i < this.userList.length; i ++){
          if(this.userList[i].orderStatus == -1){
            this.userList[i].orderStatus = '逾期待还'
          }
          else if(this.userList[i].orderStatus == -2){
            this.userList[i].orderStatus = '逾期已还'
          }
          if(this.userList[i].isOld == 0){
            this.userList[i].isOld = '新增'
          }else if(this.userList[i].isOld == 1){
            this.userList[i].isOld = '续贷'
          }
          if(this.userList[i].payType == 1){
            this.userList[i].payType = '银行卡还款'
          }else if(this.userList[i].payType == 2){
            this.userList[i].payType = '支付宝/微信'
          }else if(this.userList[i].payType == 14){
            this.userList[i].payType = '线下收款'
          }

          if(this.userList[i].isXuqi == 0){
            this.userList[i].isXuqi = '不可续期'
          }else if(this.userList[i].isXuqi == 1){
            this.userList[i].isXuqi = '可续期'
          }
        }
        that.pageNo=currentPage;
        that.pageAll = res.total;
      })
    },
    yuqiList(isOr) {//已放款列表
      if(isOr == 0){
        currentPage = 1
      }
      currentPage = this.pageNo;
      this.search.repaymentState = 3
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        // phone: this.search.phone,
        // userName: this.search.name,
        // isOld: this.search.customerType,//客户类型
        operateStatus: this.search.repaymentState,//还款状态
        // orderId: this.search.orderId,//订单编号
        // channelName:this.search.channelName,//渠道商
      };
      let that = this;
      selectPassedMoneyLoanOrder(params).then(res=>{//已放款列表接口
        this.userList = [];
        console.log("已放款列表",isOr);
        res = res.data.data;
        this.userList = res.records;
        for(let i = 0; i < this.userList.length; i ++){
          if(this.userList[i].orderStatus == -1){
            this.userList[i].orderStatus = '逾期待还'
          }
          else if(this.userList[i].orderStatus == -2){
            this.userList[i].orderStatus = '逾期已还'
          }
          if(this.userList[i].isOld == 0){
            this.userList[i].isOld = '新增'
          }else if(this.userList[i].isOld == 1){
            this.userList[i].isOld = '续贷'
          }
          if(this.userList[i].payType == 1){
            this.userList[i].payType = '银行卡还款'
          }else if(this.userList[i].payType == 2){
            this.userList[i].payType = '支付宝/微信'
          }else if(this.userList[i].payType == 14){
            this.userList[i].payType = '线下收款'
          }

          if(this.userList[i].isXuqi == 0){
            this.userList[i].isXuqi = '不可续期'
          }else if(this.userList[i].isXuqi == 1){
            this.userList[i].isXuqi = '可续期'
          }
        }
        that.pageNo=currentPage;
        that.pageAll = res.total;
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
    .selectTime{
      width: 180px;
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
