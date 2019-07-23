<template>
    <div>
        <Timeline>
            <slot name="title">
            <TimelineItem color="green">
                <Icon type="ios-trophy" slot="dot"></Icon>
                <span style="font-size:20px">{{title}}</span>
            </TimelineItem>
            </slot>
            <TimelineItem v-bind:key="index" v-for="(item,index) in userTimeData">
                <p class="time">{{item.date}}</p>
                <div class="content">
                {{item.type|timeLineFormat}}<br>
                <div v-if="item.data">
                <el-table
                    :data="item.data"
                    style="width: 100%">
                    <el-table-column
                    prop="gmtDatetime"
                    label="审核日期"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="adminAuditName"
                    label="审核员"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="reason"
                    label="审核意见">
                    </el-table-column>
                    <el-table-column
                    prop="results"
                    label="审核结果">
                    <template slot-scope="scope">
                        {{scope.row.results|auditFormat}}
                    </template>
                    </el-table-column>
                </el-table>
                </div>
                </div>
            </TimelineItem>

        </Timeline>
    </div>
</template>

<script>
    import Timeline from "@/components/timeline";
    import Icon from "@/components/icon";
    export default {
        components: {
            Timeline,
            Icon,
            TimelineItem: Timeline.Item,
        },
        data() {
            return {
                
            }
        },
        props: {
            userTimeData: {
                type: Array,
                default: []
            },
            title:{
                type:String,
                default:'',
            }
        },
        filters: {
            auditFormat:function(type){
            switch(parseInt(type)){
                case 1:
                return "审核通过";
                case 2:
                return  "暂时拒绝";
                case 3:
                return "不通过";
            }
            },
            timeLineFormat:function(type){
            switch(type){
                case 'register':
                return "注册时间";
                case 'lastLogin':
                return  "最新一次登录时间";
                case 'firstAuth':
                return "首次认证时间";
                case 'endAuth':
                return "结束认证时间";
                case 'risk':
                return "风控时间";
                case 'audit':
                return "信审时间";  
                case 'giveMoney':
                return "放款时间";
            }
            }
        }
    }
</script>

<style scoped>

</style>