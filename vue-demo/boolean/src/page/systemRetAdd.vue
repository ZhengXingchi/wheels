<template>
  <div class="allPage">
    <el-tabs type="border-card">
      <el-tab-pane label="利率设置">
        <div class="content">
          <el-form  label-width="150px" style="width:500px">
            <el-form-item label="贷款期限：">
              <el-input v-model="limitDays"></el-input>
            </el-form-item>
            <el-form-item label="最小额度：">
              <el-input v-model="minBorrowMoney"></el-input>
            </el-form-item>
            <el-form-item label="最大额度：">
              <el-input v-model="maxBorrowMoney"></el-input>
            </el-form-item>
            <el-form-item label="利息（‰）：">
              <el-input v-model="interestPercent"></el-input>
            </el-form-item>
            <el-form-item label="平台服务费（％）：">
              <el-input v-model="placeServePercent"></el-input>
            </el-form-item>
            <el-form-item label="信息认证费（％）：">
              <el-input v-model="msgAuthPercent"></el-input>
            </el-form-item>
            <el-form-item label="风控服务费（％）：">
              <el-input v-model="riskServePercent"></el-input>
            </el-form-item>
            <el-form-item label="风险准备金（％）：">
              <el-input v-model="riskPlanPercent"></el-input>
            </el-form-item>
            <el-form-item label="逾期日利率（％）：">
              <el-input v-model="overduePercent"></el-input>
            </el-form-item>
             <el-form-item>
              <el-button type="primary" @click='sub'>提交</el-button>
            </el-form-item>
          </el-form> 
        </div> 
      </el-tab-pane>
      <!-- <el-tab-pane label="配置管理">
      </el-tab-pane> -->
    </el-tabs>

  </div>
</template>
<script>
import { systemRetAdd, systemRetSave } from '@/API'
export default {
  data: () => {
    return {
      id: '',
      interestPercent: '',
      limitDays: '',
      maxBorrowMoney: '',
      minBorrowMoney: '',
      msgAuthPercent: '',
      overduePercent: '',
      placeServePercent: '',
      riskPlanPercent: '',
      riskServePercent: '',
      hadPei: false,
    }
  },
  beforeMount() {
    this.search()
  },
  methods: {
    search(id) {
      let params = {}
      systemRetAdd(params).then((data)=>{

        const obj = data.data.data
        this.interestPercent = obj.interestPercent
        this.limitDays = obj.limitDays
        this.maxBorrowMoney = obj.maxBorrowMoney
        this.minBorrowMoney = obj.minBorrowMoney
        this.msgAuthPercent = obj.msgAuthPercent
        this.overduePercent = obj.overduePercent
        this.placeServePercent = obj.placeServePercent
        this.riskPlanPercent = obj.riskPlanPercent
        this.riskServePercent = obj.riskServePercent
      })
    },
    sub() {
      const allRegistDay = /^[0-9]{0,8}$/
      if(!(allRegistDay.test(this.limitDays) && allRegistDay.test(this.limitDays))){
        this.$Message.error('请输入正确的贷款期限');
        return
      }

      const allRegistRex = /^[0-9]{0,10}$/
      if(this.minBorrowMoney || this.maxBorrowMoney){
        if(!(allRegistRex.test(this.minBorrowMoney) && allRegistRex.test(this.maxBorrowMoney))){
          this.$Message.error('请输入正确的额度');
          return
        }
        if(this.minBorrowMoney > this.maxBorrowMoney){
          this.$Message.error('请输入正确的额度');
          return
        }
      }

      const baifenRex = /^([0-9]+\.[0-9]{2})[0-9]*#$/
      if(!(baifenRex.test(this.interestPercent) && baifenRex.test(this.interestPercent))){
        this.$Message.error('请输入正确的利息');
        return
      }
      if(!(baifenRex.test(this.placeServePercent) && baifenRex.test(this.placeServePercent))){
        this.$Message.error('请输入正确的平台服务费');
        return
      }
      if(!(baifenRex.test(this.msgAuthPercent) && baifenRex.test(this.msgAuthPercent))){
        this.$Message.error('请输入正确的信息认证费');
        return
      }
      if(!(baifenRex.test(this.riskServePercent) && baifenRex.test(this.riskServePercent))){
        this.$Message.error('请输入正确的风控服务费');
        return
      }
      if(!(baifenRex.test(this.riskPlanPercent) && baifenRex.test(this.riskPlanPercent))){
        this.$Message.error('请输入正确的风险准备金');
        return
      }
      if(!(baifenRex.test(this.overduePercent) && baifenRex.test(this.overduePercent))){
        this.$Message.error('请输入正确的逾期日利率');
        return
      }

      let date = new Date();
      date = this.dateChange(date);
      let params = {
        interestPercent: this.interestPercent,
        limitDays: this.limitDays,
        maxBorrowMoney: this.maxBorrowMoney,
        minBorrowMoney: this.minBorrowMoney,
        msgAuthPercent: this.msgAuthPercent,
        overduePercent: this.overduePercent,
        placeServePercent: this.placeServePercent,
        riskPlanPercent: this.riskPlanPercent,
        riskServePercent: this.riskServePercent
      }
      console.log(params);
      systemRetAdd(params).then(data=>{

      })
    },
    dateChange(date) {
      const Y = date.getFullYear() + '-';
      const M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ' ';
      const h = date.getHours() + ':';
      const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ':';
      const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },

  }
}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .content{
      padding: 20px 80px;
      background: #fff;
      .contentI{
        margin-bottom: 15px;
        display: inline-block;
        width: 49%;
        .title{
          display: inline-block;
          width: 150px;
          text-align: right;
          font-size: 12px;
          margin-right: 20px;
        }
        .myInput{
          width:350px;
        }
        .sub{
          margin-left: 16%;
        }
      }
    }
  }
</style>
