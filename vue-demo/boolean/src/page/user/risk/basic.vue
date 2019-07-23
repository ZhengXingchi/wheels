<template>
	<div>
		<div v-if="baseInfo.companyInfoDTO">
			<p>GPS地理位置分析:<el-tag type="success">注册地址:[{{registerAddress}}]</el-tag><el-tag type="warning">注册地距离公司:{{workToRegisterDistance}}</el-tag> <el-tag type="warning">注册地距离居住地:{{homeToRegisterDistance}}</el-tag></p>
			<p>公司信息 </p>
			<el-form label-position="left" inline class="base-info-rang">
				<el-form-item label="公司名称">
					<span>{{baseInfo.companyInfoDTO.companyName}}</span>
				</el-form-item>
				<el-form-item label="公司地址">
					<span>{{baseInfo.companyInfoDTO.companyAddress}}</span>
				</el-form-item>
				<el-form-item label="公司电话">
					<span>{{baseInfo.companyInfoDTO.companyPhone}}</span>
				</el-form-item>
				<el-form-item label="职位">
					<span>{{baseInfo.companyInfoDTO.jobPosition}}</span>
				</el-form-item>
				<el-form-item label="收入">
					<span>{{baseInfo.companyInfoDTO.income}}</span>
				</el-form-item>
				<el-form-item label="公司城市">
					<span>{{baseInfo.companyInfoDTO.jobcounty}}</span>
				</el-form-item>
			</el-form>
		</div>
		<p>银行卡信息</p>
		<el-form label-position="left" inline class="base-info-rang">
			<el-form-item label="银行卡号">
				<span>{{baseInfo.bankcardno}}</span>
			</el-form-item>
			<el-form-item label="所属银行编码">
				<span>{{baseInfo.bankName}}</span>
			</el-form-item>
		</el-form>

		<p>紧急联系人</p>
		<el-table :data="urgentList" style="width: 60%;margin-bottom: 5px;">
			<el-table-column prop="name" label="姓名" width="80"></el-table-column>
			<el-table-column prop="link" label="关系" width="60"></el-table-column>
			<el-table-column prop="phone" label="联系电话" width="120"></el-table-column>
			<el-table-column prop="belongArea" label="地区" width="120"></el-table-column>
			<el-table-column prop="callTimes" label="通话次数" width="80"></el-table-column>
			<el-table-column prop="callCountActive" label="主叫次数" width="80"></el-table-column>
			<el-table-column prop="callCountPassive" label="被叫次数" width="80"></el-table-column>
			<el-table-column prop="callTime" label="通话时长" width="80"></el-table-column>
		</el-table>
		<p>认证照片</p>
		<el-row :gutter="20">
			<el-col :span="6">
				<el-card>
					<img :src="baseInfo.identityFront || defaultSrc" alt="点击放大" class="myImg" @click="openImg">
					<div style="padding: 14px;">
						<span>身份证正面</span>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card>
					<img :src="baseInfo.identityBack || defaultSrc" alt="点击放大" class="myImg" @click="openImg">
					<div style="padding: 14px;">
						<span>身份证反面</span>
					</div>
				</el-card>
			</el-col>
			<el-col :span="6">
				<el-card>
					<img
						:src="baseInfo.faceUrl || defaultSrc"
						alt="点击放大"
						class="myImg"
						@click="openImg"
						style="height:160px;width:auto"
					>
					<div style="padding: 14px;">
						<span>活体照片</span>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<!-- 打开图片 -->
		<el-dialog :visible.sync="imgShow" width="40%">
			<img :src="imgSrc" alt style="width:100%;">
		</el-dialog>
		<div id="allmap"></div>
		<BackTop></BackTop>
	</div>
</template>

<script>
import { auditingUrgent } from "@/API";
import BackTop from "@/components/back-top";
import { MP } from "@/utils/tools";
export default {
	components:{
		BackTop
	},
	data() {
		return {
			urgentList: [], //关系人列表
			defaultSrc: require("../../../assets/default.png"),
			imgSrc: "",
			imgShow: false,
			ak: "4613E2af4ea05d4aed26938aca432683",
			homeToRegisterDistance:'',//注册地址到家距离
			workToRegisterDistance:'',//注册地址到工作单位距离
			registerAddress:'',
		};
	},
	mounted() {
		this.$nextTick(function() {
			let _m = this;
			MP(_m.ak).then(BMap => {
				// 在此调用api
				_m.getDistance();
			});
		});
	},
	props: {
		baseInfo: {},
		userId: {
			type: String,
			default: 0
		}
	},
	watch: {
		userId: function(val) {
			if (this.userId) this.getUrgent();
		}
	},
	methods: {
		getUrgent() {
			let params = {
				userId: this.userId
			};
			auditingUrgent(params).then(data => {
				this.urgentList = data.data.data;
			});
		},
		openImg(e) {
			// console.log(e);
			this.imgSrc = e.target.src;
			// console.log(this.imgSrc);
			this.imgShow = true;
		},
		getDistance() {
			if(!this.baseInfo.companyInfoDTO){
				this.$message('未获取到公司地址');
				return void(0);
			}
			let _t = this;
			let map = new BMap.Map("allmap");
			map.centerAndZoom("杭州", 12); //初始化地图,设置城市和地图级别。
			// 创建地址解析器实例
			let myGeo = new BMap.Geocoder();
			let registerPoint = new BMap.Point(_t.baseInfo.lng, _t.baseInfo.lat);
			let pointA = new BMap.Point();
			let pointC = new BMap.Point();
			myGeo.getPoint(_t.baseInfo.companyInfoDTO.companyAddress,
				function(point) {
					if (point) {
						pointA = point; // 创建点坐标A--大渡口区
						_t.workToRegisterDistance = (Math.round(map.getDistance(pointA,registerPoint)/100)/10).toFixed(2)+'公里';
					} else {
						this.$message('您选择地址没有解析到结果');
					}
				},
				"杭州市"
			);
			myGeo.getPoint(_t.baseInfo.addressDetails,
				function(point) {
					if (point) {
						pointC = point; // 创建点坐标A--大渡口区
						_t.homeToRegisterDistance = (Math.round(map.getDistance(pointC,registerPoint)/100)/10).toFixed(2)+'公里';
					} else {
						this.$message('您选择地址没有解析到结果');
					}
				},
				"杭州市"
			);
			myGeo.getLocation(registerPoint, function(rs){
				console.log(registerPoint);
				var addComp = rs.addressComponents;
				_t.registerAddress = addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber;
			}); 
		}
	}
};
</script>

<style >
.myImg {
	width: 100%;
	height: 100%;
	cursor: pointer;
}
</style>