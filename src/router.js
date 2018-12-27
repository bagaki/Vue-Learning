import VueRouter from "vue-router"

import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"
import NewsList from "./components/news/NewsList.vue"
import NewsInfo from "./components/news/NewsInfo.vue"
import PhotoList from "./components/photo/PhotoList.vue"
import PhotoInfo from "./components/photo/PhotoInfo.vue"
import GoodsList from "./components/goods/GoodsList.vue"


var router = new VueRouter({
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomeContainer },
        { path: "/member", component: MemberContainer },
        { path: "/shopcart", component: ShopcarContainer },
        { path: "/search", component: SearchContainer },

        { path: "/home/newslist", component: NewsList },
        { path: "/home/newsinfo/:id", component: NewsInfo },

        { path: "/home/photolist", component: PhotoList },
        { path: "/home/photoinfo/:id", component: PhotoInfo },

        { path: "/home/goodslist", component: GoodsList },
    ],
    linkActiveClass: " mui-active"
})

// 吧路由對象暴露出去
export default router