<template>
  <div class="content">
    <h3>今日数据</h3>
    <el-row type="flex" class="row-bg" justify="space-between">
      <el-col :span="3">
        <el-card :body-style="{ padding: '0px','text-align':'center' }">
          <div style="padding: 14px;height:100px">
            <span class="count-tips">注册用户数</span>
            <div class="count clearfix">
              {{data.zhuceToday}}
            </div>
            </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card :body-style="{ padding: '0px','text-align':'center' }">
          <div style="padding: 14px;height:100px">
            <span class="count-tips">认证成功数(人)</span>
            <div class="count clearfix">
              {{data.todayRenzheng}}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card :body-style="{ padding: '0px','text-align':'center' }">
          <div style="padding: 14px;height:100px">
            <span class="count-tips">借款申请数(笔)</span>
            <div class="count clearfix">
              {{data.todayNewNumberOfLoan}}(新)
            </div>
            <div class="clearfix">
              {{data.todayOldNumberOfLoan}}(老)
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card :body-style="{ padding: '0px','text-align':'center' }">
          <div style="padding: 14px;height:100px">
            <span class="count-tips">放款人数(人)</span>
            <div class="count clearfix">
              {{data.todayNewNumberOffangkuanLoan}}(新)
            </div>
            <div class="clearfix">
              {{data.todayOldNumberOffangkuanLoan}}(老)
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card :body-style="{ padding: '0px','text-align':'center' }">
          <div style="padding: 14px;height:100px">
            <span class="count-tips">放款通过率(%)</span>
            <div class="count clearfix">
              {{data.newLoanPassRate}}%(新)
            </div>
            <div class="clearfix">
              {{data.oldLoanPassRate}}%(老)
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card :body-style="{ padding: '0px','text-align':'center' }">
          <div style="padding: 14px;height:100px">
            <span class="count-tips"> 还款人数(人)</span>
            <div class="count clearfix">
              {{data.repayNum}}
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="3">
        <el-card :body-style="{ padding: '0px','text-align':'center' }">
          <div style="padding: 14px;height:100px">
            <span class="count-tips">逾期数(笔)</span>
            <div class="count clearfix">
              {{data.todayOverdue}}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <h3>累计数据</h3>
    <el-row type="flex" class="row-bg" justify="space-between">
      <!--笔数统计-->
      <el-col :span="10">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="10">
            <el-card shadow="hover" :body-style="{ padding: '0px','text-align':'center' }">
              <div style="padding: 14px;">
                <div class="count clearfix">
                  {{data.zhuceToTal}}
                </div>
                <span class="count-tips">累计注册用户</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card shadow="hover" :body-style="{ padding: '0px','text-align':'center' }">
              <div style="padding: 14px;">
                <div class="count clearfix">
                  {{data.totalNumberOffangkuanLoan}}
                </div>
                <span class="count-tips">累计放款笔数</span>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="10">
            <el-card shadow="hover" :body-style="{ padding: '0px','text-align':'center' }">
              <div style="padding: 14px;">
                <div class="count clearfix">
                  {{data.totalOverdue}} ({{data.overDuePercent|filterNum}}%)
                </div>
                <span class="count-tips">累计逾期笔数</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card shadow="hover" :body-style="{ padding: '0px','text-align':'center' }">
              <div style="padding: 14px;">
                <div class="count clearfix">
                  {{data.totalRepayNum}}
                </div>
                <span class="count-tips">累计还款笔数</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <!--累计额度统计-->
      <el-col :span="10">
        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="10">
            <el-card shadow="hover" :body-style="{ padding: '0px','text-align':'center' }">
              <div style="padding: 14px;">
                <div class="count clearfix">
                  {{data.yiFangkuanMoney}}
                </div>
                <span class="count-tips">已放款总额</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card shadow="hover" :body-style="{ padding: '0px','text-align':'center' }">
              <div style="padding: 14px;">
                <!-- <div class="count clearfix">
                  {{data.totalHuikuanMoney}}
                </div> -->
                <el-tooltip class="item" effect="dark" placement="top-end">
                  <div slot="content">续期总额{{data.totalExtendMoney}}</div>
                <div class="count clearfix">
                  {{data.totalHuikuanMoney}}
                </div>
                </el-tooltip>
                <span class="count-tips">已回款总额</span>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="10">
            <el-card shadow="hover" :body-style="{ padding: '0px','text-align':'center' }">
              <div style="padding: 14px;">
                <div class="count clearfix">
                  {{data.daiHuankuanMoney}}
                </div>
                <span class="count-tips">待还款总额</span>
              </div>
            </el-card>
          </el-col>
          <el-col :span="10">
            <el-card shadow="hover" :body-style="{ padding: '0px','text-align':'center' }">
              <div style="padding: 14px;">
                <div class="count clearfix">
                  {{data.totalOverdueMoney}}
                </div>
                <span class="count-tips">逾期未还总额</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {Decimal} from 'decimal.js';
  import {getIndexGeneralStatic} from '@/API'
    export default {
      data:()=>{
        return{
          data:[],
        }
      },
      beforeMount(){
        this.getData();
      },
      filters:{
        filterNum:function(val){
          if(!val) return 0;
          return new Decimal(val).toFixed(2);
        }
      },
      methods:{
        getData(){
          getIndexGeneralStatic().then(res=>{
            console.log(res.data.data);
            this.data = res.data.data;
            this.data.overDuePercent = new Decimal(this.data.totalOverdue/this.data.totalNumberOffangkuanLoan*100).toFixed(2);
            // if(this.data.overDuePercent == NaN){
            //   this.data.overDuePercent = 0
            // }else{
            //   this.data.overDuePercent 
            // }
          })
        }
      },
    }
</script>

<style  scoped>
  .content .el-row{
    margin-bottom: 10px;
  }
  .count-tips{
    color:#909399;
  }
.count{
  margin-top: 10px;
  font-size:20px;
  color:#409EFF;
}
.item {
      margin: 4px;
      cursor:pointer;
    }
</style>
