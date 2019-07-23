<template>
    <div class="allPage">
        <div class="content">
            <el-form :model="form" status-icon  ref="form" label-width="100px" style="width:500px">
                <el-form-item label="旧密码" prop="pass">
                    <el-input type="password" v-model="form.oldPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="checkPass">
                    <el-input type="password" v-model="form.newPassword" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('form')">提交</el-button>
                    
                </el-form-item>
            </el-form>
        </div>    
    </div>
    
</template>

<script>
import {editMyPassword} from "@/API"
export default {
    data(){
        return{
            form: {
                oldPassword: '',
                newPassword: '',
            },
        }
    },
    methods:{
        submitForm(){
            let postData = this.$qs.stringify({
                oldPassword:this.form.oldPassword,
                newPassword:this.form.newPassword,
            });
            editMyPassword(postData).then((res)=>{
                if(res.data=="NOACCESS"){
                    this.$message.error("没有权限");
                    return void(0);
                }
                if(res.data.code=="FAIL"){
                    this.$message.error(res.data.msg);
                }else{
                    let that = this;
                    this.$message({
                        showClose: true,
                        message: '修改密码成功,请重新登录',
                        type: 'success',
                        duration:2000,
                        onClose:function(){
                            that.$router.replace({name: 'login'})                            
                        }
                    });
                    
                }
            })
        }
        
    }
}
</script>

<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .beback{
      background: #FFF;
    }
    .content{
      background: #fff;
      padding: 20px 0 20px 50px;
      span{
        vertical-align: top;
        margin-right: 15px;
      }
      .inner{
        width:80%;
        display: inline-block;
        margin-bottom: 20px;
      }
      .ab{
        margin-bottom: 20px;
        span{
          display: inline-block;
          width: 15%;
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
