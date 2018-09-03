<template>
    <div>
        <my-header>
            <div class="left" slot="left" @click="goBack">
            </div>
            <div class="center" slot="center">
                领物印刷耗材管理查询系统
            </div>            
            <div class="right" slot="right"></div>
        </my-header>
        <div class="main">
            <user-info @user-info="getUserInfo"></user-info>       
            <div>
                <ul>
                    <li>
                        <span class="goto" @click="goTo(1)">
                            <span>教师个人查询</span>
                            <img :src="require('../assets/forward.png')" class="forward">
                        </span>
                    </li>
                    <li>
                        <span class="goto"  @click="goTo(2)">
                            <span>部门汇总查询</span>
                            <img :src="require('../assets/forward.png')" class="forward">
                        </span>
                    </li>
                    <li>
                        <span class="goto"  @click="goTo(3)">
                            <span>校级统计查询</span>
                            <img :src="require('../assets/forward.png')" class="forward">
                        </span>
                    </li>
                </ul>
            </div>
        </div><!-- href="http://my.wzzyzz.com/logout" -->
        <a class="logout" @click="logout" >退出系统</a>       
    </div>
</template>

<script>
import UserInfo from './user-info';
import MyHeader from './base/my-header' 
export default {
    components:{
        UserInfo,
        MyHeader,        
    },
    data(){
        return{
            yearList:[],
            objTbody:{height:'',overflow:'scroll'},
            user:{},//用户信息
        }
    },
    methods:{
        /**@function 根据用户权限跳转到相应页面 
         * 
        */
        goTo(power){            
            let url = '';
            switch(power){
                case 1://普通教师
                    url = '/teacher';
                    break;
                case 2://部门领导
                    if(this.user.power > 1){
                        url = '/department';
                    }else{
                        this.$msgbox('','您无权限访问部门汇总信息',1000)
                    }
                    break;
                case 3://校级领导
                    if(this.user.power > 2){
                        url = '/leader';
                    }else{
                        this.$msgbox('','您无权限访问校级统计信息',1000)
                    }
                    break;
            }
            this.$router.push(url);
        },
        /**@function 监听来自子组件的用户信息 */
        getUserInfo(user){
            this.user = user;
        },
        /**@function 注销系统 */
        logout(){
            let url = '../myloginout.do';
            let params = {};
            this.$http(url,{params})
                .then(res => {
                    console.log(res)
                    location.href = 'http://my.wzzyzz.com/logout'
                })
                .catch(err => {
                    location.href = 'http://my.wzzyzz.com/logout'
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
        //this.getYears();
    },
    mounted(){
        let htmlHeight = document.documentElement.clientHeight || document.body.clientHeight;
        let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
        let tbodyHeight = htmlHeight - (203*htmlWidth/375) + 'px';
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
   
    ul{
        background-color:#fff;
        margin-top:px2rem(40px);
    }

    .goto{
        font-size:px2rem(28px);        
        height:px2rem(78px);
        margin-left:px2rem(40px);
        margin-right:px2rem(40px);
        color:#000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom:1px solid #eff2f4;
    }
    .forward{
        width:px2rem(50px);
        height:px2rem(50px);
    }
    .logout{
        display: block;
        margin:px2rem(50px) px2rem(40px);
        background-color:#fff;
        font-size:px2rem(28px);
        color:#000;
        text-decoration: none;
        height:px2rem(78px);
        line-height: px2rem(78px);
        text-align: center; 
        border:1px solid #eff2f4;
        border-radius: px2rem(39px);  
    }
</style>

