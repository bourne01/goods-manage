<template>
    <div>
        <my-header>
            <div class="left" slot="left" @click="goBack">
                <img :src="require('../../assets/backward.jpg')" alt="">
            </div>
            <div class="center" slot="center">
                <span class="recipient-txt" :class="{typeActive:!isActive}" @click="recipientManage">领用管理</span><span class="return-txt" :class="{typeActive:isActive}" @click="returnManage">退库管理</span>
            </div>            
            <div class="right" slot="right"></div>
        </my-header>
        <div class="main">
            <div class="outline">汇总信息：共{{isActive?'退库':'领用'}}<span>{{totalQuantity}}</span>件物品<!--共计{{totalAmount}}元--></div>
            <div class="filter-by-date">
                <month-selector 
                    @date-time="getDateTime" 
                    :year="year.yearId" 
                    :exception="exception"
                    :is-tab="isActive"></month-selector>
            </div>
            <ul>
                <li>
                    <span>日期</span>
                    <!-- <span>金额</span> -->
                    <span class="repoistory">
                        <popup-radio 
                            :options="reposNameList" 
                            v-model="repository" 
                            :placeholder="'后勤管理处仓库>'"
                            @on-hide="onHide">
                        </popup-radio>                       
                    </span>
                    <!-- <span>用途<img :src="require('../../assets/dropdown.png')"></span> -->
                </li>
                <div :style="objItems">
                    <goods-item 
                        v-for="(item,index) in goodsItems" 
                        :index='index+1' 
                        :key="index"
                        :goods-item="item"
                        :is-recipient="isActive">
                    </goods-item>
                    <div v-if="isEmpty" style="text-align:center;color: #6b6f75;">
                        暂无数据
                    </div>
                </div>
                
            </ul>
        </div>
    </div>
</template>

