<template>
  <div class="allPage">
    <div class="searchAll">
      <span>放款时间:</span>
      <el-date-picker
        v-model="search.auditTime"
        type="daterange"
        align="right"
        value-format='yyyy-MM-dd'
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="dateOption"
        size='mini'
        style='width:240px;margin:10px;0px;'>
      </el-date-picker>
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
        style='width:240px;margin:10px;0px;'>
      </el-date-picker>
      <el-input v-model="search.name" placeholder="请输入借款人姓名" class='search' size="mini"></el-input>
      <el-input v-model="search.phone" placeholder="请输入电话号码" class='search' size="mini"></el-input>
      <!--<el-input v-model="search.channelName" placeholder="请输入渠道商名称" class='search' style='width:120px;' size="mini" clearable></el-input>-->
      <el-select
        v-model="search.channelName"
        filterable
        remote
        reserve-keyword
        placeholder="请输入渠道商名称"
        size='mini'
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in channelOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="search.customerType" size='mini' class="selectChoice" placeholder="客户类型">
        <el-option label="新增" value="0"></el-option>
        <el-option label="续贷" value="1"></el-option>
      </el-select>
      <el-select v-model="search.loanState" size='mini' class="selectChoice" placeholder="放款状态">
        <el-option label="未放款" value="0"></el-option>
        <el-option label="已放款" value="1"></el-option>
        <el-option label="已拒绝" value="2"></el-option>

      </el-select>
      <el-button type="primary" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">查询</el-button>
    </div>
    <div class="list">
      <el-table border
                ref='refsList'
                :data="userList"
                highlight-current-row
                @current-change='toChoiceId'
                style="width: 100%"
                :cell-style='cellStyle'
                height='600'
                @selection-change='changeArr'>
        <el-table-column type="selection" width="40"></el-table-column>
        <el-table-column
          prop="index"
          label="序号"
          width="50"
          align="center"
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
          >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号码"
          width="120"
          align="center"
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
          prop="needPayMoney"
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
          prop="giveTime"
          label="放款时间"
          width="160"
          >
        </el-table-column>
        <el-table-column
          prop="loanState"
          label="放款状态"
          >
        </el-table-column>
        <el-table-column
          prop="customerType"
          label="客户类型"
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop="adminName"
          label="放款员"
          align="center"
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="370"
          fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toLook(scope.row.userId)' >查看认证信息</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='refuse(scope.row.id)'>拒绝</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='addAudits(scope.row.id)'>添加审核记录</el-button>
            <el-button type="text" size="mini" class="publicSmalBtn" @click="auditShow(scope.row)">审核记录</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toYibao(scope.row.id)' v-if='scope.row.yiBaoShow'>易宝打款</el-button>
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
      :visible.sync="list.showAudit"
      width="60%"
      >
      <el-tabs v-model="list.activeName" type="card">
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
      title="易宝打款"
      :visible.sync="showYibao"
      width="60%"
      >
      <div>
        您确定打款吗?
      </div>
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
        <el-button @click="list.showRefuse = false">关 闭</el-button>
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
  </div>
