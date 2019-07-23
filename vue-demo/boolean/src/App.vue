<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
import {} from '@/API'
export default {
  name: 'App',
  beforeMount() {
    //do something before mounting vue instance

  }
}
</script>

<style lang="scss" scoped>

#app{
  height: 100%;
}
.report-mask{
  z-index: 5 !important;
}
.report-container{
  z-index: 5 !important;
}

</style>
