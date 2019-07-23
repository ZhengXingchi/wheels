<template>
  <div class="riskPage">
    <h3>风控决策设置</h3>
    <hr>
    <el-form ref="form" :model="form" label-width="80px">
       <div style="height:100px">
          <el-form-item label="风控拒绝" class="fl">
              <el-input value="0" style="width:160px" :disabled="true"></el-input>
              <span>----</span>
              <el-input v-model="form.lowScore" style="width:160px" maxlength='5'></el-input>
          </el-form-item>
        </div>
        <div style="height:100px">
          <el-form-item label="人工干预" class="fl">
            <el-input :value="parseFloat(form.lowScore)+1" style="width:160px" :disabled="true"></el-input>
            <span>----</span>
            <el-input :value="form.HighScore-1" style="width:160px" :disabled="true"></el-input>
          </el-form-item>
        </div>
        <div style="height:100px">
          <el-form-item label="风控通过" class="fl">
            <el-input v-model="form.HighScore" style="width:160px" maxlength='5'></el-input>
            <span>----</span>
            <el-input value="950" style="width:160px" :disabled="true"></el-input>
          </el-form-item>
        </div>
     
     <el-form-item class="sub">
       <el-button type="primary" @click="onSubmit">确定</el-button>
       <el-button @click="resetForm('Form')">重置</el-button>
     </el-form-item>
    </el-form>
  </div>
  
</template>

<script>
import {setRiskList,selectSysList} from "@/API"
export default {
  data () {
    return {
        form: {
          lowScore: '',
          HighScore: '',
        },
    }
  },
  beforeMount(){
    this.getList();
  },
  methods: {
    getList(){
      let params = {}
      params.type = 'risk_scope_config'
      selectSysList(params).then(res =>{
      var obj= res.data.data.configValue
      console.log(obj);
      var a = JSON.parse(obj)
      this.form.lowScore = a.refuse
      this.form.HighScore = a.pass 
    })
    },
     onSubmit() { 
       let params = {}
       params.lowScore = this.form.lowScore
       params.HighScore = this.form.HighScore
       this.form.lowScore=this.form.lowScore.replace(/[^\.\d]/g,'');
       this.form.HighScore=this.form.HighScore.replace(/[^\.\d]/g,'');
       if(this.form.lowScore  == ''){
           this.$message({
            message: '设置失败',
            type: 'error'
           })
       }
      else if(this.form.HighScore == ''){
           this.$message({
            message: '设置失败',
            type: 'error'
           })
         }
      else if(this.form.lowScore >= this.form.HighScore){
           this.$message({
            message: '设置失败',
            type: 'error'
           })
         }
         else if(this.form.lowScore >= 950 ){
           this.$message({
            message: '设置失败',
            type: 'error'
           })
         }
      else{
           setRiskList(params).then(res=> {
             console.log(res.data.msg);
             if(res.data.msg == '成功'){
                this.getList()
                this.$message({
                message: '设置成功',
                type: 'success'
           })
          }
         })
       } 
  },
      resetForm(formName) {
        this.form.lowScore =''
        this.form.HighScore =''
      }
    },
}
</script>

<style lang='scss'>
@import '../style/publicSass.scss';
.riskPage{
    background: #fff;
    margin: 20px;
    padding: 10px 0 50px 0px;
    h3{
       margin-left: 40px;
    }
    .fl{
       margin-top: 30px; 
       margin-right: 50px;
       margin-left: 30px;
    }
    .sub{
      margin-top: 50px;
      margin-left: 128px;
      padding: 0;
    }
}
</style>
