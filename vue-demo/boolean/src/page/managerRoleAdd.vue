<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        {{groupId ? '角色修改' : '角色添加'}}
      </div>
    </div>
    <div class="mRoleAddPage">
      <div class="choice">
        组名：<el-input v-model="groupName" placeholder="请输入组名" size='mini' class='groupName'></el-input><el-button type="text" size="small" class="publicMidBtn mRoleBtn" @click='toSet()'>提交修改</el-button><el-button type="text" size="small" class="publicMidBtn mRoleBtn" @click='beBack()'>返回</el-button>
      </div>
      <div class="mRoleList">
        <el-collapse v-model="activeName" accordion class="choiceList">
          <el-collapse-item :title="key" :name="index" v-for='(value, key, index) in roleList' :key='index'>
            <div class="mRoleContent" v-for='(item, index) in value' :key='index'>
              <template :slot-scope="item">
                <div id="">
                  {{item.menuName}}
                  <el-button type="text" size="small" class="publicSmalBtn mRoleBtn" @click='toChange(item)'>修改</el-button>
                </div>
              </template>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <el-dialog
      title="修改"
      :visible.sync="changeShow"
      :before-close="changeParamsList"
      >
      <div class='checkGroup'>
        <el-checkbox-group v-model="checkChange" >
          <el-checkbox :label="item.id" v-for='(item, index) in checkList' :key='index'>{{item.urlName}}</el-checkbox>
        </el-checkbox-group>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeParamsList(1)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {managerRoleAddList, managerRoleChangeList, managerRoleSet} from '@/API'
export default {
  data: () => ({
    activeName: 0,
    roleList: {},
    changeShow: false,
    checkList:[],
    checkChange:[],
    checkOrigin:[],
    authority: [],
    groupId: '',
    groupName: '',
  }),
  beforeMount(){
    if(this.$route.params.id){
        this.groupId = this.$route.params.id
        this.groupName = this.$route.params.name
    }
    this.getList();
  },
  methods: {
    beBack() {
      this.$router.go(-1)
    },
    toSet() {
      let params = {}
      let a = this.groupName.replace(/(^\s*)|(\s*$)/g, "")
      if(!a){
        // console.log(this.groupName);
        this.$message('组名不能为空')
        return
      }
      params.groupId = this.groupId
      params.ids = this.authority
      params.groupName = this.groupName
      // console.log(params);
      managerRoleSet(params).then(data=>{
        if(data.data.code == 'SUCCESS') {
          this.$message('成功')
          this.$router.replace({name: 'managerRole'})
        }else{
          this.$message('失败')
        }
      })
    },
    changeParamsList(close){
      // console.log(this.checkChange);
      if(!close){
        console.log(1);
        for(let i = 0; i<this.checkOrigin.length;i ++){
          this.authority.push(this.checkOrigin[i] + '');
        }
      }else{
        console.log(2);
        for(let i = 0; i<this.checkChange.length;i ++){
          this.authority.push(this.checkChange[i] + '');
        }
      }
      console.log(this.authority);
      this.changeShow = false
      return
    },
    getList() {
      let params = {}

      params.id = this.groupId
      // params.id = 1
      managerRoleAddList(params).then(data=>{
        // console.log(data);
        this.roleList = data.data.data.menuDetail
        let str = data.data.data.groupDatail.permissionIds
        str = str.replace(/^,+/,"").replace(/,+$/,"");
        let arr = [];
        if(str){
          // console.log(1)
          arr = str.split(',')
        }
        // console.log(str);
        this.authority = arr
      })
    },
    toChange(scop) {
      let params = {}
      params.id = scop.id
      this.checkChange = []
      managerRoleChangeList(params).then(data=>{
        // console.log(data);
        this.checkList = data.data.data
        for(let i = 0; i<this.checkList.length; i ++){
          for(let j = 0;j<this.authority.length; j++){
            if(this.checkList[i].id == this.authority[j]){
              this.checkChange.push(this.checkList[i].id)
              this.checkOrigin.push(this.checkList[i].id)
              let a = this.authority.indexOf((this.checkList[i].id + ''))
              this.authority.splice(a, 1);
            }
          }
        }
        // console.log(this.authority);
        // console.log(this.checkChange);
      })
      this.changeShow = true;
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
 .allPage{
   .mRoleAddPage{
     padding:10px 10px 10px 20px;
     background: #fff;
     .choice{
       padding: 10px;
       .groupName{
         width:200px;
         margin-right: 20px;
       }
       .mRoleBtn{
         width:60px;
       }
     }
     .mRoleList{
       border-right:1px solid #EBEEF5;
       border-left:1px solid #EBEEF5;
       height:690px;
       overflow-y: auto;
       overflow-x: hidden;
       &::-webkit-scrollbar {
         display: none;
       }
       .choiceList{
         /deep/ .el-collapse-item{
           div[role=tab]{
             border-bottom: 1px solid #EBEEF5;
             padding-left:20px;
           }
           .el-collapse-item__header{
             border-bottom: none;
             font-weight: bold;
             font-size: 16px;
           }
           .el-collapse-item__content{
             padding: 0;
           }
         }
         .mRoleContent{
           padding:10px 20px 10px 20px;
           border-top: 1px solid #EBEEF5;
           font-size: 14px;
           position: relative;
           &:first-child{
             border-top: none;
           }
           .mRoleBtn{
             position: absolute;
             right:40px;
             width:100px;
           }
           &:hover{
             background: #DBEDFF;
           }
         }
       }

     }
   }
   .checkGroup{
     /deep/ .el-checkbox{
       margin: 0 20px 0 0;
     }
   }
 }
</style>
