<template>
    <div>
        <my-header>
            <div class="left" slot="left" @click="goBack">
                <img :src="require('../../assets/backward.jpg')" alt="">
            </div>
            <div class="center" slot="center">
                教师个人查询
            </div>            
            <div class="right" slot="right"></div>
        </my-header>
        <div class="main">
            <personal-info></personal-info>       
            <div :style="objTbody">
                <div class="year-goods-wrap">
                    <year-goods 
                    v-for="(year,index) in yearList" 
                    :key="index"
                    :year="year"
                    ></year-goods>
                </div>
            </div>
        </div>       
    </div>
</template>

<script>
import PersonalInfo from './personal-info';
import MyHeader from '../../components/base/my-header'
import YearGoods from './goods-item-by-year'
export default {
    components:{
        PersonalInfo,
        MyHeader,
        YearGoods
    },
    data(){
        return{
            objTbody:{height:'',overflow:'scroll'},
            yearList:[],
        }
    },
    methods:{
        /**@function 返回 */
        goBack(){
            history.go(-1);
        },
        /**@function 获取年份列表 */
        getYears(){
            let url = '../getyears.do';
            let params = {};
            this.$http(url,{params})
                .then(res=>{
                    if(res.data.success){
                        this.yearList = res.data.data;
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
        this.getYears();
    },
    mounted(){
        let htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let tbodyHeight = htmlHeight - (242*htmlWidth/375) + 'px';       
        this.objTbody.height = tbodyHeight;
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
    .year-goods-wrap{
        display: flex;
        flex-wrap:wrap;
        justify-content: space-between;
        padding-right:px2rem(40px);
        padding-left:px2rem(40px);
    }
</style>

