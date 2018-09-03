<template>
    <div>
        <my-header>
            <div class="left" slot="left" @click="goBack">
                <img :src="require('../../assets/backward.jpg')" alt="">
            </div>
            <div class="center" slot="center">
                部门数据统计图表
            </div>            
            <div class="right" slot="right"></div>
        </my-header>
        <div class="main" >
           <div class="filter-by-date">
                <month-selector 
                    @date-time="getDateTime" 
                    :year="year" 
                    :exception="exception"
                    ></month-selector>
            </div>
            <div :style="objChart">
                <line-chart :department-list="departmentList" v-if="isEmpty" ></line-chart>
                <pie-chart :department-list="departmentList" v-if="isEmpty" ></pie-chart>
                <bar-chart  :department-list="departmentList" v-if="isEmpty" >></bar-chart>
                <div v-if="!isEmpty" style="text-align:center;color: #6b6f75;">
                    {{tips}}
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
import MyHeader from '../base/my-header'
import LineChart from './line-chart'
import BarChart from './horizonal-bar'
import PieChart from './pie-chart'
import MonthSelector from '../base/month-selector'
export default {
    props:['year'],
    components:{
        MyHeader,
        MonthSelector,
        LineChart,
        PieChart,
        BarChart,
    },
    data(){
        return{
            departmentList:[],//部门列表
            objChart:{height:'',overflow:'scroll'},
            year:'',
            //year:(new Date()).getFullYear(),//要查看的本年度领用或退库物品
            isEmpty:true,
            tips:'暂无数据',
            exception:'',
        }
    },
    methods:{
        /**@function 返回 */
        goBack(){
            history.go(-1);
        },
        /**@function 获取用户选择的时间 */
        getDateTime(dt){
            console.log(dt);
            //dt.year = this.year;
            if(!dt.startDt && !dt.endDt){//来自月份，则添加年份
                dt.year = this.year
            }
            this.getGoodsList(dt);
        },
        /**@function 获取本年度领用或退库物品 */
        getGoodsList(dt){
            let url = '../getschoollist.do';           
            let params = {
                    startDt:dt.startDt,
                    endDt:dt.endDt,
                    year:dt.year,
                    months:dt.months,
                }
            this.$http(url,{params})
                .then(res=>{
                    //console.log(res.data)
                    if(res.data.success){
                        this.isEmpty = true;
                        this.departmentList = res.data.datalist;                    
                    }else{
                        this.departmentList = [];
                        this.isEmpty = false;
                        switch(res.data.type){
                            case 1://缺少参数
                                this.$msgbox('',res.data.message,2000);
                                this.tips = '';
                                break;
                            case 2://记录不存在
                                //this.$msgbox('',res.data.message,2000);
                                this.tips = '暂无数据';
                                break;
                            case 3://发生异常
                                this.$msgbox('','发生异常',1000);
                                this.exception = Math.random();
                                this.tips = '';
                                console.log(res.data.message);
                                break;
                        }
                    }
                })
                .catch(err=>{
                    this.reqErrorHandler(err);
                        
                })
        },
        /**@function Ajax请求错误处理 */
        reqErrorHandler(err){
            console.log(err);
            if(err.reponse){
                let errResStatus = err.response.status; 
                if(errResStatus == 500 && errResStatus == 504){
                    this.$msgbox('网络异常','请稍后重试！',2000);
                }else if(errResStatus == 404){
                    this.$msgbox('404错误','请求的页面不存在',1000)
                }else if(errResStatus == 0){
                    location.reload();
                }else if (errResStatus === 302) {
                    console.log(302);
                }
            }
        }
    },
    created(){
        this.year = this.$route.query.yearId;
        this.getGoodsList({
                startDt:new Date(this.year+'/01/01 00:00:00').getTime(),
                endDt:new Date(this.year+'/12/31 00:00:00').getTime(),
                });
    },
    mounted(){
        let weuiCellFt = document.querySelectorAll('.date-time-wrap .weui-cell__ft');
        weuiCellFt.forEach(element => {
            element.style.textAlign = 'left';
            element.style.color = 'inherit';
        })
        let weuiCell2 = document.querySelectorAll('.date-time-wrap .weui-cell');
        weuiCell2.forEach(element => {
            element.style.padding = 0;
        });
        let htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let tbodyHeight = htmlHeight - (113*htmlWidth/375) + 'px';     
        this.objChart.height = tbodyHeight;
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .center{
        color:#fff!important;
    }
    .left img{
        vertical-align: middle;
        width:px2rem(20px);        
    }
</style>

