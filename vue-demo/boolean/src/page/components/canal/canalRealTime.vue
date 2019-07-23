<template>
  <div class="allPage">
    <el-form   label-width="100px" class="demo-ruleForm">
      <el-form-item label="实时刷新" prop="delivery">
        <el-switch v-model="referOneMinute"></el-switch>
      </el-form-item>
    </el-form>
    <el-table
      :data="channelList"
      border
      show-summary
      @cell-click='toDetail'
      style="width: 100%">
      <el-table-column
        prop="channel_name"
        label="渠道"
        width="70">
        <template scope="scope">
            <span class="userName">{{ scope.row.channel_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="register_count"
        label="注册数">
      </el-table-column>
      <el-table-column
        prop="basc_auth"
        label="基本认证">
      </el-table-column>
      <el-table-column
        prop="identity_auth"
        label="身份认证">
      </el-table-column>
      <el-table-column
        prop="phone_auth"
        label="电话认证">
      </el-table-column>
      <el-table-column
        prop="bank_auth"
        width="100"
        label="银行卡认证">
      </el-table-column>
      <el-table-column
        prop="taobao_auth"
        label="淘宝认证">
      </el-table-column>
      <el-table-column
        prop="zhifubao_auth"
        width="100"
        label="支付宝认证">
      </el-table-column>
      <el-table-column
        prop="all_author"
        label="全部认证">
      </el-table-column>
      <el-table-column
        prop="loan_no_shenhe"
        label="审核中">
      </el-table-column>
      <el-table-column
        prop="loan_no_pay"
        label="未打款">
      </el-table-column>

      <el-table-column
        label="全认证"
        width="120"
      >
        <template slot-scope="scope">
          {{scope.row.all_author}}<span style="color:#409EFF">({{ (scope.row.all_author/scope.row.register_count*100).toFixed(2) }}%)</span>
        </template>
      </el-table-column>
      <el-table-column
        width="120"
        label="机审转化">
        <template slot-scope="scope">
          {{scope.row.risk_status}}<span style="color:#409EFF">({{(scope.row.risk_status/scope.row.register_count*100).toFixed(2)}}%)</span>
        </template>
      </el-table-column>
      <el-table-column
        label="下款数"
        width="120"
      >
        <template slot-scope="scope">
          {{scope.row.loan_cout}}<span style="color:#409EFF">({{ (scope.row.loan_cout/scope.row.register_count*100).toFixed(2) }}%)</span>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {qudaoCount} from '@/API'
import { log } from 'util';
    export default {
        data:()=>{
          return {
            channelList:[],
            referOneMinute:false,
            loading:true,
            interval:null,
            whichCanal:[]
          }
        },
      beforeMount(){
        this.getList();
        qudaoCount().then(data=>{
            this.whichCanal = data.data
            // console.log(data);
           })
      },
      destroyed:function(){
        clearInterval(this.interval);
      },
      watch:{
        referOneMinute:function(val){
          console.log(this.interval);
          if(val===true){
            let that = this;
            this.interval = setInterval(function(){
              that.getList();
            },60000)
          }else{
            clearInterval(this.interval);
            this.interval=null;
          }
        },
        $route() {
          const { name,meta } = this.$route;
          console.log(name);
          if (name ) {

          }
        },
      },
      methods:{
        getList:function(){
          this.loading=true;
          qudaoCount().then(data=>{
            this.channelList = data.data
            this.loading=false;
            console.log(data.data);
           })
        },
        toDetail(column, row) {
          if(row.label == '渠道'){
            this.$router.push({name: 'flowControl',params:{channelId:column.channel_id}})
            // console.log(1111,this.suerId);
            // console.log(2222,column.channel_id);
          }      
        },
      }
    }
</script>

<style scoped>
.userName{
    color: 	DodgerBlue;
    cursor:pointer;
  }
</style>
