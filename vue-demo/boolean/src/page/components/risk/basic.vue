<template>
<div>
  <el-row :gutter="20" style="margin-left:10px;margin-bottom: 10px;">
    <el-tag type="warning" v-if="identiList.oldYear>35">年龄超过35</el-tag>
    <el-tag type="danger" v-if="blackArea.indexOf(identiList.province)>=0">身份证所在省份*{{identiList.province}}*</el-tag>
    <el-tag type="danger" v-if="urgentList.length==0">紧急联系人未匹配通话记录</el-tag>
    <el-tag type="info" v-if="identiList.phone!=identiList.auPhone">注册手机号和认证手机号不匹配</el-tag>
    <el-tag type="danger" v-if="identiList.zhimaPoint==null">芝麻信用未匹配</el-tag>
    <el-tag type="warning" v-if="identiList.zhimaPoint!=null&&identiList.zhimaPoint<450">芝麻信用小于450</el-tag>
  </el-row>
  <el-card class="box-card">
    <div slot="header" class="clearfix" style="rgba(66,185,131,.1)">
      <span>基本信息</span>
      <span style="color:red;margin-left:50px;">风控得分:</span>
      <span style="color:red;">{{identiList.score}}</span>
      <div style="float: right;">
        <el-button @click="toCom" type="primary" size='mini' style="padding: 4px;">通讯录记录</el-button>
        <el-button @click="toSevenR" type="primary" size='mini' style="padding: 4px;margin-right:10px;">七天通话记录</el-button>
        <!-- <el-button @click="toTongD" type="primary" size='mini' style="padding: 4px;margin-right:10px;">同盾贷前报告</el-button> -->
        <el-button @click="toMohe" type="primary" size='mini' style="padding: 4px;">魔盒报告</el-button>
      </div>
    </div>
    <el-form  label-position="left" inline class="base-table-expand">
      <el-form-item label="姓名:">
        <span>{{identiList.userName}}</span>
      </el-form-item>
      <el-form-item label="性别:">
        <span>{{identiList.sex}}</span>
      </el-form-item>
      <el-form-item label="地址:">
        <span style="width: 300px;height: 20px;line-height: 20px;display:inline-block;overflow: hidden">{{identiList.addressDetails}}</span>
      </el-form-item>
    </el-form>
    <el-form  label-position="left" inline class="base-table-expand">
      <el-form-item label="真实姓名:">
        <span>{{identiList.idUserName}}</span>
      </el-form-item>
      <el-form-item label="年龄:">
        <span>{{identiList.identityNum|idCardConvert(3)}}</span>
      </el-form-item>
      <el-form-item label="身份证号:">
        <span>{{identiList.identityNum}}</span>
      </el-form-item>
    </el-form>
    <el-form  label-position="left" inline class="base-table-expand">
      <el-form-item label="银行卡号:">
        <span>{{identiList.bankcardno}}</span>
      </el-form-item>
      <el-form-item label="预留手机号:">
        <span>{{identiList.bankPhone}}</span>
      </el-form-item>
      <el-form-item label="银行卡类型:">
        <span>{{identiList.bankName}}</span>
      </el-form-item>
    </el-form>
    <el-form  label-position="left" inline class="base-table-expand">
      <el-form-item label="淘宝账号:">
        <span>{{identiList.tbNickName}}</span>
      </el-form-item>
      <el-form-item label="淘宝绑定手机:" label-width="120px">
        <span>{{identiList.tbPhone}}</span>
      </el-form-item>
      <el-form-item label="芝麻信用:">
        <span>{{identiList.zhimaPoint}}</span>
      </el-form-item>
      <el-form-item label="花呗额度:">
        <span>{{identiList.huabeiQuota}}</span>
      </el-form-item>
      <el-form-item label="借呗额度:">
        <span>{{identiList.jiebeiQuota}}</span>
      </el-form-item>
    </el-form>
    <h5>紧急联系人</h5>
    <el-table :data="urgentList"
              style="width: 60%;margin-bottom: 5px;"
              :cell-style='cellStyle'
    >
      <el-table-column
        prop="name"
        label="姓名"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="link"
        label="关系"
        width='60'
      >
      </el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width='120'
      >
      </el-table-column>
      <el-table-column
        prop="belongArea"
        label="地区"
        width="120">
      </el-table-column>
      <el-table-column
        prop="callTimes"
        label="通话次数"
        width='80'
      >
      </el-table-column>
      <el-table-column
        prop="callCountActive"
        label="主叫次数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="callCountPassive"
        label="被叫次数"
        width="80">
      </el-table-column>
      <el-table-column
        prop="callTime"
        label="通话时长"
        width="80">
      </el-table-column>
    </el-table>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <img :src="identiList.identityFront || defaultSrc" alt="点击放大" class="myImg" @click='openImg'>
          <div style="padding: 14px;">
            <span>身份证正面</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card >
          <img :src="identiList.identityBack || defaultSrc" alt="点击放大" class="myImg" @click='openImg'>
          <div style="padding: 14px;">
            <span>身份证反面</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card >
          <img :src="identiList.faceUrl || defaultSrc" alt="点击放大" class="myImg" @click='openImg' style="height:160px;width:auto">
          <div style="padding: 14px;">
            <span>活体照片</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-card>



  <!-- 七天通话记录 -->
  <el-dialog
    title="七天通话记录"
    :visible.sync="showSevenR"
    width="70%"
  >
    <div class="list">
      <el-table :data="sevenRList"
                style="width: 100%"
                :cell-style='cellStyle'
      >
        <el-table-column
          prop="id"
          label="ID"
          width="110"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="联系人姓名"
          width='100'
        >
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width='115'
        >
        </el-table-column>
        <el-table-column
          prop="belongArea"
          label="所在地区"
        >
        </el-table-column>
        <el-table-column
          prop="callCountWeekMonth"
          label="周-月-三月通话次数"
          width='110'
        >
        </el-table-column>
        <el-table-column
          prop="callTimes"
          label="通话次数"
          width="120">
        </el-table-column>
        <el-table-column
          prop="callTime"
          label="通话时长"
          width='120'
        >
        </el-table-column>
        <el-table-column
          prop="callCountActive"
          label="主叫次数"
          width="80">
        </el-table-column>
        <el-table-column
          prop="callCountPassive"
          label="被叫次数"
          width="80">
        </el-table-column>
      </el-table>
      <!-- 七天通话记录 -->
      <div class="block choice">
        <el-pagination
          @current-change="toSevenR"
          background
          @size-change="sizeChangeSeven"
          :current-page.sync="pageNoSeven"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="10"
          layout="sizes, total, prev, pager, next, jumper"
          :total="pageAllSeven">
        </el-pagination>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="showSevenR = false">关 闭</el-button>
      </span>
  </el-dialog>
  <!-- 打开图片 -->
  <el-dialog
    :visible.sync="imgShow"
    width="40%"
  >
    <img :src="imgSrc" alt="" style='width:100%;height:450px;'>
  </el-dialog>
