<template>
    <div class="month-selector">
        <div class="month-checker">
            <checker 
                v-model="months" type="checkbox" 
                default-item-class="default-item" selected-item-class="item-selected"
                @on-change="onMonthChange"
                >
                <checker-item :value="1" class="check-item">{{ '1月'}}</checker-item>
                <checker-item :value="2" class="check-item">{{ '2月' }}</checker-item>
                <checker-item :value="3" class="check-item">{{ '3月'}}</checker-item>
                <checker-item :value="4" class="check-item">{{ '4月'}}</checker-item>
                <checker-item :value="5" class="check-item">{{ '5月' }}</checker-item>
                <checker-item :value="6" class="check-item">{{ '6月'}}</checker-item>
                <div class="divider"></div>
                <checker-item :value="7" class="check-item">{{ '7月'}}</checker-item>
                <checker-item :value="8" class="check-item">{{ '8月' }}</checker-item>
                <checker-item :value="9" class="check-item">{{ '9月'}}</checker-item>
                <checker-item :value="10" class="check-item">{{ '10月'}}</checker-item>
                <checker-item :value="11" class="check-item">{{ '11月' }}</checker-item>
                <checker-item :value="12" class="check-item">{{ '12月'}}</checker-item>
            </checker>
        </div>
        <div class="date-time-wrap">
            <datetime
                v-model="startTime"
                :title="'起：'"
                @on-change="onSTimeChange"
                class="date-time">
            </datetime>
            <datetime
                v-model="endTime"
                :title="'止：'"
                @on-change="onETimeChange"
                class="date-time">
           </datetime>
        </div>
        
    </div>
</template>

<script>
import { Checker,CheckerItem,Datetime } from 'vux'
export default {
    props:['year','exception','is-tab'],
    components:{
        Checker,
        CheckerItem,
        Datetime,
        },
    data(){
        return{
            months:[],//要查询的月份列表
            startTime:'',//查询的起始时间
            endTime:'',//查询的截止时间
            //curMonth:(new Date()).getMonth(),//当前月份
            isException:false,//判断是否发生异常，发生则置为true
            _isTab:false,//
        }
    },
    methods:{
        /** @function 监听点击月份事件，按月份查询*/
        onMonthChange(){
            console.log(this.months);
            if(this.isException){//发生异常,不发送Ajax请求
                this.isException = false;
                return;
            }
            if(this._isTab){//领用和退库发生切换,不发送因月份调整而Ajax请求
                this._isTab = false;
                return;
            }
            this.$emit('date-time',{
                                    year:this.year,
                                    startDt:null,
                                    endDt:null,
                                    months:this.months.toString()})
        },
        
        /**@function 监听起始时间是否发生改变*/
        onSTimeChange(value){
            if(value == '请选日期'){//获取物品异常时处理
                return;
            }
            let [sYear,sMonth,sDay] = value.split('-');
            let [eYear,eMonth,eDay] = this.endTime.split('-');
            if(sYear > eYear){
                this.$msgbox('发生错误','起始年份大于截止年份',2000);
                return;
            }
            if(sYear == eYear && sMonth > eMonth){
                this.$msgbox('发生错误','起始月份大于截止月份',2000)
                return;
            }
            if(sYear == eYear && sMonth == eMonth && sDay > eDay){
                this.$msgbox('发生错误','起始日大于截止日',2000)
                return;
            }            
            this.$emit('date-time',{
                                    year:null,
                                    startDt:new Date(sYear+'/'+sMonth+'/'+sDay+' 00:00:00').getTime(),
                                    endDt:new Date(eYear+'/'+eMonth+'/'+eDay+' 00:00:00').getTime(),
                                    months:null})
        },
        /**@function 监听截止时间是否发生改变*/
        onETimeChange(value){
            if(this.startTime == '请选日期'){
                this.$msgbox('','请先选择起始日期',2000)
                return;
            }
            let [sYear,sMonth,sDay] = this.endTime.split('-');
            let [eYear,eMonth,eDay] = value.split('-');
            if(sYear > eYear){
                this.$msgbox('发生错误','起始年份大于截止年份',2000);
                return;
            }
            if(sYear == eYear && sMonth > eMonth){
                this.$msgbox('发生错误','起始月份大于截止月份',2000)
                return;
            }
            if(sYear == eYear && sMonth == eMonth && sDay > eDay){
                this.$msgbox('发生错误','起始日大于截止日',2000)
                return;
            }
            this.$emit('date-time',{
                                    year:null,
                                    startDt:new Date(sYear+'/'+sMonth+'/'+sDay+' 00:00:00').getTime(),
                                    endDt:new Date(eYear+'/'+eMonth+'/'+eDay+' 00:00:00').getTime(),
                                    months:null})
        },
        /**@function 获取当前日期YYYY-MM-DD */
        _getDate(){
            let dt = new Date();
            return dt.getFullYear()+'-'+
                    ((dt.getMonth()+1)<10?'0'+(dt.getMonth()+1):(dt.getMonth()+1))+'-'+
                    (dt.getDate()<10?'0'+dt.getDate():dt.getDate());
        }
    },
    watch:{
        /**@function 发生异常，则初始化样式 */
        exception:function(){
            console.log('Exception');
            this.isException = true;
            this.months = [];
            this.startTime = '请选日期';
            this.endTime = this._getDate();
        },
        /**@function 检测用户是否点击领用或退库按钮，
         * 如点击，则清除月份样式和日期样式
         * */
        isTab:function(){
            this.months = [];
            this.startTime = '请选日期';
            this.endTime = this._getDate();
            this._isTab = true;
        }
    },
    created(){
        //this.curMonth = {id:null,name:dt.getFullYear()+'年'+dt.getMonth()+'月'}
        /* this.startTime =  */
        this.startTime = '请选日期'
        this.endTime = this._getDate();
    }
}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .month-selector{
        display: flex;
        height:px2rem(116px);
        //line-height:px2rem(116px);
        font-size:px2rem(28px);
        background-color:#fff;
        color:#5c9dff;
        margin-bottom:px2rem(10px);
        padding-left:px2rem(40px);
        padding-right:px2rem(40px);
        justify-content: space-between;
    }
    .month-checker{
        align-self: center;
    }
    .month-selector span{
        margin-right:px2rem(10px);
        display: inline-block;
        line-height: 1.5em;
        border-radius: px2rem(4px);
        padding:px2rem(2px);
    }
    img{
        height:px2rem(30px);
        vertical-align: middle;       
    }
    .default-item{
        border: 1px solid #5c9dff;
        border-radius: px2rem(4px);
    }
    .item-selected,.activeMonth{
        border: 1px solid green;
        background-color:#5c9dff;
        color:#fff;
    }
    .check-item{
        width:px2rem(66px);
        text-align: center;
    }
    .divider{
        margin-bottom:px2rem(10px);
    }
    .date-time-wrap{
       display:flex;
       flex-direction: column;
       justify-content: center;
       border:1px solid #5c9dff;
       border-radius:px2rem(8px); 
       padding:0 px2rem(2px);
       margin-top:px2rem(5px);
       margin-bottom:px2rem(5px);
       width:px2rem(198px);
       box-sizing: border-box;
    }
    .date-time{
        font-size:px2rem(24px);
        color:#5c9dff;
        //border:1px solid #5c9dff;
        //padding:px2rem(4px);
        //border-radius:px2rem(8px); 
        text-align: center;
    }
    .date-time:first-child{
        border-bottom: 1px solid #5c9dff;
    }
    .date-time-wrap a{
        display:flex;
    }
    .monthActive{
        color:#fff;
        background-color:#5c9dff;
    }
</style>
