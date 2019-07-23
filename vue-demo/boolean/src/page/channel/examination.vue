<template>
	<el-table :data="reports" border style="width: 100%;margin-top:10px">
		<el-table-column fixed prop="gmtDatetime" label="日期" width="200" v-if="isDetail==true"></el-table-column>
		<el-table-column prop="channelName" label="渠道名称"></el-table-column>
		<el-table-column prop="registerNum" label="注册人数"></el-table-column>
		<el-table-column prop="riskAdoptNum" label="机审通过人数"></el-table-column>
		<el-table-column prop="riskAdoptProbability" label="机审通过率"></el-table-column>
		<el-table-column prop="artificialAdoptNum" label="信审通过人数"></el-table-column>
		<el-table-column prop="artificialAdoptProbability" label="信审通过率"></el-table-column>
		<el-table-column prop="passMoneyNum" label="放款通过人数"></el-table-column>
		<el-table-column prop="passMoneyProbability" label="放款通过率"></el-table-column>
		<el-table-column  label="操作" v-if="isDetail==false">
			<template slot-scope="scope">
			<el-button type="text" @click="viewDetail(scope.row.channelName)">详细信息</el-button>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		reports: {
			type: Array,
			default: []
		},
		isDetail:{
			type:Boolean,
			default:false,
		}
	},
	methods: {
			viewDetail(channelName) {
				let reportType = 'examination';
				this.$router.push({name: 'channelReportDetail', params: {
					channelName,reportType
				}})
               
		}
	},
};
</script>

<style scoped>
</style>