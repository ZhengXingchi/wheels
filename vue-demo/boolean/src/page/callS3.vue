<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        催收S3列表
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
      <span>催收状态:</span>
      <el-select v-model="selectStatus" size='mini' class="selectChoice">
        <el-option label="全部" value=""></el-option>
        <el-option label="未催收" value="0"></el-option>
        <el-option label="催收中" value="1"></el-option>
        <el-option label="催收成功" value="2"></el-option>
      </el-select>
      <el-button type="" icon="el-icon-search" size='mini' @click='getList(0)' class="publicMidBtn">查询</el-button>
      <div class="">
        <el-button type="" size='mini' class="publicMidBtn" @click='toAllocation'>分配</el-button>
        <el-button type="" size='mini' class="publicMidBtn" @click='toAllocationChange'>转派</el-button>

        <el-button type="" size='mini' class="publicMidBtn" @click='toCallRecord' style="margin-left:100px;">催收记录</el-button>
        <el-button type="" size='mini' class="publicMidBtn" @click='toCallAddRecord'>新增催收记录和备注</el-button>
        <el-button type="" size='mini' class="publicMidBtn" @click='toCallTransferRecord'>订单流转记录</el-button>
        <el-button type="" size='mini' class="publicMidBtn" @click='toTaobao'>淘宝认证</el-button>
        <el-button type="" size='mini' class="publicMidBtn" @click='toPhone'>通讯录</el-button>
        <el-button type="" size='mini' class="publicMidBtn" @click='toTongDun'>同盾报告</el-button>
      </div>
    </div>
    <div class="list">
      <el-table
        ref='refsList'
        :data="userList"
        highlight-current-row
        @current-change='toChoiceId'
        :cell-style='cellStyle'
        height='600'
        @selection-change='changeArr'
        >
        <el-table-column type="selection" width="40"></el-table-column>
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
          prop='distrStatus'
          label="分配状态"
          width='80'
          align="center"
          >
        </el-table-column>
        <el-table-column
          prop='typeCous'
          label="客户类型"
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
          width="100"
          align="center"
          fixed='right'>
          <template slot-scope="scope">
            <el-button type="text" size="small" class="publicSmalBtn" @click='toDetail(scope.row.id)' >查看详情</el-button>
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
        :title="title"
        :visible.sync="allocation"
        width="60%"
        >
        <div class="">
          <span>催收小组：</span>
          <el-select v-model="whichGroup" size='mini' class="selectChoice" @change='getGroupList'>
            <el-option label="S0" value="S0"></el-option>
            <el-option label="S1" value="S1"></el-option>
            <el-option label="S2" value="S2"></el-option>
            <el-option label="S3" value="S3"></el-option>
          </el-select>
          <span>催收员：</span>
          <el-select v-model="whichMan" placeholder="请选择" size='mini' class="selectChoice">
            <el-option
                v-for='(item, index) in manList'
                :label='item.userName'
                :value='item.id'
                :key='index'
            >
            </el-option>
          </el-select>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="allocation = false; title=''; whichGroup = 'S0';whichMan='';">取 消</el-button>
          <el-button type="primary" @click="saveChange">保 存</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="催收记录"
        :visible.sync="callRecordDialog"
        width="80%"
        >
        <div>
          <CallRecordList v-if="callRecordDialog"></CallRecordList>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="callRecordDialog = false;">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {callSThreeList, callPManList, callOrderChange, callOrderChangeChange} from '@/API'
