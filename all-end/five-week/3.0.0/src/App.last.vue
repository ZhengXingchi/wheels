<template>
  <div id="app">
    <div class="layui-container">
      <form class="layui-form layui-form-pane" action>
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
            <validation-provider name='用户名' rules="required|email" v-slot="{errors}">
              <div class="layui-input-inline">
                <input
                  type="text"
                  name="name"
                  v-model.trim="name"
                  placeholder="请输入标题"
                  autocomplete="off"
                  class="layui-input"
                />
              </div>
              <div class="error layui-form-mid">{{errors[0]}}</div>
              
            </validation-provider>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input
              type="password"
              name="password"
              v-model="password"
              placeholder="请输入密码"
              autocomplete="off"
              class="layui-input"
            />
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input
              type="text"
              name="code"
              v-model="code"
              placeholder="请输入验证码"
              autocomplete="off"
              class="layui-input"
            />
          </div>
          <div class="layui-form-mid svg" @click="getCaptcha()" v-html="svg"></div>
        </div>
        <button type="button" class="layui-btn" @click="checkForm">点击登陆</button>
        <a class="btn-link" href="http://www.layui.com">忘记密码</a>
      </form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN'
for(let rule in rules){
  extend(rule,{...rules[rule],message:zh.messages[rule]})
}
export default {
  name: 'app',
  data () {
    return {
      svg: '',
      name: '',
      password: '',
      code: '',
      errorMsg: []
    }
  },

  mounted () {
    this.getCaptcha()
  },
  components: {
    ValidationProvider
  },
  methods: {
    getCaptcha () {
      axios.get('http://localhost:3000/getCaptcha').then((res) => {
        if (res.status === 200) {
          let obj = res.data
          if (obj.code === 200) {
            this.svg = obj.data
          }
        }
      })
    },
    checkForm () {
      this.errorMsg = []
      // regEx email
      if (!this.name) {
        this.errorMsg.push('登录名为空！')
      }
      if (!this.password) {
        this.errorMsg.push('密码不得为空！')
      }
      if (!this.code) {
        this.errorMsg.push('验证码为空！')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  background: #f2f2f2;
}
.layui-container {
  background: #fff;
}
input {
  width: 190px;
}
.btn-link {
  margin-left: 10px;
  &:hover {
    color: #009688;
  }
}

.svg {
  position: relative;
  top: -15px;
}

.error {
  color: red;
}
</style>
