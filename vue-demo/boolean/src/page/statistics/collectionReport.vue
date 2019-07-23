<template>
    <div class="allPage">
        <el-row>
            <el-col :span="16">
                <el-date-picker
                    v-model="dateSelect"
                    type="daterange"
                    size='mini'
                    value-format='yyyy-MM-dd'
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="dateOption"
                ></el-date-picker>
                <el-button
                    type
                    icon="el-icon-search"
                    size="mini"
                    @click="getlist()"
                    class="publicMidBtn"
                >查询</el-button>
            </el-col>
	
        </el-row>
        <el-table :data="reports" border style="width: 100%;margin-top:10px">
            <el-table-column fixed prop="gmtDatetime" label="日期" width="200" ></el-table-column>
            <el-table-column prop="overdueOrderCount" label="逾期总订单"></el-table-column>
            <el-table-column prop="todayOverdueCount" label="当日逾期订单"></el-table-column>
            <el-table-column prop="todayOverdueBackCount" label="当日逾期回款数"></el-table-column>
            <el-table-column prop="historyOverdueCount" label="历史逾期订单"></el-table-column>
            <el-table-column prop="historyOverdueBackCount" label="历史逾期逾期回款数"></el-table-column>
            <el-table-column prop="todayOverdueBackProbability" label="当日逾期回款率"></el-table-column>
            <el-table-column prop="historyOverdueBackProbability" label="历史逾期回款率"></el-table-column>
           
        </el-table>
        <div class="block choice">
            <el-pagination
                @current-change="getlist()"
                background
                :current-page.sync="pageNo"
                :page-size="10"
                layout="sizes, total, prev, pager, next, jumper"
                :total="pageAll"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { collectionReportList } from "@/API";
let currentPage=1;
export default {
    data() {
        return {
            search: [],
            dateSelect: "",
            reports: [],
            pageNo: currentPage,
            pageAll: 1,
            pageSize: 10,
            dateOption: {
                shortcuts: [{
                text: '今天',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime());
                    picker.$emit('pick', [start, end]);
                }
                }, {
                text: '昨日',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 );
                    picker.$emit('pick', [start, end]);
                }
                }, {
                text: '最近7天',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                }
                },
                {
                text: '最近一个月',
                onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                }
                }]
            },
        };
    },
    beforeMount() {
        if(currentPage>1) this.pageNo=currentPage;
        this.getlist();
    },
    methods: {
        getlist(isOr) {
            if(isOr == 0){
              this.pageNo = 1
            }
            currentPage = this.pageNo;
            let params = {};
            params.pageNo = this.pageNo;
            params.pageSize = this.pageSize;
            if(this.dateSelect){
                params.dateTime = this.dateSelect[0] + `~` + this.dateSelect[1]
            }
            collectionReportList(params).then(res => {
                this.reports = res.data.data.list;
                this.pageAll = res.data.data.total;
            });
        }
    }
};
</script>

<style scoped>
</style>