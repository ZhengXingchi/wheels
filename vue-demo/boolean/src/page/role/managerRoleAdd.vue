<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        {{groupId ? '角色修改' : '角色添加'}}
      </div>
    </div>
    <div class="mRoleAddPage">
      <div class="choice">
        组名：<el-input v-model="groupName" placeholder="请输入组名" size='mini' class='groupName'></el-input>
        <el-button type="primary" size="small" @click='toSet()'>提交修改</el-button><el-button size="small" @click='beBack()'>返回</el-button>
      </div>
      <div class="mRoleList">
        <el-table
          :data="allRoles"
          border
          style="width: 100%">
          <el-table-column
            prop="name"
            label="一级菜单"
            width="180">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="二级菜单">
            <template slot-scope="scope">
              <el-table
                :data="scope.row.list"
                
                style="width: 100%">
                <el-table-column
                  label="菜单"
                  width="180">
                  <template slot-scope="scope">
                    <input type='checkbox' name='allchecker[]' @change='selectAll($event.currentTarget,"m_"+scope.row.id, "checkbox")' />{{scope.row.menuName}}
                  </template>
                </el-table-column>
              
                <el-table-column
                  
                  label="操作权限">
                  <template slot-scope="scope">
                    <div :id="'m_'+scope.row.id">
                      <div  class="group-item" v-for="(md,index) in scope.row.intefaceIdName" :key="index" >
                        <input  type="checkbox" :name="'actions['+scope.row.id+'][]'" :value="md.intefaceId" v-model="md.havePermission">
                      <span class="priv" :data-id='md.intefaceId' :id="scope.row.id+'-'+md.intefaceId">{{md.intefaceName}}</span>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-checkbox :indeterminate="false">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" >
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group> -->
      </div>
    </div>
 
  </div>
</template>
<script>
import {managerRoleAddList, managerRoleChangeList,managerAllRoleList, managerRoleSet} from '@/API'
export default {
  data: () => ({
    activeName: 0,
    roleList: {},
    changeShow: false,
    isIndeterminate:true,
    checkList:[],
    checkChange:[],
    checkOrigin:[],
    authority: [],
    groupId: '',
    groupName: '',
    allRoles:[],
  }),
  beforeMount(){
    if(this.$route.params.id){
        this.groupId = this.$route.params.id
        this.groupName = this.$route.params.name
       this.getAllRole();
    }
    
  },
  methods: {
    beBack() {
      this.$router.go(-1)
    },
    selectAll(checker,scope,type){
      if(scope)
      {
          if(type == 'button')
          {
              $('#' + scope + ' input').each(function() 
              {
                  $(this).prop("checked", true)
              });
          }
          else if(type == 'checkbox')
          {
              $('#' + scope + ' input').each(function() 
              {
                  $(this).prop("checked", checker.checked)
              });
          }
      }
      else
      {
          if(type == 'button')
          {
              $('input:checkbox').each(function() 
              {
                  $(this).prop("checked", true)
              });
          }
          else if(type == 'checkbox')
          { 
              $('input:checkbox').each(function() 
              {
                  $(this).prop("checked", $event.checked)
              });
          }
      }
    },
    toSet() {
      let checkValue = '';
      $(':checkbox').each(function(){
        if($(this).attr('name')!='allchecker[]'){
          if($(this).is( ":checked" ) && $(this).next('span').data('id') != undefined){
            if(checkValue==''){
              checkValue =  $(this).next('span').data('id');
            }else{
              checkValue = checkValue + ',' + $(this).next('span').data('id');
            }
            
          } 
        }
      })

      let params = {}
      let a = this.groupName.replace(/(^\s*)|(\s*$)/g, "")
      if(!a){
        // console.log(this.groupName);
        this.$message('组名不能为空')
        return
      }
      params.groupId = this.groupId
      params.ids = checkValue.split(",").sort(function(a,b){return a-b});
      console.log(params.ids);
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
    getAllRole(){
      let params = {};
      params.roleId = this.groupId;
      managerAllRoleList(params).then(res=>{
        this.allRoles = res.data.data;
      });
    },
  
  
  },
}
</script>
<style lang="scss" scoped>
@import '../../style/publicSass.scss';
.group-item {display:block; width:200px; float:left; font-size: 14px}
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
