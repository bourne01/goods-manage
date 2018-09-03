<template>
    <div class="personal-info">        
        <div style="display:flex;">
            <img :src="require('../assets/logo.jpg')" class="avatar">
            <div class="personal-info-txt">
                <span class="teacher-name">温州市职业中等专业学校</span>
                <span >姓名：{{user.nickname}}</span>
                <span>工号：{{user.username}}&nbsp;&nbsp;&nbsp;部门：{{user.departmentname}}</span>
                <!-- <span>部门：{{user.departmentname}}</span> -->
            </div>
        </div>
        <!-- <img :src="require('../assets/forward.png')" class="forward"> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{},
        }
    },
    methods:{
        /**@function 获取用户信息 */
        getUserInfo(){
            let url = '../getUserInfo.do';
            let params = {};
            this.$http(url,{params})
                .then(res => {
                    console.log(res)
                    if(res.data.success){
                        this.user = res.data;
                        this.$emit('user-info',this.user);
                        sessionStorage.setItem('User',JSON.stringify(this.user));
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
        }
    },
    created(){
        this.getUserInfo();
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

