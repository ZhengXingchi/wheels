<template>
<div class="allPage">
	<el-row :gutter="10">
		<el-col :span="8">
                <el-card shadow="always">
                <el-row>
                    <el-col :span="24" style="margin-top:5px;position:relative;min-height:60px;width:100%">
                        <div style="width:60px;height:60px;float:left;margin:5px;position:absolute;">
                            <Avatar icon="md-person" shape="circle" size="large" />
                        </div>
                        <div style="position:absolute;left:100px;"><span style="display:inline-block;width:200px;margin-bottom:10px">{{riskBaseInfo.userName}}</span><span style="display:inline-block;width:200px">{{riskBaseInfo.phone}}</span></div>
                        <div style="position:absolute;right:0;width:100px;">{{riskBaseInfo.authStatus}}</div>
                    </el-col>
                </el-row>
                <el-row class="risk-type">
                    <el-col :span="6">
                        <el-tag v-if="riskBaseInfo.identityAuth==1" type="success">身份证已认证</el-tag><el-tag type="warning" v-else>身份证未认证</el-tag>
                    </el-col>
                    <el-col :span="6">
                        <el-tag v-if="riskBaseInfo.taobaoAuth==1" type="success">淘宝已认证</el-tag><el-tag type="warning" v-else>淘宝未认证</el-tag>
                    </el-col>
                    <el-col :span="6">
                        <el-tag v-if="riskBaseInfo.phoneAuth==1" type="success">运营商已认证</el-tag><el-tag type="warning" v-else>运营商未认证</el-tag>
                    </el-col>
                    <el-col :span="6">
                        <el-tag v-if="riskBaseInfo.bankAuth==1" type="success">银行卡已绑定</el-tag><el-tag type="warning" v-else>银行卡未绑定</el-tag>
                    </el-col>
                </el-row>
                <Divider />
                <el-row>
                    <el-form label-position="left" inline class="base-info">
                    <el-form-item label="性别">
                        <span>{{riskBaseInfo.sex}}</span>
                    </el-form-item>
                    <el-form-item label="年龄">
                        <span>{{riskBaseInfo.authStatus}}</span>
                    </el-form-item>
                    <el-form-item label="婚姻状态">
                        <span>{{riskBaseInfo.marry}}</span>
                    </el-form-item>
                    <el-form-item label="学历">
                        <span>{{riskBaseInfo.study}}</span>
                    </el-form-item>
                    <el-form-item label="居住地址">
                        <span>{{riskBaseInfo.address}}</span>
                    </el-form-item>
                    </el-form>
                </el-row>
                
            </el-card>
		</el-col>
		<el-col :span="12">
                <el-card shadow="always">
                <h4 style="padding-bottom:5px;border-bottom:1px sold;text-align:center;margin:0;">决策建议</h4>
                <el-row style="margin-bottom:0">
                    <el-col :span="8" style="width:160px;height:160px"></el-col>
                    <el-col :span="10">
                        <h5 style="text-align:center"><Icon type="md-thumbs-up" color="#2db7f5" size="20"  style="margin-right:10px;"/>通过建议</h5>
                        <el-form label-position="left" inline class="base-info-rang">
                        <el-form-item label="用户行为评分">
                            <span>男</span>
                        </el-form-item>
                        <el-form-item label="欺诈检测评分">
                            <span>24</span>
                        </el-form-item>
                        <el-form-item label="负载能力评分">
                            <span>未婚</span>
                        </el-form-item>
                        <el-form-item label="运营商评分">
                            <span>本科</span>
                        </el-form-item>
                        <el-form-item label="淘宝评分">
                            <span>20</span>
                        </el-form-item>
                            <el-form-item label="支付宝评分">
                                <span>20</span>
                            </el-form-item>
                            <el-form-item label="信用卡评分">
                                <span>20</span>
                            </el-form-item>
                            <el-form-item label="银行卡评分">
                                <span>20</span>
                            </el-form-item>
                        </el-form>
                    </el-col>
                    <el-col :span="6" class="risk-tag">
                        <el-tag type="danger">准入资质审查</el-tag>
                        <el-tag type="danger">疑似欺诈审查</el-tag>
                        <el-tag type="danger">高共债或还款意愿薄弱</el-tag>
                        <el-tag type="danger">疑似团体作案</el-tag>
                        <el-tag type="danger">被催收或失联的可能</el-tag>
                        <el-tag type="danger">信用定向人群</el-tag>
                        <el-tag type="danger">当前存在逾期行为</el-tag>
                    </el-col>
                </el-row>
            </el-card>
		</el-col>
		<el-col :span="4">
            <el-card shadow="always">
                <el-button type="primary" icon="el-icon-success" style="margin-left:10px;">审核通过</el-button>
                <el-button type="primary" icon="el-icon-error">审核通过</el-button>
                <el-button>银行卡认证</el-button>
                <el-button icon="el-icon-refresh">征信更新</el-button>
            </el-card>
		</el-col>
	</el-row>
    <el-row class="risk-content">
        <el-tabs tabPosition="left" style="min-height:500px;" v-model="activeName"  @tab-click="changeRiskContent">
            <el-tab-pane label="行为" name="active">
                <active/>
            </el-tab-pane>
            <el-tab-pane label="征信" name="zhengxin">
                <zhengxin/>
            </el-tab-pane>
            <el-tab-pane label="运营商" name="mobile">
                <mobile/>
            </el-tab-pane>
            <el-tab-pane label="淘宝认证" name="taobao">
                <taobao/>
            </el-tab-pane>
            <el-tab-pane label="支付宝认证" name="zhifubao">
                <zhifubao/>
            </el-tab-pane>
        </el-tabs>
    </el-row>
