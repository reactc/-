//配置路由组件

import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

//使用插件
Vue.use(VueRouter);
// 引入路由组件
import Home from '@/pages/Home/HomeIndex';
// import Search from '@/pages/Search/SearchIndex';
// import Login from '@/pages/Login/LoginIndex';
// import Register from '@/pages/Register/RegisterIndex';
// import Detail from '@/pages/Detail/detailIndex'
// import AddCartSuccess from "@/pages/AddCartSuccess/index";
// import ShopCart from "@/pages/ShopCart/index";
// import Trade from '@/pages/Trade/index';
// import Pay from '@/pages/Pay/index';
// import PaySuccess from '@/pages/PaySuccess/index';
// import Center from '@/pages/Center/index';
// import MyOrder from '@/pages/Center/myOrder';
// import GroupOrder from '@/pages/Center/groupOrder';
// 先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;



// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
//  call || apply区别
//  相同点，都可以调用函数一次，都可以篡改函数的上下文一次
//  不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
// VueRouter.prototype.push = function (location, resolve, reject) {
//     if (resolve && reject) {
//         originPush.call(this, location, resolve, reject);
//     } else {
//         originPush.call(this, location, () => { }, () => { })
//     }
// }

// VueRouter.prototype.replace = function (location, resole, reject) {
//     if (resole && reject) {
//         originReplace.call(this, location, resole, reject);
//     } else {
//         originReplace.call(this, location, () => { }, () => { })
//     }
// }




// 备份push和replace方法
// let originPush = VueRouter.prototype.push;
// let originReplace = VueRouter.prototype.replace;
// 重写push/replace
// function传入三个参数（跳转地址，成功回调，失败回调）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
};
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
};


// 当打爆构建应用时，javascript 包会变得非常大，影响页面加载
// 如果我们能把不同的路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应的，这样就更加高效了

let router = new VueRouter({
    //配置路由
    routes: [
        {
            path: "/center",
            name: 'center',
            component: () => import("@/pages/Center/index"),
            meta: { show: true },
            //二级路由子组件
            children: [
                {
                    path: 'myorder',
                    component: () => import('@/pages/Center/myOrder'),
                },
                {
                    path: 'grouporder',
                    component: () => import('@/pages/Center/groupOrder'),
                },
                {
                    path: '/center',
                    redirect: '/center/myorder'
                }
            ]
        },
        {
            path: "/paysuccess",
            name: 'paysuccess',
            component: () => import('@/pages/PaySuccess/index'),
            meta: { show: true },
        },
        {
            path: "/pay",
            name: 'pay',
            component: () => import('@/pages/Pay/index'),
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                if (from.path == '/trade') {
                    next();
                } else {
                    next(false);
                }
            }
        },
        {
            path: "/trade",
            name: 'trade',
            component: () => import('@/pages/Trade/index'),
            meta: { show: true },
            beforeEnter: (to, from, next) => {
                if (from.path == "/shopcart") {
                    next();
                } else {
                    next(false);
                }
            }
        },
        {
            path: "/shopcart",
            name: 'shopcart',
            component: () => import("@/pages/ShopCart/index"),
            meta: { show: true },
        },
        {
            path: "/addcartsuccess",
            name: 'addcartsuccess',
            component: () => import("@/pages/AddCartSuccess/index"),
            meta: { show: true },
        },
        {
            path: "/detail/:skuid",
            component: () => import('@/pages/Detail/detailIndex'),
            meta: { show: true },
        },
        {
            path: "/home",
            component: () => import("@/pages/Home/HomeIndex"),
            meta: { show: true },
        },
        {
            path: "/search/:keyword?",
            component: () => import('@/pages/Search/SearchIndex'),
            meta: { show: true },
            name: "search"
        },
        {
            path: "/login",
            component: () => import('@/pages/Login/LoginIndex'),
            meta: { show: false }
        },
        {
            path: "/register",
            component: () => import('@/pages/Register/RegisterIndex'),
            meta: { show: false }
        },
        // 重定向,项目跑起来 访问/ ，立马定向到首页
        {
            path: '*',
            component: Home,
            meta: { show: true }
        }
    ],
    scrollBehavior() {
        return { y: 0 };
    }
})
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // console.log(store);
    if (token) {
        if (to.path == '/login') {
            next('/home');
        } else {
            if (name) {
                next();
            } else {
                try {
                    // 没有用户信息,派发action让仓库存储用户信息再跳转
                    await store.dispatch('getUserInfo');
                    next();
                } catch (error) {
                    await store.dispatch('userLogout');
                    next('/login');
                }
            }
        }
    } else {
        //未登录，不能去交易相关，不能去pay|paysuccess，不能去个人中心
        //未登录，去以上路由----登录
        let toPath = to.path;
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            //把未登录的时候想去而没有去的信息存放在地址栏【路由】
            next('/login?redirect=' + toPath);
        } else {
            next();
        }
    }
});
//配置路由

export default router;