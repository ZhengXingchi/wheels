<template>
    <el-table :data="reports" border style="width: 100%;margin-top:10px">
    <el-table-column fixed prop="gmtDatetime" label="日期" width="200" v-if="isDetail==true"></el-table-column>
    <el-table-column prop="channelName" label="渠道名称" ></el-table-column>
    <el-table-column prop="firstOverdueNum" label="首日逾期人数" ></el-table-column>
    <el-table-column prop="firstOverdueProbability" label="首日逾期率" ></el-table-column>
    <el-table-column prop="compOverdueNum" label="综合逾期人数" ></el-table-column>
    <el-table-column prop="s1OverdueNum" label="S1人数" ></el-table-column>
    <el-table-column prop="s2OverdueNum" label="S2人数" ></el-table-column>
    <el-table-column prop="s3OverdueNum" label="S3人数" ></el-table-column>
    <el-table-column prop="compOverdueProbability" label="综合逾期率" ></el-table-column>
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
                
            }
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
                    let reportType = 'overdue';
                    this.$router.push({name: 'channelReportDetail', params: {
                        channelName,reportType
                    }})
               
            }
        },
    }
</script>

<style scoped>

</style>