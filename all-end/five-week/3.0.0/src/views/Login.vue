<template>
 
 

<div class="layui-container fly-marginTop">
 
  <div class="fly-panel fly-panel-user" pad20>
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title">
        <li class="layui-this">登入</li>
        <li>
          <router-link :to="{name:'reg'}">注册</router-link>
        </li>
      </ul>
      <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
        <div class="layui-tab-item layui-show">
        <ValidationObserver v-slot="{validate}" ref="observer">
          <div class="layui-form layui-form-pane">
            <form method="post">
              <div class="layui-form-item">
                <label for="L_email" class="layui-form-label">用户名</label>
                <validation-provider  name="username" rules="required|email" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input type="text" v-model.trim="username"    name="username"  placeholder="请输入用户名" autocomplete="off" class="layui-input">
                    </div>
                     <div class="layui-form-mid">
                      <span style="color: #c00;">{{errors[0]}}</span>
                    </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <label for="L_pass" class="layui-form-label">密码</label>

                 <validation-provider name="password"  rules="required|min:6|max:16" v-slot="{errors}">
                    <div class="layui-input-inline">
                      <input type="password" v-model.trim="password"  name="password" placeholder="请输入密码"   autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-mid">
                      <span style="color: #c00;">{{errors[0]}}</span>
                    </div>
                 </validation-provider>
              </div>
              <div class="layui-form-item">
               <validation-provider name="vercode" ref="vercodeField" rules="required|length:4" v-slot="{errors}">
                <div class="layui-row">
                  <label for="L_vercode" class="layui-form-label">验证码</label>

                    <div class="layui-input-inline">
                      <input type="text" v-model.trim="vercode"     name="vercode"  placeholder="请输入验证码" autocomplete="off" class="layui-input">
                    </div>
                    <div class="">
                      <span class="svg" style="color: #c00;" v-html="svg" @click="_getCode()"></span>
                    </div>
                  </div>
                  <div class="layui-form-mid">
                      <span style="color: #c00;">{{errors[0]}}</span>
                  </div>
                </validation-provider>
              </div>
              <div class="layui-form-item">
                <button class="layui-btn" type="button" @click="validate().then(submit)">立即登录</button>
                <span style="padding-left:20px;">
                  <router-link :to="{name:'forget'}">忘记密码？</router-link>
                
                </span>
              </div>
              <div class="layui-form-item fly-form-app">
                <span>或者使用社交账号登入</span>
                <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
              </div>
            </form>
          </div>
        </ValidationObserver>
        </div>
      </div>
       </div>
        </div>
      </div>

</template>




<script>
import {ValidationProvider,ValidationObserver} from 'vee-validate'
import {getCode,login} from '@/api/login'
import uuid from 'uuid/v4'
 
export default {
  name: 'login',
  components:{
    ValidationProvider,
    ValidationObserver
 
  },
  data(){
    return{

      username:'',
      password:'',
      vercode:'',
      svg:null
    }

  },
  mounted(){
     
    let sid=''
    if(localStorage.getItem('sid')){
      sid=localStorage.getItem('sid')
    }else{
      sid=uuid()
      localStorage.setItem('sid',sid)
    }
    this.$store.commit('setSid',sid)
    this._getCode()
  },
  methods:{
    _getCode(){
      let sid=this.$store.state.sid
      getCode(sid).then(res=>{
        console.log(res)
        if(res.code===200){

          this.svg=res.data
        }
      })
    },
    async submit(){

      const isValid=await this.$refs.observer.validate()
      if(!isValid){
        return
      }
      login({
         username:this.username,
         vercode:this.vercode,
         sid:this.$store.state.sid,
         password:this.password
       }).then(res=>{
        if(res.code==200){
          this.username=''
          this.password=''
          this.vercode=''
          requestAnimationFrame(()=>{
            this.$refs.observer.reset()
          })

           
        }else if(res.code===401){
            this.$refs.vercodeField.setErrors([res.msg])
        }
        
        }).catch(err=>{
          const data=err.response.data
          if(data.code===500){
           
            this.$alert('用户名密码校验失败,请检查')
          }else{
            this.$alert('服务器错误')
          }
        
        })
    }
  }
  
}
</script>

<style lang="scss"  scoped>

</style>
