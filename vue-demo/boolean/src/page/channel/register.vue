<template>
    <el-table :data="reports" border style="width: 100%;margin-top:10px">
    <el-table-column fixed prop="gmtDatetime" label="日期" width="200" v-if="isDetail==true"></el-table-column>
    <el-table-column prop="channelName" label="渠道名称" ></el-table-column>
    <el-table-column prop="uvVisitors" label="UV访客数" ></el-table-column>
    <el-table-column prop="registerNum" label="注册人数" ></el-table-column>
    <el-table-column prop="androidNum" label="安卓人数" ></el-table-column>
    <el-table-column prop="iosNum" label="ios人数" ></el-table-column>
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
                    let reportType = 'register';
                    this.$router.push({name: 'channelReportDetail', params: {
                        channelName,reportType
                    }})
               
            }
        },
    }
</script>

<style scoped>

</style>