<template>
    <div>
        <TypeNav></TypeNav>
        <ListContainer></ListContainer>
        <RecommendIndex></RecommendIndex>
        <RankIndex></RankIndex>
        <LikeIndex></LikeIndex>
        <FloorIndex v-for="(floor) in floorList" :key="floor.id" :list="floor"></FloorIndex>
        <BrandIndex></BrandIndex>
    </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer/ListContainer.vue'
import RecommendIndex from '@/pages/Home/Recommend/RecommendIndex.vue'
import RankIndex from '@/pages/Home/Rank/RankIndex.vue'
import LikeIndex from '@/pages/Home/Like/LikeIndex.vue'
import FloorIndex from '@/pages/Home/Floor/FloorIndex.vue'
import BrandIndex from '@/pages/Home/Brand/BrandIndex.vue'
import { mapState } from 'vuex'
export default {
    name: 'HomeIndex',
    components: {
        ListContainer,
        RecommendIndex,
        RankIndex,
        LikeIndex,
        FloorIndex,
        BrandIndex,
    },
    mounted() {
        this.$store.dispatch("getFloorList");
        // //获取用户信息在首页展示
        this.$store.dispatch("getUserInfo");
    },
    computed: {
        ...mapState({
            floorList: state => state.home.floorList,
        })
    }
}
</script>

<style scope>
</style>