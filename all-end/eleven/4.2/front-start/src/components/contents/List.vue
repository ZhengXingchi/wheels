<template>
  <div>
    <div class="fly-panel"
         style="margin-bottom: 0;">
      <div class="fly-panel-title fly-filter">
        <a href
           :class="{'layui-this': status === '' && tag === ''}"
           @click.prevent="search()">综合</a>
        <span class="
           fly-mid"></span>
        <a href
           :class="{'layui-this': status === 0}"
           @click.prevent="search(0)">未结</a>
        <span class="fly-mid"></span>
        <a href
           :class="{'layui-this': status === 1}"
           @click.prevent="search(1)">已结</a>
        <span class="fly-mid"></span>
        <a href
           :class="{'layui-this': tag === '精华'&& status === ''}"
           @click.prevent="search(2)">精华</a>
        <span class="fly-filter-right layui-hide-xs">
          <a href
             :class="{'layui-this': sort === 'create'}"
             @click.prevent="search(3)">按最新</a>
          <span class="fly-mid"></span>
          <a href
             :class="{'layui-this': sort === 'answer'}"
             @click.prevent="search(4)">按热议</a>
        </span>
      </div>

      <ListItem :lists="lists"
                @nextPage="nextPage()"
                :isEnd='isEnd'></ListItem>

    </div>
  </div>
</template>

<script>
import { getLists } from '@/api/content'
import ListItem from './ListItem'
export default {
  name: 'list',
  data () {
    return {
      current: '',
      isEnd: false,
      isRepeat: false,
      status: '',
      tag: '',
      sort: 'create',
      page: 0,
      limit: 20,
      catelog: '',
      // lists: [{
      //   uid: {
      //     name: '猕猴桃',
      //     isVip: 1
      //   },
      //   title: '天气好冷',
      //   content: '多穿衣服me more cool,me more sun',
      //   created: '2019-11-30 01:00:00',
      //   catalog: 'ask',
      //   fav: 40,
      //   isEnd: 0,
      //   read: 10,
      //   answer: 0,
      //   status: 0,
      //   isTop: 0,
      //   tags: [{
      //     name: '精华',
      //     class: 'layui-bg-red'
      //   }, {
      //     name: '热门',
      //     class: 'layui-bg-blue'
      //   }]
      // }]
      lists: []
    }
  },
  components: {
    ListItem
  },
  watch: {
    current (newval, oldval) {
      this.init()
    },
    '$route' (newval, oldval) {
      console.log(newval)
      console.log(oldval)
      let catelog = this.$route.params['catelog']
      if (typeof catelog !== 'undefined' && catelog !== '') {
        this.catelog = catelog
      }
      console.log(catelog)
      this.init()
    }
  },
  mounted () {
    let catelog = this.$route.params['catelog']
    if (typeof catelog !== 'undefined' && catelog !== '') {
      this.catelog = catelog
    }
    this._getLists()
    console.log(this.$route.params['catelog'])
  },
  methods: {
    init () {
      this.page = 0
      this.isEnd = false
      this.lists = []
      this._getLists()
    },
    nextPage () {
      this.page++
      this._getLists()
    },
    _getLists () {
      if (this.isRepeat) return
      if (this.isEnd) return
      this.isRepeat = true
      let options = {
        catalog: this.catelog,
        isTop: 0,
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        tag: this.tag,
        status: this.status
      }
      getLists(options).then((res) => {
        this.isRepeat = false
        if (res.code === 200) {
          if (res.data.length < this.limit) {
            this.isEnd = true
          }
          if (this.lists.length === 0) {
            this.lists = res.data
          } else {
            this.lists = this.lists.concat(res.data)
          }
        }
      }).catch(err => {
        this.isRepeat = false
        if (err) {
          console.log(err)
          this.$alert(err.message)
        }
      })
    },
    search (val) {
      if (typeof val === 'undefined' && this.current === '') {
        return
      }
      this.current = val
      switch (val) {
        case 0:
          this.status = 0
          this.tag = ''
          break
        case 1:
          this.status = 1
          this.tag = ''
          break
        case 2:
          this.status = ''
          this.tag = '精华'
          break
        case 3:
          this.sort = 'create'
          break
        case 4:
          this.sort = 'answer'
          break
        default:
          this.status = ''
          this.tag = ''
          this.current = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
