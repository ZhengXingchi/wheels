
<template>
  <div class="allPage">
    <!-- <el-button type="" icon="el-icon-search" size='mini' @click='callPhone' class="publicMidBtn">打电话</el-button> -->

    <index-column-one/>

    <index-column-two title="趋势图"/>

  <!--<div>-->
    <!--<el-tabs v-model="activeName" @tab-click="handleClick">-->
    <!--<el-tab-pane label="用户统计" name="userCount">-->
      <!--<div class="dataPage">-->
        <!--<div class="content">-->
          <!--<div class="c_content" >-->
            <!--<div class="c_item" v-for='(value,key) in userList'>-->
              <!--<span class="name">{{key}}：</span>-->
              <!--<span class="data">{{value}}</span>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <!--&lt;!&ndash;<el-row :gutter="12">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="6">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-card shadow="always">&ndash;&gt;-->
            <!--&lt;!&ndash;<h3 style="padding:0;margin:0;">放款总额</h3>&ndash;&gt;-->
            <!--&lt;!&ndash;<div style="padding: 14px;">&ndash;&gt;-->
              <!--&lt;!&ndash;<span style="color:#F56C6C">{{loanTotal.totalRealMoney.toFixed(2)}}</span>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-card>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="6">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-card shadow="always">&ndash;&gt;-->
            <!--&lt;!&ndash;待还总额&ndash;&gt;-->
          <!--&lt;!&ndash;</el-card>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="6">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-card shadow="always">&ndash;&gt;-->
            <!--&lt;!&ndash;已还总额&ndash;&gt;-->
          <!--&lt;!&ndash;</el-card>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="6">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-card shadow="always">&ndash;&gt;-->
            <!--&lt;!&ndash;已还总额&ndash;&gt;-->
          <!--&lt;!&ndash;</el-card>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-row>&ndash;&gt;-->
    <!--</el-tab-pane>-->
    <!--<el-tab-pane label="放款统计" name="payCount"></el-tab-pane>-->
    <!--<el-tab-pane label="收款统计" name="repayCount"></el-tab-pane>-->
    <!--<el-tab-pane label="风控统计" name="controlCount"></el-tab-pane>-->
    <!--<el-tab-pane label="实时渠道统计" name="channelCount"></el-tab-pane>-->
  <!--</el-tabs>-->
  <!--</div>-->

    <!--<div class="dataPage" v-show="activeName=='payCount'">-->
      <!--<div class="content">-->
        <!--<div class="c_content" >-->
          <!--<div class="c_item" v-for='(value, key) in loanList'>-->
            <!--<span class="name">{{key}}：</span>-->
            <!--<span class="data">{{value}}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="dataPage" v-show="activeName=='repayCount'">-->
      <!--<div class="content">-->
        <!--<div class="c_content" >-->
          <!--<div class="c_item" v-for='(value, key) in getMoneyList'>-->
            <!--<span class="name">{{key}}：</span>-->
            <!--<span class="data">{{value}}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="dataPage" v-show="activeName=='controlCount'">-->
      <!--<div class="content">-->
        <!--<div class="c_content" >-->
          <!--<div class="c_item" v-for='(value, key) in fengkongList'>-->
            <!--<span class="name">{{key}}：</span>-->
            <!--<span class="data">{{value}}</span>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
    <!--<div class="dataPage" v-show="activeName=='channelCount'">-->
      <!--<div class="content">-->
        <!--<div class="c_content" >-->
          <!--<el-table-->
            <!--:data="channelList"-->
            <!--border-->
            <!--show-summary-->
            <!--style="width: 100%">-->
            <!--<el-table-column-->
              <!--prop="channel_name"-->
              <!--label="渠道"-->
              <!--width="70">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="register_count"-->
              <!--label="注册数">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="basc_auth"-->
              <!--label="基本认证">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="identity_auth"-->
              <!--label="身份认证">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="phone_auth"-->
              <!--label="电话认证">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="bank_auth"-->
              <!--width="100"-->
              <!--label="银行卡认证">-->
            <!--</el-table-column>-->
             <!--<el-table-column-->
              <!--prop="taobao_auth"-->
              <!--label="淘宝认证">-->
            <!--</el-table-column>-->
             <!--<el-table-column-->
              <!--prop="zhifubao_auth"-->
              <!--width="100"-->
              <!--label="支付宝认证">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="all_author"-->
              <!--label="全部认证">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="loan_no_shenhe"-->
              <!--label="审核中">-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--prop="loan_no_pay"-->
              <!--label="未打款">-->
            <!--</el-table-column>-->

            <!--<el-table-column-->
              <!--label="全认证"-->
              <!--width="120"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.all_author}}<span style="color:#409EFF">({{ (scope.row.all_author/scope.row.register_count*100).toFixed(2) }}%)</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--width="120"-->
              <!--label="机审转化">-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.risk_status}}<span style="color:#409EFF">({{(scope.row.risk_status/scope.row.register_count*100).toFixed(2)}}%)</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--label="下款数"-->
              <!--width="120"-->
            <!--&gt;-->
              <!--<template slot-scope="scope">-->
                <!--{{scope.row.loan_cout}}<span style="color:#409EFF">({{ (scope.row.loan_cout/scope.row.register_count*100).toFixed(2) }}%)</span>-->

              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</div>-->
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import moment from 'moment'
// import {userCount, loanData, fengKong, shoukuan, callPhone,qudaoCount} from '@/API'
import indexColumnOne from './components/index/indexColumnOne'
import indexColumnTwo from './components/index/indexColumnTwo'

export default {
  components:{indexColumnOne,indexColumnTwo},

}
</script>


<style lang="scss" scoped>
@import '../style/publicSass.scss';
.allPage{
  margin: 30px;
  margin-top: 10px;
  background: none;
  .dataPage{
    padding: 20px;
    background: #fff;
    .content{
      .title{
        margin-bottom: 20px;
      }
      .c_content{
        .c_item{
          display: inline-block;
          background: #F6F6F6;
          width: 488px;
          margin-right: 15%;
          margin-top: 3px;
          span{
            display: inline-block;
            padding:4px 4px ;
          }
          .name{
            width: 160px;
            height: 100%;
            text-align: right;
            padding-right: 7px;
          }
          .data{
            height:100%;
            width:59.5%;
            padding-left: 15px;
            background: #E9E9E9;
            font-weight: bolder;
          }
        }
      }
    }
  }
}
</style>
