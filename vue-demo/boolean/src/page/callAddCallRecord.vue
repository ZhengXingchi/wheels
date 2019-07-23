<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        添加催收记录
      </div>
    </div>
    <div class="callRecord">
      <div class="cRcontent">
        <div class="collectionDetail">
          <h2>催收信息</h2>
          <div class="collectBasic">
            <div class="item">
              <span>订单编号:</span>
              <el-input v-model="order_id" placeholder="请输入订单编号" :disabled="true" style="width: 200px;"></el-input>
            </div>
            <div class="item">
              <span>借款人姓名:</span>
              <el-input v-model="borrow_name" placeholder="请输入姓名" :disabled="true" style="width: 200px;"></el-input>
            </div>
            <div class="item">
              <span>借款金额:</span>
              <el-input v-model="borrow_money" placeholder="借款金额" :disabled="true" style="width: 200px;"></el-input>

            </div>
            <div class="item">
              <span>滞纳金金额:</span>
              <el-input v-model="late_money" placeholder="违约金" :disabled="true" style="width: 200px;"></el-input>
            </div>
            <div class="item">
              <span>联系人电话:</span>
              <el-input v-model="contact_mobile" placeholder="联系人电话" :disabled="true" style="width: 200px;"></el-input>
            </div>
            <div class="item">
              <span>联系人名称:</span>
              <el-input v-model="contact_name" placeholder="联系人名称" :disabled="true" style="width: 200px;"></el-input>
            </div>
            <div class="item">
              <span>联系人类型:</span>
              <el-select v-model="contactType" style="width:200px;" placeholder="联系人类型">
                <el-option
                  v-for="item in contactTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
            <div class="item">
              <span>联系人关系:</span>
              <el-select v-model="linkRelation" style="width:200px;" placeholder="">
                <el-option
                  v-for="item in linkRelationList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
            <div class="item">
              <span>承诺还款时间:</span>
              <el-date-picker
                v-model="promiseTime"
                type="date"
                placeholder="选择日期" style="width: 200px;"
                value-format="yyyy-MM-dd">
              </el-date-picker>
            </div>
            <div class="item">
              <span>催收类型:</span>
              <el-select v-model="collectType" style="width:200px;" placeholder="">
                <el-option
                  v-for="item in collectTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </div>
          </div>

          <br><br>
          <div class="collectionCon">
            <h2>催收内容</h2>
            <el-input class="textareas" v-model="remarks" type="textarea" @change='saveStorage' :maxlength="150" :rows="3" :autosize="{ minRows: 3, maxRows: 4}" placeholder="输入150字以内"></el-input>
          </div>
          <br>
          <div class="">
            <h2>催收建议</h2>
            <el-select v-model="suggest" style="margin-left:32px;width:180px;" placeholder="建议">
              <el-option v-for="item in collectAdviceList" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </div>
          <br><br>
          <div class="">
            <h2>风控标签</h2>
            <el-radio-group class="userTag" v-model="tag">
              <el-radio class="checkBoxs" :label="1">失联</el-radio>
              <el-radio class="checkBoxs" :label="2">难联系</el-radio>
              <el-radio class="checkBoxs" :label="3">首通后屏蔽</el-radio>
              <el-radio class="checkBoxs" :label="4">首通前屏蔽</el-radio>
              <br>
              <el-radio class="checkBoxs" :label="5">联系人不匹配</el-radio>
              <el-radio class="checkBoxs" :label="6">联系人重号</el-radio>
              <el-radio class="checkBoxs" :label="7">疑似黑中介办理</el-radio>
              <el-radio class="checkBoxs" :label="8">各平台欠款</el-radio>
              <br>
              <el-radio class="checkBoxs" :label="9">各银行欠款</el-radio>
              <el-radio class="checkBoxs" :label="10">无赖不还</el-radio>
              <el-radio class="checkBoxs" :label="11">诚信度低</el-radio>
              <el-radio class="checkBoxs" :label="12">无偿还能力</el-radio>
              <br>
              <el-radio class="checkBoxs" :label="13">忘记还款</el-radio>
              <el-radio class="checkBoxs" :label="14">停机</el-radio>
              <el-radio class="checkBoxs" :label="15">空号</el-radio>
              <el-radio class="checkBoxs" :label="16">无法接通</el-radio>
              <br>
              <el-radio class="checkBoxs" :label="17">协商还款中</el-radio>
            </el-radio-group>
          </div>
        </div>
        <br>
        <br>
        <div class="btn">
          <el-button class="ok" type="primary" size="large" @click="submits">提交</el-button>
        </div>
      </div>
    </div>
    <div class="callSuggest">

    </div>
  </div>
