<template>
	<div class="allPage">
		<el-row>
			<el-col :span="16">
				<el-select v-model="search.channel" placeholder="选择渠道商" size="small" style="width:100px">
					<el-option label="全部" value=""></el-option>
					<el-option :label="item.name" :value="item.name" v-for='(item) in channels' :key='item.name'></el-option>
				</el-select>
				<el-button type="" icon="el-icon-search" size='mini' @click='getlist(reportType)' class="publicMidBtn">查询</el-button>
			</el-col>
			<el-col :span="8">
				<el-radio-group v-model="reportType" size="small">
					<el-radio-button label="overview">概况</el-radio-button>
					<el-radio-button label="register">注册数据</el-radio-button>
					<el-radio-button label="authentication">认证数据</el-radio-button>
					<el-radio-button label="examination">审核数据</el-radio-button>
					<el-radio-button label="overdue">逾期数据</el-radio-button>
				</el-radio-group>
			</el-col>
		</el-row>
		<over-view :reports="reports" :isDetail="false" v-if="reportType=='overview'"></over-view>
		<register :reports="reports" :isDetail="false" v-if="reportType=='register'"></register>
		<authentication :reports="reports" :isDetail="false" v-if="reportType=='authentication'"></authentication>
		<examination :reports="reports" :isDetail="false" v-if="reportType=='examination'"></examination>
		<overdue :reports="reports" :isDetail="false" v-if="reportType=='overdue'"></overdue>
		<div class="block choice">
			<el-pagination
				@current-change="getlist(reportType)"
				background
				:current-page.sync="pageNo"
				:page-size="10"
				layout="sizes, total, prev, pager, next, jumper"
				:total="pageAll"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import {
	getChannelOverview,
	getChannelRegisterCount,
	getChannelAuthenticationCount,
	getChannelExaminationCount,
	getChannelOverdueCount,
	dataCanalWhichList
} from "@/API";
import overView from "./overView";
import register from "./register";
import authentication from "./authentication";
import examination from "./examination";
import overdue from "./overdue";
let currentPage=1;
export default {
	components: { overView, register, authentication, examination, overdue },
	data() {
		return {
			search: [],
			reportType: "overview",
			channels:[],
			reports: [],
			pageNo: currentPage,
			pageAll: 1,
			pageSize: 10,
		};
	},
	beforeMount() {
		if(currentPage>1) this.pageNo=currentPage;
		this.getlist();
		dataCanalWhichList().then((data)=>{
			this.channels = data.data.data
		})
	},
	watch: {
		reportType: function(newValue, oldValue) {
			if (newValue != oldValue) {
				this.pageNo = 1;
				this.pageAll = 1;
				this.pageSize = 10;
				this.getlist(newValue);
			}
		}
	},
	methods: {
		getlist(type = "overview") {

			if((type = "overview") == 0){
				this.pageNo=1
			}
			currentPage = this.pageNo;
			let params = {};
			params.pageNo = this.pageNo;
			params.pageSize = this.pageSize;
			if(this.search.channel!=''){
				params.channelName = this.search.channel;
			}
			
			if (type == "overview") {
				getChannelOverview(params).then(res => {
					this.reports = res.data.data.list;
					this.pageAll = res.data.data.total;
				});
			}
			if (type == "register") {
				getChannelRegisterCount(params).then(res => {
					this.reports = res.data.data.list;
					this.pageAll = res.data.data.total;
				});
			}
			if (type == "authentication") {
				getChannelAuthenticationCount(params).then(res => {
					this.reports = res.data.data.list;
					this.pageAll = res.data.data.total;
				});
			}
			if (type == "examination") {
				getChannelExaminationCount(params).then(res => {
					this.reports = res.data.data.list;
					this.pageAll = res.data.data.total;
				});
			}
			if (type == "overdue") {
				getChannelOverdueCount(params).then(res => {
					this.reports = res.data.data.list;
					this.pageAll = res.data.data.total;
				});
			}
		}
	}
};
</script>

<style scoped>
</style>