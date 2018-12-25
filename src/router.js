import VueRouter from "vue-router"

import HomeContainer from "./components/tabbar/HomeContainer.vue"
import MemberContainer from "./components/tabbar/MemberContainer.vue"
import ShopcarContainer from "./components/tabbar/ShopcarContainer.vue"
import SearchContainer from "./components/tabbar/SearchContainer.vue"


var router = new VueRouter({
    routes: [
        { path: "/", redirect: "/home" },
        { path: "/home", component: HomeContainer },
        { path: "/member", component: MemberContainer },
        { path: "/shopcart", component: ShopcarContainer },
        { path: "/search", component: SearchContainer }
    ],
    linkActiveClass: " mui-active"
})

// 吧路由對象暴露出去
export default router