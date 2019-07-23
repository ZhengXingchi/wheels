<template>
  <div class="allPage">
    <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
      <el-tab-pane label="基本配置" name="baseSetting">
        <div class="content">
          <div class="title">
            |&nbsp;&nbsp;&nbsp;续期手续费
          </div>
          <div class="myinput">
            <span class="left">续期手续费：</span><el-input placeholder="请输入内容"  v-model="xuqiMoney" class="inA"></el-input><span class="right">*</span>
          </div>
          <div class="myBtn">
            <el-button  type="primary" @click='saveXuqi'>保存</el-button>
          </div>
        </div>
        <Divider />
        <div class="content">
          <div class="title">
            |&nbsp;&nbsp;&nbsp;续期续借开关
          </div>
          <div class="myinput">
            <el-switch
              style="display: inline-block;margin-left:120px;"
              v-model="extend"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="展期打开"
              inactive-text="展期关闭">
            </el-switch>
            <!-- <el-switch
              style="display: inline-block; margin-left: 100px;"
              v-model="before"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="续借打开"
              inactive-text="续借关闭">
            </el-switch> -->
          </div>
          <div class="myBtn">
            <el-button   @click='saveConfig' type="primary" >保存</el-button>
          </div>
        </div>
        <Divider />
        <div class="content">
          <div class="title">
            |&nbsp;&nbsp;&nbsp;支付宝支付图片
          </div>
          <div class="myinput">
            <img width="18%" :src="zhiFuBaoBase641" alt="">
            <el-upload
              action="api"
              list-type="picture-card"
              :on-remove="pictureZhifubaoRemove"
              :on-change='pictureZhifubao'
              :limit='1'
              :auto-upload="false"
              style="display:inline"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog >
              <img width="100%" :src="zhiFuBaoBase64" alt="">
            </el-dialog>
          </div>
          <div class="myBtn">
            <el-button  @click='savePicture(1)' type="primary" >保存</el-button>
          </div>
        </div>
        <Divider />
        <div class="content">
          <div class="title">
            |&nbsp;&nbsp;&nbsp;微信支付图片
          </div>
          <div class="myinput">
            <img width="18%" :src="weiXinBase641" alt="">
            <el-upload
              action="api"
              list-type="picture-card"
              :on-remove="pictureWeixinRemove"
              :on-change='pictureWeixin'
              :limit='1'
              :auto-upload="false"
              style="display:inline;"
              >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog >
              <img width="100%" :src="weiXinBase64" alt="">
            </el-dialog>
          </div>
          <div class="myBtn">
            <el-button   @click='savePicture(2)' type="primary" >保存</el-button>
          </div>
        </div>
        <Divider />
        <div class="content">
          <div class="title">
            |&nbsp;&nbsp;&nbsp;设置额度
          </div>
          <div class="myinput">
            <span class="left">用户额度：</span><el-input size="mini" placeholder="请输入内容"  v-model="money" class="inA"></el-input><span class="right">*</span>
          </div>
          <div class="myBtn">
            <el-button  type="primary" @click='saveMoney'>保存</el-button>
          </div>
        </div>

      </el-tab-pane>
      <el-tab-pane label="基本风控规则配置" name="riskSetting">
        <div class="content">
          <div class="title">
            |&nbsp;&nbsp;&nbsp;同盾配置
          </div>
          <div class="myinput">
            <span class="left">同盾分数：</span><el-input size="mini" placeholder="请输入内容"  v-model="tongdunfenshu" class="inA"></el-input><span class="right">*小于等于该值表示通过</span>
          </div>
          <div class="myBtn">
            <el-button  type="primary"  @click='saveTong'>保存</el-button>
          </div>
        </div>

      
        <div class="content">
          <div class="title">
            |&nbsp;&nbsp;&nbsp;年龄
          </div>
          <div class="myinput">
            <span class="left">年龄：</span>
            <el-input size="mini" placeholder="请输入内容"  v-model="lowAge" class="inB"></el-input>
            <span>-</span>
            <el-input size="mini" placeholder="请输入内容"  v-model="highAge" class="inB"></el-input>
            <span class="right" style="margin-left: 20px;">*</span>
          </div>
          <div class="myBtn">
            <el-button  type="primary" @click='saveNianlin'>保存</el-button>
          </div>
        </div>

        <div class="content">
          <div class="title">
            |&nbsp;&nbsp;&nbsp;最大件数
          </div>
          <div class="myinput">
            <span class="left">最大件数：</span><el-input size="mini" placeholder="请输入内容"  v-model="maxAuditNum" class="inA"></el-input><span class="right">*</span>
          </div>
          <div class="myBtn">
            <el-button  type="primary" @click='saveMax'>保存</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="其它设置" name="otherSetting">

        <div class="content">
          <div class="title">
            |&nbsp;&nbsp;&nbsp;客服QQ
          </div>
          <div class="myinput">
            <span class="left">客服QQ：</span><el-input size="mini" placeholder="请输入内容"  v-model="customServiceQq" class="inA"></el-input><span class="right">*</span>
          </div>
          <div class="myBtn">
            <el-button  type="primary" @click='saveQQ'>保存</el-button>
          </div>
          <div class="title">
            |&nbsp;&nbsp;&nbsp;七陌客服QQ
          </div>
          <div class="myinput">
            <span class="left">七陌客服QQ：</span><el-input size="mini" placeholder="请输入内容"  v-model="customServiceQiMoQq" class="inA"></el-input><span class="right">*</span>
          </div>
          <div class="myBtn">
            <el-button  type="primary" @click='saveQiMoQQ'>保存</el-button>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  
  </div>
