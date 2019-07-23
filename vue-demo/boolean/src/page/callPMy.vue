<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        我的催收列表
      </div>
    </div>
    <div class="searchAll">
      <span>应还款时间:</span>
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
        class="dateStyle"
      >
      </el-date-picker>
      <span>借款人手机号:</span>
      <el-input v-model="searchPhone" placeholder="请输入电话号码" class='search' size="mini"></el-input>
      <span>借款人姓名:</span>
      <el-input v-model="searchName" placeholder="请输入姓名" class='search' size="mini"></el-input>
      <span>逾期天数:</span>
      <el-input v-model="minDueDays" class='search' size="mini"></el-input>—<el-input v-model="maxDueDays" class='search' size="mini"></el-input>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">查询</el-button>
      <br><br>
      <span>催收状态:</span>
      <el-select v-model="selectStatus" size='mini' class="selectChoice">
        <el-option label="全部" value=""></el-option>
        <el-option label="未催收" value="0"></el-option>
        <el-option label="催收中" value="1"></el-option>
        <el-option label="催收成功" value="2"></el-option>
      </el-select>

       <el-button type="" size='mini' class="publicMidBtn" @click='toCallRecord' style="margin-left:100px;">催收记录</el-button>
       <el-button type="" size='mini' class="publicMidBtn" @click='toCallAddRecord'>新增催收记录和备注</el-button>
       <el-button type="" size='mini' class="publicMidBtn" @click='toCallTransferRecord'>订单流转记录</el-button>
       <el-button type="" size='mini' class="publicMidBtn" @click='toTaobao'>淘宝认证</el-button>
       <el-button type="" size='mini' class="publicMidBtn" @click='toPhone'>通讯录</el-button>
       <el-button type="" size='mini' class="publicMidBtn" @click='toTongDun'>同盾报告</el-button>
    </div>
    <div class="list">
      <el-table
        :data="userList"
        highlight-current-row
        @current-change='toChoiceId'
        style="width: 100%"
        :cell-style='cellStyle'
        height='600'
        >
        <el-table-column
          prop="id"
          label="订单编号"
          width='160'
          >
        </el-table-column>
        <el-table-column
          prop="user.userName"
          label="借款人姓名"
          width='90'>
        </el-table-column>
        <el-table-column
          prop="user.phone"
          label="借款手机号"
          width='115'
          >
        </el-table-column>
        <el-table-column
          prop="borrowMoney"
          label="借款金额"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="realPayMoney"
          label="续期金额"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop="overdueMoney"
          label="滞纳金"
          >
        </el-table-column>
        <el-table-column
          prop="realMoney"
          label="本金金额"
          width='90'
          >
        </el-table-column>
        <el-table-column
          prop="overdueDays"
          label="逾期天数"
          >
        </el-table-column>
        <el-table-column
          prop='limitPayTime'
          label="应还款时间"
          width='160'
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop='extendTime'
          label="最新还款时间"
          width='160'
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop='dispatchTime'
          label="派单时间"
          width='160'
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop='pressStatus'
          label="催收状态"
          width='80'
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop='overdueStatus'
          label="催收小组"
          width='80'
          >
        </el-table-column>
        <el-table-column
          prop='pressMoneyName'
          label="当前催收员"
          width='90'
          >
        </el-table-column>
        <el-table-column
          label="操作"
          width="150"
          align="center"
          fixed='right'
          >
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDetail(scope.row.id)' >查看详情</el-button>
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDerate(scope.row)' v-if='scope.row.isApplyReduce == 0'>减免申请</el-button>
            <el-button type="warning" size="small" class="publicSmalBtn" @click='' v-if='scope.row.isApplyReduce == 1' disabled>申请中</el-button>
            <el-button type="text" size="small" v-if="configValue"  @click='toYibao(scope.row.id,scope.row.userId)'>扣款</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block choice">
        <el-pagination
          @current-change="getList"
          background
          @size-change="sizeChange"
          :current-page.sync="pageNo"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="10"
          layout="sizes, total, prev, pager, next, jumper"
          :total="pageAll">
        </el-pagination>
      </div>
      <el-dialog
        title="催收记录"
        :visible.sync="callRecordDialog"
        width="80%"
        >
        <div>
          <CallRecordList v-if='callRecordDialog'></CallRecordList>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="callRecordDialog = false;">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="减免申请"
        :visible.sync="derateShow"
        width="60%"
        >
        <div>
          <div class="userMan">
            <div class="uMContent" v-for='(value, key, index) in derateData' :key='key'>
              <div class="uMTitle">
                {{key}}
              </div>
              <div class="uMData">
                {{value}}
              </div>
            </div>
            <hr>
            <div class="">
              <span>减免金额:</span>
              <el-input v-model="derateMoney" placeholder="请输入减免金额" class='search' size="mini"></el-input>
            </div>
            <hr>
            <div class="">
              <div class="">
                备注内容
              </div>
              <el-input
                type="textarea"
                placeholder="备注内容控制在100字以内"
                maxlength='100'
                v-model="derateMsg">
              </el-input>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="toSaveDerage">保 存</el-button>
          <el-button @click="derateShow = false;">取 消</el-button>
        </span>
      </el-dialog>
      <el-dialog title="扣款" :visible.sync="showYibao">
        <el-form :model="form">
           <el-form-item label="扣款金额" :label-width="formLabelWidth">
             <el-input v-model="form.money" auto-complete="off"></el-input>
           </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
              <el-button @click="showYibao = false">取 消</el-button>
              <el-button type="primary" @click="yibaoSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {agencyDeduction,callMyList, callPManList, callOrderChange, callOrderChangeChange, callOrderDerate} from '@/API'
