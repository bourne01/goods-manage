<template>
    <div >
        <div class="bar-chart" v-for="(quantity,index) in quantityList" :key="index">
            <div class="dep-name">{{depNameList[index]}}</div>
            <div class="amount-of-money">
                <span>数量</span>
                <span class="bar" :style="{width:13*quantity/maxQuantity+'rem'}"></span>
                <span class="money" >{{quantity}}</span>
            </div>
            <div class="amount-of-money">
                <span>金额</span>
                <span class="bar money-bar" :style="{width:11*moneyList[index]/maxAmount+'rem'}"></span>
                <span class="money money-txt" >￥{{moneyList[index]}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:['department-list'],
    data(){
        return{
            quantityList:[],//数量列表
            moneyList:[],//金额列表
            depNameList:[],//部门名称列表
            objBarWidth:null,
        }
    },
    methods:{
         /**@function 简化部门名称 */
            abbrDepName(depName){
                let _depName = depName;
                switch(depName){
                    case '机电学部':
                        _depName = "机电";
                        break;
                    case '教学管理处':
                        _depName = "教学";
                        break;
                    case '教师发展处':
                        _depName = '教师'
                        break;
                    case '经贸学部':
                        _depName = "经贸";
                        break;
                    case '体育艺术学部（筹）':
                        _depName = "体艺";
                        break;
                    case '幼师学部':
                         _depName = "幼师";
                        break;
                    case '校长办公室':
                        _depName = "校办";
                        break;
                    case '物业办公室':
                        _depName = "物业";
                        break;
                    case '安全保卫处':
                        _depName = "安保";
                        break;
                    case '学生管理处':
                        _depName = "学生";
                        break;
                    case '学生发展处':
                        _depName = "学生";
                        break;
                    case '交通学部':
                        _depName = "交通";
                        break;
                    case '信息学部':
                        _depName = "信息";
                        break;
                    case '团委':
                        break;
                    case '文印室':
                        _depName = '文印';
                        break;
                    case '医务室':
                        _depName = '医务';
                        break;
                    case '后勤服务处':
                        _depName = "后勤";
                        break;
                    case '财务室':
                        _depName = '财务'
                        break;
                    case '质量监控处':
                        _depName = "质监";
                        break;
                    case '工会':
                        break;
                    case '其它部门':
                        _depName = "其它";
                        break;
                    case '社会合作交流处':
                        _depName = "社合";
                        break;
                    case '图书馆':
                        _depName = '图书';
                        break;
                    case '食堂':
                        break;
                    case '心灵家园':
                        _depName = "心理";
                        break;
                }
                return _depName;
            }, 
            /**@param 改变props值的数据组织形式，便于图表显示 */
            convertProps(){
                this.quantityList = [];
                this.depNameList = [];
                //let quantityList = [];
                let moneyList = [];
                this.moneyList = [];
                this.departmentList.forEach(dep => {
                    //quantityList.push(dep.count);
                    moneyList.push(dep.sum);
                });
                //quantityList = quantityList.sort(function(x,y){return(y-x)});
                moneyList = moneyList.sort(function(x,y){return(y-x)});
                let top10 = 0;//取前十大领用金额的处室
                moneyList.forEach( money => {
                    this.departmentList.forEach(dep => {
                    if(money == dep.sum){
                        this.quantityList.push(dep.count);
                        this.moneyList.push(dep.sum);
                        this.depNameList.push(dep.departmentname)
                    }
                });
                })
            }
            
        },
         watch:{
            departmentList:function(){
                this.convertProps();
            }
        },
        mounted(){
            this.convertProps();
        },
    computed:{
        maxQuantity:function(){
            return Math.max.apply(null,this.quantityList);
        },
        maxAmount:function(){
            return Math.max.apply(null,this.moneyList);
        }
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .bar-chart{
        background-color:#fff;
        height:px2rem(158px);
        margin-bottom:px2rem(2px);
        padding:0 px2rem(40px);
    }
    .dep-name{
        font-size:px2rem(28px);
        color:#1c2639;
        height: px2rem(48px);
        line-height: px2rem(48px);
    }
    .amount-of-money{
        font-size:px2rem(24px);
        color:#b4b6bb;
        height: px2rem(50px);
        line-height: px2rem(50px);
        display:flex;
    }
    .amount-of-money span{
        margin-right:px2rem(10px);
    }
    .bar{
        align-self: center;
        width:px2rem(100px);
        border-radius: px2rem(12px);
        background-color:#5c9dff;
        height:px2rem(24px);
    }
    .money{
        color:#5c9dff;
    }
    .money-txt{
        color:#fe7950!important;
    }
    .money-bar{
        background-color:#fe7950!important;
    }
</style>


