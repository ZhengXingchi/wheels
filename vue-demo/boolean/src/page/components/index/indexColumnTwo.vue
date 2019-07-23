<template>
  <div class="content">
    <h3>{{title}}
      <div style="float: right">
        <!-- <el-radio-group v-model="selectType" size="medium">
          <el-radio-button label="还款日统计" name="byRepay"></el-radio-button>
          <el-radio-button label="借款日统计" name="byLoan"></el-radio-button>
        </el-radio-group> -->
        <el-date-picker
          v-model="selectDate"
          type="datetimerange"
          value-format='yyyy-MM-dd'
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          :picker-options="pickerOptions">
        </el-date-picker>
      </div>
    </h3>
    <el-row type="flex" class="row-bg" justify="space-between" :gutter="20">
      <el-col :span="12">
        <div id="loanChart" style="width: 100%;height:350px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)"></div>
      </el-col>
      <el-col :span="12">
        <div id="repayChart" style="width: 100%;height:350px;box-shadow: 0 2px 12px 0 rgba(0,0,0,.1)"></div>
      </el-col>

    </el-row>
  </div>

</template>

<script>
  import {getIndexLoanChart,getIndexRepayChart} from '@/API'
  let d = new Date();
    export default {
      data:()=>{
        return{
          data:[],
          selectDate:[new Date(d.getFullYear(), d.getMonth(), (d.getDate()-15)),new Date(d.getFullYear(), d.getMonth(), d.getDate())],
          selectType:'还款日统计',
          loanDataLoaded:false,
          repayDataLoaded:false,
          repayOption:{},
          loanOption:{},//借款表
          pickerOptions:{
            shortcuts: [{
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            }, {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }]
          },
        }
      },
      props:{
        title:{
          type:String,
          default:''
        }
      },
      beforeMount(){
        this.initOption();
        this.getData();
        console.log('init ok');
      },
      watch:{
        repayDataLoaded:function(val){
          if(val==true && this.repayOption.xAxis[0].data.length>0){
            let repayChart = this.$echarts.init(this.$el.querySelector ('#repayChart'));
            repayChart.setOption(this.repayOption);
          }
        },
        loanDataLoaded:function(val){
          if(val==true && this.loanOption.xAxis[0].data.length>0){
            let loanChart = this.$echarts.init(this.$el.querySelector ('#loanChart'));
            loanChart.setOption(this.loanOption);
          }
        },
        selectDate:function(val){
          this.getData(val);
        }
      },
      methods:{
        getData(date){
          let param,param1
          this.loanDataLoaded = false;
          this.repayDataLoaded = false;
          if(!date){
            let fromMonth = new Date(d.getFullYear(), d.getMonth(), (d.getDate()-15)).getMonth()+1;
            let endMonth  = d.getMonth()+1;
            let fromDay = new Date(d.getFullYear(), d.getMonth(), (d.getDate()-15)).getDate();
            let endDay = d.getDate();
            if(fromMonth>=1 && fromMonth<=9){
              fromMonth = "0"+fromMonth;
            }
            if(endMonth>=1 && endMonth<=9){
              endMonth = "0"+endMonth;
            }
            if(fromDay>=0 && fromDay<=9){
              fromDay = "0"+fromDay;
            }
            if(endDay>=0 && endDay<=9){
              endDay = "0"+endDay;
            }
            let fromDate = d.getFullYear()+'-'+fromMonth+'-'+fromDay;
            let endDate = d.getFullYear()+'-'+endMonth+'-'+endDay;
            param = {giveDatetime:fromDate+'~'+endDate};
            param1 =  {realPayTime:fromDate+'~'+endDate};
          }else{
            param = {giveDatetime:date[0]+'~'+date[1]};
            param1 = {realPayTime:date[0]+'~'+date[1]};
          }
          

          getIndexLoanChart(param).then(res=>{
            this.data = res.data.data;
            this.loanOption.xAxis[0].data = [];
            this.loanOption.series[0].data = [];
            this.data.FangkuanTongjiByday.forEach(detail => {
              this.loanOption.xAxis[0].data.push(detail.giveTime);
              this.loanOption.series[0].data.push(detail.yiFangkuanMoney);
              
            })
            this.loanDataLoaded = true;
          })
          getIndexRepayChart(param1).then(res=>{
            this.data = res.data.data;
            this.repayOption.xAxis[0].data = [];
            this.repayOption.series[0].data = [];
            this.data.HuankuanTongjiByday.forEach(detail => {
              this.repayOption.xAxis[0].data.push(detail.realPayTime);
              this.repayOption.series[0].data.push(detail.huikuanMoney);
              
            })
            this.repayDataLoaded = true;
          })
        },

        initOption(){
          this.repayOption={
            color: ['#3398DB'],
            title: {
              left: 'center',
              text: '还款统计趋势',
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              show : true,
              feature : {
                mark : {show: true},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
              }
            },
            calculable : true,
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : [],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'还款总额',
                type:'line',
                barWidth: '60%',
                data:[]
              }
            ],

          };
          this.loanOption = {
            color: ['#3398DB'],
            title: {
              left: 'center',
              text: '借款统计趋势',
            },
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              show : true,
              feature : {
                mark : {show: true},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
              }
            },
            calculable : true,
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis : [
              {
                type : 'category',
                data : [],
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : [
              {
                name:'借款总额',
                type:'line',
                barWidth: '60%',
                data:[]
              }
            ],
          }
        },
      },
    }
</script>

<style  scoped>

</style>
