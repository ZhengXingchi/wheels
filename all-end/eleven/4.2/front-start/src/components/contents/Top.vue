<template>
  <div>
    <div class="fly-panel"
         v-show="lists.length>0">
      <div class="fly-panel-title fly-filter">
        <a>置顶</a>
        <a href="#signin"
           class="layui-hide-sm layui-show-xs-block fly-right"
           id="LAY_goSignin"
           style="color: #FF5722;">去签到</a>
      </div>
      <ListItem :lists="lists"
                :isShow="false">
      </ListItem>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem'
export default {
  name: 'top',
  components: {
    ListItem
  },
  data () {
    return {
      page: 0,
      limit: 20,
      lists: [{
        uid: {
          name: '猕猴桃',
          isVip: 1
        },
        title: '天气好冷',
        content: '多穿衣服me more cool,me more sun',
        created: '2019-11-30 01:00:00',
        catalog: 'ask',
        fav: 40,
        isEnd: 0,
        read: 10,
        answer: 0,
        status: 0,
        isTop: 0,
        tags: [{
          name: '精华',
          class: 'layui-bg-red'
        }, {
          name: '热门',
          class: 'layui-bg-blue'
        }]
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