import { mapMutations, mapGetters } from 'vuex'
import CallRecordList from '@/page/callRecord'
export default {
  data: () => {
    return {
      userList: [],
      pageNo: 1,
      pageSize: 10,
      selectStatus: '',//催收状态
      selectGroup: '',//催收小组
      selectPStatus:'',//是否分配
      dateTime: '',
      pageAll: 1,
      searchPhone: '',
      searchName: '',
      minDueDays: '',//开始逾期天数
      maxDueDays: '',//结束逾期天数
      cellStyle:{
        'line-height': '16px;'
      },
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
      allocation: false,//分配
      whichGroup: 'S0',
      manList:[],
      whichMan: '',
      peopleChoice: [],
      allotList:false,
      selectManOut: '',
      choiceId:'',//用户id
      choiceIdID:'',//订单id
      which: {},
      callRecordDialog:false,//流转记录
      derateShow: false, //减免记录
      derateData: {},//减免数据
      derateId: '', // 减免id
      derateMoney: '',//减免金额
      derateMsg: '',//减免内容
      configValue : false,
      showYibao:false,
      form:{
        money:''
      },
      formLabelWidth:'100px',
    }
  },
  mounted(){
    this.getList();
  },
  methods: {
    ...mapMutations({
      setCallId: 'SETCALLID',
      setCallIDId: 'SETCALLIDID'//订单id
    }),
    toYibao(id,userId) {//扣款
      this.showYibao = true;
      this.choiceIdID = id;
      this.payToUserId = userId;
      this.form.money = '';
    },
    yibaoSure(id){//确定打款
      let params = {};
      params.orderId = this.choiceIdID;
      params.money = this.form.money;
      agencyDeduction(params).then((data)=>{
        console.log(data);
        
        if(data.data.code == 'SUCCESS'){
          this.$message('发起扣款成功');
          this.getList();
        }else{
          this.$message(data.data.msg)
        }
      })
      this.showYibao = false;
    },
    // 提交减免申请
    toSaveDerage() {
      if(!this.derateMoney){
        this.$message('请填写减免金额')
        if(isNaN(this.derateMoney)){
          this.$message('请填写正确的减免金额')
          return
        }
        return
      }
      // console.log(this.derateMoney);
      // console.log(this.derateData.滞纳金);
      if(this.derateMoney > this.derateData.滞纳金){
        this.$message('减免金额必须小于滞纳金')
        return
      }
      let params = {
        orderId: this.derateId,
        reduceMoney: this.derateMoney,
        remark: this.derateMsg
      }
      callOrderDerate(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message.success('申请成功')
          this.getList()

        }else{
          this.$message(data.data.msg)
        }
      })
      this.derateShow = false
    },
    // 打开减免单
    toDerate(row) {
      this.derateMoney = ''
      this.derateId = row.id
      this.derateShow = true
      this.derateData = {
        '借款人' : row.user.userName,
        '手机号' : row.user.phone,
        '应还金额' : row.needPayMoney,
        '应还本金' : row.borrowMoney,
        '滞纳金' : row.overdueMoney,
      }
    },
    // 单选选择id
    toChoiceId(row) {
      if(!row){
        return
      }
      this.choiceId = row.userId;//用户id
      this.choiceIdID = row.id;//订单id
      this.setCallId(row.userId)
      this.setCallIDId(row.id)
      this.which = row
      let remarksId = sessionStorage.getItem('remarksId')
      if(+row.id !== +remarksId){
        sessionStorage.removeItem('remarks')
      }
    },
    toTongDun() {
      if(this.choiceId == ''){
        this.$message('请选择一个订单')
      }else{
        this.$router.push({name:'callTongDun'})
      }
    },
    toTaobao() {
      if(this.choiceId == ''){
        this.$message('请选择订单')
        return
      }
      this.$router.push({name: 'callTaobao'})
    },
    toPhone() {
      if(this.choiceId == ''){
        this.$message('请选择订单')
        return
      }
      this.$router.push({name: 'callPhone'})
    },
    toCallRecord() {
      if(this.choiceId != ''){
        this.$router.push({name:'callRecord'})
        // this.callRecordDialog = true;
      }else{
        this.$message('请选择一个订单')
      }
    },
    toCallAddRecord() {
      if(this.choiceId != ''){
        if(this.isOrfenpei === true){
          this.$message('请选择已分配订单')
          return
        }
        this.$router.push({name:'callAddCallRecord'})
      }else{
        this.$message('请选择一个订单')
      }
    },
    toCallTransferRecord() {
      if(this.choiceId != ''){
        this.$router.push({name:'callOrderTransferRecord'})
      }else{
        this.$message('请选择一个订单')
      }
    },
    // 选择数组，用于分配
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    toDetail() {
      this.$router.push({name: 'callDetail'})
    },
    getList(isOr) {
      if(isOr == 0){
        this.pageNo = 1
      }
      let params = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        minOverDueDays: this.minDueDays,
        maxOverDueDays: this.maxDueDays,
        pressStatus: this.selectStatus,
        allocationStatus: this.selectPStatus,
        phone: this.searchPhone,
        name:this.searchName,
        overDueStatus: this.selectGroup
      };
      // debugger;
      if(isNaN(+this.minDueDays) || isNaN(+this.maxDueDays)){
        this.$message('请输入数字')
        return
      }
      if(!((this.minDueDays !== '' && this.maxDueDays !== '') || (this.minDueDays === '' && this.maxDueDays === ''))){
        this.$message('逾期天数输入有误')
        return
      }
      if(this.dateTime){
        params.gmtDatetime = this.dateTime[0] + `~` + this.dateTime[1]
      }else{
        params.gmtDatetime = ''
      }
      callMyList(params).then(data=>{
        console.log("催收总列表",data)
        if((Object.getOwnPropertyNames(data.data.data).length) == 3){
          this.configValue = true
        }else{
          this.configValue = false
        }
        this.userList = data.data.data.pageDto.list;
        this.userList.forEach((element,i) => {
          if(element.pressStatus == 0 || element.pressStatus == null){
            this.userList[i].pressStatus = "未催收"
          }else if(element.pressStatus == 1){
            this.userList[i].pressStatus = "催收中"
          }else if(element.pressStatus == 2){
            this.userList[i].pressStatus = "催收成功"
          }
          if(element.pressMoneyMan === 0 || element.pressMoneyMan == null){
            this.userList[i].distrStatus = "未分配"
          }else{
            this.userList[i].distrStatus = "已分配"
          }

          switch(this.userList[i].user.isOld){
            case 0:
              this.userList[i].typeCous = "新增"
            break
            case 1:
              this.userList[i].typeCous = "续贷"
            break
          }
        });

        this.pageAll = data.data.data.pageDto.total;
      })
    }
  },
  components:{
    CallRecordList
  },
  beforeRouteEnter(to, from ,next) {
    // console.log(3);
    next(vm => {
      // 通过 `vm` 访问组件实例
      if(from.name === 'callAddCallRecord'){
        vm.getList()
      }
    })
  },
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .searchAll{
      background-color: white;
      padding:20px;
      /deep/ .dateStyle{
        width:16%;
      }
      .selectChoice{
        width: 120px;
        margin-right: 20px;
      }
      .search{
        width: 120px;
        margin-right: 1px;
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
    .userMan{
      .uMContent{
        display: inline-block;
        width: 400px;
        margin-top: 5px;
        .uMTitle{
          display: inline-block;
          width: 100px;
        }
        .uMData{
          display: inline-block;
          width: 250px;
          border:1px solid grey;
        }
      }
      .search{
        width: 120px;
        margin-left: 30px;
      }
    }
  }
</style>
