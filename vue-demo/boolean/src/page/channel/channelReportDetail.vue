<template>
	<div class="allPage">
		<el-row>
			<el-col :span="16">
				<el-date-picker
					v-model="dateSelect"
					type="daterange"
					size='mini'
					value-format='yyyy-MM-dd'
					range-separator="至"
					start-placeholder="开始日期"
					end-placeholder="结束日期"
					:picker-options="dateOption"
				></el-date-picker>
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
		<over-view :reports="reports" :isDetail="true" v-if="reportType=='overview'"></over-view>
		<register :reports="reports" :isDetail="true" v-if="reportType=='register'"></register>
		<authentication :reports="reports" :isDetail="true" v-if="reportType=='authentication'"></authentication>
		<examination :reports="reports" :isDetail="true" v-if="reportType=='examination'"></examination>
		<overdue :reports="reports" :isDetail="true" v-if="reportType=='overdue'"></overdue>
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
	getChannelOverdueCount
} from "@/API";
import overView from "./overView";
import register from "./register";
import authentication from "./authentication";
import examination from "./examination";
import overdue from "./overdue";
export default {
	components: { overView, register, authentication, examination, overdue },
	data() {
		return {
			search: [],
			reportType: "overview",
			dateSelect: "",
			reports: [],
			pageNo: 1,
			pageAll: 1,
			pageSize: 10,
			dateOption: {
				shortcuts: [{
				text: '今天',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime());
					picker.$emit('pick', [start, end]);
				}
				}, {
				text: '昨日',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 );
					picker.$emit('pick', [start, end]);
				}
				}, {
				text: '最近7天',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', [start, end]);
				}
				},
				{
				text: '最近一个月',
				onClick(picker) {
					const end = new Date();
					const start = new Date();
					start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
					picker.$emit('pick', [start, end]);
				}
				}]
			},
		};
	},
	beforeMount() {
		this.search.channel = this.$route.params.channelName;
		this.reportType = this.$route.params.reportType;
		this.getlist(this.reportType );
	},
	watch: {
		reportType: function(newValue, oldValue) {
			if (newValue != oldValue) {
				this.pageNo = 1;
				this.pageAll = 1;
				this.pageSize = 10;
				this.dateSelect = '';
				this.getlist(newValue);
			}
		}
	},
	methods: {
		getlist(type = "overview") {
			let params = {};
			params.pageNo = this.pageNo;
			params.pageSize = this.pageSize;
			if(this.dateSelect){
				params.dateTime = this.dateSelect[0] + `~` + this.dateSelect[1]
			}
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