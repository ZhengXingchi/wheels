<template>
    <div class="allPage">
        <el-table
        :data="users"
        style="width: 100%">
        <el-table-column
            prop="phone"
            label="手机号"
            width="120">
        </el-table-column>
        <el-table-column
            prop="gmtDatetime"
            label="反馈日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="userName"
            label="用户名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="reason"
            label="反馈内容"
            width="380">
        </el-table-column>
        <!-- <el-table-column prop="imgUrl" label="图片" min-width="20%" >
                 <template   slot-scope="scope">            
                    <img :src="scope.row.imgUrl"  min-width="70" height="20"/>
                 </template>         
        </el-table-column> -->
<!--       
            <el-table-column
                
                label="操作">
                <template slot-scope="scope">
                    <el-button @click="removeBlack(scope.row.userId,scope.$index)" type="text" size="small">设为正常</el-button>
                    
                </template>
            </el-table-column> -->
        </el-table>
        <div class="block choice">
        <el-pagination
            @current-change="getList"
            background
            :current-page.sync="pageNo"        
            :page-size="10"
            layout="sizes, total, prev, pager, next, jumper"
            :total="pageAll">
        </el-pagination>
        </div>
    </div>
</template>

<script>
import{selectPageList} from '@/API'
let currentPage=1;
    export default {
        data() {
            return {
                users:[],
                pageNo:currentPage,
                pageSize:10,
                pageAll:0
            }
        },
       async mounted(){
           if(currentPage>1) this.pageNo=currentPage;
           await this.getList();
        },
        methods: {
            getList(isOr) {
                if(isOr==0){
                    this.pageNo=1
                }
                currentPage = this.pageNo;
                let params={};
                params.pageNo=this.pageNo;
                params.pageSize=this.pageSize;
                 selectPageList(params).then(res=>{
                     console.log(res.data.data);
                    this.users = res.data.data.payFeedbackList;
                    this.pageAll = res.data.data.payFeedbackTotal;
                });
            },
        },
    }
</script>

<style scoped>

</style>