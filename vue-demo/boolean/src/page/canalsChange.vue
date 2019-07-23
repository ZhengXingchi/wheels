<template>
  <div class="allPage">
    <div class="canalsChangeAdd">
      <el-form ref="form" :model="form" label-width="80px" style="width:600px;padding:20px;">
        <el-form-item label="渠道名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="登录账号">
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="分成比例">
          <el-input v-model="form.proportion"></el-input>
        </el-form-item>
        <el-form-item label="拦截率">
          <el-input v-model="form.rate"></el-input>
        </el-form-item>
         <el-form-item label="是否启用">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='sub'>立即创建</el-button>
          <el-button @click='goBack'>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import {canalsGetUser, canalsAdd,canalsUpdate} from '@/API'
export default {
  data: () => ({
    form:{
      id: null,
      loginName: '',
      name: '',
      password: '',
      proportion: '',
      linkUrl: '',
      rate:'',//拦截率
      status:true,
    },
  }),
  beforeMount() {
    this.getUser()
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getUser(){
      if(!isNaN(this.$route.params.id) && this.$route.params.id >= 1){
        this.form.id = this.$route.params.id
        canalsGetUser({id:this.form.id}).then((data)=>{
          console.log(data);
          let arr = data.data.data
          this.form.loginName = arr.loginName;
          this.form.name = arr.name;
          this.form.linkUrl = arr.linkUrl;
          this.form.proportion = arr.proportion;
          this.form.rate = arr.rate;
          this.form.status = arr.status==0?false:true;
        })
      }else{
        this.form.loginName = '';
        this.form.name = '';
        this.form.password = '';
        this.form.proportion ='';
        this.form.linkUrl = '';
        this.form.rate = '';
        this.form.status = true;
      }
    },
    sub() {
      if(isNaN(this.form.rate) || isNaN(this.form.proportion)){
        this.$message('请输入正确的数字')
        return
      }
      let params = {
        name: this.form.name,
        loginName: this.form.loginName,
        proportion: this.form.proportion,
        rate: this.form.rate,
        id: this.form.id,
        status:this.form.status==false?0:1
      }
      if(this.form.id){
        console.log(1); 
        params.linkUrl = this.form.linkUrl;
        canalsAdd(params).then((data)=>{
          // console.log(data);
          if(data.data.code == 'SUCCESS'){
            this.$message('修改成功');
            this.$router.push({name:'canals'})
          }
        }).catch(()=>{
          this.$message('error')
        })
      }else{
        console.log(2);
        params.password = this.form.password;
        canalsAdd(params).then((data)=>{
          console.log(data);
          if(data.data.code == 'SUCCESS'){
            this.$message('添加成功');
            this.$router.push({
              name:'canals'
          })
          }else{
            this.$message(data.data.msg);
          }
        }).catch(()=>{
          this.$message('error')
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .myButton{
      padding:20px;
    }
    .canalsChangeAdd{
      background-color: white;
      padding: 0px 5px 40px 5px;
      .myCInput{
        margin-bottom: 20px;
        font-size: 14px;
        .myInput{
          display: block;
        }
        span{
          margin-bottom: 10px;
          display: block;
          color:#676A6C;
          font-weight: 700;
        }
      }
    }
  }
</style>
