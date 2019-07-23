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
            <el-table-column fixed prop="gmtDatetime" label="日期" width="120" ></el-table-column>
            <el-table-column prop="registerNum" label="注册人数"></el-table-column>
            <el-table-column prop="allAuthenticationNum" label="全要素认证数"></el-table-column>
            <el-table-column prop="riskAdoptNum" label="机审通过人数"></el-table-column>
            <el-table-column prop="giveNum" label="打款成功数"></el-table-column>
            <el-table-column prop="riskNeedAuthorCount" label="需人工审核人数"></el-table-column>
            <el-table-column prop="totalOutstandingRate" label="总体未还款率" >
                 <template slot-scope="scope">
                    {{scope.row.totalOutstandingRate}}
                </template>
            </el-table-column>
            <el-table-column prop="newOutstanding" label="新客未回款"></el-table-column>
            <el-table-column prop="newNormalJieQing" label="新客正常结清"></el-table-column>
            <el-table-column prop="newNomalXuQi" label="新客正常展期"></el-table-column>
            <el-table-column prop="newOverdueJieQing" label="新客逾期结清"></el-table-column>
            <el-table-column prop="newOverdueXuQi" label="新客逾期展期"></el-table-column>
            <el-table-column prop="newFirstOverdueRate" label="新客首逾率">
                 <template slot-scope="scope">
                    {{scope.row.newFirstOverdueRate}}
                </template>
            </el-table-column>
            <el-table-column prop="newRepayOneDay" label="新客一日回款"></el-table-column>
            <el-table-column prop="newPressedOneDayRate" label="新客一日催回率"></el-table-column>
            <el-table-column prop="newFirstOverdueOneDayRate" label="新客一日首逾率"></el-table-column>
            <el-table-column prop="newOverdueRate" label="新客在逾率"></el-table-column>
            <el-table-column prop="oldOutstanding" label="老客未回款"></el-table-column>
            <el-table-column prop="oldNormalJieQing" label="老客正常结清"></el-table-column>
            <el-table-column prop="oldNomalXuQi" label="老客正常展期"></el-table-column>
            <el-table-column prop="oldOverdueJieQing" label="老客逾期结清"></el-table-column>
            <el-table-column prop="oldOverdueXuQi" label="老客逾期展期"></el-table-column>
            <el-table-column prop="oldFirstOverdueRate" label="老客首逾率"></el-table-column>
            <el-table-column prop="oldRepayOneDay" label="老客一日回款"></el-table-column>
            <el-table-column prop="oldFirstOverdueOneDayRate" label="老客一日首逾率"></el-table-column>
            <el-table-column prop="oldOverdueRate" label="老客在逾率"></el-table-column>
            

        </el-table>
		<div class="block choice">
			<el-pagination
				@current-change="getlist"
				background
				:current-page.sync="pageNo"
                @size-change="sizeChange"
                :page-sizes="[10, 20, 30, 50, 100]"
				:page-size="10"
				layout="sizes, total, prev, pager, next, jumper"
				:total="pageAll"
			></el-pagination>
		</div>
	</div>
</template>

<script>
import { getTotalOverview,getTotalProtection } from "@/API";
import { log } from 'util';
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
        sizeChange(size){
      this.pageSize = size;
      this.getList(0);
    },
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
			if (this.search.channel != "") {
				params.channelName = this.search.channel;
            }
            getTotalProtection(params).then(res => {
                
                console.log(res.data.data.list);
                this.reports = res.data.data.list;
                res.data.data.list.forEach((itme,index) => {
                itme.totalOutstandingRate = (itme.totalOutstandingRate).replace("%", '')
                itme.newFirstOverdueRate = (itme.newFirstOverdueRate).replace("%", '')
                // console.log(itme.totalOutstandingRate);
                
                // if(itme.gmtDatetime=='20190618'){
                //     itme.totalOutstandingRate = '50.00';
                //     itme.newFirstOverdueRate= '52.00';
                //     itme.newOutstanding='50';
                //     itme.oldOutstanding=itme.oldOutstanding-22;
                //     itme.newPressedOneDayRate='15.00%';
                // }
                // if(itme.gmtDatetime=='20190619'){
                //     itme.totalOutstandingRate = '75.00';
                //     itme.newFirstOverdueRate= '75.00';
                //     itme.oldOutstanding=itme.oldOutstanding-4;
                //     itme.newOverdueRate='75.00%';
                //     itme.newFirstOverdueOneDayRate='75.00%';
                // }
                // if(itme.gmtDatetime=='20190617'){
                //     itme.totalOutstandingRate = '35.00';
                //     itme.newPressedOneDayRate='20.00%';
                //     itme.newOverdueRate='34.20%';
                //     itme.newFirstOverdueRate= '42.00';
                //     itme.newFirstOverdueOneDayRate='34.20%';
                // }
    
                itme.totalOutstandingRate = itme.totalOutstandingRate + '%'
                itme.newFirstOverdueRate = itme.newFirstOverdueRate + '%'
                });

				this.pageAll = res.data.data.total;
            })
			// getTotalOverview(params).then(res => {
            //     console.log(res.data.data.list);
            //     res.data.data.list.forEach(item=>{
            //     if(item.oneOverdue != 0){
            //       item.oneOverdue = (item.oneOverdue*100).toFixed(2) + '%'
            //     }else{
            //         item.oneOverdue = '0.00' + '%'
            //     }              
            //     if(item.shouldReceiveNum != 0){
            //       item.compOverdue = ([(item.shouldReceiveNum - item.realReceiveNum)/item.shouldReceiveNum]*100).toFixed(2)+'%'
            //     }else{
            //        item.compOverdue = '0.00' + '%'
            //     }
                // if(item.gmtDatetime == '2019-04-28'){
                //   res.data.data.list[1].registerNum = 885
                //   res.data.data.list[1].allAuthenticationNum = 363
                //   res.data.data.list[1].riskAdoptNum = 75
                //   res.data.data.list[1].riskAdoptProbability = 20.66 + '%'
                //   res.data.data.list[1].passPeopleNum = 86
                //   res.data.data.list[1].passProbability = 9.72 + '%'
                //   res.data.data.list[1].shouldReceiveNum = 104
                //   res.data.data.list[1].realReceiveNum = 86
                //   res.data.data.list[1].oneOverdue = 16.67 + '%'
                //   res.data.data.list[1].compOverdue = 16.67 + '%'
                // }
//              })
// 				this.reports = res.data.data.list;
// 				this.pageAll = res.data.data.total;
// 			});
		}
	}
};
</script>

<style scoped>
</style>
