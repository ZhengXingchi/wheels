<template>
	<div>
		<p>账号信用信息</p>
		<el-form label-position="left" inline class="taobao-info">
			<el-form-item label="花呗可用额度">
				<span>{{(account_info.available_quota/100).toFixed(2)}}</span>
			</el-form-item>
			<el-form-item label="花呗已消费额度">
				<span>{{(account_info.consume_quota/100).toFixed(2)}}</span>
			</el-form-item>
			<el-form-item label="花呗信用额度">
				<span>{{(account_info.credit_quota/100).toFixed(2)}}</span>
			</el-form-item>
			<el-form-item label="芝麻信用分">
				<span>{{account_info.zhima_point}}</span>
			</el-form-item>
		</el-form>
		<p>账号个人信息</p>
		<el-form label-position="left" inline class="taobao-info">
			<el-form-item label="认证身份证号">
				<span>{{taobaoInfo.identity_code}}</span>
			</el-form-item>
			<el-form-item label="性别">
				<span>{{taobaoInfo.gender}}</span>
			</el-form-item>
			<el-form-item label="用户名">
				<span>{{taobaoInfo.user_name}}</span>
			</el-form-item>
			<el-form-item label="用户昵称">
				<span>{{taobaoInfo.nick_name}}</span>
			</el-form-item>
			<el-form-item label="认证手机号">
				<span>{{taobaoInfo.mobile}}</span>
			</el-form-item>
			<el-form-item label="用户真实姓名">
				<span>{{taobaoInfo.real_name}}</span>
			</el-form-item>
		</el-form>
		<p>收货地址</p>
		<el-table :data="userTaoBaoAddressList" style="width: 100%" :cell-style="cellStyle">
			<el-table-column type="index" width="50"></el-table-column>
			<el-table-column prop="name" label="收货人" width="110"></el-table-column>
			<el-table-column  label="收货地址" width="500">
				<template slot-scope="scope">
					{{scope.row.area}} {{scope.row.address}}
				</template>
			</el-table-column>
			<el-table-column prop="mobile" label="收货人手机号"></el-table-column>
			<el-table-column prop="default" label="是否默认">
				<template slot-scope="scope">
					{{scope.row.default==1?'默认':''}}
				</template>
			</el-table-column>
		</el-table>
	
		<p>购买记录</p>
		<el-table :data="userTaobaoBuyList" style="width: 100%" :cell-style="cellStyle">
			<el-table-column prop="order_id" label="#ID" width="200"></el-table-column>
			<el-table-column prop="order_shop" label="交易店铺" width="200"></el-table-column>
			<el-table-column prop="receiver_name" label="收货人" width="100"></el-table-column>
			<el-table-column prop="receiver_mobile" label="收货人手机号" width="150"></el-table-column>
			<el-table-column prop="order_amount" label="订单金额" width="100">
				<template slot-scope="scope">
					{{(scope.row.order_amount/100).toFixed(2)}}
				</template>
			</el-table-column>
			<el-table-column prop="order_status" label="订单状态" width="100"></el-table-column>
			<el-table-column prop="order_time" label="订单时间" width="160"></el-table-column>
			<el-table-column prop="order_type" label="支付方式" width="160"></el-table-column>
		</el-table>
	</div>
</template>

<script>
import { userTaobaoInfo } from "@/API";
export default {
	data: () => {
		return {
			account_info:[],
			taobaoInfo:[],
            userTaoBaoAddressList: [],
            userTaobaoBuyList:[],
			cellStyle: {
				"line-height": "16px;"
			}
		};
	},
	props: {
		userId: {
			type: String,
			default: 0
		},
		isLoaded: {
			type: String,
			default: ''
		}
	},
	watch: {
		isLoaded: function(val) {
			if (val=='taobao') {
                this.getList();
            }
		}
	},
	methods: {
		getList(isOr) {
			let params = {};
			params.userId = this.userId;
			userTaobaoInfo(params).then(data => {
				this.taobaoInfo = data.data.data.base_info;
				this.account_info = data.data.data.account_info;
				this.userTaobaoBuyList = data.data.data.order_list;
				for (let i = 0; i < this.userTaobaoBuyList.length; i++) {
					this.userTaobaoBuyList[i].name = this.$route.params.name;
				}
				this.userTaoBaoAddressList = data.data.data.receiver_list
				
			});
		},
	
	}
};
</script>

<style >
	.taobao-info{
		font-size:10px;
		background-color: #ecf5ff;
		padding:5px 20px;
	}
	.taobao-info  label {
		width: 100px;
		color: #99a9bf;
		font-size:10px;
	}
	.taobao-info span{
		color:#ff4800;
		font-size:14px;
	}
	.taobao-info .el-form-item{
		margin-right: 0;
		margin-bottom: 0;
		width: 45%;
		height: 30px;
		line-height: 30px;
	}
</style>