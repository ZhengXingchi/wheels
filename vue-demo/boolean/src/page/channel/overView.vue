<template>
	<el-table :data="reports" border style="width: 100%;margin-top:10px">
        <el-table-column fixed prop="gmtDatetime" label="日期" width="200" v-if="isDetail==true"></el-table-column>
		<el-table-column prop="channelName" label="渠道名称"></el-table-column>
		<el-table-column prop="registerNum" label="注册人数"></el-table-column>
		<el-table-column prop="allAuthenticationNum" label="全要素认证数"></el-table-column>
		<el-table-column prop="riskAdoptNum" label="机审通过人数"></el-table-column>
		<el-table-column prop="riskAdoptProbability" label="机审通过率"></el-table-column>
		<el-table-column prop="passPeopleNum" label="放款人数"></el-table-column>
		<el-table-column prop="passProbability" label="放款率"></el-table-column>
		<el-table-column prop="firstOverdue" label="首逾率"></el-table-column>
		<el-table-column prop="compOverdue" label="综合逾期率"></el-table-column>
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
		return {
            
        };
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
                let reportType = 'overview';
                this.$router.push({name: 'channelReportDetail', params: {
                    channelName,reportType
                }})
               
        }
    },
};
</script>

<style scoped>
</style>