</template>
<script>
import {selectMyPassLoanOrder, loanApplyReject, loanToYibao,loanMachineRecordList, passMoneyAuditRecords,  loanApplyAgree,selectAuditRecords, auditingRecordList,getCanalsList} from '@/API'
import { mapMutations } from 'vuex'
let channels=[];
export default {
  data: () => {
    return {
      userList: [],//我的放款列表
      auditList: [],//审核记录列表
      finalList: [],//终审记录列表
      pageNo: 1,
      pageSize: 10,
      pageAll: 1,
      channelList:[],
      channelOptions:[],
      loading:false,
      search:{//头部搜索
        auditTime:'',//审核时间
        name:'',//姓名
        phone:'',//手机号
        customerType:'',//客户类型
        loanState:'',//放款状态
        borrowTime: '', //订单时间
        channelName:'',//渠道商
      },
      cellStyle:{
        'line-height': '16px;'
      },
      list:{//列表展示
        showAudit: false,//审核记录
        activeName:'first',//审核记录tab切换
        showAddAudits: false,//添加审核记录
        addAuditId: false,//添加审核记录Id
        textarea:'',//添加审核记录备注内容
        showPass:false,//通过打款
        passId:'',//通过id
        showRefuse: false,//打款拒绝
        refuseId:'',//打款拒绝
      },
      showYibao: false,
      yibaoId: '0',
      choiceIdArr:[],//多选数组
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
  mounted(){
    let params = {
      pageNo: 1,
      pageSize: 30,
    }
    // console.log(2);

    getCanalsList(params).then((data)=>{
      console.log(data);
      channels = data.data.data.list.map(item=>{
          return {value:item.name,label:item.name}
        }

      )
      this.channelList = channels
      // this.channelList = this.canals.concat();
    })
  },
  methods: {
    ...mapMutations({
      setIdenti: 'SETIDENTI'
    }),
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;

          this.channelOptions = this.channelList.filter(item => {
            return item.label.toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        channels = [];
      }
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
    // 选择数组
    changeArr(val){
      this.choiceIdArr = [];
      for(let i = 0;i< val.length; i++){
        this.choiceIdArr.push(val[i].id)
      }
       console.log('多选',this.choiceIdArr)
    },

    toLook(id) {//查看认证信息
      this.setIdenti({Id:id, ifLoan:0})
      this.$router.push({name: 'loanIdenti'})
    },
    toYibao(id) {//易宝打款
      this.showYibao = true;
      this.yibaoId = id
    },
    yibaoSure(id){//确定易宝打款
      let params = {
        id
      };
       params.id = this.yibaoId;
      loanToYibao(params).then((data)=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('打款成功');
          this.getList();
        }else{
          this.$message(data.data.msg)
        }
      })
      this.showYibao = false;
    },
    refuse(id) {//拒绝
      this.list.showRefuse = true;
      console.log("拒绝id",id)
      this.list.refuseId = id
    },
    refuseSure(){//拒绝

      let params = {}
      params.id = this.list.refuseId;
      loanApplyReject(params).then((data)=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('拒绝成功');
          this.getList();
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
        })
        this.list.showAddAudits = false;
      }else{
        this.$message.warning('请填写备注内容!')
      }
    },
    getList(isOr) {//我的放款列表
      if(isOr == 0){
        this.pageNo = 1
      }
      let params = {
        current: this.pageNo,
        size: this.pageSize,
        phone: this.search.phone,
        userName: this.search.name,
        isOld: this.search.customerType,//客户类型
        operateStatus: this.search.loanState,//放款状态
        channelName:this.search.channelName,//渠道商
      };
      if(this.search.auditTime){//放款时间
        params.outDatetime = this.search.auditTime[0] + `~` + this.search.auditTime[1]
      }else{
        params.outDatetime = ''
      }
      if(this.search.borrowTime){//订单时间
        params.gmtDatetime = this.search.borrowTime[0] + `~` + this.search.borrowTime[1]
      }else{
        params.gmtDatetime = ''
      }
      selectMyPassLoanOrder(params).then(res=>{//我的放款列表接口
        console.log("我的放款列表",res);
        res = res.data.data;
        this.userList = [];
        res.records.forEach((element,index)=>{
          res.records[index].index = index+1;
          switch(res.records[index].orderStatus){
            case "2":
              res.records[index].loanState = "未放款"
              break;
            case "3":
              res.records[index].loanState = "已放款"
              break;
            case "5":
              res.records[index].loanState = "已放款"
              break;
            case "6":
              res.records[index].loanState = "已结清"
              break;
            case "7":
              res.records[index].loanState = "已拒绝"
              break;
          }
          if(res.records[index].loanState == "已拒绝" || res.records[index].loanState == "已放款"){
            res.records[index].yiBaoShow = false
          }else{
            res.records[index].yiBaoShow = true
          }
          // console.log(res.records[index].yiBaoShow);
          switch(res.records[index].isOld){
            case 0:
              res.records[index].customerType = "新增"
              break;
            case 1:
              res.records[index].customerType = "续贷"
              break;
            default:
              res.records[index].customerType = ""

          }
        })
        this.userList = res.records;
        this.pageAll = res.total;
      })
    },

    sizeChange(size){//每页条数
      this.pageSize = size;
      this.getList();
    },
    auditShow(row){//显示终审记录
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