import { mapMutations, mapGetters } from 'vuex'
import CallRecordList from '@/page/callRecord'
export default {
  data: () => {
    return {
      title:'',
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
      whichGroup: 'S3',
      manList:[],
      whichMan: '',
      peopleChoice: [],
      allotList:false,
      selectManOut: '',
      choiceId:'',
      choiceIdID:'',//订单id
      which: {},
      isChange:0,//判断是否为转派
      callRecordDialog:false,//流转记录
      isOrfenpei: 2,//是否为分配
      whichGroupZhuanPai: 'S3',
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
    // 单选选择id
    toChoiceId(row) {
      if(!row){
        return
      }
      this.$refs.refsList.clearSelection()
      this.$refs.refsList.toggleRowSelection(row)
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
    // 转派
    toAllocationChange(){
      this.isChange = 1
      if(this.peopleChoice == ''){
        this.$message('请选择订单')
        return
      }
      if(this.isOrfenpei === true){
        this.$message('请选择已分配订单')
        return
      }
      this.allocation = true
      this.title="转派"
      if(this.whichGroupZhuanPai != ''){
        this.whichGroup = this.whichGroupZhuanPai
      }
      let params = {
        departName: this.whichGroup
      }
      callPManList(params).then(data=>{
        let a = []
        this.manList = a.concat(data.data.data)
      })
    },
    saveChange(){
      let params={
        adminId:this.whichMan,
        ids: this.peopleChoice
      }
      if(this.peopleChoice == ''){
        this.$message('请选择分配员');
        return
      }
      if(this.isChange){
        callOrderChangeChange(params).then(data=>{//转派接口
          if(data.data.code=='SUCCESS'){
            this.getList();
            this.$message.success('转派成功')
            this.whichMan = ""
            this.peopleChoice = []
            this.allocation = false;
            this.isOrfenpei = 2
          }else{
            this.$message(data.data.msg)
          }
        })
        return
      }
      callOrderChange(params).then(data=>{//分配接口
        if(data.data.code=='SUCCESS'){
          this.getList();
          this.$message.success('分配成功')
          this.whichMan = ""
          this.peopleChoice = ""
          this.allocation = false;
          this.isOrfenpei = 2
        }else{
          this.$message(data.data.msg)
        }
      })
    },
    // 选择数组，用于分配
    changeArr(val){
      this.peopleChoice = []
      let a = 1
      for(let i = 0;i< val.length; i++){
        this.peopleChoice.push(val[i].id)
        console.log(val[i].pressMoneyMan);
        if( val[i].pressMoneyMan !== 0 && val[i].pressMoneyMan !== null){
          this.isOrfenpei = false
          a = 2
        }
      }
      if(a === 1){
        this.isOrfenpei = 2
      }
      if(this.isOrfenpei === 2){
        this.isOrfenpei = true
      }
    },
    toAllocation(isOr){
      this.isChange = 0
      if(this.peopleChoice == ''){
        this.$message('请选择一个订单')
        return
      }
      if(this.isOrfenpei === false){
        this.$message('请选择未分配订单')
        return
      }
      if(this.whichGroupZhuanPai != ''){
        this.whichGroup = this.whichGroupZhuanPai
      }
      this.allocation = true
      this.title = "分配"
      let params = {
        departName: this.whichGroup
      }
      callPManList(params).then(data=>{
        let a = []
        this.manList = a.concat(data.data.data)
      })
    },
    getGroupList() {
      if(this.whichGroupZhuanPai != ''){
        this.whichGroup = this.whichGroupZhuanPai
      }
      let params = {
        departName: this.whichGroup
      }
      callPManList(params).then(data=>{
        let a = []
        this.manList = a.concat(data.data.data)
      })
    },
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
      if(this.dateTime){
        params.gmtDatetime = this.dateTime[0] + `~` + this.dateTime[1]
      }else{
        params.gmtDatetime = ''
      }
      if(isNaN(+this.minDueDays) || isNaN(+this.maxDueDays)){
        this.$message('请输入数字')
        return
      }
      if(!((this.minDueDays !== '' && this.maxDueDays !== '') || (this.minDueDays === '' && this.maxDueDays === ''))){
        this.$message('逾期天数输入有误')
        return
      }
      callSThreeList(params).then(data=>{
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
        console.log(333);
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
  }
</style>
