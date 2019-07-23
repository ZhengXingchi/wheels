<template>
	<div class="allPage">
		<el-row :gutter="10">
			<el-col :span="8">
				<el-card shadow="always">
					<el-row>
						<el-col :span="24" style="margin-top:5px;position:relative;min-height:60px;width:100%">
							<div style="width:60px;height:60px;float:left;margin:5px;position:absolute;">
								<Avatar icon="md-person" shape="circle" size="large"/>
							</div>
							<div style="position:absolute;left:100px;">
								<span style="display:inline-block;width:200px;margin-bottom:10px">{{riskBaseInfo.userName}}</span>
								<span style="display:inline-block;width:200px">{{riskBaseInfo.phone}}</span>
							</div>
							<div style="position:absolute;right:0;width:150px;">
								<el-alert
									title="认证状态"
									:type="riskBaseInfo.risk_status_tip"
									:closable="false"
									:description="riskBaseInfo.risk_status"
									show-icon
								></el-alert>
							</div>
						</el-col>
					</el-row>
					<el-row class="risk-type">
						<el-col :span="6">
							<el-tag v-if="riskBaseInfo.identityAuth==1" type="success">身份证已认证</el-tag>
							<el-tag type="warning" v-else>身份证未认证</el-tag>
						</el-col>
						<el-col :span="6">
							<el-tag v-if="riskBaseInfo.taobaoAuth==1" type="success">淘宝已认证</el-tag>
							<el-tag type="warning" v-else>淘宝未认证</el-tag>
						</el-col>
						<el-col :span="6">
							<el-tag v-if="riskBaseInfo.phoneAuth==1" type="success">运营商已认证</el-tag>
							<el-tag type="warning" v-else>运营商未认证</el-tag>
						</el-col>
						<el-col :span="6">
							<el-tag v-if="riskBaseInfo.bankAuth==1" type="success">银行卡已绑定</el-tag>
							<el-tag type="warning" v-else>银行卡未绑定</el-tag>
						</el-col>
					</el-row>
					<Divider/>
					<el-row style="margin-bottom:40px;">
						<el-form label-position="left" inline class="base-info">
							<el-form-item label="性别">
								<span>{{riskBaseInfo.sex==1?"男":"女"}}</span>
							</el-form-item>
							<el-form-item label="年龄">
								<span>{{riskBaseInfo.identityNum|idCardConvert(3)}}</span>
							</el-form-item>
							<el-form-item label="婚姻状态">
								<span>{{riskBaseInfo.marry}}</span>
							</el-form-item>
							<el-form-item label="学历">
								<span>{{riskBaseInfo.study}}</span>
							</el-form-item>
							<el-form-item label="居住地址">
								<span>{{riskBaseInfo.addressDetails}}</span>
							</el-form-item>
						</el-form>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="10">
				<el-card shadow="always">
					<h4
						style="padding-bottom:5px;border-bottom:1px sold;text-align:center;margin:5px;font-size:18px;"
					>决策建议</h4>
					<el-row style="margin-bottom:0">
						<el-col :span="18" class="liabilities">
							<h5
								style="text-align:center;color:#ed4014;font-size:16px;margin:10px;"
								v-if="riskInfo.decision_suggest!=undefined"
							>
								<Icon type="md-thumbs-up" color="#2db7f5" size="20" style="margin-right:10px;"/>
								{{riskInfo.decision_suggest}}
							</h5>
							<div class="ability_dial" v-if="riskInfo.user_grade">
								<div class="grade_div" style="bottom: 17%; left: 45%;">
									<span id="user_grade" style="font-size: 2vw;">{{riskInfo.user_grade.user_grade}}</span>
									<p id="user_grade_txt" style="font-size: 1vw;">{{riskInfo.user_grade.user_grade_chinese}}</p>
								</div>
								<div id="pointer_dynamic" style="display: none">
									@-webkit-keyframes move{0% {-webkit-transform: rotateZ(-90deg);} }
									@keyframes move {100% {-webkit-transform: rotateZ(-64.8deg);}}
								</div>
								<div id="pointer" v-bind:style="{bottom:'55%',transform:'rotate('+riskDeg+'deg)'}"></div>
							</div>
						</el-col>

						<el-col :span="6" class="risk-tag" v-if="riskInfo.hit_reason">
							<el-tag type="danger" v-for="(val,key) in riskInfo.hit_reason" :key="key">{{ val }}</el-tag>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card shadow="always">
					<h5>审核意见</h5>
					<el-radio-group v-model="passNo">
						<el-radio-button :label="1">通过</el-radio-button>
						<el-radio-button :label="2" v-if="false">暂时拒绝</el-radio-button>
						<el-radio-button :label="3">不通过</el-radio-button>
					</el-radio-group>
					<div class>
						<textarea
							name="name"
							:rows="passNo==1?8:6"
							v-model="message"
							style="resize:none; width:90%;margin-top:10px;"
						></textarea>
						<el-checkbox-group v-model="checkBoxArray" size="mini" v-if="passNo == 2">
							<el-checkbox label="basicMsgAuth">基本信息</el-checkbox>
							<el-checkbox label="identityAuth">身份认证</el-checkbox>
							<el-checkbox label="yysAuth">运营商</el-checkbox>
							<el-checkbox label="bankAuth">银行卡</el-checkbox>
							<el-checkbox label="taobaoAuth">淘宝</el-checkbox>
							<el-checkbox label="zhifubaoAuth">支付宝</el-checkbox>
						</el-checkbox-group>
					</div>
					<div class style="margin-top:10px;">
						<el-radio-group v-model="time" v-if="passNo == 3">
							<el-radio-button :label="7">7天</el-radio-button>
							<el-radio-button :label="14">14天</el-radio-button>
							<el-radio-button :label="30">30天</el-radio-button>
						</el-radio-group>
					</div>
					<el-button style="margin-left:0;min-width:100px;" type="danger" @click="gofilse">提 交</el-button>
					<el-button style="min-width:80px;" @click="closeIdenti">取 消</el-button>
				</el-card>
			</el-col>
		</el-row>
		<el-row class="risk-content">
			<el-tabs
				tabPosition="left"
				style="min-height:500px;"
				v-model="activeName"
				@tab-click="changeRiskContent"
			>
				<el-tab-pane label="基本信息" name="basic">
					<basic :baseInfo="riskBaseInfo" :userId="''+riskBaseInfo.userId"/>
				</el-tab-pane>
				<el-tab-pane label="综合报告" name="multipleReport">
					<multiple-report :isLoaded="activeName" :riskInfo="riskInfo" :userId="''+riskBaseInfo.userId" :identityNum ="riskBaseInfo.identityNum" />
				</el-tab-pane>
				<el-tab-pane label="运营商" name="mobile">
					<mobile :taskId="''+riskBaseInfo.taskId" :isLoaded="activeName"/>
				</el-tab-pane>
				<el-tab-pane label="淘宝认证" name="taobao">
					<taobao :userId="''+riskBaseInfo.userId" :isLoaded="activeName"/>
				</el-tab-pane>
				<el-tab-pane label="通话记录" name="phoneAddress">
					<phone-address :userId="''+riskBaseInfo.userId" :isLoaded="activeName"/>
				</el-tab-pane>
				<el-tab-pane label="通讯录" name="phoneRecord">
					<phone-record :userId="''+riskBaseInfo.userId" :isLoaded="activeName"/>
				</el-tab-pane>
			</el-tabs>
		</el-row>
	</div>
