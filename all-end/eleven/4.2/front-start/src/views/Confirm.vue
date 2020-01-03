<template>
  <div class='layui-container flex'>
    <div class="layui-row font pb3">确定更新账号为：{{username}}吗</div>
    <div class="layui-row">
      <button type='button'
              class="layui-btn"
              :class="{'layui-btn-disabled':isSend}"
              @click="submit()">确定更新账号</button>
      <router-link class='layui-btn layui-btn-primary'
                   to='/'>返回首页</router-link>
    </div>
  </div>
</template>

<script>
import { updateUsername } from '@/api/user'
let obj = {}
export default {
  name: 'confirm',
  data () {
    return {
      username: '',
      isSend: false
    }
  },
  mounted () {
    let queryStr = window.location.href.replace(/.*\?/, '')
    obj = Object.fromEntries(queryStr.split('&').map(item => {
      return item.split('=')
    }))

    this.username = decodeURIComponent(obj.username)
  },
  methods: {
    submit () {
      obj.username = this.username
      updateUsername(obj).then(res => {
        if (res.code === 200) {
          this.$alert(res.msg)
          this.isSend = true
          setTimeout(this.$router.push('/'), 1000)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  min-height: 260px;
}
.font {
  font-size: 16px;
  color: #333;
}
</style>
