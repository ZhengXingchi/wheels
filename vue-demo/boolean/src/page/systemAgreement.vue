<template>
  <div class="allPage">
    <div class="content">
      <div class="ab">
        <span>类型</span>
        <el-select v-model="type" placeholder="请选择" @change='getChange'>
          <el-option label="借款协议" :value="1"></el-option>
          <el-option label="借款服务协议" :value="2"></el-option>
          <el-option label="用户注册协议" :value="3"></el-option>
        </el-select>
      </div>
      <div class="">
        <span>内容：</span>
        <div class="inner" id='editor' >
        </div>
      </div>
      <el-button  @click='getToContent' type="primary">提交</el-button>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor'
import {systemAgreeContert, baseChangeContent} from "@/API"
export default {
  data(){
    return {
      content: '',
      id: '',
      type: 1,
      wexin: '',
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.getContent();
  },
  methods:{
    getChange(){
      this.getContent()
    },
    getToContent(){
      // console.log(this.content);
      let params = {}
      params.id = this.id
      params.content = this.content
      params.type = this.type

      // console.log(params);
      if(confirm("您确认发布吗")){
        baseChangeContent(params).then(data=>{
          console.log(data.data);
          if(data.data.msg == '成功'){
            this.getContent();
          }else{
            this.$message('修改失败');
            this.getContent();
          }
        });

      }
    },
    submit(){
      console.log("ok");
    },
    getContent(){
      let params = {}
      params.type = this.type,
      systemAgreeContert(params).then((data)=>{
        this.content = data.data.data.content
        this.id = data.data.data.id
        this.type = data.data.data.type
        this.initEditor(data.data.data.content);
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
