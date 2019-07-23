<template>
  <section class="app-main">

      <!--<keep-alive>-->
        <!--<router-view v-if="$route.meta.keep"></router-view>-->
      <!--</keep-alive>-->
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"/>
      </keep-alive>
      <!--<router-view v-if="!$route.meta.keep"></router-view>-->
    </transition>
  </section>
</template>

<script>
    export default {
      name: 'AppMain',
      computed: {
        cachedViews() {
          return this.$store.state.tagsView.cachedViews
        },
        key() {
          return this.$route.fullPath
        }
      }
    }
</script>

<style scoped>
  .app-main {
    /*84 = navbar + tags-view = 50 +34 */
    min-height: calc(100vh - 84px);
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: #9d9ea021;
  }
</style>