</div>
</template>

<script>
import {userRiskBaseInfo} from '@/API'
import Divider from '@/components/divider/divider'
import Avatar from '@/components/Avatar'
import Icon from '@/components/icon';
import {basic,active,mobile,zhengxin,taobao,zhifubao} from './';
export default {
    components:{Divider,Avatar,Icon,basic,active,mobile,zhengxin,taobao,zhifubao},
    data() {
        return {
            activeName:'zhifubao',
            riskBaseInfo:[],
        }
    },
    beforeMount(){
        this.getUserRiskBaseInfo();
    },
    methods: {
        changeRiskContent(tab,event) {
            console.log(tab, event);
        },
        getUserRiskBaseInfo(){
            let params={
                userId:28977
            };
            userRiskBaseInfo(params).then((res)=>{
                this.riskBaseInfo = res.data.data;
            })
        }
    },
};
</script>

<style>
.risk-type{
    font-size:12px;
}
    .allPage{
        padding: 0;
        background: none;
    }
    .el-row {
        margin-bottom: 20px;
    }
    .el-card button{
        margin:20px;margin-bottom: 10px;min-width: 160px;
    }
    .el-col {
        border-radius: 4px;
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #ffffff;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    .base-info{
        font-size: 0;
    }
    .base-info-rang{
        font-size:10px;
    }
    .base-info  label,.base-info-rang  label {
        width: 70px;
        color: #99a9bf;
    }
    .base-info-rang  label{
        width: 85px;
    }
    .base-info-rang  label{
        font-size:10px;
    }
    .base-info span{
        overflow: hidden;
        display: inline-block;
        max-width: 300px;
    }
    .base-info-rang span{
        color:deepskyblue;
    }
    .base-info .el-form-item{
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
        height: 30px;
        line-height: 30px;
    }
    .base-info-rang .el-form-item{
        margin-right: 0;
        margin-bottom: 0;
        width: 45%;
        height: 30px;
        line-height: 30px;
    }
    .base-info .el-form-item:last-child{
        width: 100%;
    }
    .risk-tag .el-tag{
        width: 100%;
        margin-bottom: 5px;
        text-align: center;
        font-size:10px;
    }
    .el-tabs__header{
        margin-right: 0 !important;
    }
    .el-tabs__item.is-left{
        width:40px;
        writing-mode: vertical-rl;
        height: 100px;
        padding:0;
        text-align: center !important;
        background-color: #f8f8f9;
    }
    .el-tabs__item.is-left:last-child{
        margin-bottom:0;
    }
    .el-tabs__item.is-active{
        background-color: #2b85e4;
        color:#ffffff;
    }
    .risk-content .el-card__body{
        padding-left:0;
        padding-top:0;
    }
    .risk-content .el-tabs__content{
        padding-top: 10px;
        background-color: #ffffff;
        padding-left: 50px;
        min-height: 500px;
    }
</style>