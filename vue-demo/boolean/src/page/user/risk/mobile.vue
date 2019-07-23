<template>
    <div>
        
        <div style="display:block;min-height:800px;"><iframe :src="shujumoheUrl" frameborder="0" style="width:100%;min-height:800px;"></iframe></div>
    </div>
</template>

<script>
import {getShuJuMoHe,getMoheToken} from '@/API'
    export default {
        data() {
            return {
                shujumoheUrl:'',
            }
        },
        props: {
            taskId: {
                type: String,
                default: ''
            },
            isLoaded:{
                type: String,
                default: ''
            }
        },
        watch:{
            isLoaded:function(val){
                if(val=='mobile' && this.taskId!=''){
                    this.getMohe();
                }
            }
        },
        methods: {
            getMohe() {
                let taskId = this.taskId;
                let token = '';
                getMoheToken().then(data=>{
                    if(data.data.code==0){
                    token = data.data.data;
                    this.shujumoheUrl= "https://report.shujumohe.com/report/"+ taskId + "/" + token;
                    }else{
                    this.$notify.error({
                        title: '错误',
                        message: '这是一条错误的提示消息'
                    });
                    }
                });
            }
        },
    }
</script>

<style scoped>

</style>