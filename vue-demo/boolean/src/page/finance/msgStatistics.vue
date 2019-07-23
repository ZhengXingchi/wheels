<template>
  <div class="allPage">
    <el-card class="box-card" style="margin-bottom: 10px;">
      <div slot="header" class="clearfix">
        <span>短信调用量统计</span>
        <el-button style="float: right; padding: 3px 0;color: #F56C6C" type="text">总费用:{{(msgTotal*0.05).toFixed(2)}}元</el-button>
      </div>
    </el-card>
      <el-tabs type="border-card" tab-click="handleClick">

        <el-tab-pane label="短信调用汇总">

             <el-table :data="smsStatic"
              style="width: 100%"
              stripe
              size="medium"
              :cell-style='cellStyle'>
            <el-table-column
                label="汇总日期"
                prop="gmt_datetime"
                width="200"
                >
            </el-table-column>
            <el-table-column
                prop="DQTX"
                label="到期提醒"
                width="100"
                >
            </el-table-column>
            <el-table-column
                prop="HTDLYZM"
                label="登录验证"
                width="100">
            </el-table-column>
            <el-table-column
                prop="DDFS"
                label="订单发送"
                width="100">
            </el-table-column>
            <el-table-column
                prop="XTYJ"
                label="系统预警"
                width="100">
            </el-table-column>
            <el-table-column
                prop="ZCCG"
                label="注册"
                width="100">
            </el-table-column>
            <el-table-column
                prop="XQTZ"
                label="续期提醒"
                width="100">
            </el-table-column>
            <el-table-column
                prop="DDWJ"
                label="订单完结"
                width="100">
            </el-table-column>
            <el-table-column
                prop="YZM"
                label="验证码"
                width="100">
            </el-table-column>
            <el-table-column
                prop="DQ_ONEDAY"
                label="还款提醒"
                width="100">
            </el-table-column>
            <el-table-column
                prop="total"
                label="总计"
                width="100">
            </el-table-column>
            <el-table-column
                label="费用总计"
                width="200">
                <template slot-scope="scope">
                <span>{{(scope.row.total*5/100).toFixed(2)}}元</span>
                </template>
            </el-table-column>
            </el-table>
            <div class="block choice">

            </div>
        </el-tab-pane>
    </el-tabs>
    <div class="block choice">
      <el-pagination
        @current-change="getSmsStaticListByDay"
        background
        :current-page.sync="pageNo"
        @size-change="sizeChange"
        :page-size="10"
        :page-sizes="[10, 20, 30, 50, 100]"
        layout="sizes, total, prev, pager, next, jumper"
        :total="pageAll">
      </el-pagination>
    </div>

  </div>
</template>
<script>

import {dataSmsStaticList,dataSmsStaticListByDay,dataRiskTotal} from '@/API'
let currentPage=1;
export default {

    data: ()=>({
        smsStatic:[],
        pageNo: currentPage,
        pageSize: 10,
        loginName: '',
        pageAll: 1,
        linkUrl:'',
        msgTotal:[],
        cellStyle:{
        'line-height': '16px;'
        },

    }),
    beforeMount(){
        if(currentPage>1) this.pageNo=currentPage;
        this.getSmsStaticListByDay();
        this.getSmsTotal();
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
                default:
                    typeStr ='未知';
                    break;

            }
            return typeStr;

        }
    },
    methods:{
        getSmsStaticListByDay(isOr){
            if(isOr == 0){
              this.pageNo = 1
            }
            currentPage = this.pageNo;
            let params = {
            pageNo: this.pageNo,
            pageSize: this.pageSize
            }
            dataSmsStaticListByDay(params).then((res=>{

                this.smsStatic = [];
                this.smsStatic = this.smsStatic.concat(res.data.data.smsStatisticalBydayPageCount.list);
                this.pageAll = res.data.data.smsStatisticalBydayPageCount.total;
            }))
        },
        getSmsTotal(){
          dataRiskTotal().then((res=>{
            this.msgTotal = res.data.data.SmSTotal;
          }))
        },
        handleClick(tab, event){
            console.log(tab, event);
        },
       sizeChange(size){
        this.pageSize = size;
        this.getSmsStaticListByDay(0);
      },
    }
}
</script>
