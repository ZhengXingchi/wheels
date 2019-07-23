<template>
  <div class="allPage">

    <div class="searchAll">
      <el-row >
        <span>注册时间:</span>
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
        <el-input v-model="searchName" placeholder="请输入姓名" class='search' style='width:200ox;' size="mini" clearable></el-input>
        <el-input v-model="searchPhone" placeholder="请输入电话号码" class='search' style='width:200px;' size="mini" clearable></el-input>
        <el-input v-model="channelName" placeholder="请输入渠道商名称" class='search' style='width:120px;' size="mini" clearable></el-input>
        <span v-if="isShowSearchMore==0">
          <el-button type="primary" icon="el-icon-search" size='mini' @click='getList(0)'>查询</el-button>
          <el-button  size='mini'>重置</el-button>
          <el-button type="text" icon="el-icon-arrow-down" @click="searchMore(1)">展开</el-button>
        </span>
      <span v-if="isShowSearchMore==1">
        <el-select v-model="accountState" size='mini' class="selectChoice" placeholder="账号状态">
          <el-option label="正常" value="1"></el-option>
          <!-- <el-option label="黑名单" value="2"></el-option> -->
          <el-option label="禁用" value="3"></el-option>
          <!-- <el-option label="被拒绝" value="4"></el-option> -->
        </el-select>
        <el-select v-model="dispatchState" size='mini' class="selectChoice" placeholder="分配状态">
          <el-option label="未分配" value="0"></el-option>
          <el-option label="已分配" value="1"></el-option>
        </el-select>
      </span>

    </el-row>
    <el-row type="flex" justify="end" v-if="isShowSearchMore==1" style="margin-top:10px;">
      <el-col :span="4" :offset="20" ><el-button type="primary" icon="el-icon-search" size='mini' @click='getList(0)'>查询</el-button> <el-button type="text" icon="el-icon-arrow-up" @click="searchMore(0)">收起</el-button></el-col>
    </el-row>

      <el-button type="primary" size="mini" @click='recover' style="float:left;margin:5px;">恢复</el-button>
      <el-button type="primary" size="mini" @click='forbidden' style="float:left;margin:5px;">禁用</el-button>
      <!-- <el-button type="primary" size='mini' @click='addDialResult' style="float:right;margin:5px;">添加拨打结果</el-button> -->

      <el-button type="primary" size='mini'  @click='circulationRecord'  style="float:left;margin:5px;">流转记录</el-button>
      <el-button type="primary" size='mini' @click='dialRecord' style="float:left;margin:5px;">拨打记录</el-button>
    </div>

    <div class="list">
      <el-table
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
          prop="userId"
          label="ID"
          width="100"
          fixed

          >
        </el-table-column>
        <el-table-column
          label="姓名"
          width='100'
        >
          <template slot-scope="scope">
            {{scope.row.userName}}{{scope.row.sex!=''?'['+scope.row.sex+']':''}}
          </template>
        </el-table-column>

        <el-table-column
          prop="phone"
          label="手机号码"
          width='120'
          >
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="渠道商"
          width='80'
        >
        </el-table-column>
        <el-table-column
          label="认证状态"
          width='200'>
          <template slot-scope="scope">
            <el-button style="padding:2px 4px;margin-left:0" :type="scope.row.authList.basic.status">{{scope.row.authList.basic.type}}</el-button>
            <el-button style="padding:2px 4px;margin-left:0"  :type="scope.row.authList.identity.status">{{scope.row.authList.identity.type}}</el-button>
            <el-button style="padding:2px 4px; margin-left:0"  :type="scope.row.authList.phone.status">{{scope.row.authList.phone.type}}</el-button>
            <el-button style="padding:2px 4px; margin-left:0"  :type="scope.row.authList.bank.status">{{scope.row.authList.bank.type}}</el-button>
            <el-button style="padding:2px 4px; margin-left:0"  :type="scope.row.authList.taobao.status">{{scope.row.authList.taobao.type}}</el-button>
            <el-button style="padding:2px 4px; margin-left:0"  :type="scope.row.authList.zhifubao.status">{{scope.row.authList.zhifubao.type}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="authState"
          label="认证状态"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="dispatchState"
          label="分配状态"
          width='100'>
        </el-table-column>
        <!-- <el-table-column
          prop="trustState"
          label="信审状态"
          width='100'>
        </el-table-column> -->
        <el-table-column
          prop="accountState"
          label="账号状态"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="dialState"
          label="拨打结果"
          width='100'>
        </el-table-column>
        <el-table-column
          prop="operator"
          label="话务员"
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
      width="100"
      fixed="right"
        >
      <template slot-scope="scope">
        <el-button @click="dispatch" type="text" size="small">分配</el-button>
        <el-button type="text" @click='transfer' size="small">转派</el-button>
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
    <!-- 分配 -->
    <el-dialog
      title="分配"
      :visible.sync="showDispatch"
      width="60%"
      >
      <div>
        <span>话务员:</span>
        <el-select v-model="telephonist" placeholder="请选择" size='mini' class="selectChoice" @change="selectTelephonist">
          <el-option
              v-for='(item, index) in telephonistList'
              :label='item.userName'
              :value='item.id'
              :key='index'
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDispatch = false">取 消</el-button>
        <el-button type="primary" @click="dispatchSure">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 流转记录操作 -->
    <el-dialog
      title="流转记录"
      :visible.sync="showCirculation"
      width="60%"
      >
      <div class="list">
        <el-table :data="circulationList"
                  style="width: 100%"
                  :cell-style='cellStyle'
                  >
          <el-table-column
            prop="userName"
            label="用户"
            >
          </el-table-column>
          <el-table-column
            prop="operaterName"
            label="分配人员"
            >
          </el-table-column>
          <el-table-column
            prop="beforeAdminName"
            label="上一个话务员"
            >
          </el-table-column>
          <el-table-column
            prop="nowAdminName"
            label="现在话务员"
            >
          </el-table-column>

          <el-table-column
            prop="gmtDatetime"
            label="创建时间"
            >
          </el-table-column>
        </el-table>
      </div>
      <div class="block choice">
        <el-pagination
          @current-change="getcirculationList"
          background
          :current-page.sync="pageNoCirculation"
          @size-change="sizeChangeCirculation"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="10"
          layout="sizes, total, prev, pager, next, jumper"
          :total="pageAllCirculation">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCirculation = false">取 消</el-button>
        <el-button type="primary" @click="showCirculation = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 拨打记录操作 -->
    <el-dialog
      title="拨打记录"
      :visible.sync="showDial"
      width="60%"
      >
      <div class="list">
        <el-table :data="dialList"
                  style="width: 100%"
                  :cell-style='cellStyle'
                  >
          <el-table-column
            prop="dialTime"
            label="拨打时间"
            >
          </el-table-column>
          <el-table-column
            prop="dialResult"
            label="拨打结果"
            >
          </el-table-column>
          <el-table-column
            prop="operator"
            label="话务员"
            >
          </el-table-column>
        </el-table>
        <div class="block choice">
          <el-pagination
            @current-change="getListDial"
            background
            :current-page.sync="pageNoDial"
            @size-change="sizeChangeDial"
            :page-sizes="[10, 20, 30, 50, 100]"
            :page-size="10"
            layout="sizes, total, prev, pager, next, jumper"
            :total="pageAllDial">
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDial = false">取 消</el-button>
        <el-button type="primary" @click="showDial = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 转派 -->
    <el-dialog
      title="转派"
      :visible.sync="showTransfer"
      width="60%"
      >
      <div>
        <span>话务员:</span>
        <el-select v-model="telephonist" placeholder="请选择" size='mini' class="selectChoice" @change="selectTelephonist">
          <el-option
              v-for='(item, index) in telephonistList'
              :label='item.userName'
              :value='item.id'
              :key='index'
          >
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showTransfer = false">取 消</el-button>
        <el-button type="primary" @click="transferSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加拨打记录操作 -->
    <el-dialog
      title="添加拨打结果"
      :visible.sync="showAddDial"
      width="60%"
      >
      <el-button @click="unNeed">不需要</el-button>
      <el-button @click="toCertified">待认证</el-button>
      <el-button @click="noAnswer">未接听</el-button>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAddDial = false">取 消</el-button>
        <el-button type="primary" @click="addDialSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 禁用 -->
    <el-dialog
      title="禁用"
      :visible.sync="showForbidden"
      width="60%"
      >
      <div>是否禁用该会员</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showForbidden = false">取 消</el-button>
        <el-button type="primary" @click="ForbiddenSure">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 恢复 -->
    <el-dialog
      title="恢复"
      :visible.sync="showRecover"
      width="60%"
      >
      <div>是否恢复该会员</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showRecover = false">取 消</el-button>
        <el-button type="primary" @click="RecoverSure">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {selectUnAuthUserList, UserForbidden, UserRecover,listTelephonist,distributionMember,reDistributionMember,selectCallList,addCallResult,listDialDistributeRecordHistory} from '@/API'
import _default,{ mapMutations } from 'vuex'
let currentPage=1;
export default {
  data: () => {
    return {
      isShowSearchMore:0,
      userList: [],//会员列表
      circulationList: [],//流转记录
      dialList: [],//拨打记录
      telephonistList:[],//话务员数组
      telephones:{},
      channelName:'',//渠道商名称
      searchPhone: '',//手机号
      searchName: '',//用户名
      telephonist:'',//选择话务员
      authState: '',//认证状态
      accountState: '',//账号状态
      dispatchState:'',//分配状态查询
      riskState: '',//机审状态
      trustState: '',//信审状态
      callResult: '',//拨打结果
      choiceCallResult:'',//添加拨打结果
      choiceIdArr:[],//多选数组
      showDispatch:false,//分配
      showCirculation:false,//流转记录
      showTransfer:false,//转派
      showDial:false,//拨打记录
      showAddDial:false,//添加拨打记录
      showForbidden:false,//禁止会员
      showRecover:false,//恢复会员
      pageNo: currentPage,//当前页
      pageNoDial: 1,//拨打记录当前页
      pageNoCirculation: 1,//流转记录当前页
      pageSize: 10,//每页条数
      pageSizeDial: 10,//拨打记录每页条数
      pageSizeCirculation: 10,//流转记录每页条数
      pageAll: 0,//总条数
      pageAllDial: 0,//拨打记录总条数
      pageAllCirculation: 0,//流转记录总条数
      cellStyle:{
        'line-height': '16px;'
      },
      dateTime: '',//时间
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
      icon:{//图片
        refuse:"../../static/img/refuse.svg",
        pass:"../../static/img/pass.svg",
      }
    }
  },
  beforeMount(){
    if(currentPage>1) this.pageNo=currentPage;
    this.getList();//会员列表
    this.listTelephonistApi();//话务员列表
  },
  methods: {
    ...mapMutations({
      setIdenti: 'SETIDENTI'
    }),
    //展开或收缩查询
    searchMore(isShow=0){
      this.isShowSearchMore=isShow;
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
      this.choiceIdArr=[];
      for(let i = 0;i<val.length;i++){
        this.choiceIdArr.push(val[i].userId);
      }
      console.log("多选",this.choiceIdArr)
    },
    dispatch(){//分配
      if(this.choiceIdArr.length>="1"){
        this.showDispatch = true;
      } else{
        this.$message.warning("请选着具体订单!")
      }
    },
    dispatchSure(){//确定分配订单
      if(this.telephonist == ''){
        this.$message('请选择话务员');
        return
      }
      distributionMember({
        callAdminId:this.telephonist,//话务员id(分配给哪个话务员)
        userId:this.choiceIdArr,//用户id数组
      }).then((res)=>{
        console.log("分配结果",res)
        if(!res.data.success){
          this.$message.error(res.data.msg);
        }else{
          this.$message.success("订单分配成功");
          this.getList()
          this.telephonist = '';
        }
      })
      this.showDispatch = false;
    },
    circulationJson(data){//对象
      data={
        index:1,//序号
        preOperationalState:this.toSex(javaData.sex),//操作前状态
        postOperationalState:self.authToIcon(javaData.zhifubaoAuth),//操作后状态
        operationalType:self.authToIcon(javaData.zhifubaoAuth),//操作类型
        collectionGroup:self.authToIcon(javaData.zhifubaoAuth),//催收组
        orderGroup:self.authToIcon(javaData.zhifubaoAuth),//订单组
        createTime:self.authToIcon(javaData.zhifubaoAuth),//创建时间
        operator:self.authToIcon(javaData.zhifubaoAuth),//操作人
        operatingNotes:self.authToIcon(javaData.zhifubaoAuth),//操作备注
        currentCollector:self.authToIcon(javaData.zhifubaoAuth),//当前催收员
      };
      // data.addTag=function(tag){
      //   let parma={
      //     id:this.id,
      //     tag:tag,
      //   }
      //   let self=this;
      //   api.run(()=>{
      //     self.alipayAuth=tag;
      //   })
      // }
      return data
    },
    circulationRecord(){//流转记录
      if(this.choiceIdArr.length=="1"){
        this.showCirculation = true;
        this.getcirculationList();
      } else if(this.choiceIdArr.length>"1"){
        this.$message.warning("请选着一个具体订单!");
      } else{
        this.$message.warning("请选着具体订单!")
      }
    },
    getcirculationList(isOr){//流转记录

      listDialDistributeRecordHistory({
        userId:this.choiceIdArr[0],
        current: this.pageNoCirculation,//页码
        size: this.pageSizeCirculation,//每页页数
      }).then((res)=>{
        console.log("流转记录",res.data.data)
        res = res.data.data
        this.circulationList = res.records;
        this.pageAllCirculation = res.total
      })
    },

    dialRecord(){//拨打记录
      if(this.choiceIdArr.length=="1"){
        this.getListDial(0)
        this.showDial = true;
      } else if(this.choiceIdArr.length>"1"){
        this.$message.warning("请选着一个具体订单!");
      } else{
        this.$message.warning("请选着具体订单!")
      }
    },
    getListDial(isOr){//拨打记录列表
      if(isOr == 0){
        this.pageNoDial = 1
      }
      selectCallList({
        userId:this.choiceIdArr[0],//客户id
        current:this.pageNoDial,//客户id
        size:this.pageSizeDial,//客户id
      }).then((res)=>{
        console.log("拨打记录列表",res);
        res = res.data.data
        res.records.forEach((element,index) => {
          res.records[index].dialTime = res.records[index].gmtDatetime
          switch(element.callResult){
            case 0:
              res.records[index].dialResult = "未拨打"
              break;
            case 1:
              res.records[index].dialResult = "不需要"
              break;
            case 2:
              res.records[index].dialResult = "待认证"
              break;
            case 3:
              res.records[index].dialResult = "未接听"
              break;

          }
          res.records[index].operator = res.records[index].adminName
        });
        this.dialList = res.records
        this.pageAllDial = res.total
      })
    },
    transfer(){//转派
      if(this.choiceIdArr.length>="1"){
        this.showTransfer = true;
      } else{
        this.$message.warning("请选着具体订单!")
      }
    },
    transferSure(){//确定转派订单
      if(this.telephonist == ''){
        this.$message('请选择话务员');
        return
      }
      reDistributionMember({
        callAdminId:this.telephonist,//话务员id(分配给哪个话务员)
        userId:this.choiceIdArr,//用户id数组
      }).then((res)=>{
        if(!res.data.success){
          this.$message.error(res.data.msg);
        }else{
          this.$message.success("订单转派成功");
          this.telephonist = '';
          this.getList()
        }
      })
      this.showTransfer = false;

    },
    unNeed(){//不需要
      this.choiceCallResult = "1"
    },
    toCertified(){//待认证
      this.choiceCallResult = "2"
    },
    noAnswer(){//未接听
      this.choiceCallResult = "3"
    },
    addDialResult(){//添加拨打结果
      if(this.choiceIdArr.length=="1"){
        this.showAddDial = true;
      } else if(this.choiceIdArr.length>"1"){
        this.$message.warning("请选着一个具体订单!");
      } else{
        this.$message.warning("请选着具体订单!")
      }

    },
    addDialSure(){//确定添加拨打结果
      if(this.choiceCallResult){
        addCallResult({
            userId:this.choiceIdArr[0],//客户id
            callResult:this.choiceCallResult,//拨打结果
          }).then((res)=>{
            console.log("添加拨打结果",res)
            this.userList.forEach((item,index)=>{
              if(item.userId == this.choiceIdArr[0]){
                this.userList[index].callResult = this.choiceCallResult;
                switch(this.choiceCallResult){//拨打结果
                  case '0':
                    this.userList[index].dialState = "未拨打"
                    break;
                  case '1':
                    this.userList[index].dialState = "不需要"
                    break;
                  case '2':
                    this.userList[index].dialState = "待认证"
                    break;
                  case '3':
                    this.userList[index].dialState = "未接听"
                    break;
                  default:
                    this.userList[index].dialState = ""
                }
              }
            })
            this.$message.success("拨打结果添加成功!");
            this.choiceCallResult = "";//拨打结果置空
        })
        this.showAddDial = false;
      }else{
        this.$message.warning("请选着拨打标签!");
      }

    },
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
    sizeChangeDial(size){//拨打记录分页
      this.pageSizeDial = size;
      this.getListDial(0);
    },
    sizeChangeCirculation(size){//流转记录分页
      this.pageSizeCirculation = size;
      this.getcirculationList(0);
    },
    toDetail(id) {
      this.setIdenti({Id:id, ifLoan:0})
      this.$router.push({name: 'loanIdenti'})
    },


    getList(isOr) {//分页查询会员列表
      if(isOr == 0){
        this.pageNo = 1
      }
      currentPage = this.pageNo;
      let params = {
        userName: this.searchName,//用户名
        current: this.pageNo,//页码
        size: this.pageSize,//页数
        phone: this.searchPhone,//手机号
        authStatus: this.authState,//认证状态:
        userStatus: this.accountState,//用户状态:
        riskStatus: this.riskState,//风控状态:
        authSecondStatus: this.trustState,//信审状态::
        callResult: this.callResult,//拨打结果:
        isDistribution: this.dispatchState,//分配状态:
        channelName:this.channelName,//渠道商名称
      }
      if(this.dateTime){//创建时间
        params.gmtDatetime = this.dateTime[0] + `~` + this.dateTime[1]
      }else{
        params.gmtDatetime = ''
      }

      let self=this;
      selectUnAuthUserList(params).then((data)=>{//分页查询会员未认证列表接口
        console.log('未认证列表',data);
        data=data.data.data;
        this.userList = [];
        if(data){
          data.list.forEach((element,index) => {
            // this.userList.push(self.java2js(element));
            data.list[index].sex=self.toSex(data.list[index]);    //性别
            data.list[index].authList=[];
            data.list[index].authList['basic']={status:self.authToText(data.list[index].baiscAuth),type:'基'};
            data.list[index].authList['identity']={status:self.authToText(data.list[index].identityAuth),type:' 身'};
            data.list[index].authList['phone']={status:self.authToText(data.list[index].phoneAuth),type:'手'};
            data.list[index].authList['bank']={status:self.authToText(data.list[index].bankAuth),type:'银'};
            data.list[index].authList['taobao']={status:self.authToText(data.list[index].taobaoAuth),type:'淘'};
            data.list[index].authList['zhifubao']={status:self.authToText(data.list[index].zhifubaoAuth),type:'支'};
            data.list[index].baiscAuth=self.authToIcon(data.list[index].baiscAuth);    //个人信息认证
            data.list[index].identityAuth=self.authToIcon(data.list[index].identityAuth);    //身份认证
            data.list[index].phoneAuth=self.authToIcon(data.list[index].phoneAuth);    //手机认证
            data.list[index].bankAuth=self.authToIcon(data.list[index].bankAuth);    //银行卡认证
            data.list[index].taobaoAuth=self.authToIcon(data.list[index].taobaoAuth);    //淘宝认证
            data.list[index].alipayAuth=self.authToIcon(data.list[index].zhifubaoAuth);    //支付宝认证
            //data.list[index].authState=self.authToIcon(data.list[index].authStatus);    //认证状态

            switch(data.list[index].authStatus){//认证状态
              case "0":
                data.list[index].authState = "未认证"
                break;
              case "1":
                data.list[index].authState = "已认证"
                break;
              default:
                data.list[index].authState = ""
            }


            switch(data.list[index].userStatus){//账号状态
              case '1':
                data.list[index].accountState = "正常"
                break;
              // case '2':
              //   data.list[index].accountState = "黑名单"
              //   break;
              case '3':
                data.list[index].accountState = "禁用"
                break;
              // case '4':
              //   data.list[index].accountState = "被拒绝"
              //   break;
              default:
                data.list[index].accountState = ""
            }
            switch(data.list[index].callResult){//拨打结果
              case '0':
                data.list[index].dialState = "未处理"
                break;
              case '1':
                data.list[index].dialState = "不需要"
                break;
              case '2':
                data.list[index].dialState = "待认证"
                break;
              case '3':
                data.list[index].dialState = "未接听"
                break;
              default:
                data.list[index].dialState = ""
            }
            switch(data.list[index].isDistribution){//分配状态
              case "0":
                data.list[index].dispatchState = "未分配"
                break;
              case "1":
                data.list[index].dispatchState = "已分配"
                break;
              default:
                data.list[index].dispatchState = "";
            }
            data.list[index].operator=data.list[index].callAdmin
          });
          this.userList = data.list
          console.log(this.userList);
          this.pageAll = data.total
        }

      })
    },

    listTelephonistApi(){//查询话务员列表接口
      listTelephonist({//查询话务员列表

      }).then((res)=>{
        res = res.data.data
        this.telephonistList = res;
        this.telephones={};
        res.forEach(item => {
          this.telephones[item.id]=item;
        });
        console.log("查询话务员",this.telephones)
      })
    },
    //根据id获取话务员名称
    getTelePhoneNameById(id){
      return this.telephones[id].userName;
    },
    selectTelephonist(){
      console.log("话务员",this.telephonist)
    },
    //禁用会员
    forbidden(id) {//禁用会员
      if(this.choiceIdArr.length=="1"){
        this.showForbidden = true;
      } else if(this.choiceIdArr.length>"1"){
        this.$message.warning("请选着一个具体订单!");
      } else{
        this.$message.warning("请选着具体订单!")
      }
    },
    ForbiddenSure(){//禁止
      UserForbidden({
        id:this.choiceIdArr[0],
      }).then((res)=>{
        console.log("禁止",res)
        this.$message.success('禁止成功');
        this.userList.forEach((item,index)=>{
          if(this.choiceIdArr[0] == item.userId){
             this.userList[index].accountState = "禁用";
          }
        })
        this.showForbidden = false;
      })
    },
    recover() {//会员恢复
      if(this.choiceIdArr.length=="1"){
        this.showRecover = true;
      } else if(this.choiceIdArr.length>"1"){
        this.$message.warning("请选着一个具体订单!");
      } else{
        this.$message.warning("请选着具体订单!")
      }
    },
    RecoverSure(){//恢复会员
      UserRecover({
        id:this.choiceIdArr[0]
      }).then((data)=>{
        if(data.data.code == 'SUCCESS'){
          this.$message.success('恢复成功');
          this.userList.forEach((item,index)=>{
          if(this.choiceIdArr[0] == item.userId){
             this.userList[index].accountState = "正常";
          }
        })
          this.showRecover = false;
        }
      })
    },
    toSex(item){
      switch(item.sex){
        case '0':
        case 0:
          return "女"
          break;
        case '1':
        case 1:
          return "男"
          break;
        default:
          return ""
      }
    },
    //认证转为文字
    authToText(status){
      switch(status){
        case 0:
        case "0":
          return "info"
          break;
        case 1:
        case "1":
          return 'success'
          break;
        default:
          return "warning"
      }
    },
    authToIcon(status){
      switch(status){
        case 0:
        case "0":
          return this.icon.refuse
          break;
        case 1:
        case "1":
          return this.icon.pass
          break;
        default:
          return ""
      }
    },


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
        width: 8%;
        margin-right: 10px;
      }
      .search{
        width: 16.7%;
        margin-right: 10px;
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
