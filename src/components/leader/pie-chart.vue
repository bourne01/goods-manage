<template>
    <div class="pie-chart">
        <schart class="wrapper" :canvasId="canvasId" :type="type" :data="data" :options="options"></schart>
    </div>
</template>
<script>
import Schart from 'vue-schart';
	export default {
        props:['department-list'],
		data() {
			return {
				canvasId: 'pieCanvas',
				type: 'pie',
				data: [],
				options:{
                    bgColor: '#ffffff',             // 默认背景颜色
                    title: '部门数据统计数量Top8饼状图',                      // 图表标题
                    titleColor: '#5c9dff',          // 图表标题颜色
                    titlePosition: 'top',            // 图表标题位置: top / bottom
                    legendColor: '#5c9dff',         // 图例文本颜色
                    legendTop: 30,                  // 图例距离顶部的长度
                    //colorList: ['#1E9FFF', '#13CE66', '#F7BA2A', '#FF4949', '#72f6ff'],    // 饼图颜色列表
                    radius: 50,                    // 饼图半径
                    bottomPadding: 20,              // canvas 下边距
                    leftPadding: 50,                // canvas 左边距
                }
			}
		},
		components:{
			Schart
        },
        methods:{
            /**@function 简化部门名称 */
            abbrDepName(depName){
                let _depName = depName;
                switch(depName){
                    case '机电学部':
                        _depName = "机电";
                        break;
                    case '教学管理处':
                        _depName = "教学";
                        break;
                    case '教师发展处':
                        _depName = '教师'
                        break;
                    case '经贸学部':
                        _depName = "经贸";
                        break;
                    case '体育艺术学部（筹）':
                        _depName = "体艺";
                        break;
                    case '幼师学部':
                         _depName = "幼师";
                        break;
                    case '校长办公室':
                        _depName = "校办";
                        break;
                    case '物业办公室':
                        _depName = "物业";
                        break;
                    case '安全保卫处':
                        _depName = "安保";
                        break;
                    case '学生管理处':
                        _depName = "学生";
                        break;
                    case '学生发展处':
                        _depName = "学生";
                        break;
                    case '交通学部':
                        _depName = "交通";
                        break;
                    case '信息学部':
                        _depName = "信息";
                        break;
                    case '团委':
                        break;
                    case '文印室':
                        _depName = '文印';
                        break;
                    case '医务室':
                        _depName = '医务';
                        break;
                    case '后勤服务处':
                        _depName = "后勤";
                        break;
                    case '财务室':
                        _depName = '财务'
                        break;
                    case '质量监控处':
                        _depName = "质监";
                        break;
                    case '工会':
                        break;
                    case '其它部门':
                        _depName = "其它";
                        break;
                    case '社会合作交流处':
                        _depName = "社合";
                        break;
                    case '图书馆':
                        _depName = '图书';
                        break;
                    case '食堂':
                        break;
                    case '心灵家园':
                        _depName = "心理";
                        break;
                    case '测试部门':
                        _depName = "测试";
                        break;
                }
                return _depName;
            },
            /**@param 改变props值的数据组织形式，便于图表显示 */
            convertProps(){
                this.data = [];
                let countList = [];
                this.departmentList.forEach(dep => {
                    countList.push(dep.count);
                });
                countList = countList.sort(function(x,y){return(y-x)});
                let top8 = 0;//取前十大领用金额的处室
                countList.forEach( count => {
                    this.departmentList.forEach(dep => {
                        if(count == dep.count && top8 < 8){
                            top8++;
                            this.data.push({name:this.abbrDepName(dep.departmentname),value:Number(dep.count)});
                        }
                    });
                
                })
            }
            
        },
        watch:{
            departmentList:function(){
                this.convertProps();
            }
        },
        mounted(){
            console.log(this.departmentList);
            this.convertProps();
        }
	}
</script>

<style lang="scss" scoped>
    @function px2rem($px){
        $rem:37.5px;
        @return ($px / $rem) + rem; 
    }
    .pie-chart{
        background-color:#fff;
        padding:0 px2rem(40px);
    }
    .wrapper{
        height:px2rem(400px);
        margin-bottom: px2rem(10px);
    }

</style>