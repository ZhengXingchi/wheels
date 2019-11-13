import { Validator } from 'vee-validate'

const dictionary = {
  'zh-CN': {
    messages: {
      required: field => '请输入' + field,
      email: (field) => '请输入正确的'+'邮箱'+'格式',
      min: () => '不符合最小长度要求',
      max: () => '超过最大长度要求',
      length: (field, args) => field + '长度要求' + args,
      is:()=>'输入的密码不相等'
    },
    attributes: {
      email: '邮箱',
      password: '密码',
      username: '账号',
      vercode: '验证码',
      nickname:'昵称',
      cpassword:'密码'
    }
  }
}

Validator.localize(dictionary)
