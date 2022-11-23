import Vue from 'vue';
import App from './App.vue';
import TypeNav from '@/components/TypeNav/TypeNav';
// 引入路由
import router from '@/router';
// 引入仓库
import store from '@/store';
// import store from '@/store/home/index'
// import {reqCategoryList} from '@/api'
// reqCategoryList();

// 引入mockServel.js  --mock数据
import '@/mock/mockServe';

//引入swiper样式（轮播图）
import "swiper/css/swiper.css";
//统一接口api文件夹里面全部请求接口
import * as API from '@/api';
// console.log(API);

import atm from '@/assets/1.jpg'
import carouselIndex from '@/components/Carousel/carouselIndex.vue'
Vue.config.productionTip = false;

import paginationIndex from '@/components/Pagination/paginationIndex'
//引入饿了么
import { Button, MessageBox } from 'element-ui';
// 第一个参数，全局组建的名字，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(carouselIndex.name, carouselIndex)
Vue.component(paginationIndex.name, paginationIndex);
//注册全局饿了么组件,还有一种写法，挂在原型上
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入懒加载组件
import VueLazyload from 'vue-lazyload';
//注册组件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm,
});
//引入自定义组件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins, {
  name: 'upper',
});

//引入表单验证插件
import "@/plugins/validate";
new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  //注册 KV一直省略V
  router,
  store,
}).$mount('#app')
