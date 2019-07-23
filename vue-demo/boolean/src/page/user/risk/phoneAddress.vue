<template>
	<div>
		<el-table :data="phoneAddress" style="width: 100%" >
			<el-table-column prop="id" label="ID" width="110"></el-table-column>
			<el-table-column prop="name" label="联系人姓名" width="100"></el-table-column>
			<el-table-column prop="phone" label="联系电话"></el-table-column>
			<el-table-column prop="belongArea" label="地区"></el-table-column>
			<el-table-column prop="callTimes" label="通话次数" width="120"></el-table-column>
			<el-table-column prop="callTime" label="通话时长" width="120"></el-table-column>
			<el-table-column prop="callCountActive" label="主叫次数" width="80"></el-table-column>
			<el-table-column prop="callCountPassive" label="被叫次数" width="80"></el-table-column>
		</el-table>
		<div class="block choice">
			<el-pagination
				@current-change="toCom"
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
import { basicInPhone } from "@/API";
export default {
	data() {
		return {
			phoneAddress: [],
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
        isLoaded:{
            type: String,
            default: ''
        }
    },
    watch:{
        isLoaded:function(val){
            if(val=='phoneAddress' ){
                this.toCom();
            }
        }
    },
	methods: {
		toCom() {
			//通讯录
			let params = {
				userId: this.userId,
				pageNo: this.pageNo,
				pageSize: this.pageSize
			};
			basicInPhone(params).then(data => {
				this.phoneAddress = data.data.data.list;
				this.pageAll = data.data.data.total;
			});
		},
		sizeChange(size) {
			this.pageSize = size;
			this.toCom();
		}
	}
};
</script>

<style scoped>
</style>