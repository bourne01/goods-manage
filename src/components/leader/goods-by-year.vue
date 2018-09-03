<template>
    <div class="year-goods" @click="goItemDetail">
        <span>{{year.name}}</span>
        <span>数据查询</span>
    </div>
</template>

<script>
export default {
    components:{
        
    },
    props:['year'],
    data(){
        return{
            years:0,//共有几年
        }
    },
    methods:{
        /**@function 跳转本年度详情页*/
        goItemDetail(){
            this.$router.push({path:'goods-chart',query:this.year});
        }
    },
    mounted(){
        
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .year-goods{
        height:px2rem(200px);
        width:px2rem(200px);
        display: flex;
        flex-direction: column;
        align-items: center;
        //border:1px solid #5c9dff;   
        justify-content: center;
        margin-top:px2rem(35px);
        box-sizing: border-box;
        color:#fff;
        background-color:#5c9dff; 

    }
    .year-goods span{
        height:1.5em;
        font-size:px2rem(30px);
    }
</style>

