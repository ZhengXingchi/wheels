<template>
    <div class="content">

      <el-row type="flex" class="row-bg" justify="space-between">
        <el-col :span="12">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>待处理订单</span>
              <el-button style="float: right; padding: 3px 0" @click="closeList" type="text">展示/隐藏</el-button>
            </div>
            <transition name="slide">
              <el-table
                :data="tableData5"
                style="width: 100%" v-show="isShowList" id="indexOrderList" max-height="300">
                <el-table-column
                  label="订单编号"
                  prop="id">
                </el-table-column>
                <el-table-column
                  label="用户"
                  prop="name">
                </el-table-column>
                <el-table-column
                  label="状态"
                >
                  <template slot-scope="props">
                    <el-tag type="success">标签二</el-tag>
                  </template>
                </el-table-column>
              </el-table>
            </transition>

          </el-card>

        </el-col>
        <el-col :span="6">

        </el-col>
        <el-col :span="6">

        </el-col>
      </el-row>
    </div>
</template>

<script>
  import animate from 'animate.css'
    export default {
      name: "todo-list",
      data() {
        return {
          isShowList:true,
          tableData5: [{
            id: '12987122',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }, {
            id: '12987123',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }, {
            id: '12987125',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }, {
            id: '12987126',
            name: '好滋好味鸡蛋仔',
            category: '江浙小吃、小吃零食',
            desc: '荷兰优质淡奶，奶香浓而不腻',
            address: '上海市普陀区真北路',
            shop: '王小虎夫妻店',
            shopId: '10333'
          }]
        }
      },
      methods:{
        closeList(){
          // let element = this.$el.querySelector ('#indexOrderList');
          // element.classList.add('animated','bounceOutLeft')
          this.isShowList=!this.isShowList;
        }
      }
    }
</script>

<style scoped>
.content{
  margin-top: 10px;
}

.slide-leave-active {  transition: all 1s;}
.slide-leave-to {  opacity: 0;}

</style>
