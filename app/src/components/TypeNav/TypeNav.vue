<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
        <!-- <h1>{{ categoryList }}</h1> -->
        <div class="container">
            <div @mouseleave="leaveIndex" @mouseenter="enterShow">
                <h2 class="all">全部商品分类</h2>
                <!-- 过渡动画 -->
                <transition name="sort">
                    <div class="sort" v-show="show">
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                                :class="{ cur: currentIndex == index }">
                                <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{
                                            c1.categoryName
                                    }}</a>
                                </h3>

                                <div class="item-list clearfix"
                                    :style="{ display: currentIndex == index ? 'block' : 'none' }">
                                    <div class="subitem" v-for="(c2) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName"
                                                    :data-category2Id="c2.categoryId">{{
                                                            c2.categoryName
                                                    }}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName"
                                                        :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                                                </em>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
            <nav class="nav">
                <a href="###">服装城</a>
                <a href="###">美妆馆</a>
                <a href="###">尚品汇超市</a>
                <a href="###">全球购</a>
                <a href="###">闪购</a>
                <a href="###">团购</a>
                <a href="###">有趣</a>
                <a href="###">秒杀</a>
            </nav>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import throttle from 'lodash/throttle';
export default {
    name: 'TypeNav',
    data() {
        return {
            //存储用户鼠标移上哪一个一级分类
            currentIndex: -1,
            show: true,
        }
    },
    mounted() {


        // console.log(1111111);

        //如果不是search组件就隐藏
        if (this.$route.path != '/home') {
            this.show = false;
        }
    },
    methods: {

        // changeIndex(index) {
        //     // index鼠标移入某一个一级分类的元素的索引
        //     this.currentIndex = index;
        //     console.log(index);
        // },
        changeIndex: throttle(function (index) {
            this.currentIndex = index;
            // console.log(index);
        }, 50),
        leaveIndex() {
            this.currentIndex = -1;
            if (this.$route.path != '/home') {
                this.show = false;
            }
        },
        goSearch(event) {
            //子节点中添加自定义属性data-categoryName，其余节点是没有的
            let element = event.target;
            // 获取到当前出发这个事件的节点[h3,a,dt,dl]，需要带有data-categoryName这样的节点{一定是a标签}
            // 节点有一个dataset属性，可以获取节点的自定义属性与属性值
            let { categoryname, category1id, category2id, category3id } = element.dataset;
            // console.log(element.dataset);
            if (categoryname) {
                let location = { name: "search" };
                // console.log("----------" + location);
                let query = { categoryName: categoryname };
                //一级二级，三级分类的a标签
                if (category1id) {
                    query.category1Id = category1id;
                } else if (category2id) {
                    query.category2Id = category2id;
                } else {
                    query.category3Id = category3id;
                }
                //判断，如果路由跳转的时候 带有params参数，捎带传递过去
                if (this.$route.params) {
                    location.params = this.$route.params;
                    location.query = query;
                    // console.log("query"+query);
                    this.$router.push(location);
                    // console.log(location);
                }
            }

            // let { categoryname, category1id, category2id, category3id } = element.dataset;
            // if (categoryname) {
            //     let location = { name: "search" };
            //     let query = { categoryName: categoryname }
            //     // console.log(query);
            //     if (category1id) {
            //         query.category1Id = category1id;
            //     } else if (category2id) {
            //         query.category2Id = category2id;
            //     } else if (category3id) {
            //         query.category3Id = category3id;
            //     }
            //     // location.query = query;
            //     this.$router.push(location)
            //     // console.log(location);
            // }



        },
        enterShow() {
            // //鼠标进入修改相应数据currentIndex属性
            this.show = true;
        }

    },

    computed: {
        ...mapState({
            //右侧需要的是一个函数，当时用这个计算属性的时候，右侧函数会立即使用一次
            // 注入一个参数state，其实即为大仓库中的数据
            categoryList: state => state.home.categoryList.slice(0, 16)

        })
    }

};
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 481px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {

                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                            text-decoration: none;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }

                    // &:hover {
                    //     .item-list {
                    //         display: block;
                    //     }
                    // }
                }

                // .item:hover {
                //     background-color: blueviolet;
                // }
                .cur {
                    background-color: pink;
                }
            }
        }

        //过渡动画德阳市
        .sort-enter {
            height: 0px;
        }

        .sort-enter-to {
            overflow: hidden;
            height: 481px;
        }

        .sort-enter-active {
            transition: all 1s;
        }
    }
}
</style>