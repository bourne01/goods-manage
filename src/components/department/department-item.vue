<template>
    <div class="">
        <li @click="goToDetail(index,goodsItem)">
            <span>{{opUser}}</span>
            <span>{{goodsItem.Amount}}</span>
            <span>{{goodsItem.Aquantity}}</span>
        </li>
        <!-- <li class="item-detail" 
            v-if="curIndex==index"
            >
            <item-detail 
                :goods-detail="goodsItemDetail" 
                :amount="goodsItem.Amount"></item-detail>
        </li>  -->     
    </div>
</template>

<script>
/* import itemDetail from './goods-item-detail' */
//import Loading from 'vux/src/components/loading'
export default {
    components:{
        //itemDetail,
        //Loading,
    },
    props:['is-recipient','index','goods-item','current-date'],
    data(){
        return{
            curIndex:null,
            opTime:'',//领用或退库发生的日期
            repositoryName:'',//仓库名称
            goodsItemDetail:[],//物品明细列表
            opUser:'',//领用或退库的用户
            opUserId:'',//领用或退库的用户Id
        }
    },
    methods:{
        /**@function 跳转到某个部门号明细 */
        goToDetail(){
            console.log(this.currentDate);
            this.$router.push({path:'/department-goods-item',
                query:{isRecipient:this.isRecipient,
                        opUserId:this.opUserId,
                        curDate:JSON.stringify(this.currentDate)}})
        },        
    },
    mounted(){
        if(this.isRecipient){
            this.opTime = this.goodsItem.return_time.split(' ')[0];
            this.repositoryName = this.goodsItem.repositoriesname;
            this.opUser = this.goodsItem.reutnernickname;
            this.opUserId = this.goodsItem.returner_id;

        }else{
            this.opTime = this.goodsItem.receive_time.split(' ')[0];
            this.repositoryName = this.goodsItem.repositoriename
            this.opUser = this.goodsItem.receivernickname;
            this.opUserId = this.goodsItem.receiver_id;
        }
            
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
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
    li img{
        vertical-align: middle;
        width:px2rem(50px);
    }
    li.item-detail{
        height:inherit;
        padding:0;
    }
    li span{
        width:20%;
    }
    li span:first-child,li span:last-child{
        width:30%;
    } 
</style>

