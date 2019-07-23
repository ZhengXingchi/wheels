<template>
  <div class="allData">
    <div class="contentAllData" v-for='(value, key, index) in xinyanList' :key='key'>
      <div class="cADTitle">
        {{key}}
      </div>
      <div class="cADContent">
        {{value}}
      </div>
    </div>
  </div>
</template>

<script>
  import {auditingNewYan} from "@/API"
  export default {
    data:()=>{
          return{
            xinyanList:[],//新颜数据
          }
        },
      props:{
        userId:{
          type:String,
          default:0
        },
        isLoaded:{
          type:Boolean,
          default:false
        }
      },
      watch:{
        isLoaded:function(val){
          if(val) this.getXinyan();
        }
      },
      methods:{
        // 新颜报告
        getXinyan() {
          let params = {
            userId: this.userId
          }
          auditingNewYan(params).then(data=>{
            if(data.data.data==null || data.data.data==undefined){
              this.$message.error('系统未获取到新颜报告');
              return false;
            }
            if(data.data.data){
              let fromData = JSON.parse(data.data.data)
              if(fromData.data.code == 0){
                let dataAll = fromData.data.result_detail
                console.log(dataAll);
                this.xinyanList = {
                  '分数' : dataAll.xy_110001,
                  '本业务最大授信额度' : dataAll.xy_110002,
                  '本业务平均授信额度' : dataAll.xy_110003,
                  '本业务近1个月贷款笔数' : dataAll.xy_110004,
                  '本业务近3个月贷款笔数' : dataAll.xy_110005,
                  '本业务近6个月贷款笔数' : dataAll.xy_110006,
                  '本业务贷款总笔数' : dataAll.xy_110007,
                  '本业务贷款机构数' : dataAll.xy_110008,
                  '本业务最近一次贷款距今天数' : dataAll.xy_110009,
                  '本业务贷款已结清笔数' : dataAll.xy_110010,
                  '本业务贷款逾期订单数（M0+）' : dataAll.xy_110011,
                  '本业务贷款逾期订单数（M1+）' : dataAll.xy_110012,
                  '查询多头机构数' : dataAll.xy_110013,
                  '总查询次数' : dataAll.xy_110014,
                  '最近查询时间距今天数' : dataAll.xy_110015,
                  '近1个月查询多头' : dataAll.xy_110016,
                  '近3个月查询多头' : dataAll.xy_110017,
                  '近6个月查询多头' : dataAll.xy_110018,
                  '贷款已结清笔数' : dataAll.xy_110019,
                  '贷款逾期订单数（M0+）' : dataAll.xy_110020,
                  '贷款逾期订单数（M1+）' : dataAll.xy_110021,
                  '最近6个月全部时间短期现金贷在全部产品中接待疑似逾期天数占比' : dataAll.xy_110022,
                  '最近12个月全部时间全部产品非逾期还款在总还款中订单数占比' : dataAll.xy_110023,
                  '最近3次工作日全部产品最大借贷疑似逾期天数' : dataAll.xy_110024,
                  '最近3次全部时间全部产品最大还款金额' : dataAll.xy_110025,
                  '最近一年新增平台全部时间全部产品最大还款疑似逾期天数' : dataAll.xy_110026,
                  '最近10次全部时间全部产品累计还款疑似逾期天数' : dataAll.xy_110027,
                  '最近20次全部时间全部产品平均还款金额' : dataAll.xy_110028,
                  '最近一年新增平台全部时间短期现金贷累计非逾期还款金额' : dataAll.xy_110029,
                  '最近一年新增平台工作日短期现金贷累计还款金额' : dataAll.xy_110030,
                  '最近5次全部时间全部产品最大还款疑似逾期天数' : dataAll.xy_110031,
                };

              }else{
                this.xinyanList = {
                  '分数' : '',
                  '本业务最大授信额度' : '',
                  '本业务平均授信额度' : '',
                  '本业务近1个月贷款笔数' : '',
                  '本业务近3个月贷款笔数' : '',
                  '本业务近6个月贷款笔数' : '',
                  '本业务贷款总笔数' : '',
                  '本业务贷款机构数' : '',
                  '本业务最近一次贷款距今天数' : '',
                  '本业务贷款已结清笔数' : '',
                  '本业务贷款逾期订单数（M0+）' : '',
                  '本业务贷款逾期订单数（M1+）' : '',
                  '查询多头机构数' : '',
                  '总查询次数' : '',
                  '最近查询时间距今天数' : '',
                  '近1个月查询多头' : '',
                  '近3个月查询多头' : '',
                  '近6个月查询多头' : '',
                  '贷款已结清笔数' : '',
                  '贷款逾期订单数（M0+）' : '',
                  '贷款逾期订单数（M1+）' : '',
                  '最近6个月全部时间短期现金贷在全部产品中接待疑似逾期天数占比' : '',
                  '最近12个月全部时间全部产品非逾期还款在总还款中订单数占比' : '',
                  '最近3次工作日全部产品最大借贷疑似逾期天数' : '',
                  '最近3次全部时间全部产品最大还款金额' : '',
                  '最近一年新增平台全部时间全部产品最大还款疑似逾期天数' : '',
                  '最近10次全部时间全部产品累计还款疑似逾期天数' : '',
                  '最近20次全部时间全部产品平均还款金额' : '',
                  '最近一年新增平台全部时间短期现金贷累计非逾期还款金额' : '',
                  '最近一年新增平台工作日短期现金贷累计还款金额' : '',
                  '最近5次全部时间全部产品最大还款疑似逾期天数' : '',
                };
              }
            }else{
              this.xinyanList = {
                '分数' : '',
                '本业务最大授信额度' : '',
                '本业务平均授信额度' : '',
                '本业务近1个月贷款笔数' : '',
                '本业务近3个月贷款笔数' : '',
                '本业务近6个月贷款笔数' : '',
                '本业务贷款总笔数' : '',
                '本业务贷款机构数' : '',
                '本业务最近一次贷款距今天数' : '',
                '本业务贷款已结清笔数' : '',
                '本业务贷款逾期订单数（M0+）' : '',
                '本业务贷款逾期订单数（M1+）' : '',
                '查询多头机构数' : '',
                '总查询次数' : '',
                '最近查询时间距今天数' : '',
                '近1个月查询多头' : '',
                '近3个月查询多头' : '',
                '近6个月查询多头' : '',
                '贷款已结清笔数' : '',
                '贷款逾期订单数（M0+）' : '',
                '贷款逾期订单数（M1+）' : '',
                '最近6个月全部时间短期现金贷在全部产品中接待疑似逾期天数占比' : '',
                '最近12个月全部时间全部产品非逾期还款在总还款中订单数占比' : '',
                '最近3次工作日全部产品最大借贷疑似逾期天数' : '',
                '最近3次全部时间全部产品最大还款金额' : '',
                '最近一年新增平台全部时间全部产品最大还款疑似逾期天数' : '',
                '最近10次全部时间全部产品累计还款疑似逾期天数' : '',
                '最近20次全部时间全部产品平均还款金额' : '',
                '最近一年新增平台全部时间短期现金贷累计非逾期还款金额' : '',
                '最近一年新增平台工作日短期现金贷累计还款金额' : '',
                '最近5次全部时间全部产品最大还款疑似逾期天数' : '',
              };
            }

          })
        },
      }
    }
</script>

<style lang="scss" scoped>
  .contentAllData{
    padding-bottom: 5px;
    border-bottom: 1px solid grey;
  .cADTitle{
    display: inline-block;
    width: 70%;
  }
  .cADContent{
    display: inline-block;
    width: 28%;
  }
  }
</style>
