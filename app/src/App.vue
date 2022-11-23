<template>
  <div id="app">
    <!-- <h1 v-upper="msg"></h1> -->
    <HeaderIndex></HeaderIndex>
    <router-view></router-view>
    <FooterIndex v-show="$route.meta.show"></FooterIndex>
  </div>
</template>

<script>
import HeaderIndex from './components/Header/HeaderIndex.vue'
import FooterIndex from './components/Footer/FooterIndex.vue'
export default {
  name: 'App',
  data() {
    return {
      msg: 'abcdefg',
    };
  },
  components: {
    HeaderIndex,
    FooterIndex,
  },
  mounted() {
    // 通知vuex发请求，获取数据，存储在仓库中
    this.$store.dispatch('categoryList');
  }
}
</script>

<style scoped>
</style>
