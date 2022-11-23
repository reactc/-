import { reqAddOrUpdateShopCart, reqGoodsInfo } from '@/api';
//封装游客身份模块uuid---->生成一个随机字符串（不能在生成了）
import { getUUID } from '@/utils/uuid_token';

const state = {
    goodInfo: {},
    uuid_token: getUUID(),
};
const mutations = {
    GETGOODSINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    },
};
const actions = {
    //获取产品信息的action
    async getGoodsInfo({ commit }, skuId) {
        let result = await reqGoodsInfo(skuId);
        if (result.code == 200) {
            commit('GETGOODSINFO', result.data);
        }
    },
    //将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
};
const getters = {
    //路径导航简化效果
    categoryView(state) {
        return state.goodInfo.categoryView || {};
    },
    // 简化产品信息的参数
    skuInfo(state) {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    supSaleAttrList() {
        return state.goodInfo.spuSaleAttrList || [];
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}