<template>
	<div style="margin-right:20px;" v-loading="loadinged"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
		<div v-if="isShow==true">
			<Divider>YD多头报告</Divider>
			<div>
				<el-row :gutter="20">
					<el-col :span="16">
						<el-card class="card">
							<div slot="header" class="clearfix">
								<span>基本信息</span>
							</div>
							<div style="margin:10px;"  v-if="isLoadedUdInfo">
								<el-form label-position="left" inline class="ud-info">
									<el-form-item label="可信姓名">
										<span>{{udUserInfo.id_detail.name_credible}}</span>
									</el-form-item>
									<el-form-item label="性别">
										<span>{{udUserInfo.id_detail.gender}}</span>
									</el-form-item>
									<el-form-item label="民族">
										<span>{{udUserInfo.id_detail.nation}}</span>
									</el-form-item>
									<el-form-item label="住址">
										<span>{{udUserInfo.id_detail.address}}</span>
									</el-form-item>
									<el-form-item label="曾组合姓名">
										<span>{{udUserInfo.id_detail.names}}</span>
									</el-form-item>
								</el-form>
							</div>
						</el-card>
					</el-col>
					<el-col :span="8">
						<el-card class="card">
							<div slot="header" class="clearfix">
								<span>用户特征命中</span>
							</div>
							<div style="padding:10px;"  v-if="isLoadedUdInfo">
								<el-tag
									style="margin-right:5px;margin-bottom:5px;"
									v-for="(feature,index) in features"
									v-bind:key="index"
									:type="feature.isBlack?'danger':'info'"
								>{{feature.name}}</el-tag>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>信贷行为</span>
					</div>
					<el-row>
						<el-col :span="12">
                            <div id="loanChart" style="width: 100%; height: 200px; user-select: none;">

                            </div>
						</el-col>
						<el-col :span="12">
                            <div id="repayChart" style="width: 100%; height: 200px; user-select: none;" >

                            </div>
						</el-col>
					</el-row>
                    <el-table
                        :data="udUserInfo.loan_detail.loan_industry"
                        border
                        v-if="isLoadedUdInfo"
                    >
                        <el-table-column prop="name" label="行业分类" ></el-table-column>
                        <el-table-column prop="loan_platform_count" label="申请借款平台数" ></el-table-column>
                        <el-table-column prop="actual_loan_platform_count" label="借款平台数" ></el-table-column>
                        <el-table-column prop="repayment_platform_count" label="还款平台数" ></el-table-column>
                        <el-table-column prop="repayment_times_count" label="还款笔数" ></el-table-column>
               
                    </el-table>
				</el-card>
                
               
			</div>
		
			<Divider>Z黑名单欺诈检测</Divider>
			<el-table :data="riskInfo.blacklistMobile" border style="width: 100%">
				<el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
				<el-table-column prop="last_confirm_status" label="最新欺诈/逾期状态	" width="150"></el-table-column>
				<el-table-column prop="last_6m_tenant_count" label="黑名单机构数(6个月)	" width="200"></el-table-column>
				<el-table-column prop="last_confirm_at_days" label="入库时间" width="100"></el-table-column>
				<el-table-column prop="last_6m_query_count" label="申请查询数(近6个月)" width="200"></el-table-column>
				<el-table-column prop="black_level" label="黑名单状态" width="200"></el-table-column>
				<el-table-column prop="last_12m_max_confirm_status" label="最严重的欺诈/逾期状态(12个月)"></el-table-column>
			</el-table>
			<Divider>Z借贷逾期数据(A)</Divider>
			<el-table :data="riskInfo.loaninfoMobile" border style="width: 100%">
				<el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
				<el-table-column prop="loan_tenant_count_d90" label="贷款机构数"></el-table-column>
				<el-table-column prop="loan_count_all" label="贷款笔数"></el-table-column>
				<el-table-column prop="max_loan_period_days_d90" label="最大贷款金额"></el-table-column>
				<el-table-column prop="average_loan_amount_d90" label="平均贷款额度"></el-table-column>
				<el-table-column prop="max_loan_period_days_d90" label="最大贷款天数"></el-table-column>
				<el-table-column prop="average_tenant_gap_days_d90" label="平均换新机构间隔时长"></el-table-column>
				<el-table-column prop="average_loan_gap_days_d90" label="平均申请间隔时长"></el-table-column>
				<el-table-column prop="overdue_tenant_count_d90" label="逾期的贷款机构数"></el-table-column>
				<el-table-column prop="overdue_loan_count_d90" label="逾期的贷款笔数	"></el-table-column>
				<el-table-column prop="max_overdue_days_all" label="最大逾期天数"></el-table-column>
				<el-table-column prop="overdue_for2_term_tenant_count_d90" label="逾期2周期以上的机构数"></el-table-column>
				<el-table-column prop="remaining_amount_all" label="未还款总额"></el-table-column>
				<el-table-column prop="months_for_normal_repay_d360" label="连续正常还款月数"></el-table-column>
			</el-table>
			<Divider>Z借贷逾期数据(B)</Divider>
			<el-table :data="riskInfo.loaninfoMobile" border style="width: 100%">
				<el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
				<el-table-column prop="remaining_amount_all" label="未还款总额" width="150"></el-table-column>
				<el-table-column prop="overdue_loan_count_all" label="当前逾期的贷款笔数" width="200"></el-table-column>
				<el-table-column prop="loan_count_all" label="贷款笔数" width="100"></el-table-column>
				<el-table-column prop="remaining_overdue_amount_all" label="当前逾期金额" width="200"></el-table-column>
				<el-table-column prop="max_overdue_days_all" label="最大逾期天数" width="200"></el-table-column>
				<el-table-column prop="overdue_tenant_count" label="当前逾期的贷款机构数	"></el-table-column>
				<el-table-column prop="overdue_count" label="累计逾期次数"></el-table-column>
			</el-table>
			<Divider>Z跨机构申请数据(A)</Divider>
			<el-table :data="riskInfo.velocitycheckMobile" border style="width: 100%">
				<el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
				<el-table-column prop="cross_tenant_apps_number_d30" label="近1个月跨机构申请数	"></el-table-column>
				<el-table-column prop="cross_tenant_apps_number_d60" label="近2个月跨机构申请数	"></el-table-column>
				<el-table-column prop="cross_tenant_apps_number_d90" label="近3个月跨机构申请数	"></el-table-column>
				<el-table-column prop="cross_tenant_apps_number_d180" label="近6个月跨机构申请数"></el-table-column>
			</el-table>
			<Divider>Z跨机构申请数据(B)</Divider>
			<el-table :data="riskInfo.blacklistMobile" border style="width: 100%">
				<el-table-column prop="mobile" label="手机号"></el-table-column>
				<el-table-column prop="last_confirm_status" label="距今天数"></el-table-column>
				<el-table-column prop="last_6m_tenant_count" label="跨机构申请数"></el-table-column>
				<el-table-column prop="last_confirm_at_days" label="贷款类型标签"></el-table-column>
				<el-table-column prop="last_6m_query_count" label="查询时间"></el-table-column>
			</el-table>
			<Divider>Q多头情况分析</Divider>
			<el-table :data="riskInfo.userLoanPlatform" border style="width: 100%">
				<el-table-column prop="key"></el-table-column>
				<el-table-column prop="val"></el-table-column>
			</el-table>
			<Divider>Q命中情况</Divider>
			<el-table :data="riskInfo.blacklistMobile" border style="width: 100%">
				<el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
				<el-table-column prop="last_confirm_status" label="最新欺诈/逾期状态	" width="150"></el-table-column>
				<el-table-column prop="last_6m_tenant_count" label="黑名单机构数(6个月)	" width="200"></el-table-column>
				<el-table-column prop="last_confirm_at_days" label="入库时间" width="100"></el-table-column>
				<el-table-column prop="last_6m_query_count" label="申请查询数(近6个月)" width="200"></el-table-column>
				<el-table-column prop="black_level" label="黑名单状态" width="200"></el-table-column>
				<el-table-column prop="last_12m_max_confirm_status" label="最严重的欺诈/逾期状态(12个月)"></el-table-column>
			</el-table>
			<Divider>Q风险提示(user_risk_hint)</Divider>
			<el-table :data="riskInfo.user_risk_hint" border style="width: 100%">
				<el-table-column prop="mobile" label="手机号" width="150"></el-table-column>
				<el-table-column prop="name" label="用户名" width="150"></el-table-column>
				<el-table-column prop="rskmark" label="返回信息" width="200"></el-table-column>
				<el-table-column prop="sourceid" label="类型" width="100"></el-table-column>
				<el-table-column prop="databuildtime" label="业务发生时间	" width="200"></el-table-column>
				<el-table-column prop="datastatus" label="数据状态" width="200"></el-table-column>
				<el-table-column prop="idno" label="证件号码"></el-table-column>
			</el-table>

			<Divider>借款平台明细(user_loan_platform)</Divider>
			<el-table :data="riskInfo.user_loan_platform" border style="width: 100%" max-height="250">
				<el-table-column fixed prop="mobile" label="手机号" width="150"></el-table-column>
				<el-table-column fixed prop="name" label="用户名" width="150"></el-table-column>
				<el-table-column prop="amount" label="命中机构数量" width="200"></el-table-column>
				<el-table-column prop="industry" label="借贷机构所属行业" width="200"></el-table-column>
				<el-table-column prop="bnkamount" label="命中银行机构数量" width="100"></el-table-column>
				<el-table-column prop="cnssamount" label="命中消费金融机构数量" width="200"></el-table-column>
				<el-table-column prop="p2pamount" label="命中p2p或者小贷机构数" width="200"></el-table-column>
				<el-table-column prop="queryamtm3" label="近三个月机构查询次数" width="200"></el-table-column>
				<el-table-column prop="queryamtm6" label="近六个月机构查询次数" width="200"></el-table-column>
				<el-table-column prop="reasoncode" label="查询原因"></el-table-column>
			</el-table>
		</div>
	</div>
