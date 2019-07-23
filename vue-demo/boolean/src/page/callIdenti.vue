<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle" @click='closeIdenti'>
        认证信息
      </div>
    </div>
    <div class="tabs">
      <!-- 基本信息 -->
      <div class="content">
        <div class="con_title">
          用户基本信息
        </div>
        <div class="contentItem">
          <div class="titletiao">
            借款人姓名:
          </div>
          <div class="substance">
            {{identiList.userName}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            借款人手机号码·:
          </div>
          <div class="substance">
            {{identiList.phone}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            学历:
          </div>
          <div class="substance">
            {{identiList.study}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            婚姻状态:
          </div>
          <div class="substance">
            {{identiList.marry}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            地址:
          </div>
          <div class="substance">
            {{identiList.addressDetails}}
          </div>
        </div>
      </div>
      <div class="content">
        <div class="con_title">
          身份认证
        </div>
        <div class="contentItem">
          <div class="titletiao">
            姓名:
          </div>
          <div class="substance">
            {{identiList.idUserName}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            性别:
          </div>
          <div class="substance">
            {{identiList.sex}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            身份证号码:
          </div>
          <div class="substance">
            {{identiList.identityNum}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            身份证正面:
          </div>
          <img :src="identiList.identityFront || defaultSrc" alt="点击放大" class="myImg" @click='openImg'>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            身份证背面:
          </div>
          <img :src="identiList.identityBack || defaultSrc" alt="点击放大" class="myImg" @click='openImg'>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            人脸照片:
          </div>
          <img :src="identiList.faceUrl || defaultSrc" alt="点击放大" class="myImg" @click='openImg'>
        </div>
      </div>
      <div class="content">
        <div class="con_title">
          手机认证
        </div>
        <div class="contentItem">
          <div class="titletiao">
            注册手机号:
          </div>
          <div class="substance">
            {{identiList.phone}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            认证手机号:
          </div>
          <div class="substance">
            {{identiList.auPhone}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            <el-button type="" size='mini' @click='toRecord' class="publicMidBtn">通话记录</el-button>
            <el-button type="" size='mini' @click='openUrgent' class="publicMidBtn">紧急联系人</el-button>
          </div>
          <div class="titletiao">
            <el-button type="" size='mini' @click='toMohe' class="publicMidBtn">魔盒报告</el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="con_title">
          银行卡认证
        </div>
        <div class="contentItem">
          <div class="titletiao">
            银行卡号:
          </div>
          <div class="substance">
            {{identiList.bankcardno}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            预留手机号码:
          </div>
          <div class="substance">
            {{identiList.bankPhone}}
          </div>
        </div>
      </div>
      <div class="content">
        <div class="con_title">
          淘宝认证
        </div>
        <div class="contentItem">
          <div class="titletiao">
            淘宝账号:
          </div>
          <div class="substance">
            {{identiList.tbNickName}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            绑定手机号:
          </div>
          <div class="substance">
            {{identiList.tbPhone}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            <el-button type="" size='mini' @click='toAddress' class="publicMidBtn">淘宝地址</el-button>
          </div>
          <div class="titletiao">
            <el-button type="" size="mini" class="publicMidBtn" @click='toBuyRe'>购买记录</el-button>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="con_title">
          支付宝认证
        </div>
        <div class="contentItem">
          <div class="titletiao">
            支付宝账号:
          </div>
          <div class="substance">
            {{identiList.aliNumber}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            支付宝密码:
          </div>
          <div class="substance">
            {{identiList.aliPwd}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            芝麻信用分:
          </div>
          <div class="substance">
            {{identiList.zhimaPoint}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            花呗额度:
          </div>
          <div class="substance">
            {{identiList.huabeiQuota}} 元
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            借呗额度:
          </div>
          <div class="substance">
            {{identiList.jiebeiQuota}} 元
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            花呗使用额度:
          </div>
          <div class="substance">
            {{identiList.huabeiUseBalance}} 元
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            余额宝:
          </div>
          <div class="substance">
            {{identiList.assetsYuEbao}} 元
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            账户余额:
          </div>
          <div class="substance">
            {{identiList.assetsYuE}} 元
          </div>
        </div>
      </div>
    </div>

    <!-- 打开图片 -->
    <el-dialog
      :visible.sync="imgShow"
      width="40%"
      >
      <img :src="imgSrc" alt="" style='width:100%;height:450px;'>
    </el-dialog>

  </div>
</template>
<script>
import {} from "@/API"
import { mapGetters, mapMutations } from 'vuex'

export default {
  data: () => {
    return {
      identiList:{},
      userList: [],
      imgShow:false,
      imgSrc: '',
      defaultSrc: require('../assets/default.png')
    }

  },
  beforeMount(){
    this.getList()
  },
  computed:{
    ...mapGetters({
      id: 'GetCallId',
    })
  },
  methods:{
    openImg(e) {
      // console.log(e);
      this.imgSrc = e.target.src
      // console.log(this.imgSrc);
      this.imgShow = true
    },
    getList(isOr) {
      let params = {}
      // params.id = this.id
      params.userId = this.id

      loanIdentiList(params).then(data=>{
        this.identiList = data.data.data

        if(this.identiList.sex == '1'){
          this.identiList.sex = '男'
        }else{
          this.identiList.sex = '女'
        }
      })
    },
  },

}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .tabs{
      background: #fff;
      .btn{
        padding:20px;
      }
      .content{
        padding: 20px;
        .con_title{
          font-size: 16px;
          font-weight: bold;
        }
        .contentItem{
          font-size: 14px;
          color:#686B6D;
          display: inline-block;
          margin-top: 20px;
          margin-right: 10px;
          vertical-align: top;
          .titletiao{
            display: inline-block;
            vertical-align: top;
            color: #999999;
          }
          .substance{
            display: inline-block;
            padding: 0 10px;
            background: #F2F2F2;
          }
          .myImg{
            width: 50px;
            height:50px;
            position: relative;
            top:-12px;
            cursor: pointer;
          }
        }
      }

    }
    .block{
      text-align: center;
      margin-top: 15px;
    }
  }
</style>
