<template>
  <div class="allPage">
   <el-tabs v-model="activeName" type="border-card"  @tab-click="handleClick">
    <el-tab-pane  name="aduitPass">
      <span slot="label"><i class="el-icon-check"></i> 风控通过</span>
      <!--风控通过-->
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
            <el-input v-model="channelName" placeholder="请输入渠道商名称" class='search' style='width:120px;' size="mini" clearable></el-input>
            <el-select v-model="selectStatus" size='mini' class="selectChoice" placeholder="信审状态">
              <el-option label="未审核" value="0"></el-option>
              <el-option label="审核通过" value="1"></el-option>
              <el-option label="暂时拒绝" value="2"></el-option>
              <el-option label="不通过" value="3"></el-option>
              <el-option label="二次审核" value="4"></el-option>
            </el-select>

          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-date-picker
              v-model="riskTime"
              type="daterange"
              align="right"
              value-format='yyyy-MM-dd'
              unlink-panels
              range-separator="至"
              start-placeholder="机审开始日期"
              end-placeholder="机审结束日期"
              :picker-options="dateOption"
              size='mini'
              style='width:350px;'
            >
            </el-date-picker>
            <el-select v-model="selectAuditId" size='mini' class="selectChoice" placeholder="分配状态">
              <el-option label="未分配" value="0"></el-option>
              <el-option label="已分配" value="1"></el-option>
            </el-select>
            <el-select v-model="selectPeople" size='mini' class="selectChoice" placeholder="信审员">
              <el-option :label="item.userName" :value="item.id" v-for='(item, index) in peopleList' :key='index'></el-option>
            </el-select>
            <el-select v-model="selectAdvice" size='mini' class="selectChoice" placeholder="决策建议">
              <el-option label="天启决策" value="1"></el-option>
              <!-- <el-option label="云息决策" value="2"></el-option>
              <el-option label="智慧决策" value="3"></el-option> -->
            </el-select>
            <el-button type="primary" icon="el-icon-search" size="mini" @click='getList(0)' >查询</el-button>

          </el-col>
        </el-row>
        <el-row>
          <div class="" style='margin-top:5px;'>
            <!-- <el-switch
              v-model="referOneMinute"
              active-text="定时刷新开启"
              inactive-text="定时刷新关闭">
            </el-switch> -->
            <el-button type="success"  size='mini' @click='openAlot' class="publicMidBtn">分配</el-button>
            <el-button type="warning"  size='mini' @click='openChange' icon="el-icon-refresh">转派</el-button>
          </div>
        </el-row>
      </div>
      <div class="list">
        <el-table :data="userList"
                  style="width: 100%"
                  :cell-style='cellStyle'
                  ref="choiceList"
                  @selection-change="choiceListChange"
                  border
                  v-loading="loading"
                  :row-class-name="tableRowClassName"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户ID"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click='toUserTimeLine(scope.row.userId,scope.row.userName)'>{{scope.row.userName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="channelName"
            label="渠道商"
            width="140">
          </el-table-column>
          <el-table-column
            prop="isOld"
            label="客户类型"
            width="100">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.isOld=='0'" type="success" size="small">新增</el-tag>
              <el-tag v-if="scope.row.isOld=='1'" type="warning" size="small">续贷</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="gmtDatetime"
            label="注册时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="uptDatetime"
            label="机审时间"
            width='160'
          >
          </el-table-column>
          <el-table-column
            prop="money"
            label="借款额度"
            width='120'
          >
          </el-table-column>
          <el-table-column
            prop="adminAuditName"
            label="信审员"
            width='120'
          >
          </el-table-column>
          <el-table-column
            prop="adminAuditId"
            label="分配状态"
            width='120'
          >
          </el-table-column>
          <el-table-column
            prop="authStatus"
            label="审核状态"
            width='120'
          >
            <template slot-scope="scope">
              <span v-if="scope.row.authStatus=='未审核'" style="margin-left: 10px;color:#909399">{{ scope.row.authStatus }}</span>
              <span v-if="scope.row.authStatus=='审核通过'" style="margin-left: 10px;color:#67C23A">{{ scope.row.authStatus }}</span>
              <span v-if="scope.row.authStatus=='暂时拒绝'" style="margin-left: 10px;color:#E6A23C">{{ scope.row.authStatus }}</span>
              <span v-if="scope.row.authStatus=='二次审核'" style="margin-left: 10px;color:#F56C6C">{{ scope.row.authStatus }}</span>
              <span v-if="scope.row.authStatus=='不通过'" style="margin-left: 10px;color:#F56C6C">{{ scope.row.authStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="advice"
            label="决策建议"
            width='100'
          >
          </el-table-column>
          <el-table-column
            label="操作"
            fixed="right"
            width="220">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click='toUserOrderList(scope.row.userId,scope.row.userName)' v-if="scope.row.isOld=='1'">历史</el-button>
              <el-button v-if="scope.row.adminAuditName==null || scope.row.adminAuditName==''" type="text" class="btn-tomywork" size="small"  @click='toMyWork(userList,scope.$index)' >领件</el-button>
              <el-button type="text" size="small"  @click='toDetail(scope.row.userId,scope.row.advice)'>查看</el-button>
              <el-button type="text" size="small"  @click='openAuditRecord(scope.row.userId)'>审记</el-button>
              <el-button type="text" size="small"  @click='toLiuRecord(scope.row.userId)'>流记</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block choice">
          <el-pagination
            @current-change="getList"
            background
            :current-page.sync="pageNo"
            @size-change="sizeChange"
            :page-size="10"
            :page-sizes="[10, 20, 30, 50, 100]"
            layout="sizes, total, prev, pager, next, jumper"
            :total="pageAll">
          </el-pagination>
        </div>
      </div>

      <!--end 风控通过-->
    </el-tab-pane>
     <el-tab-pane  name="aduitNeedCheck">
      <span slot="label"><i class="el-icon-edit-outline"></i> 需人工审核</span>
       <!--需要人工审核-->
       <div class="searchAll">

         <span>姓名：</span>
         <el-input v-model="searchNameTwo" placeholder="借款人姓名" class='search' size="mini"></el-input>
         <span>手机号：</span>
         <el-input v-model="searchPhoneTwo" placeholder="输入手机号码" class='search'  size="mini"></el-input>
         <span>渠道商:</span>
         <el-input v-model="channelName" placeholder="请输入渠道商名称" class='search' style='width:120px;' size="mini" clearable></el-input>
        <el-select v-model="selectStatus" size='mini' class="selectChoice" placeholder="信审状态">
          <el-option label="未审核" value="0"></el-option>
          <el-option label="审核通过" value="1"></el-option>
          <el-option label="暂时拒绝" value="2"></el-option>
          <el-option label="不通过" value="3"></el-option>
          <el-option label="二次审核" value="4"></el-option>
        </el-select>
         <el-button type="success"  size='mini' @click='openAlot' class="publicMidBtn">分配</el-button>
         <el-button type="warning"  size='mini' @click='openChange' icon="el-icon-refresh">转派</el-button>
         <el-button type=""  size='mini' @click='getList2(0)' class="publicMidBtn">查询</el-button>
       </div>
       <div class="list">
         <el-table :data="userList2"
                   style="width: 100%"
                   :cell-style='cellStyle'
                   border
                   v-loading="loading2"
                   ref="choiceList"
                  @selection-change="choiceListChange"
         >
           <el-table-column
             type="selection"
             width="55">
           </el-table-column>
           <el-table-column
             prop="userId"
             label="用户ID"
             width="120"
           >
           </el-table-column>
          <el-table-column
            label="姓名"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click='toUserTimeLine(scope.row.userId,scope.row.userName)'>{{scope.row.userName}}</el-button>
            </template>
          </el-table-column>
           <el-table-column
             prop="phone"
             label="手机号码"
             width="140">
           </el-table-column>
           <el-table-column
             prop="channelName"
             label="渠道商"
             width="140">
           </el-table-column>
           <el-table-column
             prop="isOld"
             label="客户类型"
             width="100">
           </el-table-column>
           <el-table-column
             prop="gmtDatetime"
             label="注册时间"
             width="160">
           </el-table-column>
           <el-table-column
             prop="uptDatetime"
             label="机审时间"
             width='160'
           >
           </el-table-column>
          <el-table-column
            prop="adminAuditName"
            label="信审员"
            width='120'
          >
          </el-table-column>
          <el-table-column
            prop="adminAuditId"
            label="分配状态"
            width='120'
          >
          </el-table-column>
           <el-table-column
             prop="money"
             label="借款额度"
             width='120'
           >
           </el-table-column>
           <el-table-column
             prop="authStatus"
             label="审核状态"
             width='120'
           >
           </el-table-column>
           <el-table-column
             prop="advice"
             label="决策建议"
             width='100'
           >
           </el-table-column>


           <el-table-column
             label="操作"
             fixed="right"
             width="220">
             <template slot-scope="scope">
               <el-button type="text" size="small"  @click='toDetail(scope.row.userId,scope.row.advice)'>查看信息</el-button>
              <el-button v-if="scope.row.adminAuditName==null || scope.row.adminAuditName==''" type="text" class="btn-tomywork" size="small"  @click='toMyWork(userList2,scope.$index)' >领件</el-button>
               <el-button type="text" size="small"  @click='openRefuseRecord(scope.row.userId)'>风控详情</el-button>
             </template>
           </el-table-column>
         </el-table>
         <div class="block choice">
           <el-pagination
             @current-change="getList2"
             background
             :current-page.sync="tabTwo.pageNo"
             :page-size="10"
             :page-sizes="[10, 20, 30, 50, 100]"
             layout="sizes, total, prev, pager, next, jumper"
             :total="tabTwo.pageAll">
           </el-pagination>
         </div>
         <el-dialog
           title="风控详情"
           :visible.sync="refuseRecord"
           width="60%"
         >
           <p>风控状态: {{ refuseMsg.desc }}</p>
           <p>风控结果: {{ refuseMsg.msg }}</p>
           <p>风控规则: {{ refuseMsg.ruleName }}</p>
           <span slot="footer" class="dialog-footer">
          <el-button @click="refuseRecord = false">关 闭</el-button>
        </span>
         </el-dialog>
       </div>
       <!--end 需要人工审核-->
     </el-tab-pane>
    <el-tab-pane label="风控拒绝" name="aduitRefuse">
      <span slot="label"><i class="el-icon-close"></i> 风控拒绝</span>
      <!--风控拒绝-->
      <div class="searchAll">

        <span>姓名：</span>
        <el-input v-model="searchNameTwo" placeholder="借款人姓名" class='search' size="mini"></el-input>
        <span>手机号：</span>
        <el-input v-model="searchPhoneTwo" placeholder="输入手机号码" class='search'  size="mini"></el-input>
        <span>渠道商:</span>
        <el-input v-model="channelName" placeholder="请输入渠道商名称" class='search' style='width:120px;' size="mini" clearable></el-input>
        <el-button type=""  size='mini' @click='getList3(0)' class="publicMidBtn">查询</el-button>
      </div>
      <div class="list">
        <el-table :data="userList3"
                  style="width: 100%"
                  :cell-style='cellStyle'
                  ref="choiceList"
                  border
                  v-loading="loading3"
        >
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="userId"
            label="用户ID"
            width="120"
          >
          </el-table-column>
          <el-table-column
            label="姓名"
            width="120">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click='toUserTimeLine(scope.row.userId,scope.row.userName)'>{{scope.row.userName}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号码"
            width="140">
          </el-table-column>
          <el-table-column
            prop="channelName"
            label="渠道商"
            width="140">
          </el-table-column>
          <el-table-column
            prop="isOld"
            label="客户类型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="gmtDatetime"
            label="注册时间"
            width="160">
          </el-table-column>
          <el-table-column
            prop="uptDatetime"
            label="机审时间"
            width='160'
          >
          </el-table-column>
          <el-table-column
            prop="adminAuditName"
            label="信审员"
            width='120'
          >
          </el-table-column>
          <el-table-column
            prop="adminAuditId"
            label="分配状态"
            width='120'
          >
          </el-table-column>
          <el-table-column
            prop="money"
            label="借款额度"
            width='120'
          >
          </el-table-column>
          <el-table-column
            prop="authStatus"
            label="审核状态"
            width='120'
          >
          </el-table-column>
          <el-table-column
            prop="advice"
            label="决策建议"
            width='100'
          >
          </el-table-column>


          <el-table-column
            label="操作"
            fixed="right"
            width="220">
            <template slot-scope="scope">
              <el-button type="text" size="small"  @click='toDetail(scope.row.userId,scope.row.advice)'>查看信息</el-button>
              <el-button v-if="scope.row.adminAuditName==null || scope.row.adminAuditName==''" type="text" class="btn-tomywork" size="small"  @click='toMyWork(userList3,scope.$index)' >领件</el-button>
              <el-button type="text" size="small"  @click='openRefuseRecord(scope.row.userId)'>风控详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block choice">
          <el-pagination
            @current-change="getList3"
            background
            :current-page.sync="tabThree.pageNo"
            :page-size="10"
            :page-sizes="[10, 20, 30, 50, 100]"
            layout="sizes, total, prev, pager, next, jumper"
            :total="tabThree.pageAll">
          </el-pagination>
        </div>
        <el-dialog
          title="风控详情"
          :visible.sync="refuseRecord"
          width="60%"
        >
          <p>风控状态: {{ refuseMsg.desc }}</p>
          <p>风控结果: {{ refuseMsg.msg }}</p>
          <p>风控规则: {{ refuseMsg.ruleName }}</p>
          <span slot="footer" class="dialog-footer">
          <el-button @click="refuseRecord = false">关 闭</el-button>
        </span>
        </el-dialog>
      </div>
      <!--end 风控拒绝-->
    </el-tab-pane>
  </el-tabs>
    <el-dialog
      :title="title"
      :visible.sync="alotShow"
      width="40%"
    >
      <span>请选择信审人员：</span>
      <el-select v-model="choiceAdminId" size='mini' class="selectChoice" placeholder='请选择'>
        <el-option :label="item.userName" :value="item.id" v-for='(item, index) in peopleList' :key='index'></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
          <el-button @click="toAlot">提交</el-button>
          <el-button @click="alotShow = false">取 消</el-button>
        </span>
    </el-dialog>

    <el-dialog
    title="审核记录"
    :visible.sync="auditiRecord"
    width="60%"
  >
    <el-table :data="auditiRecordList"
              :cell-style='cellStyle'
    >
      <el-table-column
        prop="gmtDatetime"
        label="审核时间"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop='reason'
        label="通过/拒绝原因"
      >
      </el-table-column>
      <el-table-column
        prop='adminAuditName'
        label="审核员"
        width="120">
      </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
          <el-button @click="auditiRecord = false">关 闭</el-button>
        </span>
  </el-dialog>
    <el-dialog
      :title="userOrderTitle+'用户历史订单'"
      :visible.sync="isShowUserOrderList"
      width="60%"
    >
      <el-table :data="userOrderList"
                :cell-style='cellStyle'
                border
      >
        <el-table-column
          prop="orderId"
          label="订单编号"
          width="160"
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
          width="120">
        </el-table-column>
        <el-table-column
          prop='giveTime'
          label="借款时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop='limitPayTime'
          label="应还时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop='realPayTime'
          label="实还时间"
          width="120">
        </el-table-column>
        <el-table-column
          label="订单状态"
          width="120">
          <template slot-scope="scope">
            {{scope.row.orderStatus|orderStatusToText}}
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button @click="isShowUserOrderList = false">关 闭</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="用户时序图"
      :visible.sync="showTime"
      width="600px"
    >
    
    <risk-time-line 
    :title="currentUserName"
    :userTimeData="userTimeLines"
    />
      
    </el-dialog>
    <el-dialog
      title="审核记录"
      :visible.sync="showRiskLog"
      width="600px"
    >
    
      
    </el-dialog>
  </div>
 
</template>
<script>
import {auditingUserList,toMyAuditing,auditingNoPassUserList,getUserTimeLine, auditingRefuseRecord,auditingRiskRecord,auditingAlot, auditingSelectPeople, auditingRecordList, auditingChange,userHistoryOrder ,giveUserMoneyById} from "@/API"
import { mapMutations,mapGetters} from 'vuex'
import Notify from '@wcjiang/notify';
import riskTimeLine from "./components/user/riskTimeLine";
import Icon from "@/components/icon";
let currentTab='aduitPass';
let currentPage1=1;
let currentPage2=1;
let currentPage3=1;
let lastUserId=0;
const notify = new Notify({
  // Optional playback sound
  audio:{
    // You can use arrays to pass sound files in multiple formats.
    // The following is also work.
     file: './static/msg.mp4'
  }
});
export default {
  components: {
    riskTimeLine,
    Icon,
  },
  data: () => ({
    pageNo: currentPage1,
    pageSize: 10,
    pageAll: 1,
    userList: [],
    userList2: [],
    userList3:[],
    peopleList: [],
    auditiRecordList: [],

    selectStatus: '',
    selectPeople: '',
    selectAuditId: '',
    searchPhone: '',
    channelName:'',
    searchName: '',
    searchPhoneTwo:'',
    searchNameTwo:'',
    selectAdvice: '',
    choiceAdminId: '',
    choiceList: [],
    isShowUserOrderList:false,
    userOrderTitle:'',
    userOrderList:[],
    cellStyle:{
      'line-height': '16px;'
    },
    tabTwo:{
      pageNo: currentPage2,
      pageSize: 10,
      pageAll: 1,
    },

    tabThree:{
      pageNo: currentPage3,
      pageSize: 10,
      pageAll: 1,
    },
    loading:true,
    loading2:false,
    loading3:false,
    auditiRecord: false,//审核记录
    alotShow: false,//分配弹窗
    refuseRecord:false,//风控结果
    registerTime: '',
    riskTime: '',
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
    isOrFenpei: 2,
    isTong: 2,
    title: '',
    refuseMsg:'',//风控原因
    activeName:currentTab,
    referOneMinute:false,
    currentUserId:0,
    getListCount:0,
    interval:null,
    showTime:false,
    userTimeLines:[],
    currentUserName:"",
    showRiskLog:false,
  }),
  computed:{
    ...mapGetters({
      userName: 'GetRoleName'
    }),
  },
  beforeMount() {
    if(currentPage1>1) this.pageNo=currentPage1;
    if(currentPage2>1) this.tabTwo.pageNo=currentPage2;
    if(currentPage3>1) this.tabThree.pageNo=currentPage3;
    this.getList();//获取风控通过用户
    this.getList2();//获取风控需要人工审核用户
    this.getList3();//获取风控拒绝用户
    this.getPeople();
  },
  watch:{
    referOneMinute:function(val){
      if(val===true){
        console.log(this.userList[0].userId);
        let that = this;
        this.interval = setInterval(function(){
          that.getList(0);
        },60000);
      }else{
        clearInterval(this.interval);
        this.interval=null;
      }
    },
    userList:function(val){
      if(val.length>0){
        console.log("getListCount:"+this.getListCount);
        console.log("lastUserId:"+lastUserId);
      }
    },
    currentTab:function(nval,oval){
     
    }
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
      }
    },
    auditFormat:function(type){
      switch(parseInt(type)){
        case 1:
          return "审核通过";
        case 2:
          return  "暂时拒绝";
        case 3:
          return "不通过";
      }
    },
    timeLineFormat:function(type){
      switch(type){
        case 'register':
          return "注册时间";
        case 'lastLogin':
          return  "最新一次登录时间";
        case 'firstAuth':
          return "首次认证时间";
        case 'endAuth':
          return "结束认证时间";
        case 'risk':
          return "风控时间";
        case 'audit':
          return "信审时间";  
        case 'giveMoney':
          return "放款时间";
      }
    }
  },
  methods: {
    ...mapMutations({
      setIdenti: 'SETIDENTI',
    }),
    tableRowClassName(row,rowIndex){
      if(row.row.isOld=="1"){
        return 'warning-row';
      }
    },
    handleClick(tab, event) {
        this.choiceList=[];
        currentTab = tab.name;
      },
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    //打开风控原因
    openRefuseRecord(id){
      this.refuseRecord = true
      let params = {
        userId: id
      }
        auditingRiskRecord(params).then(data=>{
        let msg = data.data.msg
        if(msg!=undefined){
          this.refuseMsg =JSON.parse(msg)
        }
      })
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
    // 打开审核记录
    openAuditRecord(id) {
      this.auditiRecord = true;
      this.showTime = false;
      let params = {
        userId: id
      }
      auditingRefuseRecord(params).then(data=>{
        this.auditiRecordList = data.data.data
      })
    },
    toDetail(userId,riskType){
      this.setIdenti({Id:userId, ifLoan:1})
      // this.$router.push({name:'loanIdenti'})
      if(riskType=='云息决策'){
        this.$router.push({name:'loanIdenti'})
      }else{
        this.$router.push({name: 'riskIndex', params: {
          userId
        }})
      }
    },
    //领件
    toMyWork(row,index){
      let params = {};
      params.userId = row[index].userId;
      toMyAuditing(params).then(res=>{
        if(res.data.code=='SUCCESS'){
          this.$message({
            showClose: true,
            message: "您已成功领取信审任务",
            type: 'success'
          });
          row[index].adminAuditName = this.userName;
          row[index].adminAuditId = '已分配';
          this.tableRowClassName = 'success-row';
        }else{
          this.$message(res.data.msg)
        }
      });
    },
    //用户时序图
    toUserTimeLine(userId,userName){
      this.userTimeLines=[];
      this.currentUserName = userName;
      let params = {
        userId: userId
      }
        getUserTimeLine(params).then(data=>{
        this.showTime = true;
        let tmpData = data.data.data;
        tmpData.sort(function(x, y){
          return x['sort']-y['sort'];
        });
        console.log(tmpData);
        this.userTimeLines = tmpData;
      })
    },
    toLiuRecord(id){
      this.setIdenti({Id:id, ifLoan:1})
      this.$router.push({name:'auditingLiuRecord'})
    },


    toAlot() {
      let params = {
        userIds: this.choiceList,
        adminId: this.choiceAdminId
      }
      if(this.choiceAdminId == ''){
        this.$message('请选择信审员');
        return
      }
      if(this.title === '分配'){
        auditingAlot(params).then(data=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('分配成功')
            this.getList()
            this.choiceList = []
          }
        })
        this.alotShow = false
      }

      if(this.title === '转派'){
        auditingChange(params).then(data=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('转派成功')
            this.getList()
            this.choiceList = []
          }
        })
        this.alotShow = false
      }
    },
    //点开分配
    openAlot(id) {
      if(this.choiceList.length == 0){
        this.$message('请选择订单')
        return
      }
      if(this.isTong === false){
        this.$message('请选择未分配订单')
        return
      }
      if(this.isOrFenpei === false){
        this.$message('请选择未分配订单')
        return
      }
      this.alotShow = true
      this.title = '分配'
    },
    //打开转派
    openChange(){
      if(this.choiceList.length == 0){
        this.$message('请选择订单')
        return
      }
      if(this.isTong === false){
        this.$message('请选择已分配订单')
        return
      }
      if(this.isOrFenpei === true){
        this.$message('请选择已分配订单')
        return
      }
      this.alotShow = true
      this.title = '转派'
    },
    choiceListChange(val) {
      this.choiceList = []
      let a = 2
      let b = 2
      if(val.length !== 0){
        console.log(val);
        let choice = val[0].adminAuditId
        for(let i = 0; i<val.length; i++){
          this.choiceList.push(val[i].userId)
          if(val[i].adminAuditId === '已分配'){
            this.isOrFenpei = false
            a = 0
          }
          if(val[i].adminAuditId != choice){
            this.isTong = false
            b = 0
          }
        }
        if(a === 2){
          this.isOrFenpei = 2
        }
        if(this.isOrFenpei === 2){
          this.isOrFenpei = true
        }
        if(b === 2){
          this.isTong = 2
        }
        if(this.isTong === 2){
          this.isTong = true
        }
        console.log(this.isTong);
      }
    },
    //获取信审员
    getPeople() {
      auditingSelectPeople().then(data=>{
        // console.log(data);
        this.peopleList = data.data.data
      })
    },
    //需要人工审核
    getList2(isOr){
      if(isOr == 0){
        this.tabTwo.pageNo = 1
      }
      currentPage2=this.tabTwo.pageNo;
      let params = {
        current: this.tabTwo.pageNo,
        size: this.tabTwo.pageSize,
        phone: this.searchPhoneTwo,
        userName: this.searchNameTwo,
        channelName:this.channelName,
        authStatus:this.selectStatus,
        riskStatus:3,
      }
      if(this.registerTime){
        params.gmtDatetime = this.registerTime[0] + `~` + this.registerTime[1]
      }
      if(this.riskTime){
        params.uptDatetime = this.riskTime[0] + `~` + this.riskTime[1]
      }
      let that =this;
      auditingNoPassUserList(params).then((data)=>{
          this.userList2 = [];
          this.userList2 = this.userList2.concat(data.data.data.records);
          for(let i = 0;i<this.userList2.length; i++){
          switch(this.userList2[i].authStatus){
            case '0':
              this.userList2[i].authStatus = '未审核';
              break;
            case '1':
              this.userList2[i].authStatus = '审核通过';
              break;
            case '2':
              this.userList2[i].authStatus = '暂时拒绝';
              break;
            case '3':
              this.userList2[i].authStatus = '不通过';
              break;
            case '4':
              this.userList2[i].authStatus = '二次审核';
              break;
          }
          switch(this.userList2[i].isOld){
            case '0':
              this.userList2[i].isOld  = '新增'
              break
            case '1':
              this.userList2[i].isOld  = '续贷'
              break
          }
          switch(this.userList2[i].adminAuditId){
            case '0':
              this.userList2[i].adminAuditId  = '未分配'
              break
            case '1':
              this.userList2[i].adminAuditId  = '已分配'
              break
          }
        }
        that.tabTwo.pageNo=currentPage2;
        that.tabTwo.pageAll = data.data.data.total;
      })
    },
    getList3(isOr){
      if(isOr == 0){
        this.tabThree.pageNo = 1
      }
      currentPage3=this.tabThree.pageNo;
      let params = {
        current: this.tabThree.pageNo,
        size: this.tabThree.pageSize,
        phone: this.searchPhoneTwo,
        userName: this.searchNameTwo,
        channelName:this.channelName,
        riskStatus:2,
      }
      if(this.registerTime){
        params.gmtDatetime = this.registerTime[0] + `~` + this.registerTime[1]
      }
      if(this.riskTime){
        params.uptDatetime = this.riskTime[0] + `~` + this.riskTime[1]
      }
      let that =this;
      auditingNoPassUserList(params).then((data)=>{
        this.userList3 = [];
        this.userList3 = this.userList3.concat(data.data.data.records);
        for(let i = 0;i<this.userList3.length; i++){
          switch(this.userList3[i].authStatus){
            case '0':
              this.userList3[i].authStatus = '未审核';
              break;
            case '1':
              this.userList3[i].authStatus = '审核通过';
              break;
            case '2':
              this.userList3[i].authStatus = '暂时拒绝';
              break;
            case '3':
              this.userList3[i].authStatus = '不通过';
              break;
            case '4':
              this.userList3[i].authStatus = '二次审核';
              break;
          }
          switch(this.userList3[i].isOld){
            case '0':
              this.userList3[i].isOld  = '新增'
              break
            case '1':
              this.userList3[i].isOld  = '续贷'
              break
          }
          switch(this.userList3[i].adminAuditId){
            case '0':
              this.userList3[i].adminAuditId  = '未分配'
              break
            case '1':
              this.userList3[i].adminAuditId  = '已分配'
              break
          }
        }
        that.tabThree.pageNo=currentPage3;
        that.tabThree.pageAll = data.data.data.total
      })
    },
    getList(isOr) {
      if(isOr == 0){
        this.pageNo = 1
      }
      currentPage1=this.pageNo;
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        phone: this.searchPhone,
        userName: this.searchName,
        authStatus:this.selectStatus,
        isOld: this.selectType,
        adminAuditId: this.selectAuditId,
        adminAuditName: this.selectPeople,
        advice: this.selectAdvice,
        channelName:this.channelName,
        riskStatus:1
      }
      if(this.registerTime){
        params.gmtDatetime = this.registerTime[0] + `~` + this.registerTime[1]
      }else{
        params.gmtDatetime = ''
      }
      if(this.riskTime){
        params.uptDatetime = this.riskTime[0] + `~` + this.riskTime[1]
      }else{
        params.uptDatetime = ''
      }
      let that =this;
      auditingUserList(params).then((data)=>{
        this.userList = [];
        this.userList = this.userList.concat(data.data.data.records);
        for(let i = 0;i<this.userList.length; i++){
          switch(this.userList[i].authStatus){
            case '0':
              this.userList[i].authStatus = '未审核';
              break;
            case '1':
              this.userList[i].authStatus = '审核通过';
              break;
            case '2':
              this.userList[i].authStatus = '暂时拒绝';
              break;
            case '3':
              this.userList[i].authStatus = '不通过';
              break;
            case '4':
              this.userList[i].authStatus = '二次审核';
              break;
          }
          switch(this.userList[i].adminAuditId){
            case '0':
              this.userList[i].adminAuditId  = '未分配'
              break
            case '1':
              this.userList[i].adminAuditId  = '已分配'
              break
          }
        }
        that.loading=false;
        that.pageNo=currentPage1;
        that.pageAll = data.data.data.total;
        if(that.getListCount==0) lastUserId = that.userList[0].userId;
        if(that.getListCount>0 && that.userList[0].userId!=lastUserId){
          //notify.player();
          lastUserId = that.userList[0].userId;
        }
        that.getListCount +=1;
        console.log(that.getListCount);
      })
    },
  },
  // beforeRouteEnter(to, from ,next) {
  //   // console.log(3);
  //   // next(vm => {
  //   //   // 通过 `vm` 访问组件实例
  //   //   if(from.name === 'loanIdenti'){
  //   //     vm.getList()
  //   //   }
  //   // })
  // },
}
</script>
<style>
  .el-table .warning-row {
    background: oldlace;
  }
</style>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
.el-row{
  margin-bottom: 10px;
}
  .time{
      font-size: 14px;
      font-weight: bold;
  }
  .content{
      padding-left: 5px;
      padding-top:10px;
  }
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
    .list{
      padding: 5px;
      background-color: #fff;
      .choice{
        text-align: center;
        margin-top: 20px;
      }
    }
  }
</style>
