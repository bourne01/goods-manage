<template>
    <div class="personal-info">        
        <div style="display:flex;">
            <img :src="require('../../assets/logo.jpg')" class="avatar">
            <div class="personal-info-txt">               
                <span class="teacher-name">姓名：{{user.nickname}}</span>
                <span>工号：{{user.username}}&nbsp;&nbsp;&nbsp;部门：{{user.departmentname}}</span>
                <!-- <span class="balance">余额：￥246.2</span> -->
            </div>
        </div>
        <!-- <img :src="require('../../assets/forward.png')" class="forward"> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{},//当前登录的用户
        }
    },
    methods:{

    },
    mounted(){
        this.user = JSON.parse(sessionStorage.getItem('User'));
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .personal-info{
        padding-top:px2rem(40px);
        font-size:px2rem(24px);
        color:#6b6f75;
        display:flex;
        justify-content: space-between;
        height:px2rem(188px);
        padding:px2rem(40px)  px2rem(40px) 0;
        background-color:#fff;
        margin-bottom:px2rem(20px);
    }
    .personal-info-txt{
        display:flex;
        flex-direction: column;
        margin-left:px2rem(20px);
        width:px2rem(400px);
        padding-top:0.5em;  
    }
    .teacher-name{
        font-size: px2rem(28px);
        color:#000;
        margin-bottom: px2rem(10px);
    }
    .avatar{
        display:inline-block;
        width:px2rem(108px);
        height:px2rem(108px);
        border-radius:px2rem(54px);
        background-size:cover;
    }
    .balance{
        color:#5c9dff;
        margin-top:px2rem(10px);
        font-size:px2rem(28px);
    }
    .forward{
        width:px2rem(70px);
        height:px2rem(70px);
        margin-right:px2rem(-20px);
        margin-top:2em;
    }
</style>

