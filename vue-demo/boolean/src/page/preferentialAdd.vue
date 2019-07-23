<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        优惠券列表
      </div>
    </div>
    <div class="beback">

    </div>
    <div class="content">
      <div class="ab">
        <span>类型：</span>
        <el-select v-model="selectType" placeholder="请选择">
          <el-option label="请选择" value="''"></el-option>
          <el-option label="新用户订单" value="1"></el-option>
          <el-option label="邀请好友奖励" value="2"></el-option>
          <el-option label="自由发放" value="3"></el-option>
        </el-select>
      </div>
      <div class="ab">
        <span>名称：</span>
        <el-input v-model="coupouName"  class="myinput"></el-input>
      </div>
      <div class="ab">
        <span>节约金额：</span>
        <el-input v-model="saveMoney"  class="myinput"></el-input>
      </div>
      <div class="ab">
        <span>有效时长（天）：</span>
        <el-input v-model="validTime"  class="myinput"></el-input>
      </div>
      <el-button @click='getToContent' class="publicMidBtn">提交</el-button>
      <el-button @click='back' class="publicMidBtn">返回</el-button>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
import {preferentialGet, preferentialAdd, preferentialUpdate} from "@/API"
export default {
  data(){
    return {
      coupouName: '',
      id: '',
      selectType: '',
      saveMoney: '',
      validTime: ''
    }
  },
  mounted(){
    if(!isNaN(this.$route.params.id)){
      this.getContent(this.$route.params.id);
    }
  },
  methods:{
    getToContent(){
      let params = {}
      params.id = this.id
      if(this.coupouName){
        params.coupouName = this.coupouName
      }else{
        this.$message('名称不能为空')
        return
      }
      if(this.selectType){
        params.type = this.selectType
      }else{
        this.$message('请选择类型')
        return
      }
      if(this.saveMoney){
        params.saveMoney = this.saveMoney
      }else{
        this.$message('节约金额不能为空')
        return
      }
      if(this.validTime){
        params.validTime = this.validTime
      }else{
        this.$message('有效时长不能为空')
        return
      }
      let date = new Date();
      date = this.dateChange(date);
      params.gmtDatetime = date;
      // console.log(params);
      if(!this.id){
        preferentialAdd(params).then((data)=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('成功');
            this.$router.push({name: 'preferential'})
          }else{
            this.$message("失败")
          }
        });
      }else{
        preferentialUpdate(params).then((data)=>{
          if(data.data.code == 'SUCCESS'){
            this.$message('成功');
            this.$router.push({name: 'preferential'})
          }else{
            this.$message("失败")
          }
        });
      }

    },
    getContent(id){
      this.id = id;
      let params = {}
      params.id = id;
      preferentialGet(params).then(data=>{
        this.coupouName = data.data.data.coupouName
        this.id = data.data.data.id
        this.selectType = data.data.data.type + ''
        this.saveMoney = data.data.data.saveMoney
        this.validTime = data.data.data.validTime
      })
    },
    dateChange(date){
      var date = new Date(date);
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
      const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y+M+D+h+m+s;
    },
    back(){
      this.$router.go(-1);
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .beback{
      background: #FFF;
    }
    .content{
      background: #fff;
      padding: 20px 0 20px 50px;
      span{
        vertical-align: top;
        margin-bottom: 20px;
      }
      .inner{
        width:80%;
        display: inline-block;
        margin-bottom: 20px;
      }
      .ab{
        margin-bottom: 20px;
        span{
          display: inline-block;
          width: 15%;
          vertical-align: middle;
          text-align: right;
        }
        .myinput{
          width: 80%;
        }
      }

    }
  }
</style>
