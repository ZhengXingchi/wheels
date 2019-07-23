<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        管理员列表
      </div>
    </div>
    <div class="beback">
    </div>
    <div class="content">
      <div class="ab">
        <span>部门</span>
        <el-select v-model="departmentId" placeholder="请选择" size='mini'>
          <el-option label="请选择" value="''"></el-option>
          <el-option v-for='(item,key, index) in departmentList' :label="item.department" :value="item.id" :key='item.id'></el-option>
        </el-select>
      </div>
      <div class="ab">
        <span>角色类型</span>
        <el-select v-model="roleId" placeholder="请选择" size='mini'>
          <el-option label="请选择" value="''"></el-option>
          <el-option v-for='(item,key, index) in roleList' :label="item.groupName" :value="item.id" :key='item.id'></el-option>
        </el-select>
      </div>
      <div class="ab">
        <span>登录账号</span>
        <el-input v-model="userName" size='mini' class="myinput"></el-input>
      </div>
      <div class="ab">
        <span>密码</span>
        <el-input v-model="password" size='mini' class="myinput" placeholder='不修改密码请不填'></el-input>
      </div>
      <el-button @click='getToContent' class="publicMidBtn">提交</el-button>
      <el-button @click='back' class="publicMidBtn">返回</el-button>
    </div>
  </div>
</template>
<script>
import {managerDepAddRoleList, managerDepAddDepList, managerDepAddList, managerDepAdd} from "@/API"
export default {
  data(){
    return {
      id: '',
      departmentId: '',
      departmentList: {},
      password: '',
      roleId: '',
      roleList: {},
      userName: ''
    }
  },
  mounted(){
    if(!isNaN(this.$route.params.id)){
      this.getContent(this.$route.params.id);
    }else{
      this.getContent();
    }
  },
  methods:{
    getToContent(){
      let params = {}
      params.id = this.id
      if(this.departmentId){
        params.departmentId = this.departmentId
      }else{
        this.$message('请选择部门')
        return
      }
      if(this.roleId){
        params.roleId = this.roleId
      }else{
        this.$message('请选择角色')
        return
      }
      if(this.userName){
        params.userName = this.userName
      }else{
        this.$message('登录名不能为空')
        return
      }
      if(this.id){
        if(this.password){
          params.password = this.password
        }
      }else{
        if(this.password){
          params.password = this.password
        }else{
          this.$message('请输入密码')
          return
        }
      }
      managerDepAdd(params).then((data)=>{
        if(data.data.code == 'SUCCESS'){
          this.$message('成功');
          this.$router.push({name: 'managerPeo'})
        }else{
          this.$message(data.data.msg)
        }
      });

    },
    getContent(id){
      this.id = id;
      let params = {}
      params.id = id;
      managerDepAddRoleList({id,pageNo:1,pageSize:100}).then(data=>{
        this.roleList = data.data.data.list
      })
      managerDepAddDepList().then(data=>{
        this.departmentList = data.data.data
      })
      if(id){
        managerDepAddList(params).then(data=>{
          this.departmentId = data.data.data.departmentId
          this.roleId = data.data.data.roleId
          this.userName = data.data.data.userName
          this.password = ''
        })
      }
    },
    back(){
      this.$router.go(-1);
    },
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