</template>
<script>
import {callPPassCallRecordAdd,addCallRecordList} from "@/API"
import { mapMutations, mapGetters } from 'vuex'
export default {
  data(){
     return{
        listObject:{},
        order_id: '',//借款编号
        borrow_name:'',//借款人姓名
        borrow_money:'',//借款金额
        late_money:'',//违约金
        contact_mobile:'',//联系人手机号
        contact_name:'',//联系人名字
        contactType: '紧急联系人',//联系人类型
        linkRelation:"父亲",//联系人关系
        collectType:'电话催收',//催收类型
        remarks:'',//催收内容
        suggest:"无建议",//催收建议
        tag: '',//风控标签
        riskTitle: '',//风控标签
        level: "",//根据等级
        promiseTime: "",//承诺还款时间
        contactTypeList:[//联系人类型
          {
            value: '1',
            label: '紧急联系人'
          },
          {
            value: '2',
            label: '通讯录联系人'
          },
        ],
        linkRelationList:[//  联系人关系
          {
            value: '1',
            label: '父亲'
          },
          {
            value: '2',
            label: '母亲'
          },
          {
            value: '3',
            label: '亲人'
          },
          {
            value: '4',
            label: '朋友'
          },
          {
            value: '5',
            label: '同事'
          },
          {
            value: '6',
            label: '其他'
          },
        ],
        contactsList:[
          {
            value: '1',
            label: '黄金糕'
          }
        ],
        collectTypeList:[// 催收类型
          {
            value: '1',
            label: '电话催收'
          },
          {
            value: '2',
            label: '短信催收'
          },
        ],
        collectAdviceList:[//催收建议
          {
            value: '1',
            label: '无建议'
          },
          {
            value: '2',
            label: '拒绝'
          },
          {
            value: '3',
            label: '通过'
          },
        ],
        columns: [ //表格的头部
          {
            title:'序号',
            key: 'id',
          },
          {
            title:'借款人姓名',
            key: 'contact_name',
          },
          {
            title:'联系人姓名',
            key: 'contact_name',
          },
          {
            title:'联系人电话',
            key: 'contact_mobile',
          },
          {
            title:'催收类型',
            key: 'type',
          },
          {
            title:'催收员',
            key: 'collection_name',
          },
          {
            title:'催收建议',
            key: 'suggest',
          },
          {
            title:'催收内容',
            key: 'remarks',
          },
        ],
        data: [],//页面显示的数组
      }
  },
  computed: {
    ...mapGetters({
      id: 'GetCallId',//用户id
      idID: 'GetCallIdID'//订单id
    })
  },
  mounted(){
    this.callRecordListApi();//展示添加催收记录信息接口
    let remarks = sessionStorage.getItem('remarks')
    if(remarks){
      this.remarks = remarks
    }
  },
  methods:{
    ...mapMutations({
      close: 'CLOSECUISHOU'
    }),
    saveStorage(){
      sessionStorage.setItem('remarksId', this.idID);
      sessionStorage.setItem('remarks', this.remarks);
    },
    submits(){//提交催收记录内容
     this.addCallRecordApi()
    },
    addCallRecordApi(){//添加催收记录接口
      if(this.tag == 1){
        this.riskTitle = "失联"
      }
      if(this.tag == 2){
        this.riskTitle = "难联系"
      }
      if(this.tag == 3){
        this.riskTitle = "首通后屏蔽"
      }
      if(this.tag == 4){
        this.riskTitle = "首通前屏蔽"
      }
      if(this.tag == 5){
        this.riskTitle = "联系人不匹配"
      }
      if(this.tag == 6){
        this.riskTitle = "联系人重号"
      }
      if(this.tag == 7){
        this.riskTitle = "疑似黑中介办理"
      }
      if(this.tag == 8){
        this.riskTitle = "各平台欠款"
      }
      if(this.tag == 9){
        this.riskTitle = "各银行欠款"
      }
      if(this.tag == 10){
        this.riskTitle = "无赖不还"
      }
      if(this.tag == 11){
        this.riskTitle = "诚信度低"
      }
      if(this.tag == 12){
        this.riskTitle = "无偿还能力"
      }
      if(this.tag == 13){
        this.riskTitle = "忘记还款"
      }
      if(this.tag == 14){
        this.riskTitle = "停机"
      }
      if(this.tag == 15){
        this.riskTitle = "空号"
      }
      if(this.tag == 16){
        this.riskTitle = "无法接通"
      }
      if(this.tag == 17){
        this.riskTitle = "协商还款中"
      }
      callPPassCallRecordAdd({
        orderId:this.idID,//订单id
        userId:this.id,//用户id
        current:this.pageNo,//当前页数
        pageSize:this.pageSize,//每页条数
        riskTitle:this.riskTitle,//风控标签
        pressAdvice:this.suggest,//催收建议
        content:this.remarks,//催收内容
        pressType:this.collectType,//催收类型
        connectType:this.contactType,//联系人类型
        connectRelation:this.linkRelation,//联系人关系
        promisePayTime:this.promiseTime,//承诺还款时间
        connectName:this.contact_name,//联系人名字
        connectPhone:this.contact_mobile,//联系人电话
        }).then(data=>{
          // console.log("添加催收记录",data.data.data);
          // console.log("添加催收记录",data.data);
          this.$message.success('添加催记成功');
          this.close()
          this.$router.go(-1);
          if(data.data.code == "error"){
            this.$message.error('添加催记失败!');
          }
      })
    },
    callRecordListApi(){//展示添加催收记录信息接口
      addCallRecordList({
        id:this.idID,//订单号
        }).then(data=>{
          this.listObject = data.data.data
          this.order_id= this.listObject.id;//借款编号
          // this.order_id= this.listObject.orderNumber;//借款编号
          this.borrow_name= this.listObject.user.userName;//借款人姓名
          this.late_money= this.listObject.overdueMoney;//违约金
          this.contact_mobile= this.listObject.user.phone;//联系人手机号
          this.contact_name= this.listObject.user.userName;//联系人名字
      })
    }
  },

}
</script>
<style lang="scss" scoped>
@import "../style/publicSass.scss";
.cRcontent {
  background: #fff;
  .collectionDetail {
    margin-left: 28px;
    background-color: #ffffff;
    margin-right: 32px;
    border-radius: 6px;
    padding-bottom: 15px;
    h2 {
      font-size: 18px;
      margin-left: 32px;
      padding-top: 16px;
    }
    .collectBasic {
      margin-left: 32px;
      padding: 16px 62px 10px;
      border-radius: 6px;
      border: 1px dashed #e2e2e2;
      width: 90%;
    }
    .item {
      display: inline-block;
      width: 400px;
      margin-top: 10px;
      padding-left: 16px;
      span {
        display: inline-block;
        width: 100px;
      }
    }
    .tableList {
      max-height: 300px;
      margin-top: 10px;
      margin-left: 32px;
    }
    .userTag {
      margin-left: 32px;
      padding: 16px 105px 10px;
      border-radius: 6px;
      border: 1px dashed #e2e2e2;
      width: 90%;
    }
    .checkBoxs {
      margin-right: 70px;
      margin-bottom: 20px;
      width: 110px;
    }
    .collectionCon {
      .textareas {
        margin-left: 32px;
        width: 90%;
      }
    }
  }
  .btn {
    margin-top: 28px;
    margin-left: 28px;
    background-color: #ffffff;
    margin-right: 32px;
    border-radius: 6px;
    padding-bottom: 15px;
    padding-top: 15px;
    .ok {
      margin-left: 72%;
      padding: 16px 62px 10px;
      border-radius: 6px;
      width: 20%;
    }
  }
}
</style>
