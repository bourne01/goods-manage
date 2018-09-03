<template>
    <div class="">
        <li @click="ctrlItemDetail(index,goodsItem)">
            <span>{{opTime}}</span>
            <!-- <span>{{goodsItem.Amount}}</span> -->
            <span>{{repositoryName}}</span>
        </li>
        <li class="item-detail" 
            v-if="curIndex==index"
            >
            <item-detail 
                :goods-detail="goodsItemDetail" 
                :amount="goodsItem.Amount"></item-detail>
        </li>      
    </div>
</template>

<script>
import itemDetail from './goods-item-detail'
//import Loading from 'vux/src/components/loading'
export default {
    components:{
        itemDetail,
        //Loading,
    },
    props:['is-recipient','index','goods-item'],
    data(){
        return{
            curIndex:null,
            opTime:'',//领用或退库发生的日期
            repositoryName:'',//仓库名称
            goodsItemDetail:[],//物品明细列表
        }
    },
    methods:{
        /**@function 监听点击领用物品记录，控制领用物品是否展开详情 */
        ctrlItemDetail(index,goodsItem){
            if(!this.curIndex){
                //this.showLoading();                  
                this.getItemDetail(goodsItem.id,index);
            }else{
                this.curIndex = null;
            }
        },
        /**@function 获取领用或退库物品详情 
         * @param {领用或退库物品Id} goodsId
        */
        getItemDetail(goodsId,index){
            let url,params;
            if(this.isRecipient){//退库
                url = '../getreturn_items.do';
                params = {returnid:goodsId};
            }else{//领用
                url = '../getreceive_items.do';
                params = {receiveid:goodsId};
            }
            this.$http(url,{params})
                .then(res => {
                    if(res.data.success){
                        this.goodsItemDetail = res.data.datalist;
                        this.curIndex = index;
                    }else{
                        //this.$vux.loading.hide();
                        this.$msgbox('','获取物品明细失败！',1000);
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
        /**@function 点击查看详情后，显示'正在获取物品详情...' */
        showLoading () {
            this.$vux.loading.show({
            text: '正在获取物品详情...'
            })
        },
    },
    mounted(){
        if(this.isRecipient){
            this.opTime = this.goodsItem.return_time.split(' ')[0];
            this.repositoryName = this.goodsItem.repositoriesname

        }else{
            this.opTime = this.goodsItem.receive_time.split(' ')[0];
            this.repositoryName = this.goodsItem.repositoriename
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
    li span:first-child,li span:last-child{
        width:30%;
    }  
</style>

