<template>
    <div>
        <div class="layui-container">
            <div class="layui-row layui-col-space15">
                <div class="layui-col-md8">
                    <Top></Top>
                    <List></List>
                </div>
                <div class="layui-col-md4">
                    <Tips></Tips>
                    <Sign></Sign>
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
import Top from '@/components/contents/Top'
import Tips from '@/components/sidebar/Tips'
import HotList from '@/components/sidebar/HotList'
import Links from '@/components/sidebar/Links'
import Sign from '@/components/sidebar/Sign'
import Ads from '@/components/sidebar/Ads'
export default {
  name: 'index',
  components: {
    Top,
    List,
    Tips,
    HotList,
    Links,
    Sign,
    Ads
  }
}
</script>

<style lang="scss" scoped>
</style>