</div>
</template>
<style>
  .box-card{
    margin-bottom: 10px;
  }
  .myImg{
    width: 100%;
    height:100%;
    cursor: pointer;
  }
  .base-table-expand {
    font-size: 0;
    background-color: #e8e8e859;
    margin-bottom: 5px;
    padding-left: 10px;
  }
  .base-table-expand .el-form-item{
    margin-right: 0;
    margin-bottom: 0;
    width: 25%;
  }
  .base-table-expand .el-form-item label{
    width: 90px;
    color: #99a9bf;
  }
</style>
<script>
  import {loanIdentiList,auditingUrgent,find1WeekByUserPage,getMoheToken,loanApplyBefore} from "@/API"
  import {IdCard} from '@/utils/tools'
    export default {
      data:()=>{
        return{
          blackArea:["黑龙江","新疆","西藏","广西","云南","辽宁","吉林","内蒙古"],
          identiList:{},
          userStatus: 10,//判断认证状态是否为暂时拒绝
          defaultSrc: require('../../../assets/default.png'),
          imgShow:false,
          imgSrc: '',
          urgentList:[],//关系人列表
          showSevenR: false,//七天通话记录
          sevenRList:[],
          pageAllSeven: 0,//七天通话记录总页数
          pageNoSeven: 1,//七天通话记录
          pageSizeSeven: 10,//七天通话记录每页页数
          cellStyle:{
            'line-height': '16px;'
          },
        }
      },
      props:{
        userId:{
          type:String,
          default:0
        },
        isLoaded:{
          type:Boolean,
          default:false
        }
      },
      watch:{
        isLoaded:function(val){
          if(val) this.getList();
        }
      },
      filters:{
        idCardConvert:function(idNum,type){
          if(idNum!=undefined){
            return IdCard(idNum,type);
          }
        }
      },
      beforeMount(){
        this.getList();
      },
      methods:{
        toSevenR(){//七天通话记录
          this.showSevenR = true
          let params={
            userId:this.userId,
            pageNo:this.pageNoSeven,
            pageSize: this.pageSizeSeven,
          }
          find1WeekByUserPage(params).then(data=>{//七天通话记录接口
            this.sevenRList = data.data.data.list
            this.pageAllSeven = data.data.data.total
          })
        },
        openImg(e) {
          // console.log(e);
          this.imgSrc = e.target.src
          // console.log(this.imgSrc);
          this.imgShow = true
        },
        sizeChangeSeven(size){//七天通话记录
          this.pageSizeSeven = size;
          this.toSevenR();
        },
        toMohe(){
          let taskId = this.identiList.taskId;
          let phone = this.identiList.phone;
          let toeken = '';
          let new_window = window.open("","","width=1200,height=800");
          getMoheToken().then(data=>{
            if(data.data.code==0){
              toeken = data.data.data;
              new_window.location = "https://report.shujumohe.com/report/"+ taskId + "/" + toeken;
            }else{
              this.$notify.error({
                title: '错误',
                message: '这是一条错误的提示消息'
              });
            }
          });


        },
        openUrgent() {
          let params = {
            userId: this.userId
          }
          auditingUrgent(params).then(data=>{
            this.urgentList = data.data.data
          })
        },
        toTongD() {
          let params = {
            userId: this.userId
          }
          loanApplyBefore(params).then(data=>{
            if(data.data.data!=null){
              let content = '[' + data.data.data + ']';
              let obj = JSON.parse(content)
              $.showReport(obj)
            }else{
              this.$message.error('系统未获取到贷前报告');
            }

          })
        },
        toCom(){
          this.$emit("toCom");
        },
        //获取用户认证信息
        getList(isOr) {
          let params = {};
          let that=this;
          // params.id = this.id
          params.userId = this.userId
          if(this.userId==null||this.userId==0){
            return this.$message({
              message:'请勿刷新当前页面',
              onClose:function(){
                that.$router.replace({name: 'auditing'})
              },
            })
          }
          loanIdentiList(params).then(data=>{
            console.log(data.data.data);
            
            that.identiList = data.data.data;
            that.userStatus = data.data.data.auth_status;
            that.$emit("setUserInfo",this.identiList);
            if(that.identiList.sex == '1'){
              that.identiList.sex = '男'
            }else{
              that.identiList.sex = '女'
            }
            that.identiList.oldYear = IdCard(that.identiList.identityNum,3)
            that.identiList.province = IdCard(that.identiList.identityNum,4)
            that.openUrgent();
          })
        },
      }
    }
</script>


