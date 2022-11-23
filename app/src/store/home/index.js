import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'


// home小仓库
const state = {
    //state中单数据默认初始值别瞎写，服务器返回对象，服务器返回数组，【根据接口返回值初始化】
    categoryList: [],
    bannerList: [],
    floorList:[],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state,floorList){
        state.floorList = floorList;
    }
};
const actions = {
    // 通过api里面的接口函数调用，向服务器发送请求，获取服务器的数据
    async categoryList({ commit }) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },
    //获取首页轮播图
    async getBannerList({ commit }) {
        let result = await reqGetBannerList();
        // console.log(result);
        if (result.code == 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    //获取floor数据
    async getFloorList({ commit }) {
        let result = await reqFloorList();
        if (result) {
            //提交mutation
            commit('GETFLOORLIST',result.data)
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters
}
