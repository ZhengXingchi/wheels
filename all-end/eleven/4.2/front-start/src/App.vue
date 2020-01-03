<template>
  <div id="app">
    <imooc-header></imooc-header>
    <router-view></router-view>
    <imooc-footer></imooc-footer>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'app',
  components: {
    'imooc-header': Header,
    'imooc-footer': Footer
  }
}
</script>

<style lang="scss">
// @import "assets/layui/css/layui.css";
@import "assets/css/global.css";
// @import "assets/layui/css/modules/layer/default/layer.css";

// 公用样式
.svg {
  position: relative;
  top: -4px;
}

.grey {
  color: #999;
}
.text-center {
  text-align: center;
}
@for $i from 0 through 5 {
  .pd#{$i} {
    padding: $i * 10 + px !important;
  }
  .pl#{$i} {
    padding-left: $i * 10 + px !important;
  }
  .pb#{$i} {
    padding-bottom: $i * 10 + px !important;
  }
  .pr#{$i} {
    padding-right: $i * 10 + px !important;
  }
  .mr#{$i} {
    margin-right: $i * 10 + px !important;
  }
  .mt#{$i} {
    margin-top: $i * 10 + px !important;
  }
  .ml#{$i} {
    margin-left: $i * 10 + px !important;
  }
}
.pr0 {
  padding-right: 0;
}
.text-left {
  text-align: left;
}
.text-right {
  text-align: right;
}
.orange {
  color: #ff5722;
}
.pull-right {
  float: right !important;
}
</style>
