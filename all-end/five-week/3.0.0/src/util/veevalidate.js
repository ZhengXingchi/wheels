import {extend ,localize} from 'vee-validate'
import {required,email,min,length,confirmed} from 'vee-validate/dist/rules'
import zh from 'vee-validate/dist/locale/zh_CN.json'
extend('email',email)
extend('min',min)
extend('required',required)
extend('length',length)
extend('confirmed',confirmed)

localize('zh_CN',{
  messages:{
    ...zh.messages,
    required:'请输入{_field_}'
  },
  names:{
    email: '邮箱',
    password: '密码',
    username: '账号',
    vercode: '验证码',
    nickname:'昵称',
    cpassword:'密码'
  }
})
 