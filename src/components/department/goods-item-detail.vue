<template>
    <div class="item-detail">
        <table>
            <thead>
                <tr>
                    <th class="title-name">名称</th>
                    <th class="quantity">数量/单位</th>
                    <th class="price">单价</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(detail,index) in goodsDetail" :key="index">
                    <td class="goods-name">
                        <span>[{{detail.code}}]{{detail.productsname}}</span>
                        <span>规格：{{detail.spec}}&nbsp;&nbsp;品牌：{{detail.brand}}</span>
                        <!-- <span>类别：卫生用品</span> -->
                    </td>
                    <td>{{detail.quantity|removeMinus}}{{detail.unit}}</td>
                    <td>{{detail.get_price}}</td>
                </tr>
                <tr class="sum">
                    <td colspan="1">
                        <span>合计：<span class="unit">RMB</span></span>                        
                    </td>
                    <td colspan="2"><span>￥{{amount}}</span></td>
                </tr>    
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props:['goods-detail','amount'],
    data(){
        return{

        }
    },
    methods:{

    },
     filters:{
        removeMinus:function(val){
            let str = val.toString();
            if(str.substr(0,1) === '-'){
                return str.substr(1);
            }else{
                return val;
            }
        }
    },
    mounted(){
        console.log(this.amount);
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    table{
        border-collapse:collapse;
        width:100%;
        border:1px solid #eff2f4;
        position: relative;
        top:px2rem(-20px);        
    }
    .title-name{
        padding-left:px2rem(40px);
    }
    th{
        background-color:#f6f9fb;
        font-size:px2rem(24px);
        height:px2rem(57px);
        line-height: px2rem(57px);
        border-bottom:1px solid #eff2f4;
        color:#8e9297;  
    }
    .quantity{
        width:px2rem(150px);
    }
    .price{
        width:px2rem(120px);
    }
    .goods-name{
        display:flex;
        flex-direction: column;
        padding-left:px2rem(40px);
        color:#b4b6bb;
    }
    .goods-name span:first-child{
        color:#000;
    }
    .goods-name span{
        width:px2rem(440px);
        line-height: 2em;
    }
    .unit{
        color:#b4b6bb;
    }
    .sum td{
        background-color:#f6f9fb;
        font-size:px2rem(24px);
        height:px2rem(57px);
        line-height: px2rem(57px);
        padding-left:px2rem(40px);        
    }
    .sum td:last-child{
        padding-right:px2rem(40px);
        text-align: right;
    }
    
</style>

