<template>
  <div class="allPage">
    <el-card class="box-card" style="margin-bottom: 10px;">
    <div slot="header" class="clearfix">
        <span>风控调用量统计</span>
        <el-button style="float: right; padding: 3px 0;color: #F56C6C" type="text">总费用:{{(riskTotal.youduntotal*0.9+riskTotal.zhimitotal*3.2).toFixed(2)|formatCurrency}}元</el-button>
    </div>
    <el-row :gutter="20">
        <el-col :span="8"><el-tag type="success">认证费:</el-tag><span class="risk_money"><i class="money">{{(riskTotal.youduntotal*0.9).toFixed(2)}}</i>元</span></el-col>
        <el-col :span="8"><el-tag type="success">云息风控:</el-tag><span class="risk_money"><i class="money">{{(riskTotal.zhimitotal*3.2).toFixed(2)}}</i>元</span></el-col>
    </el-row>
    </el-card>
      <el-tabs type="border-card" tab-click="handleClick">
        <el-tab-pane label="风控调用详情">
            <el-table :data="riskStaticList"
              style="width: 100%"
              stripe
              size="medium"
              :cell-style='cellStyle'>
            <el-table-column
                prop="id"
                label="ID"
                width="70"
                >
            </el-table-column>
            <el-table-column
                prop="userId"
                label="用户id"
                width="120">
            </el-table-column>
            <el-table-column
                prop="pushTime"
                label="发送时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="taskId"
                label="任务id"
                width="400">
            </el-table-column>
            <el-table-column
                label="风控类型"
                >
                <template slot-scope="scope">

                <span style="margin-left: 10px">{{scope.row.type|riskType}}</span>


                </template>
            </el-table-column>
            </el-table>
            <div class="block choice">
            <el-pagination
                @current-change="getRiskStaticList"
                background
                :current-page.sync="pageNo"
                @size-change="sizeChange"
                :page-size="pageSize"
                layout="prev, pager, next, jumper"
                :total="pageAll">
            </el-pagination>
            </div>
        </el-tab-pane>
        <el-tab-pane label="风控调用汇总">

             <el-table :data="riskStatic"
              style="width: 100%"
              stripe
              size="medium"
              :cell-style='cellStyle'>
            <el-table-column
                label="汇总日期"
                prop="yunxipush_time"
                width="200"
                >
            </el-table-column>
            <el-table-column
                prop="shujumohetotal"
                label="运营商报告"
                width="100"
                >
            </el-table-column>
            <el-table-column
                prop="youduntotal"
                label="ocr/活体/身份鉴权"
                width="200">
            </el-table-column>
            <!-- <el-table-column
                prop="yunxitotal"
                label="云息风控"
                width="200">
            </el-table-column> -->
            <el-table-column
                prop="zhimitotal"
                label="云息风控"
                width="200">
            </el-table-column>
            <el-table-column
                prop="total"
                label="总计"
                width="100">
            </el-table-column>
            <!-- <el-table-column
                label="费用总计"
                width="200">
                <template slot-scope="scope">
                <span>{{scope.row.shujumohetotal*0.8+scope.row.youduntotal*0.9+scope.row.yunxitotal*3}}元</span>
                </template>
            </el-table-column> -->
            </el-table>
          <div class="block choice">
            <el-pagination
              @current-change="getRiskStaticListByDay"
              background
              :current-page.sync="totalPageNo"
              :page-size="totalPageSize"
              layout="prev, pager, next, jumper"
              :total="totalPageAll">
            </el-pagination>
          </div>
        </el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import {dataRiskStaticList,dataRiskStaticListByDay,dataRiskTotal} from '@/API'
let currentPage=1;
export default {

    data: ()=>({
        riskStaticList: [],
        riskStatic:[],
        pageNo: currentPage,
        totalPageNo: 1,
        pageSize: 10,
        totalPageSize: 10,
        loginName: '',
        pageAll: 1,
        riskTotal:[],
        totalPageAll: 1,
        linkUrl:'',
        cellStyle:{
        'line-height': '16px;'
        },

    }),
    beforeMount(){
      if(currentPage>1) this.pageNo=currentPage;
        this.getRiskStaticList();
        this.getRiskStaticListByDay();
    },
    filters:{
        riskType:function(type){
            let typeStr='';
            switch(type)
            {
                case 0:
                    typeStr = '云息';
                    break;
                case 1:
                    typeStr = '有盾';
                    break;
                case 2:
                    typeStr = '数据魔盒';
                    break;
                case 3:
                    typeStr = '云息风控';
                    break;
                default:
                    typeStr ='未知';
                    break;
            }
            return typeStr;

        },
      formatCurrency:function(num) {
        num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num))
          num = "0";
        let sign = (num == (num = Math.abs(num)));
        num = Math.floor(num*100+0.50000000001);
        let cents = num%100;
        num = Math.floor(num/100).toString();
        if(cents<10)
          cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
          num = num.substring(0,num.length-(4*i+3))+','+
            num.substring(num.length-(4*i+3));
        return (((sign)?'':'-') + num + '.' + cents);
      },
    },
    methods:{

        getRiskStaticList(isOr){
          if(isOr == 0){
              this.pageNo = 1
            }
            currentPage = this.pageNo;
            let params = {
            pageNo: this.pageNo,
            pageSize: this.pageSize
            }
            dataRiskStaticList(params).then((res=>{
                console.log(res);
                this.riskStaticList = [];
                this.riskStaticList = this.riskStaticList.concat(res.data.data.list);
                this.pageAll = res.data.data.total;

            }))
        },
      sizeChange(size){
        this.pageSize = size;
        this.getRiskStaticList(0);
      },
        getRiskStaticListByDay(isOr){
          if(isOr == 0){
              this.pageNo = 1
            }
            currentPage = this.pageNo;
            let params = {
            pageNo: this.totalPageNo,
            pageSize: this.totalPageSize
            };
            dataRiskStaticListByDay(params).then((res=>{
                this.riskStatic = [];
                this.riskStatic = this.riskStatic.concat(res.data.data.dayTotal.list);
                this.totalPageAll = res.data.data.dayTotal.total;

            }));
          dataRiskTotal().then((res=>{
            this.riskTotal = res.data.data.RiskTotal;
          }))
        },
        handleClick(tab, event){
            console.log(tab, event);
        }
    }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .risk_money{
    padding: 0 10px;
    font-size: 16px;

  }
  .money{
    color: #F56C6C;
    margin: 0 10px;
  }
</style>
