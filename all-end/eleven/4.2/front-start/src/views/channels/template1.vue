<template>
  <div>
    <div class="layui-container">
      <div class="layui-row layui-col-space15">
        <div class="layui-col-md8">
          <List></List>
        </div>
        <div class="layui-col-md4">
          <HotList></HotList>
          <Ads></Ads>
          <Links></Links>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/contents/List'
import HotList from '@/components/sidebar/HotList'
import Links from '@/components/sidebar/Links'
import Ads from '@/components/sidebar/Ads'
export default {
  name: 'template1',
  components: {
    List,
    HotList,
    Links,
    Ads
  }
}
</script>

<style lang="scss" scoped>
</style>
