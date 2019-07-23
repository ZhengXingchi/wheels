<template>
	<div>
		<el-table :data="phoneRecord" style="width: 100%">
			<el-table-column prop="id" label="ID" width="110"></el-table-column>
			<el-table-column prop="phoneNo" label="联系电话"></el-table-column>
			<el-table-column prop="commPlac" label="地区"></el-table-column>
			<el-table-column prop="callTimes" label="通话次数" width="120"></el-table-column>
			<el-table-column prop="callTime" label="通话时长" width="120"></el-table-column>
			<el-table-column prop="callCountActive" label="主叫次数" width="80"></el-table-column>
			<el-table-column prop="callCountPassive" label="被叫次数" width="80"></el-table-column>
		</el-table>
		<div class="block choice">
			<el-pagination
				@current-change="toRecord"
				background
				@size-change="sizeChange"
				:current-page.sync="pageNo"
				:page-sizes="[10, 20, 30, 50, 100]"
				:page-size="10"
				layout="sizes, total, prev, pager, next, jumper"
				:total="pageAll"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import { basicPhoneRecordList } from "@/API";
export default {
	data() {
		return {
			phoneRecord: [],
			pageNo: 1,
			pageSize: 10,
			pageAll: 1
		};
	},
	props: {
		userId: {
			type: String,
			default: ""
		},
		isLoaded: {
			type: String,
			default: ""
		}
	},
	watch: {
		isLoaded: function(val) {
			if (val == "phoneRecord") {
				this.toRecord();
			}
		}
	},
	methods: {
		toRecord() {
			let params = {};
			params.userId = this.userId;
			params.pageSize = this.pageSize;
			params.pageNo = this.pageNo;
			basicPhoneRecordList(params).then(res => {
                this.phoneRecord = res.data.data.list;
				this.pageAll = res.data.data.total;
			});
		},
		sizeChange(size) {
			this.pageSize = size;
			this.toRecord();
		}
	}
};
</script>

<style scoped>
</style>