import Vue from "vue";
import VueI18n from "vue-i18n";
import zh from "vee-validate/dist/locale/zh_CN.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zh_CN",
  messages: {
    zh_CN: {
      fields: {
        email: '邮箱',
        password: '密码',
        username: '账号',
        vercode: '验证码',
        nickname:'昵称',
        cpassword:'密码'
      },
      validation: {
        ...zh.messages,
        is:'两次输入的密码不相等'
      }
    }

  }
});

export { i18n };