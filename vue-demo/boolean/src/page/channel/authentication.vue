<template>
	<el-table :data="reports" border style="width: 100%;margin-top:10px">
        <el-table-column fixed prop="gmtDatetime" label="日期" width="200" v-if="isDetail==true"></el-table-column>
		<el-table-column prop="channelName" label="渠道名称"></el-table-column>
		<el-table-column prop="registerNum" label="注册人数"></el-table-column>
		<el-table-column width="150px" label="全要素认证数">
            <template slot-scope="scope">
                {{scope.row.allAuthenticationNum}} <span class="percent">({{scope.row.allAuthenticationProbability}})</span>
            </template>
        </el-table-column>
		<el-table-column  label="基本信息认证">
            <template slot-scope="scope">
                {{scope.row.baiscInformationNum}} <span class="percent">({{scope.row.baiscInformationProbability}})</span>
            </template>
        </el-table-column>
		
		<el-table-column  label="身份认证">
            <template slot-scope="scope">
                {{scope.row.identityAuthenticationNum}} <span class="percent">({{scope.row.identityAuthenticationProbability}})</span>
            </template>
        </el-table-column>
		<el-table-column  label="手机认证">
            <template slot-scope="scope">
                {{scope.row.phoneAuthenticationNum}} <span class="percent">({{scope.row.phoneAuthenticationProbability}})</span>
            </template>
        </el-table-column>
		<el-table-column  label="银行卡认证">
            <template slot-scope="scope">
                {{scope.row.bankcardAuthenticationNum}} <span class="percent">({{scope.row.bankcardAuthenticationProbability}})</span>
            </template>
        </el-table-column>
        <el-table-column  label="淘宝认证">
            <template slot-scope="scope">
                {{scope.row.taobaoAuthenticationNum}} <span class="percent">({{scope.row.taobaoAuthenticationProbability}})</span>
            </template>
        </el-table-column>
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
                let reportType = 'authentication';
                this.$router.push({name: 'channelReportDetail', params: {
                    channelName,reportType
                }})
               
        }
    },
};
</script>

<style scoped>
.percent{
    color:darkgreen
}
</style>