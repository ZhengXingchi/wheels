<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        关于我们
      </div>
    </div>
    <div class="content">
      <div class="ab">
        <span>客服电话</span>
        <el-input v-model="servePhone"  class="myinput"></el-input>
      </div>
      <div class="ab">
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;微信</span>
        <el-input v-model="wexin"  class="myinput"></el-input>
      </div>
      <div class="">
        <span>关于我们：</span>
        <div class="inner" id='editor' >
        </div>
      </div>
      <el-button @click='getToContent' class="publicMidBtn">提交</el-button>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
import {baseAboutContert, baseAboutChangeContert} from "@/API"
export default {
  data(){
    return {
      content: '',
      id: '',
      servePhone: '',
      wexin: '',
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.getContent();
  },
  methods:{
    getToContent(){
      // console.log(this.content);
      let params = {}
      params.id = this.id
      params.aboutUs = this.content
      params.servePhone = this.servePhone
      params.wexin = this.wexin

      // console.log(params);
      if(confirm("您确认发布吗")){
        baseAboutChangeContert(params).then((data)=>{
          if(data.data.msg == '成功'){
            this.getContent();
          }else{
            this.$message("修改失败")
            this.getContent();
          }
        });
      }
    },
    getContent(){
      let params = {}
      params.type = 4,
      baseAboutContert(params).then((data)=>{
        this.content = data.data.data.aboutUs
        this.id = data.data.data.id
        this.servePhone = data.data.data.servePhone
        this.wexin = data.data.data.wexin
        this.initEditor(data.data.data.aboutUs);
      })
    },
    initEditor(content){
      let editor = new E('#editor')
      let vue = this
      editor.customConfig.onchange = function (html) {
        // html 即变化之后的内容
        vue.content = html
      }
      editor.create()
      editor.txt.html(content)
    }
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
          vertical-align: middle;
          margin-right: 20px;
        }
        .myinput{
          width: 80%;
        }
      }

    }
  }
</style>
