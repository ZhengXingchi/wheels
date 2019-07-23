<template>
  <div id="login">
    <!-- <img src="../assets/loginBack.png" alt="" class="backgroundImg"> -->
    <div class="login" style='height:360px;'>
      <el-form :model="loginForm"  ref="loginForm" >
      <el-row>
        <el-col :span="12">
          <div class="loginLogo">
            <img src="../assets/loginTitle.png" alt="">
          </div>
        </el-col>
        <el-col :span="12">
          <div class="loginInput">
            <div class="myInput">
                <el-input placeholder="用户名" v-model="loginForm.userName" size='mini' class="toInput"></el-input>
            </div>
            <div class="myInput">
              <el-input type='password' placeholder="密码" v-model="loginForm.upwd" size='mini' class="toInput"></el-input>
            </div>



            <div class="myInput myInputCode" >
              <el-input placeholder="请输入验证码" v-model='loginForm.identifying' class="code" size='mini'></el-input>
            </div>

            <el-button type='primary' size='medium' @click="login">
                登 录
            </el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>

          </div>
        </el-col>
      </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
import {getPhones, getPhonesCode, toLogin} from '@/API'
import { mapMutations } from 'vuex'
import Cookie from 'js-cookie'
export default {
  data: () => {
    return {
      loginForm:{
        userName:'',
        upwd: '',
        identifying: '',
      },
      phoneNumbers: [{
        value: 1,
        phone: 1111
      },{
        value: 2,
        phone: 222
      }],
      choice: '',
      getCodeDisable: false,
      timeout: 30,
    }
  },
  beforeMount() {

  },
  methods: {
    ...mapMutations({
      setRole: 'SETROLE',
      setToekn:'SET_TOKEN'
    }),
    resetForm(fromName){
      this.$refs[fromName].resetFields();
    },
    // 登录
    login() {
      const regEn = /[`@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
      if(!this.loginForm.userName){
        this.$message('用户名不能为空');
        return
      }
      if(!this.loginForm.upwd){
        this.$message('密码不能为空');
        return
      }
      if(regEn.test(this.loginForm.userName.replace(/(^\s*)|(\s*$)/g, ""))){
        this.$message('用户名含有特殊符号')
        return
      }
      if(regEn.test(this.loginForm.upwd.replace(/(^\s*)|(\s*$)/g, ""))){
        this.$message('密码含有特殊符号')
        return
      }
      const regCode = /^[0-9]{6}$/
      if(!this.loginForm.identifying){
        this.$message('验证码不能为空')
        return
      }
      if(!regCode.test(this.loginForm.identifying)){
        this.$message('请输入正确的验证码')
        return
      }
      let params = {
        userName: this.loginForm.userName,
        password: this.loginForm.upwd,
        code: this.loginForm.identifying
      }
      // console.log(params);
      toLogin(params).then((data)=>{
        if(data.data.code == 'SUCCESS') {
          Cookie.set('JSESSIONID',data.data.data.token);console.log(1111,data.data.data);
          
          this.setToekn(data.data.data.token);
          this.setRole({Id: data.data.data.roleId, Name: data.data.data.userName})
					this.$router.push({name:"home"})
				} else {
					this.$message(data.data.msg);
				}
      })

    },
  }
}
</script>
<style lang="scss" scoped>
#login{
  //background: #1C2B36;
  height:100%;
  background-image: url('../assets/loginBack.png');
  .backgroundImg{
    position: absolute;
    height:100%;
    width: 100%;
  }
  .login{
    width:740px;
    position: absolute;
    background-color: rgba(0,0,0,0.4);
    top:32%;
    left:27%;
    box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 10px 50px 0 rgba(232,237,250,.5);
    border-radius: 10px;
    .loginLogo{
      img{
        position: relative;
        top:50px;
        left:74px;
        width:250px;
      }
    }
    .loginInput{
      padding: 50px 60px 50px 20px;
      .logo-name{
        text-align: center;
        color: #e6e6e6;
        font-size: 150px;
        font-weight: 800;
        margin-bottom: 0px;
      }
      h3{
        text-align: center;
        padding-bottom: 40px;
      }
      .icon{
       width:20px;
       vertical-align: middle;
      }
      .myInput{
        padding:5px 10px 5px 10px;
        width: 100%;
        margin-bottom: 20px;
        background: white;
        border-radius: 5px;
        .toInput{
          width: 255px;
          /deep/ .el-input__inner{
            border:1px solid transparent;
          }
        }
      }
      .myInputCode{
        font-size: 0px;
        .code{
          width: 52%;
          font-size: 12px;
          margin-left:5px;
          /deep/ .el-input__inner{
            border:1px solid transparent;
          }
        }

      }
      .myButton{
        font-size: 12px;
        width: 38%;
        background: rgb(40,120,255)
      }
      .myLogin{
        font-size: 20px;
        width:107%;
        height:40px;
      }
    }

  }
}

</style>
