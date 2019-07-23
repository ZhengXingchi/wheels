<template>
	<div class="navbar">
		<hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
		<breadcrumb class="breadcrumb-container"/>
		<div class="right-menu">
			<ul class="el-menu--horizontal" style="margin:0">
				<li class="el-menu-item" index="1">短信余额:
					<span style="color:orangered;font-size:14px">{{smsyue}}</span>
				</li>
				<li class="el-menu-item" index="1">风控余额:
					<span style="color:orangered;font-size:14px">{{fengkongyue}}</span>
				</li>
				<li class="el-menu-item" index="1" style="padding-right:5px;">
					<el-dropdown>
						<span class="el-dropdown-link">
              <Icon type="md-contact" size="24" />
							<span style="font-size:20px;">{{user}}</span>
							<i class="el-icon-caret-bottom"></i>
						</span>
						<el-dropdown-menu slot="dropdown" class="downchoice">
							<el-dropdown-item>
								<div @click="myInfo">
									<span style="color: #555;font-size: 14px;">个人信息</span>
								</div>
							</el-dropdown-item>
							<el-dropdown-item @click.native="editPassword">修改密码</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
				</li>
				<li class="el-menu-item" index="1" style="padding-left:0;">
					<el-button type="text" @click.native="logout">退出</el-button>
				</li>
				<li class="el-menu-item" index="1" style="padding-left:0;">
					<el-button type="text" @click.native="aboutUs">关于</el-button>
				</li>
			</ul>

			<!--<el-tooltip content="短信余额" placement="top">-->
			<!--<svg-icon icon-class="money" />-->
			<!--</el-tooltip>-->
			<!--<el-tooltip content="风控余额" placement="top">-->
			<!--<svg-icon icon-class="message" />-->
			<!--</el-tooltip>-->
		</div>
    <el-dialog
      title="关于我们"
      :visible.sync="isShowAbout"
      width="30%"
      >
      <p>客服微信:<span style="font-size:18px;color:#409EFF">luzhaung_66</span></p>
      <p>客服在线QQ:  <a rel="nofollow" href="http://wpa.qq.com/msgrd?v=3&uin=1710374713&site=qq&menu=yes" target="_blank" class="text textbor"><span>售后咨询</span></a></p>
      
    </el-dialog>
	</div>
</template>

<script>
import { Decimal } from "decimal.js";
import { getFengKongYuE, dataRiskTotal } from "@/API";
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import ErrorLog from "@/components/ErrorLog";
import Avatar from "@/components/Avatar";
import Icon from "@/components/icon";
export default {
	data: () => {
		return {
			activeIndex: 1,
			totalMoney: [],
			totalUsed: [],
			fengkongyue: 0,
      smsyue: 0,
      isShowAbout:false,
		};
	},
	props: {
		user: {
			type: String,
			default: ""
		}
	},
	beforeMount() {
		this.getyue();
	},
	computed: {
		...mapGetters(["sidebar"])
	},
	components: {
		Breadcrumb,
		Hamburger,
		ErrorLog,
		Avatar,
		Icon
	},
	watch: {
		totalUsed: function() {
			let fengkongTotalMoney =
				this.totalUsed.RiskTotal.shujumohetotal * 0.9 +
				this.totalUsed.RiskTotal.zhimitotal * 3.2;
			this.fengkongyue = new Decimal(
				this.totalMoney.FengKongYuE - fengkongTotalMoney
			).toFixed(2);
			this.smsyue = new Decimal(
				this.totalMoney.SmsYuE - this.totalUsed.SmSTotal * 0.05
			).toFixed(2);
		}
	},
	methods: {
		toggleSideBar() {
			this.$store.dispatch("toggleSideBar");
		},
		editPassword() {
			this.$router.replace({ name: "editPassword" });
		},
		getyue() {
			getFengKongYuE().then(res => {
				this.totalMoney = res.data.data;
				dataRiskTotal().then(res => {
					this.totalUsed = res.data.data;
				});
			});
		},
		logout() {
			this.$store.dispatch("LogOut").then(() => {
				location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
			});
		},
    aboutUs() {
      this.isShowAbout = true;
    },
    kefu(){
      console.log('kefu');
      window.location.href = "http://wpa.qq.com/msgrd?v=3&uin=398098600&site=qq&menu=yes";
    },
    myInfo(){
      this.$message.error('错了哦，本功能暂未开放');
    }
	}
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
	height: 50px;
	line-height: 50px;
	border-radius: 0px !important;
	.hamburger-container {
		line-height: 58px;
		height: 50px;
		float: left;
		padding: 0 10px;
	}
	.breadcrumb-container {
		float: left;
	}
	.errLog-container {
		display: inline-block;
		vertical-align: top;
	}
	.right-menu {
		float: right;
		height: 100%;
		&:focus {
			outline: none;
		}
		.right-menu-item {
			display: inline-block;
			margin: 0 8px;
		}
		.screenfull {
			height: 20px;
		}
		.international {
			vertical-align: top;
		}
		.theme-switch {
			vertical-align: 15px;
		}
		.avatar-container {
			height: 50px;
			margin-right: 30px;
			.avatar-wrapper {
				margin-top: 5px;
				position: relative;
				.user-avatar {
					cursor: pointer;
					width: 40px;
					height: 40px;
					border-radius: 10px;
				}
				.el-icon-caret-bottom {
					cursor: pointer;
					position: absolute;
					right: -20px;
					top: 25px;
					font-size: 12px;
				}
			}
		}
	}
}
</style>
