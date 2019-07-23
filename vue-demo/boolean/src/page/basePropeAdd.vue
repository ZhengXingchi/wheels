<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        极光推送
      </div>
    </div>
    <div class="content">
      <div class="ab">
        <span>标题：</span>
        <el-input v-model="title"  class="myinput"></el-input>
      </div>
      <div class="">
        <span>内容：</span>
        <div class="inner" id='editor' >
        </div>
      </div>
      <el-button @click='getToContent' class="publicMidBtn">发布</el-button>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
import {basePropeAdd, basePropeGet} from "@/API"
export default {
  data(){
    return {
      content: '',
      id: '',
      selectType: '',
      title: ''
    }
  },
  mounted(){
    if(!isNaN(this.$route.params.id)){
      this.getContent(this.$route.params.id);
    }else{
      this.initEditor();
    }
  },
  methods:{
    getToContent(){
      let params = {}
      params.id = this.id
      if(this.title){
        params.title = this.title
      }else{
        this.$message('标题不能为空')
        return
      }
      if(this.title){
        params.content = this.content
      }else{
        this.$message('内容不能为空')
        return
      }
      let date = new Date();
      // console.log(params);
      basePropeAdd(params).then((data)=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.$router.push({name: 'basePrope'})
        }else{
          this.$message("失败")
        }
      });
    },
    getContent(id){
      this.id = id;
      let params = {}
      params.id = id;
      basePropeGet(params).then(data=>{
        this.content = data.data.data.content
        this.id = data.data.data.id
        this.title = data.data.data.title
        this.initEditor(this.content)
      })
    },
    initEditor(content){
      let editor = new E('#editor')
      let vue = this
      editor.customConfig.onchange = function (html) {
        // html 即变化之后的内容
        vue.content = html
      }
      editor.customConfig.zIndex = 0
      editor.create()
      if(content){
        editor.txt.html(content)
      }
    },
    dateChange(date){
      var date = new Date(date);
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
      const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y+M+D+h+m+s;
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .content{
      background: #fff;
      padding: 20px 0 20px 50px;
      span{
        vertical-align: top;
        margin-bottom: 20px;
      }
      .inner{
        width:80%;
        display: inline-block;
        margin-bottom: 20px;
      }
      .ab{
        margin-bottom: 20px;
        span{
          width: 19%;
          vertical-align: middle;
          text-align: right;
        }
        .myinput{
          width: 80%;
        }
      }

    }
  }
</style>
