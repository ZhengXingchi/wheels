<template>
	<div class="allPage">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>角色管理</span>
				<el-button style="float: right;" type="primary" size="mini" @click="toAdd">添加角色</el-button>
			</div>
			<el-table :data="userList" style="width: 100%">
				<el-table-column prop="id" label="#ID" width="120"></el-table-column>
				<el-table-column prop="groupName" label="角色名称"></el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- <el-button type="text" size="small" class="publicSmalBtn" @click="toAdd(scope.row)">修改组名</el-button> -->
						<el-button type="text" size="small" class="publicSmalBtn" @click="toAdd(scope.row)">设置权限</el-button>
						<el-button type="text" size="small" class="publicSmalBtn" @click="toDelete(scope.row.id)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="block choice">
				<el-pagination
					@current-change="getList"
					background
					:current-page.sync="pageNo"
					@size-change="sizeChange"
					:page-sizes="[10, 20, 30, 50, 100]"
					:page-size="10"
					layout="sizes, total, prev, pager, next, jumper"
					:total="pageAll"
				></el-pagination>
			</div>
		</el-card>
	</div>
</template>
<script>
import { managerRoleList, managerRoleDel } from "@/API";
let currentPage=1;
export default {
	data: () => {
		return {
			userList: [],
			pageNo: currentPage,
			pageSize: 10,
			pageAll: 1,
			cellStyle: {
				"line-height": "16px;"
			}
		};
	},
	beforeMount() {
		if(currentPage>1) this.pageNo=currentPage;
		this.getList();
	},
	methods: {
		toDetail(row) {
			this.$router.push({
				name: "managerRoleDetail",
				params: {
					id: row.id,
					groupName: row.groupName,
				}
			});
		},
		toDelete(id) {
			console.log(id);
			let params = {
				id
			};
			if (confirm("确定要删除组？")) {
				managerRoleDel(params).then(data => {
					console.log(data);
					if (data.data.code == "SUCCESS") {
						this.$message("删除成功");
						this.getList();
					} else {
						this.$message("失败");
					}
				});
			}
		},
		sizeChange(size) {
			this.pageSize = size;
			this.getList();
		},
		toAdd(item) {
			if (item) {
				this.$router.push({
					name: "managerRoleAdd",
					params: {
						id: item.id,
						name: item.groupName
					}
				});
			} else {
				this.$router.push({ name: "managerRoleAdd" });
			}
		},
		getList(isOr) {
			if(isOr == 0){
				this.pageNo=1;
			}else{
                currentPage = this.pageNo;
             }
			let params = {};
			params.pageSize = this.pageSize;
			params.pageNo = this.pageNo;
			managerRoleList(params).then(data => {
				// console.log(data);
				this.userList = [];
				this.userList = this.userList.concat(data.data.data.list);
				this.pageAll = data.data.data.total;
			});
		}
	},
	beforeRouteEnter(to, from, next) {
		// console.log(3);
		next(vm => {
			// 通过 `vm` 访问组件实例
			if (from.name === "managerRoleAdd") {
				vm.getList();
			}
		});
	}
};
</script>
<style lang="scss" scoped>
@import "../style/publicSass.scss";
	.allPage {
	border: none;
	background: none;
	.searchAll {
		background-color: white;
		padding: 20px;
		.selectChoice {
			width: 10%;
			margin-right: 20px;
		}
		.search {
			width: 16.7%;
			margin-right: 20px;
		}
	}
}
</style>
