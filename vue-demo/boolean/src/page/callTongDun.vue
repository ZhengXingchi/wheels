<template>
  <div class="allPage">
    <div class="allTitle">
      <div class="allTitleStyle">
        同盾报告
      </div>
    </div>
    <div class="tabs">
      <!-- 基本信息 -->
      <div class="content">
        <div class="con_title">
          运营商信息
        </div>
        <div class="contentItem">
          <div class="titletiao">
            姓名:
          </div>
          <div class="substance">
            {{identiList.realName}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            手机号:
          </div>
          <div class="substance">
            {{identiList.phone}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            入网时间:
          </div>
          <div class="substance">
            {{identiList.netTime}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            账户状态:
          </div>
          <div class="substance">
            {{identiList.mobileStatus}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            账户星级:
          </div>
          <div class="substance">
            {{identiList.creditLevel}}
          </div>
        </div>
        <div class="contentItem">
          <div class="titletiao">
            账户余额:
          </div>
          <div class="substance">
            {{identiList.accountBalance}}
          </div>
        </div>
      </div>
      <div class="content">
        <div class="con_title">
          月使用情况
        </div>
        <div class="">
          <!-- 月使用情况 -->
          <el-table
            :data="mounthList"
            style="width: 100%"
            :cell-style='cellStyle'
            height='150'
            >
            <el-table-column
              prop="uptDatetime"
              label="第一紧急联系人最后通话"
              width='200'
              >
            </el-table-column>
            <el-table-column
              prop="setuptDatetime"
              label="第二紧急联系人最后通话"
              width='200'>
            </el-table-column>
            <el-table-column
              prop="FirstCallTimes"
              label="第一紧急联系人通话次数"
              width='200'
              >
            </el-table-column>
            <el-table-column
              prop="SecCallTimes"
              label="与第二紧急联系人通话次数"
              width='200'
              >
            </el-table-column>
            <el-table-column
              prop="FirstRankNum"
              label="与第一联系人通话次数排名"
              width='200'
              >
            </el-table-column>
            <el-table-column
              prop="SecRankNum"
              label="与第一联系人通话次数排名"
              width='200'
              >
            </el-table-column>
            <el-table-column
              prop="realMoney"
              label="手机关机静默天数"
              width='200'
              >
            </el-table-column>
          </el-table>
          <!-- Top 10 -->
          <el-table :data="topTen1" style="width:500px;display:inline-block;">
            <el-table-column label="TOP 10" align="center">
              <el-table-column label="碰撞数:6" align="center">
                <el-table-column prop="index" label="排名" >
                </el-table-column>
              </el-table-column>
              <el-table-column label="呼入" align="center">
                <el-table-column prop="phone" label="电话号码" >
                </el-table-column>
                <el-table-column prop="callCountPassive" label="通话次数" >
                </el-table-column>
                <el-table-column prop="name" label="通讯备注" >
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>
          <el-table :data="topTen2" style="width:500px;display:inline-block;">
            <el-table-column label="TOP 10" align="center">
              <el-table-column label="呼出" align="center">
                <el-table-column prop="phone" label="电话号码">
                </el-table-column>
                <el-table-column prop="callCountActive" label="通话次数" >
                </el-table-column>
                <el-table-column prop="name" label="通讯备注" >
                </el-table-column>
              </el-table-column>
            </el-table-column>
          </el-table>

          <!-- 通话数据分析（通话详情） -->
          <el-table :data="tableData2" style="width: 100%">
            <el-table-column label="通话数据分析（通话详情）" align="center">
              <el-table-column prop="phone" label="号码" width="180"></el-table-column>
              <el-table-column prop="belongArea" label="归属地" width="180"></el-table-column>
              <el-table-column prop="callTimes" label="联系次数" width="180"></el-table-column>
              <el-table-column prop="callCountActive" label="主叫次数" width="180"></el-table-column>
              <el-table-column prop="callCountPassive" label="被叫次数" width="180"></el-table-column>
              <el-table-column prop="callTime" label="联系时间(分)" width="180"></el-table-column>
              <el-table-column prop="date" label="主叫时间(分)" width="180"></el-table-column>
              <el-table-column prop="date" label="被叫时间(分)" width="180"></el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>

    <!-- 打开图片 -->
    <el-dialog
      :visible.sync="imgShow"
      width="40%"
      >
      <img :src="imgSrc" alt="" style='width:100%;height:450px;'>
    </el-dialog>

  </div>
</template>
<script>
import {callCarr, callAddressList} from "@/API"
import { mapMutations, mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      identiList:{
        accountBalance:''
      },//运营商信息
      mounthList:[],//月使用情况
      topTen1:[],//TOP 10
      topTen2:[],//TOP 10
      tableData2:[],//通话数据分析
      userList: [],
      pageNo: 1,
      pageSize: 10,
      pageAll: 1,
      cellStyle:{
        'line-height': '16px;'
      },
      imgShow:false,
      imgSrc: '',
      defaultSrc: require('../assets/default.png')
    }

  },
  beforeMount(){
    if(this.$route.params.id){
      this.id = this.$route.params.id
    }
    this.getList()
  },
  computed:{
    ...mapGetters({
      id: 'GetCallId'
    })
  },
  methods:{
    openImg(e) {
      // console.log(e);
      this.imgSrc = e.target.src
      // console.log(this.imgSrc);
      this.imgShow = true
    },
    getList(isOr) {
      let params = {}
      let d={}
      // params.id = this.id
      params.id = this.id
      callCarr(params).then(data=>{
        this.identiList = data.data.data
        if(this.identiList.accountBalance){
          this.identiList.accountBalance = (this.identiList.accountBalance/100).toFixed(2)
        }
      })
      callAddressList({userId:this.id}).then(res=>{
        console.log("Top",res.data.data)
        res.data.data.passtiveTopTen.forEach((element,i) => {
          res.data.data.passtiveTopTen[i].index = i+1
        });
        this.topTen2 = res.data.data.ativeTopTen
        this.topTen1 = res.data.data.passtiveTopTen
        this.tableData2 = res.data.data.pageDto.list
        let tmplist = res.data.data.linkInfo
        let mounthList={}
        mounthList.uptDatetime=tmplist[0].uptDatetime
        mounthList.setuptDatetime=tmplist[1].uptDatetime
        mounthList.FirstCallTimes=tmplist[0].callTimes
        mounthList.SecCallTimes=tmplist[1].callTimes
        mounthList.FirstRankNum=tmplist[0].rankNum
        mounthList.SecRankNum=tmplist[1].rankNum

        this.mounthList.push(mounthList)
        // this.mounthList = res.data.data.linkInfo

      })
    },
    sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
  },

}
</script>
<style lang="scss" scoped>
@import '../style/publicSass.scss';
  .allPage{
    .tabs{
      background: #fff;
      .btn{
        padding:20px;
      }
      .content{
        padding: 20px;
        .con_title{
          font-size: 16px;
          font-weight: bold;
        }
        .contentItem{
          font-size: 14px;
          color:#686B6D;
          display: inline-block;
          margin-top: 20px;
          margin-right: 10px;
          vertical-align: top;
          .titletiao{
            display: inline-block;
            vertical-align: top;
            color: #999999;
          }
          .substance{
            display: inline-block;
            padding: 0 10px;
            background: #F2F2F2;
          }
          .myImg{
            width: 50px;
            height:50px;
            position: relative;
            top:-12px;
            cursor: pointer;
          }
        }
      }

    }
    .block{
      text-align: center;
      margin-top: 15px;
    }
  }
</style>
