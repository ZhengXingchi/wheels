<template>
  <div class="fly-panel">
    <h3 class="fly-panel-title">温馨通道</h3>
    <ul class="fly-panel-main fly-list-static">
      <li v-for="(item,index) in lists"
          :key="'item'+index">
        <a :href="item.link"
           target="_blank">{{item.title}}</a>
      </li>

    </ul>
  </div>
</template>

<script>
import { getTips } from '@/api/content'
export default {
  name: 'tips',
  data () {
    return {
      lists: []
    }
  },
  mounted () {
    getTips().then((res) => {
      if (res.code === 200) {
        this.lists = res.data
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