</template>

<script>
import {
	userRiskBaseInfo,
	userRiskInfo,
	auditingCredit,
	auditingRefuse,
	auditingRefuseF
} from "@/API";
import { mapGetters, mapMutations } from "vuex";
import Divider from "@/components/divider/divider";
import Avatar from "@/components/Avatar";
import Icon from "@/components/icon";
import {
	basic,
	multipleReport,
	mobile,
	zhengxin,
	taobao,
	phoneAddress,
	phoneRecord
} from "./user/risk";
import { IdCard } from "@/utils/tools";
export default {
	components: {
		Divider,
		Avatar,
		Icon,
		basic,
		multipleReport,
		mobile,
		zhengxin,
		taobao,
		phoneAddress,
		phoneRecord
	},
	data() {
		return {
			userId: "",
			activeName: "basic",
			riskBaseInfo: [],
			riskInfo: {}, //三方风控结果
			riskDeg: "-64.8",
			passNo: 1,
			time: 7,
			message: "",
			checkBoxArray: []
		};
	},
	filters: {
		idCardConvert: function(idNum, type) {
			if (idNum != undefined) {
				return IdCard(idNum, type);
			}
		}
	},
	computed: {
		...mapGetters({
			id: "GetIdentiId",
			ifLoan: "GetIfLoan",
			adminId: "GetRoleUserId"
		})
	},
	watch: {
		activeName: function(val) {
			if (val == "active") {
				this.getUserRiskInfo();
			}
		}
	},
	beforeMount() {
		if (
			this.$route.params.userId != undefined &&
			this.$route.params.userId != ""
		) {
			this.userId = this.$route.params.userId;
		} else {
			this.$message.error("未获取到用户id");
			history.go(-1);
			return void 0;
		}

		this.getUserRiskBaseInfo();
		this.getUserRiskInfo();
	},
	methods: {
		...mapMutations({
			setifLoan: "SETIDENTI",
			closeIdenti: "CLOSELOANIDENTI"
		}),
		changeRiskContent(tab, event) {
			console.log(tab, event);
		},
		getUserRiskBaseInfo() {
			let params = {
				userId: this.userId
			};
			userRiskBaseInfo(params).then(res => {
				if (res.data == "NOACCESS") {
					this.$message.error("当前模块没有权限");
					history.go(-1);
					return void 0;
				}
				this.riskBaseInfo = res.data.data;
				switch (this.riskBaseInfo.risk_status) {
					case "0":
						this.riskBaseInfo.risk_status = "未审核";
						this.riskBaseInfo.risk_status_tip = "info";
						break;
					case "1":
						this.riskBaseInfo.risk_status = "审核通过";
						this.riskBaseInfo.risk_status_tip = "success";
						break;
					case "2":
						this.riskBaseInfo.risk_status = "拒绝";
						this.riskBaseInfo.risk_status_tip = "error";
						break;
					case "3":
						this.riskBaseInfo.risk_status = "需要人审";
						this.riskBaseInfo.risk_status_tip = "warning";
						break;
					case "4":
						this.riskBaseInfo.risk_status = "二次审核";
						this.riskBaseInfo.risk_status_tip = "warning";
						break;
				}
			});
		},
		getUserRiskInfo() {
			let params = {
				userId: this.userId
			};
			userRiskInfo(params).then(res => {
				if (res.data == "NOACCESS") {
					this.$message.error("当前模块没有权限");
					history.go(-1);
					return void 0;
				}
				if (res.data.data == null) {
					this.$message.error("风控数据异常");
				}
				this.riskInfo = res.data.data;
				switch (this.riskInfo.user_grade.user_grade_chinese) {
					case "差":
						this.riskDeg = "-64.8";
						break;
					case "一般":
						this.riskDeg = "-30";
						break;
					case "好":
						this.riskDeg = "30";
						break;
					case "很好":
						this.riskDeg = "64.8";
						break;
					default:
						this.riskDeg = "-64.8";
						break;
				}
			});
		},
		gofilse() {
			let params = {
				userId: this.userId,
				adminId: this.adminId
			};
			if (this.message) {
				params.userMessage = this.message;
			} else {
				this.$message("消息不能为空");
				return;
			}
			if (this.passNo == 1) {
				if (confirm("确认审核通过")) {
					auditingCredit(params).then(data => {
						if (data.data.code == "SUCCESS") {
							this.$message('审核通过');
							this.closeIdenti();
							this.setifLoan({ ifLoan: 0 });
						} else {
                            this.$message(data.data.msg);
                            this.closeIdenti();
						}
					});
				}
			} else if (this.passNo == 2) {
				if (this.checkBoxArray.length == 0) {
					this.$message("请选择一项");
					return;
				}
				params.checkBoxArray = this.checkBoxArray;

				if (confirm("确认暂时拒绝")) {
					auditingRefuse(params).then(data => {
						if (data.data.code == "SUCCESS") {
                            this.$message('提交成功');
							this.closeIdenti();
							this.setifLoan({ ifLoan: 0 });
						} else {
							this.$message(data.data.msg);
						}
					});
				}
			} else if (this.passNo == 3) {
				params.time = this.time;
				if (confirm("确认拒绝" + this.time + "天")) {
					auditingRefuseF(params).then(data => {
						if (data.data.code == "SUCCESS") {
                            this.$message('拒绝成功');
							this.closeIdenti();
							this.setifLoan({ ifLoan: 0 });
						} else {
							this.$message(data.data.msg);
						}
					});
				}
			}
		}
	}
};
</script>