</template>

<script>
import { getUdUserinfo } from "@/API";
import Divider from "@/components/divider/divider";
export default {
	components: { Divider },
	data() {
		return {
			isShow: false,
			idNum: "",
			option: {}, //借款
			option2: {}, //还款
			features: {}, //用户特征
            udUserInfo: {},
            isLoadedUdInfo: false,
            loadinged:true,
			featureList: {
				0: { name: "多头借贷", isBlack: false },
				2: { name: "羊毛党", isBlack: false },
				5: { name: "作弊软件", isBlack: false },
				6: { name: "法院失信", isBlack: false },
				7: { name: "网贷失信", isBlack: false },
				8: { name: "关联过多", isBlack: false },
				10: { name: "曾使用可疑设备", isBlack: false },
				11: { name: "安装极多借贷app", isBlack: false },
				13: { name: "身份信息疑似泄漏", isBlack: false },
				17: { name: "活体攻击设备", isBlack: false },
				18: { name: "活体攻击行为", isBlack: false },
				21: { name: "疑似欺诈团伙", isBlack: false },
				23: { name: "网贷不良", isBlack: false },
				24: { name: "短期逾期", isBlack: false }
			},
			header_row_style: {
				backgroundColor: "#808695"
			}
		};
	},
	props: {
		riskInfo: {
			type: Object
		},
		isLoaded: {
			type: String,
			default: ""
		},
		identityNum: {
			type: String,
			default: ""
		},
		userId: {
			type: String,
			default: ""
		}
    },
    beforeMount(){
        this.initOption();
    },
	watch: {
		isLoaded: function(val) {
			if (val == "multipleReport") {
				this.isShow = true;
				this.getUdInfo();
				this.getDetail();
			}
        },
        isLoadedUdInfo:function(val){
           if(val==true && this.option.series[0].data.length>0){
           
            let loadnChart = this.$echarts.init(this.$el.querySelector ('#loanChart'));
            let repayChart = this.$echarts.init(this.$el.querySelector("#repayChart"));
           
            
            loadnChart.setOption(this.option);
            repayChart.setOption(this.option2);
            this.loadinged=false;
           }
            
        }
    },

	methods: {
        initOption(){
            var itemStyle0 = {
                normal: {
                label: {
                    show: true,
                    textStyle: {
                    fontWeight: 'bolder',
                    fontSize: '12',
                    fontFamily: '微软雅黑'
                    },
                    position: 'top'
                },
                color: 'rgb(70,148,217)'
                }
            };
            var itemStyle1 = {
                normal: {
                label: {
                    show: true,
                    textStyle: {
                    fontWeight: 'bolder',
                    fontSize: '12',
                    fontFamily: '微软雅黑'
                    },
                    position: 'top'
                },
                color:'rgb(119,215,232)'
                }
            };
            // 指定图表的配置项和数据
            this.option = {
                title : {
                show: true,
                },
                tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                    color: '#999'
                    }
                }
                },
                legend: {
                data:['申请借款','借款']
                },
                xAxis: [
                {
                    type: 'category',
                    data: ['总计','近6月','近3月','近1月'],
                    axisPointer: {
                    type: 'shadow'
                    }
                }
                ],
                yAxis: [
                {
                    type: 'value',
                    name: '数量',

                    axisLabel: {
                    },
                    show: false,
                }
                ],
                series: [
                {
                    name:'申请借款',
                    type:'bar',
                    data:[],
                    itemStyle : itemStyle0        },
                {
                    name:'借款',
                    type:'bar',
                    data:[],
                    itemStyle : itemStyle1        },
                ]
            };
            var repayStyle = {
                normal: {
                label: {
                    show: true,
                    textStyle: {
                    fontWeight: 'bolder',
                    fontSize: '12',
                    fontFamily: '微软雅黑'
                    },
                    position: 'top'
                },
                color: function (params) {
                    var colorList = [
                    'rgb(37,185,125)'
                    ];
                    return colorList[params.dataIndex]
                }
                }
            };

            this.option2={
                tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                    color: '#999'
                    }
                }
                // backgroundColor:"rgb(119,215,232)"
                },
                legend: {
                data:['还款']
                },
                xAxis: [
                {
                    type: 'category',
                    data: ['总计','近6月','近3月','近1月'],
                    axisPointer: {
                    type: 'shadow'
                    }
                }
                ],
                yAxis: [
                {
                    type: 'value',
                    name: '数量',
                    axisLabel: {
                    formatter: '{value} 个'
                    },
                    axisLine:{
                    lineStyle:{
                        show: false,
                        width:2
                    },
                    },
                    show: false
                }
                ],
                series: [
                {
                    name:'还款',
                    type:'bar',
                    data:[],
                    itemStyle : repayStyle        },
                ]

            };
        },
		getUdInfo() {
			if (this.identityNum == "") {
				this.$message.error("获取多头报告错误:身份证号未传入");
				return void 0;
			}
			let params = {};
			params.idNum = this.identityNum;
			getUdUserinfo(params).then(data => {
				let udData = data.data.data;
				if (udData.header.ret_code == "000000") {
					this.udUserInfo = udData.body;
					this.udUserInfo.user_features.forEach(feature => {
						Object.keys(this.featureList).forEach(key => {
							if (feature.user_feature_type == key) {
								this.featureList[key].isBlack = true;
								if (feature.last_modified_date != undefined) {
									this.featureList[key].last_modified_date =
										feature.last_modified_date;
								}
							}
						});
					});
                    this.features = this.featureList;
                    //实际借款
                    let actualLoanTotal = this.udUserInfo.loan_detail.loan_platform_count_6m+this.udUserInfo.loan_detail.loan_platform_count_3m+this.udUserInfo.loan_detail.loan_platform_count_1m;
                    //申请借款
                    let loanTotal = this.udUserInfo.loan_detail.loan_platform_count_6m+this.udUserInfo.loan_detail.loan_platform_count_3m+this.udUserInfo.loan_detail.loan_platform_count_1m;

                    this.option.series[0].data=[this.udUserInfo.loan_detail.loan_platform_count,this.udUserInfo.loan_detail.loan_platform_count_6m,this.udUserInfo.loan_detail.loan_platform_count_3m,this.udUserInfo.loan_detail.loan_platform_count_1m];
                    this.option.series[1].data = [this.udUserInfo.loan_detail.actual_loan_platform_count,this.udUserInfo.loan_detail.actual_loan_platform_count_6m,this.udUserInfo.loan_detail.actual_loan_platform_count_3m,this.udUserInfo.loan_detail.actual_loan_platform_count_1m];
                    this.option2.series[0].data = [this.udUserInfo.loan_detail.repayment_platform_count,this.udUserInfo.loan_detail.repayment_platform_count_6m,this.udUserInfo.loan_detail.repayment_platform_count_3m,this.udUserInfo.loan_detail.repayment_platform_count_1m];
					this.isLoadedUdInfo = true;
				} else {
					this.$message.error("获取多头报告错误");
				}
			});
		},
		getDetail() {
			if (this.riskInfo.multiple_loan) {
				this.riskInfo.multipleLoan = [this.riskInfo.multiple_loan];
			}
			if (this.riskInfo.blacklist_mobile) {
				this.riskInfo.blacklistMobile = [this.riskInfo.blacklist_mobile];
			}
			if (this.riskInfo.loaninfo_mobile) {
				this.riskInfo.loaninfoMobile = [this.riskInfo.loaninfo_mobile];
			}
			if (this.riskInfo.velocitycheck_mobile) {
				this.riskInfo.velocitycheckMobile = [
					this.riskInfo.velocitycheck_mobile
				];
			}
			let loanPlatform;
			this.riskInfo.loanPlatform = {};
			this.riskInfo.loanPlatform.amount = 0;
			this.riskInfo.loanPlatform.bakAmount = 0;
			this.riskInfo.loanPlatform.cnsAmount = 0;
			this.riskInfo.loanPlatform.p2pOrMclAmount = 0;
			this.riskInfo.loanPlatform.busidate = "";
			this.riskInfo.loanPlatform.queryamtm3 = 0;
			this.riskInfo.loanPlatform.queryamtm6 = 0;
			this.riskInfo.user_loan_platform.forEach(loanPlatform => {
				this.riskInfo.loanPlatform.amount += parseInt(loanPlatform.amount);
				if (loanPlatform.industry == "BAK") {
					this.riskInfo.loanPlatform.bakAmount += parseInt(loanPlatform.amount);
				}
				if (loanPlatform.industry == "CNS") {
					this.riskInfo.loanPlatform.cnsAmount += parseInt(loanPlatform.amount);
				}
				if (loanPlatform.industry == "MCL" || loanPlatform.industry == "P2P") {
					this.riskInfo.loanPlatform.p2pOrMclAmount += parseInt(
						loanPlatform.amount
					);
					this.riskInfo.loanPlatform.busidate += loanPlatform.busidate + ",";
				}
				this.riskInfo.loanPlatform.queryamtm3 += parseInt(
					loanPlatform.queryamtm3
				);
				this.riskInfo.loanPlatform.queryamtm6 += parseInt(
					loanPlatform.queryamtm6
				);
			});
			this.riskInfo.userLoanPlatform = [
				{ key: "命中机构数量", val: this.riskInfo.loanPlatform.amount },
				{ key: "命中银行机构数", val: this.riskInfo.loanPlatform.bakAmount },
				{
					key: "命中消费金融机构数",
					val: this.riskInfo.loanPlatform.cnsAmount
				},
				{
					key: "命中p2p或者小贷机构数",
					val: this.riskInfo.loanPlatform.p2pOrMclAmount
				},
				{
					key: "近三个月机构查询次数",
					val: this.riskInfo.loanPlatform.queryamtm3
				},
				{
					key: "近六个月机构查询次数",
					val: this.riskInfo.loanPlatform.queryamtm6
				},
				{
					key: "业务发生时间日期(小贷、P2P)",
					val: this.riskInfo.loanPlatform.busidate
				}
			];
		}
	}
};
</script>

<style >
.ud-info label {
	width: 100px;
	color: #99a9bf;
}
.ud-info .el-form-item {
	margin-right: 0;
	margin-bottom: 0;
	width: 45%;
	height: 40px;
	line-height: 40px;
}
</style>