import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      	path: '/',
      	redirect: 'main',      
    },
    {
      	path: '/main',
      	name: 'Main',
		component: resolve => require(['../components/main'],resolve),
		meta:{keepAlive: false},
    },  
	{
		path:'/teacher',
		name:'PersonalRecipient',
		component:resolve => require(['../components/teacher/personal-recipient'],resolve),	
		meta:{keepAlive: true},	
	},
	 {
		path:'/goods-manage',
		name:'GoodsItemManage',
		component:resolve => require(['../components/teacher/goods-item-manage'],resolve),
	},
	{
		path:'/department',
		name:'DepartmentReceipient',
		component:resolve => require(['../components/department/department-recepient'],resolve),
		meta:{keepAlive: true},	
	},
	 {
		path:'/department-goods',
		name:'DepartmentGoodsManage',
		component:resolve => require(['../components/department/department-goods'],resolve),
		meta:{keepAlive: false},
	},	
	{
		path:'/department-goods-item',
		name:'DepartmentGoodsItem',
		component:resolve => require(['../components/department/personal-item-manage'],resolve),
		meta:{keepAlive: false},
	},
	{
		path:'/department-item-detail',
		name:'DepartmentItemDetail',
		component:resolve => require(['../components/department/goods-item-detail'],resolve),
		meta:{keepAlive: false},
	},
	{
		path:'/leader',
		name:'LeaderCount',
		component:resolve => require(['../components/leader/leader-count'],resolve),
		meta:{keepAlive: true},	
	},
	{
		path:'/goods-chart',
		name:'GoodsChart',
		component:resolve => require(['../components/leader/goods-chart'],resolve),
		meta:{keepAlive: false},	
	},	
  ]
})