<script>
import MyHeader from '../../components/base/my-header'
import GoodsItem from './goods-item'
import MonthSelector from '../base/month-selector'
import PopupRadio from 'vux/src/components/popup-radio/index.vue'
import { Z_NO_FLUSH } from 'zlib';
export default {
    components:{
        MyHeader,
        GoodsItem,
        MonthSelector,
        PopupRadio
    },
    data(){
        return{
            isActive:false,//控制当前是领用管理(false)还是退库管理(true)
            totalAmount:0,//总金额
            totalQuantity:0,//领用总数量
            goodsItems:[],
            objItems:{height:'',overflow:'scroll'},
            year:'',//要查看的年度领用或退库物品
            isEmpty:false,
            reposNameList:[],//仓库名称列表
            reposList:[],//所有仓库列表
            repository:'',//当前仓库名称
            reposId:null,//当前仓库Id
            curDate:{},//当前日期
            user:{},//当前用户
            exception:'',//当获取物品发生异常时，设置该值
        }
    },
    methods:{
        /**@function 返回 */
        goBack(){
            history.go(-1);
        },
        /**@function 监听点击领用管理事件*/
        recipientManage(){
            this.isActive = false;
            this.getGoodsList({
                startDt:new Date(this.year.yearId+'/01/01 00:00:00').getTime(),
                endDt:new Date(this.year.yearId+'/12/31 00:00:00').getTime(),
                },this.reposId,this.user.userid);
        },
        /**@function 监听点击退库管理事件*/
        returnManage(){
            this.isActive = true;
            this.getGoodsList({
                startDt:new Date(this.year.yearId+'/01/01 00:00:00').getTime(),
                endDt:new Date(this.year.yearId+'/12/31 00:00:00').getTime(),
                },this.reposId,this.user.userid);
        },
        /**@function 获取用户选择的时间 */
        getDateTime(dt){
            this.curDate = dt;
            console.log(dt);
            this.getGoodsList(dt,this.reposId,this.user.userid)
        },
        /**@function 获取本年度领用或退库物品 */
        getGoodsList(dt,reposId,userId){
            let url;
            if(this.isActive){
                url = '../getwpreturnmainlist.do';
            }else{
                url = '../getwpreceivemainlist.do';
            }
            let params = {
                    startDt:dt.startDt,
                    endDt:dt.endDt,
                    year:dt.year,
                    months:dt.months,
                    reposid:reposId,
                    userid:userId
                }
            this.$http(url,{params})
             /* this.$http.post( url,require('qs').stringify(params)) */
                .then(res=>{
                    console.log(res.data)
                    if(res.data.success){
                        this.isEmpty = false;
                        this.goodsItems = res.data.datalist;
                        if(this.isActive){//退库总额
                            this.totalAmount = res.data.returnsum;
                            this.totalQuantity = res.data.returnqsum;
                        }else{//领用总额
                            this.totalAmount = res.data.receiversum;
                            this.totalQuantity = res.data.receiverqsum;
                        } 
                    }else{
                        this.goodsItems = [];
                        this.totalAmount = 0;
                        this.totalQuantity = 0;
                        switch(res.data.type){
                            case 1://缺少参数
                                this.$msgbox('',res.data.message,2000);
                                break;
                            case 2://记录不存在
                                this.isEmpty = true;
                                break;
                            case 3://发生异常
                                this.$msgbox('','发生异常',1000);
                                this.exception = Math.random();
                                console.log(res.data.message);
                                break;
                        }
                    }
                })
                .catch(err=>{
                    this.reqErrorHandler(err);
                })
        },
        /**@function 获取仓库列表 */
        getRepositoryList(){
            let url = '../listsrepositories.do';
            let params = {};
            this.$http(url,{params})
                .then(res => {
                    console.log(res);
                    if(res.data.success){
                        this.reposList = res.data.datalist;
                         this.reposNameList = [];
                        for(let key in this.reposList)
                            this.reposNameList.push(this.reposList[key].reposname)
                    }
                })
                .catch(err => {
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
        },
        /**@function 监听列表隐藏事件，获取对应的仓库Id */
        onHide(){
            for(let key in this.reposList){
                if(this.reposList[key].reposname == this.repository){
                    this.reposId = this.reposList[key].id;
                    this.getGoodsList(this.curDate,this.reposId,this.user.userid)
                    this.repository = this.repository + '>';
                    break;
                }
            }
        }
    },
    created(){
        this.year = this.$route.query;
        this.curDate = {year:this.year}
        this.user = JSON.parse(sessionStorage.getItem('User'));
        this.getGoodsList({
                startDt:new Date(this.year.yearId+'/01/01 00:00:00').getTime(),
                endDt:new Date(this.year.yearId+'/12/31 00:00:00').getTime(),
                },null,this.user.userid);
        this.getRepositoryList();
    },
    mounted(){
        let weuiCell = document.querySelector('.repoistory .weui-cell');
        weuiCell.style.padding = 0;
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
        let tbodyHeight = htmlHeight - (182*htmlWidth/375) + 'px';     
        this.objItems.height = tbodyHeight;
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .left img{
        vertical-align: middle;
        width:px2rem(20px);        
    }
    .center span{
        color:#fff;
        line-height: px2rem(50px);
        height:px2rem(50px);
        display:inline-block;
        border:1px solid #fff;
        margin:0;
        padding-left:px2rem(40px);
        padding-right:px2rem(40px);
        font-size:px2rem(24px);
    }
    .recipient-txt{
        border-top-left-radius: px2rem(25px);
        border-bottom-left-radius: px2rem(25px);
    }
    .return-txt{
        border-top-right-radius: px2rem(25px);
        border-bottom-right-radius: px2rem(25px);
    }
    .typeActive{
        color:#5c9dff!important;
        background-color:#fff;
    }
    .outline{
        background-color:#f6f9fb;
        color:#6b6f75;
        height:px2rem(58px);
        line-height:px2rem(58px);
        padding-left:px2rem(40px);
        font-size:px2rem(28px);
        margin-bottom:px2rem(11px);
    }
    li{
        display:flex;
        justify-content: space-between;
        font-size:px2rem(28px);
        color:#1c2639;
        padding-left:px2rem(40px);
        padding-right:px2rem(40px);
        margin-bottom:px2rem(11px);
        background-color:#fff;
        height: px2rem(98px);
        line-height: px2rem(98px);
    }
    li:first-child{
        background-color:#f6f9fb;
        color:#6b6f75;
        height:px2rem(58px);
        line-height:px2rem(58px);
        padding-right:px2rem(26px);
        font-size:px2rem(24px);
    }
    li img{
        vertical-align: middle;
        width:px2rem(50px);
    }
    li span:first-child,li span:last-child{
        width:30%;
    }    
</style>

