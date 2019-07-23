<template>
  <div class="allPage" v-if="refresh">
    <div class="searchAll">
      <span>订单时间:</span>
      <el-date-picker
        v-model="search.borrowTime"
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
      &nbsp; &nbsp;
      <el-input v-model="search.name" placeholder="请输入借款人姓名" class='search' size="mini" clearable></el-input>
      <el-input v-model="search.phone" placeholder="请输入电话号码" class='search' size="mini" clearable></el-input>
      <el-input v-model="search.channelName" placeholder="请输入渠道商名称" class='search' style='width:120px;' size="mini" clearable></el-input>
      <el-select v-model="search.customerType" size='mini' placeholder="客户类型">
        <el-option label="新增" value="0"></el-option>
        <el-option label="续贷" value="1"></el-option>
      </el-select>
      <el-select v-model="search.dispatchState" size='mini'  placeholder="分配状态">
        <el-option label="未分配" value="0"></el-option>
        <el-option label="已分配" value="1"></el-option>
      </el-select>
      <el-select v-model="search.LoanState" size='mini' placeholder="放款状态">
        <el-option label="待放款" value="0"></el-option>
        <el-option label="已拒绝" value="2"></el-option>
        <el-option label="放款中" value="9"></el-option>
      </el-select>
      <el-button type="primary" style="margin-top:10px;" icon="el-icon-search" size='mini' @click='getList(0)' plain>查询</el-button>
      <el-button type="primary" size='mini' @click='getDispatch()' plain>分 配</el-button>
      <el-button type="primary" size='mini' @click='getTransfer()' plain>转 派</el-button>

    </div>
    <div class="list">
      <el-table
        border
        ref='refsList'
        :data="userList"
        highlight-current-row
        @current-change='toChoiceId'
        style="width: 100%"
        :cell-style='cellStyle'
        height='600'
        @selection-change='changeArr'
        :row-class-name="tableRowClassName"
        >
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="50"
          align="center"
          fixed
          >
        </el-table-column>
        <el-table-column
          prop="id"
          label="订单编号"
          fixed
          >
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          >
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
          align="center"
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
          prop="gmtDatetime"
          label="订单时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="orderStatus"
          label="放款状态"
          width='80'
          >
          <template slot-scope="scope">
            <span v-if="scope.row.orderStatus=='已拒绝'" style="margin-left: 10px;color:red">{{ scope.row.orderStatus }}</span>
            <span v-if="scope.row.orderStatus=='待放款'" style="margin-left: 10px;color:green">{{ scope.row.orderStatus }}</span>
            <span v-if="scope.row.orderStatus=='放款中'" style="margin-left: 10px;color:Orange">{{ scope.row.orderStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dispatchState"
          label="分配状态"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="isOld"
          label="客户类型"
          >
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="放款员"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="370"
          fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toLook(scope.row.userId)'>认证信息</el-button>
            <el-button type="text" size="small"  @click='toUserOrderList(scope.row.userId,scope.row.userName)' v-if="scope.row.isOld=='续贷'">历史</el-button>
            <el-button type="text" size="small"  @click='toGiveMoney(scope.row.userId,scope.row.userName,scope.row.id)' v-if="scope.row.orderStatus=='待放款'">提额</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='refuse(scope.row.id)' v-if="scope.row.orderStatus=='待放款'">拒绝</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='addAudits(scope.row.id)' v-if="scope.row.orderStatus=='待放款'">添记录</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='auditShow(scope.row)' v-if="scope.row.orderStatus=='待放款'">审记</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toYibao(scope.row.id,scope.row.userId)' v-if='scope.row.orderStatus !== "已拒绝"'>打款</el-button>
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
    <!-- 分配操作 -->
    <el-dialog
      title="分配"
      :visible.sync="showDispatch"
      width="60%"
      >
      <div>
        <span>放款员</span>
        <el-select v-model="whichMan" placeholder="请选择" size='mini' class="selectChoice" @change="selectWhichMan">
          <el-option v-for='(item, index) in manList' :label='item.userName' :value='item.id' :key='index'></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDispatch = false">取 消</el-button>
        <el-button type="primary" @click="dispatchSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 转派 -->
    <el-dialog
      title="转派"
      :visible.sync="showTransfer"
      width="60%"
      >
      <div>
        <span>放款员</span>
        <el-select v-model="whichMan" placeholder="请选择" size='mini' class="selectChoice" @change="selectWhichMan">
          <el-option v-for='(item, index) in manList' :label='item.userName' :value='item.id' :key='index'></el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showTransfer = false">取 消</el-button>
        <el-button type="primary" @click="transferSure">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 审核记录 -->
    <el-dialog
      :visible.sync="list.showAudit"
      width="60%"
      >
      <el-tabs v-model="list.activeName" type="card" @tab-click="handleClick">
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
        <el-button @click="list.showAudit = false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 易宝打款 -->
    <el-dialog
      title="打款"
      :visible.sync="showYibao"
      width="450px"
      >
      <span>选择打款通道：</span>
      <el-select v-model="payChannel" size='mini' class="selectChoice" placeholder='选择打款通道'>
        <el-option :label="item.label" :value="item.value" v-for='(item, index) in payChannels' :key='index'></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showYibao = false">取 消</el-button>
        <el-button type="primary" @click="yibaoSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 打款拒绝 -->
    <el-dialog
      title="打款拒绝"
      :visible.sync="list.showRefuse"
      width="60%"
      >
      <div>
        你确定拒绝打款吗？
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="list.showRefuse = false">取 消</el-button>
        <el-button type="primary" @click="refuseSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加审核记录 -->
    <el-dialog
      title="添加审核记录"
      :visible.sync="list.showAddAudits"
      width="60%"
      >
      <div>
        <span>备注:</span>
        <el-input
          type="textarea"
          :maxlength="100"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="备注内容100字以内"
          v-model="list.textarea">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="list.showAddAudits = false">取 消</el-button>
        <el-button type="primary" @click="addAuditsSure">确 定</el-button>
      </span>
    </el-dialog>
    <!--start 提额-->
    <el-dialog
      :title="title"
      :visible.sync="isShowGiveMoney"
      width="40%"
    >
      <span>选择额度：</span>
      <el-select v-model="giveMoney.money" size='mini' class="selectChoice" placeholder='选择额度'>
        <el-option :label="item.label" :value="item.value" v-for='(item, index) in giveMoney.moneyList' :key='index'></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="subGiveMoney()">提交</el-button>
          <el-button @click="isShowGiveMoney = false">取 消</el-button>
        </span>
    </el-dialog>
    <!--end 提额-->
    <el-dialog
      :title="userOrderTitle+'用户历史订单'"
      :visible.sync="isShowUserOrderList"
      width="60%"
    >
      <el-table :data="userOrderList"
                :cell-style='cellStyle'
                border
                show-summary
      >
        <el-table-column
          prop="orderId"
          label="订单"
          width="70"
        >
        </el-table-column>
        <el-table-column
          prop='borrowMoney'
          label="借款金额"
        >
        </el-table-column>
        <el-table-column
          prop='needPayMoney'
          label="实还金额"
          width="100">
        </el-table-column>
        <el-table-column
          prop='giveTime'
          label="借款时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop='limitPayTime'
          label="应还时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop='realPayTime'
          label="实还时间"
          width="180">
        </el-table-column>
        <el-table-column
          label="状态"
          width="80">
          <template slot-scope="scope">
            {{scope.row.orderStatus|orderStatusToText}}
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button @click="isShowUserOrderList = false">关 闭</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
import moment from 'moment'
import {loanMachineList, loanApplyReject, loanToYibao,selectGiveMoneyMan,allotToPassMoneyList,selectAuditRecords,transferTopassMoneyList, passMoneyAuditRecords,userHistoryOrder, auditingRecordList,giveUserMoneyById} from '@/API'
import { mapMutations,mapGetters } from 'vuex'
let currentPage=1;
export default {
  data: () => {
    return {
      refresh:true,
      userList: [],
      recordList: [],
      auditList: [],//审核记录列表
      finalList: [],//终审记录列表
      pageNo: currentPage,
      pageSize: 10,
      pageAll: 1,
      isShowGiveMoney:false,
      search:{//搜索部分
        borrowTime:'',//申请借款时间
        phone:'',//手机号
        name:'',//名字
        customerType:'',//客户类型
        LoanState: '',//放款状态
        dispatchState:'',//分配状态
        channelName:'',//渠道商
      },
      isShowUserOrderList:false,
      userOrderTitle:'',
      userOrderList:[],
      payChannel:"",
      payChannels:[
        {label:"富有",value:"fy"},
        {label:"合利宝",value:"hlb"},
      ],
      giveMoney:{
        userId:'',
        userName:'',
        money:'',
        moneyList:[
          {label:1500,value:1500},
          {label:2000,value:2000},
          {label:2500,value:2500},
          {label:3000,value:3000},
          {label:3500,value:3500},
          {label:4000,value:4000},
          {label:4500,value:4500},
          {label:5000,value:5000},
        ],
      },
      list:{//列表展示
        showAudit: false,//审核记录
        activeName:'first',//审核记录tab切换
        showRefuse: false,//打款拒绝
        refuseId:'',//打款拒绝Id
        showAddAudits:false,//添加终审记录
        textarea: '',
      },
      dateTime: '',
      whichMan: '',//放款员
      manList:[],//放款员数组
      choiceIdArr:[],//存放数据
      selectReturn: '',
      selectPayto: '',
      cellStyle:{
        'line-height': '16px;'
      },
      showYibao:false,//易宝打款
      yibaoId:'',//易宝打款Id
      showDispatch: false,//分配
      showTransfer: false,//转派
      allMoney: 0,
      allPeople: 0,
      title: '',
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
    this.getList();
    this.collectorList();//放款员列表
  },
  filters:{
    orderStatusToText:function(orderStatus){
      switch(parseInt(orderStatus)){
        case 2:
          return "未放款";
        case 3:
          return  "已放款";
        case 5:
          return "已放款";
        case 6:
          return "已结清";
        case 7:
          return "已拒绝";
        case 9:
          return "放款中";
      }
    }
  },
  methods: {
    ...mapMutations({
      setIdenti: 'SETIDENTI',
      // setCallIDId: 'SETCALLIDID'//订单id
    }),
    tableRowClassName(row,rowIndex){
      if(row.row.isOverdue != 0){
        return 'success-row';
      }
    },
    //用户历史订单
    toUserOrderList(userId,userName){
      this.isShowUserOrderList = true;
      this.userOrderTitle = '#'+userId+'#'+userName+'#';
      let params = {
        userId: userId,
        pageSize:10,
        pageNo:1
      }
      userHistoryOrder(params).then(data=>{
        this.userOrderList = data.data.data.list
      })
    },
    //提额
    toGiveMoney(userId,userName,orderId){
      this.isShowGiveMoney=true;
      this.giveMoney.userId=userId;
      this.giveMoney.userName=userName;
      this.giveMoney.orderId = orderId;
    },
    subGiveMoney(){
      let params = {
        userId: this.giveMoney.userId,
        money: this.giveMoney.money,
        orderId:this.giveMoney.orderId
      }
      if(this.giveMoney.money==''){
        this.$message('请选择提额金额');
        return
      }
      giveUserMoneyById(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('提额成功');
          this.giveMoney.money='';
          this.giveMoney.userId='';
          this.getList()
        }else{
          this.$message.error(data.data.msg);
        }
        this.isShowGiveMoney = false
      })
    },
    // 单选选择id
    toChoiceId(row) {
      console.log("单选",row)
      if(!row){
        return
      }
      this.$refs.refsList.clearSelection();//清空选着
      this.$refs.refsList.toggleRowSelection(row);//选着单行
    },
    // 选择数组，用于分配
    changeArr(val){// 多选复选框
      this.choiceIdArr = [];
      for(let i = 0;i<val.length;i++){//选着订单userId存储到数组中
        this.choiceIdArr.push(val[i].id);
      }
      console.log('多选',this.choiceIdArr)
    },
    getDispatch(){//点分配弹窗显示
      if(this.choiceIdArr.length>="1"){
        this.showDispatch = true;
      }else{
        this.$message.warning("请选择具体订单!");
      }
    },
    dispatchSure(){//确认分配
      if(this.whichMan == ''){
        this.$message('请选择放款员');
        return
      }
      let params = {
        adminId:this.whichMan,//放款员id
        ids:this.choiceIdArr//分配订单数组
      }
      allotToPassMoneyList(params).then(res=>{
        if(res.data.code === "SUCCESS"){
          this.$message.success("订单分配成功");
          this.whichMan = ''
          this.getList()
        }else{
          this.$message(res.data.msg)
        }
      })
      this.showDispatch = false;
    },
    getTransfer(){//转派弹窗显示
      if(this.choiceIdArr.length>="1"){
        this.showTransfer = true;
      }else{
        this.$message.warning("请选择具体订单!");
      }
    },
    transferSure(){//确定转派弹窗显示
      if(this.whichMan == ''){
        this.$message('请选择放款员');
        return
      }
      let params = {
        adminId:this.whichMan,//放款员id
        ids:this.choiceIdArr//分配订单数组
      }
      transferTopassMoneyList(params).then(res=>{
        if(res.data.code === "SUCCESS"){
          this.$message.success("订单转派成功");
          this.whichMan = ''
          this.getList()
        }else{
          this.$message(res.data.msg)
        }
      })
      this.showTransfer = false;
    },
    collectorList(){//放款员列表
      selectGiveMoneyMan({//放款员列表

      }).then(res=>{
        console.log("放款员列表",res)
        this.manList = res.data.data
      })
    },
    selectWhichMan(){//选择放款员
      console.log("放款员",this.whichMan)
    },
    handleClick(tab, event) {//信审/终审tab
      console.log(tab, event);
    },
    auditShow(row){//显示终审记录
      // console.log(id);
      this.list.showAudit = true;
      this.auditRecords(row)
    },
    auditRecords(row){//查询终审记录
      selectAuditRecords({//查询终审记录接口
        orderId:row.id,//订单id
      }).then((res)=>{
        // console.log("查询终审记录",res)
        this.finalList = res.data.data
      })
      auditingRecordList({
        userId:row.userId
      }).then(data=>{
        this.auditList = data.data.data
      })
    },
    toYibao(id,userId) {//打款
      this.showYibao = true;
      this.yibaoId = id;
      this.payToUserId = userId;
    },
    yibaoSure(id){//确定打款
      let params = {};
      if (this.payChannel==""){
        this.$message('打款渠道未选择');
        return void(0);
      }
      params.type = this.payChannel
      params.id = this.yibaoId;
      loanToYibao(params).then((data)=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('发起打款成功');
          this.getList();
        }else{
          this.$message(data.data.msg)
        }
      })
      this.showYibao = false;
     //打款前检查
    //  let param = {
    //     userId: this.payToUserId,
    //     pageSize:10,
    //     pageNo:1
    //   }
    //  userHistoryOrder(param).then(data=>{
    //    let oldOrderList = data.data.data.list;
    //    if(oldOrderList.length==1){
    //      let lastOrder = oldOrderList.pop();
    //      if(lastOrder.giveTime!=null){
    //         console.log(lastOrder.giveTime);
    //         if(!moment(lastOrder.giveTime).isBefore(moment().subtract(1,'days'))){
    //           this.$message.error('打款失败，最后一次打款时间距离现在小于一天');
    //           this.showYibao = false;
    //           return void(0);
    //         }else{
    //           console.log('进入打款');
                
    //         }
    //        lastOrder = oldOrderList.pop();
    //      }
        
    //    }
    //   })
      
     
      

    },
    sizeChange(size){//每页条数
      this.pageSize = size;
      this.getList();
    },
    toLook(id) {//查看认证信息
      this.setIdenti({Id:id, ifLoan:0})
      this.$router.push({name: 'loanIdenti'})
    },
    getList(isOr) {//待放款列表
      if(isOr == 0){
        this.pageNo = 1;
      }
      currentPage = this.pageNo;
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        phone: this.search.phone,
        userName: this.search.name,
        isOld: this.search.customerType,//客户类型
        operateStatus: this.search.LoanState==''?0:this.search.LoanState,//放款状态 默认待审核
        allocateStatus: this.search.dispatchState,//分配状态
        channelName:this.search.channelName,//渠道商
      };
      if(this.search.borrowTime){//申请借款时间
        params.gmtDatetime = this.search.borrowTime[0] + `~` + this.search.borrowTime[1]
      }else{
        params.gmtDatetime = ''
      }
      loanMachineList(params).then(res=>{//待放款列表接口
        console.log("待放款列表",res.data.data);
        res = res.data.data
        this.userList = [];

        this.userList = res.records;
        res.records.forEach((element,index) => {
          res.records[index].index = index+1;
          if(!element.giveMoneyMan){//分配状态
            res.records[index].dispatchState = "未分配"
          }else{
            res.records[index].dispatchState = "已分配"
          }
          if(element.orderStatus == 9){//分配状态
            res.records[index].orderStatus = "放款中"
          }else if(element.orderStatus == 7){
            res.records[index].orderStatus = "已拒绝"
          }
          else if(element.orderStatus == 2){
            res.records[index].orderStatus = "待放款"
          }
          switch(element.isOld){//客户类型
            case 0:
              res.records[index].isOld = "新增"
            break;
            case 1:
              res.records[index].isOld = "续贷"
            break;
            default:
              res.records[index].isOld = ""
          }
        });
        this.pageAll = res.total;
      })
    },
    refuse(id) {//拒绝
      this.list.showRefuse = true;
      console.log("拒绝",id)
      this.list.refuseId = id
    },
    refuseSure(){//确定拒绝
      let params = {}
      params.id = this.list.refuseId;
      loanApplyReject(params).then((data)=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('拒绝成功');
          this.getList()
        }else{
          this.$message(data.data.msg)
        }
      })
      this.list.showRefuse = false;
    },
    addAudits(id){//添加审核记录
      this.list.showAddAudits = true;
      console.log("添加审核记录",id)
      this.list.addAuditId = id
    },
    addAuditsSure(){//确定添加审核记录
      if(this.list.textarea.trim()){
        passMoneyAuditRecords({//添加审核记录接口
          content:this.list.textarea,//审核内容
          orderId:this.list.addAuditId,//订单id
        }).then(res=>{
          if(res.data.code == 'SUCCESS'){
            this.$message.success('添加成功')
            this.list.textarea= "";//审核内容
          }else{
            this.$message(res.data.msg)
          }
          // console.log("添加审核记录",res)
        })
        this.list.showAddAudits = false;
      }else{
        console.log(1);
        this.$message.warning('请填写备注内容!')
      }
    },
  }
}
</script>
<style>
  .el-table .success-row {
    background: #FFECEC;
  }
</style>
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