<style>
.risk-type {
	font-size: 12px;
}
.allPage {
	padding: 0;
	background: none;
}
.el-row {
	margin-bottom: 20px;
}
.el-card button {
	margin: 20px;
	margin-bottom: 10px;
	min-width: 160px;
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
.base-info {
	font-size: 0;
}
.base-info-rang {
	font-size: 10px;
}
.base-info label,
.base-info-rang label {
	width: 70px;
	color: #99a9bf;
}
.base-info-rang label {
	width: 85px;
}
.base-info-rang label {
	font-size: 10px;
}
.base-info span {
	overflow: hidden;
	display: inline-block;
	max-width: 300px;
}
.base-info-rang span {
	color: deepskyblue;
}
.base-info .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 50%;
	height: 40px;
	line-height: 40px;
}
.base-info-rang .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 45%;
	height: 30px;
	line-height: 30px;
}
.base-info .el-form-item:last-child {
	width: 100%;
}
.risk-tag .el-tag {
	width: 100%;
	margin-bottom: 5px;
	text-align: center;
	font-size: 10px;
	margin-top: 10px;
}
.el-tabs__header {
	margin-right: 0 !important;
}
.el-tabs__item.is-left {
	width: 40px;
	writing-mode: vertical-rl;
	height: 100px;
	padding: 0;
	text-align: center !important;
	background-color: #f8f8f9;
}
.el-tabs__item.is-left:last-child {
	margin-bottom: 0;
}
.el-tabs__item.is-active {
	background-color: #2b85e4;
	color: #ffffff;
}
.risk-content .el-card__body {
	padding-left: 0;
	padding-top: 0;
}
.risk-content .el-tabs__content {
	padding-top: 10px;
	background-color: #ffffff;
	padding-left: 50px;
	min-height: 500px;
}
.liabilities .ability_dial {
	min-width: 40%;
	height: 236px;
	background: url("../../static/img/pic_dial_plate2.png") no-repeat center;
	background-size: 80%;
	position: relative;
	margin: 0 auto;
}
.liabilities .ability_dial .grade_div {
	position: absolute;
	bottom: 50px;
	left: 45%;
	text-align: center;
}
.liabilities .ability_dial .grade_div span {
	font-size: 48px;
}
.liabilities .ability_dial .grade_div p {
	font-size: 18px;
}
.liabilities .ability_dial #pointer {
	height: 2.3vw;
	border-right: 3px solid #ef0d0d;
	position: absolute;
	bottom: 140px;
	left: 50%;
	transform: rotate(-90deg);
	transform-origin: 50% 300%;
	transition: transform 1s linear;
}
.con_title {
	font-size: 16px;
	font-weight: bold;
}
.contentItem {
	font-size: 14px;
	color: #686b6d;
	display: inline-block;
	margin-top: 20px;
	margin-right: 10px;
	vertical-align: top;
}
.contentItem .titletiao {
	display: inline-block;
	vertical-align: top;
	color: #999999;
}
.contentItem .substance {
	display: inline-block;
	padding: 0 10px;
	background: #f2f2f2;
}
</style>