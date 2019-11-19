<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel fly-panel-user" pad20>
      <div class="layui-tab layui-tab-brief" lay-filter="user">
        <ul class="layui-tab-title">
          <li>
            <router-link :to="{name:'login'}">登入</router-link>
          </li>
          <li class="layui-this">注册</li>
        </ul>
        <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
          <validation-observer ref="observer" v-slot="{validate}">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <form method="post">
                  <div class="layui-form-item">
                    <ValidationProvider name="username" rules="required|email" v-slot="{errors}">
                      <div class="layui-row">
                        <label for="L_email" class="layui-form-label">用户名</label>

                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="username"
                            v-model.trim="username"
                            placeholder="请输入用户名"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">将会成为您唯一的登入名</div>
                      </div>
                      <div style="color: #c00;">{{errors[0]}}</div>
                    </ValidationProvider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_username" class="layui-form-label">昵称</label>
                    <validation-provider name="nickname" rules="required" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                          type="text"
                          name="nickname"
                          v-model.trim="nickname"
                          placeholder="请输入昵称"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid" style="color: #c00;">{{errors[0]}}</div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider
                      name="password"
                      rules="required|min:6|max:16"
                      v-slot="{errors}"
                    >
                      <div class="layui-row">
                        <label for="L_pass" class="layui-form-label">密码</label>
                        <div class="layui-input-inline">
                          <input
                            type="password"
                            v-model.trim="password"
                            name="password"
                            placeholder="请输入密码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class="layui-form-mid layui-word-aux">
                          <span>6到16个字符</span>
                        </div>
                      </div>
                      <div style="color: #c00;">
                        <span>{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_repass" class="layui-form-label">确认密码</label>
                    <validation-provider name="cpassword" :rules="`is:${password}`" v-slot="{errors}">
                      <div class="layui-input-inline">
                        <input
                          type="password"
                          name="cpassword"
                          v-model.trim="cpassword"
                          placeholder="请再次输入密码"
                          autocomplete="off"
                          class="layui-input"
                        />
                      </div>
                      <div class="layui-form-mid" style="color: #c00;">
                        <span>{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <validation-provider name="vercode" rules="required|length:4" v-slot="{errors}">
                      <div class="layui-row">
                        <label for="L_vercode" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                            type="text"
                            name="vercode"
                            v-model.trim="vercode"
                            placeholder="请输入验证码"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <div class>
                          <span class="svg" style="color: #c00;" v-html="svg" @click="_getCode()"></span>
                        </div>
                      </div>
                      <div class="layui-form-mid">
                        <span style="color: #c00;">{{errors[0]}}</span>
                      </div>
                    </validation-provider>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn"  type="button" @click="validate().then(submit)">立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
                    <a
                      href
                      onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-qq"
                      title="QQ登入"
                    ></a>
                    <a
                      href
                      onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})"
                      class="iconfont icon-weibo"
                      title="微博登入"
                    ></a>
                  </div>
                </form>
              </div>
            </div>
          </validation-observer>
        </div>
      </div>
    </div>
  </div>
</template>




<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { getCode ,reg } from "@/api/login";
export default {
  name: "reg",
  data() {
    return {
      username: "",
      nickname: "",
      password: "",
      cpassword: "",
      vercode: "",
      svg: null
    };
  },
  components: {
    ValidationProvider,
    ValidationObserver
  },
  mounted() {
    this._getCode();
  },
  methods: {
    _getCode() {
      let sid = this.$store.state.sid;
      getCode(sid).then(res => {
        console.log(res);
        if (res.code === 200) {
          this.svg = res.data;
        }
      });
    },
    async submit(){
      const isValid=await this.$refs.observer.validate()
      if(!isValid){
        return;
      }
      reg({
         username:this.username,
         nickname:this.nickname,
         vercode:this.vercode,
         sid:this.$store.state.sid,
         password:this.password
      }).then(res=>{
        if(res.code===200){
          this.username=''
          this.nickname=''
          this.password=''
          this.cpassword=''
          this.vercode=''

         
          requestAnimationFrame(()=>{
            this.$refs.observer.reset()
          })
          this.$alert('注册成功')
          setTimeout(()=>{
             this.$router.push('/login')
            
          })
          
        }else {
            this.$refs.observer.setErrors(res.msg)
        }
        
      })
    }
  }
};
</script>

<style lang="scss"  scoped>
</style>