</template>
<script>

import {setRiskAgeNianlin,getPhones, systemParamMoney, systemParamNianlin, systemParamPhone, systemParamTong, systemParamXuqi, systemRetSave, systemParamPicture} from '@/API'
import Divider from '@/components/divider/divider'
export default {
  components:{Divider},
  data: () => {
    return {
      lowAge:0,
      highAge:100,
      
      tongdunfenshu:'',
      money: '',
      nianlin: '',
      maxAuditNum: '',
      xuqiMoney: '',
      customServiceQq: '',
      phoneNum: [],
      shouji: '',
      customServiceQiMoQq: '',
      extend: false,
      before: false,
      zhiFuBaoBase641: '',
      zhiFuBaoBase64: '',
      weiXinBase641: '',
      weiXinBase64: '',
      activeTab: 'baseSetting'
    }
  },
  beforeMount(){
    this.getList();
    
  },
  mounted(){
    systemParamPicture({}).then(data=>{
      if(data.data.code == 'SUCCESS'){
        let res = data.data.data;
        this.zhiFuBaoBase641 = res.AlipayUrl;
        this.weiXinBase641 = res.WeiXinPayUrl;
      }else{
        this.$message(data.data.msg)
      }
    })
  },
  methods: {
    pictureZhifubao(file) {//支付宝图片
      // console.log(this)
      let VueThis = this
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function () {
       VueThis.zhiFuBaoBase64 = reader.result
      };
    },
    handleClick(tab, event){
      
    },
    pictureZhifubaoRemove(file, fileList) {
      this.zhiFuBaoBase64 = ''
    },
    pictureWeixin(file) {//微信图片
      // console.log(file)
      let VueThis = this
      var reader = new FileReader();
      reader.readAsDataURL(file.raw);
      reader.onload = function () {
       VueThis.weiXinBase64 = reader.result
      };
    },
    //删除微信图片
    pictureWeixinRemove(file, fileList) {
      this.weiXinBase64 = ''
    },
    savePicture(isZhi) {//保存图片
      if(isZhi === 1){
        if(this.zhiFuBaoBase64 == ''){
          this.$message.error('请选择上传图片')
          return
        }
        let params = {
          type: isZhi,
          base64: this.zhiFuBaoBase64
        }
        if(confirm("是否保存图片")){
          systemParamPicture(params).then(data=>{
            if(data.data.code == 'SUCCESS'){
              this.$message('成功');
            }else{
              this.$message(data.data.msg)
            }
          })
        }
      }else if(isZhi === 2){
        if(this.weiXinBase64 == ''){
          this.$message.error('请选择上传图片')
          return
        }
        let params = {
          type: isZhi,
          base64: this.weiXinBase64
        }
        if(confirm("是否保存图片")){
          systemParamPicture(params).then(data=>{
            if(data.data.code == 'SUCCESS'){
              this.$message('成功');
            }else{
              this.$message(data.data.msg)
            }
          })
        }
      }
    },
    saveConfig(isSave) {
      if(confirm("是否保存")){
        let params = {
          xuqiButton: this.extend ? 1 : 0,
          xujieButton: this.before ? 1 : 0,
        }
        systemRetSave(params).then(data=>{
          if(data.data.code === 'SUCCESS'){
            this.$message.success('设置成功')
          }
        })
      }
    },
    saveTong() {
      if(isNaN(this.tongdunfenshu)){
        this.$message('请输入正确的数字')
        return
      }
      let params = {
        tongdunfenshu:this.tongdunfenshu
      }
      systemParamTong(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.getList();
        }
      })
    },
    saveXuqi() {
      if(isNaN(this.xuqiMoney)){
        this.$message('请输入正确的数字')
        return
      }
      let params = {
        xuqiMoney:this.xuqiMoney
      }
      systemParamXuqi(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.getList();
        }
      })
    },
    saveMax() {
      let params = {
        type:'maxAuditNum',
        params: this.maxAuditNum
      }
      systemParamNianlin(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.getList();
        }
      })
    },
    saveQiMoQQ() {
      let params = {
        type:'qiMoQq',
        params: this.customServiceQiMoQq
      }
      systemParamNianlin(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.getList();
        }
      })
    },
    saveQQ() {
      let params = {
        type:'customServiceQq',
        params: this.customServiceQq
      }
      systemParamNianlin(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.getList();
        }
      })
    },
    // saveNianlin() {
    //   let params = {
    //     params: this.nianlin,
    //     type: 'nianlin'
    //   }
    //   systemParamNianlin(params).then(data=>{
    //     if(data.data.code == 'SUCCESS'){
    //       this.$message('成功');
    //       this.getList();
    //     }
    //   })
    // },
    saveNianlin() {
      let params = {
        // params: this.lowAge,
        // params: this.highAge,
        // type: 'nianlin'
      }
      params.lowAge = this.lowAge
      params.highAge = this.highAge
      setRiskAgeNianlin(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.getList();
        }
      })
    },
    saveShouji() {
      let params = {
        params: this.shouji,
        type: 'shouji'
      }
      systemParamNianlin(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.getList();
        }
      })
    },
    saveMoney() {
      if(isNaN(this.money)){
        this.$message('请输入正确的数字')
        return
      }
      let params = {
        money:this.money
      }
      systemParamMoney(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.getList();
        }
      })
    },
    savePhone() {
      let params = {
        phone1:this.phoneNum[0],
        phone2:this.phoneNum[1],
        phone3:this.phoneNum[2],
        phone4:this.phoneNum[3],
        phone5:this.phoneNum[4],
        phone6:this.phoneNum[5],
        phone7:this.phoneNum[6],
        phone8:this.phoneNum[7],
        phone9:this.phoneNum[8],
        phone10:this.phoneNum[9],
      }

      systemParamPhone(params).then(data=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.getList();
        }
      })
    },
    getList(isOr) {
      let phoneList = []
      getPhones().then(data=>{
        // console.log(data);
        let obj = data.data.data
        for(let i = 0; i < obj.length; i++){
          if(obj[i].id == 16){
            this.tongdunfenshu = obj[i].configValue
          }
          if(obj[i].id == 17){
            this.money = obj[i].configValue
          }
          if(obj[i].id == 18){
            this.nianlin = obj[i].configValue
          }
          if(obj[i].id == 20){
            this.shouji = obj[i].configValue
          }
          if(obj[i].id == 23){
            this.customServiceQq = obj[i].configValue
          }
          if(obj[i].id == 43){
            this.xuqiMoney = obj[i].configValue
          }
          if(obj[i].id == 45){
            this.maxAuditNum = obj[i].configValue
          }
          if(obj[i].id == 65){
            this.customServiceQiMoQq = obj[i].configValue
          }
          if(obj[i].id > 45 && obj[i].id<56){
            phoneList.push(obj[i].configValue)
          }
        }
        this.phoneNum = [];
        this.phoneNum = this.phoneNum.concat(phoneList);
        // console.log(this.phoneNum);
      })
      systemRetSave().then(data=>{
        let objData = data.data.data
        if(objData.xuQi === 'ON'){
          this.extend = true
        }else if(objData.xuQi === 'OFF'){
          this.extend = false
        }
        if(objData.xuJie === 'ON'){
          this.before = true
        }else if(objData.xuJie === 'OFF'){
          this.before = false
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
.myBtn{
  margin:10px 200px;
  text-align: right;
}
  .allPage{
    .content{
      background: #FFF;
      padding:20px 20px 0;
      font-size: 14px;
      .title{
        color:#3499FF;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .myinput{
        margin-bottom: 10px;
        .left{
          display: inline-block;
          width: 100px;
          text-align: right;
          margin-right: 20px;
        }
        .inA{
          width: 30%;
          margin-right: 20px;
        }
        .inB{
          width: 15%;
        }
        .right{
          display: inline-block;
          width:300px;
        }
      }
      .publicMidBtn{
        margin-left: 120px;
      }
    }

  }
</style>
