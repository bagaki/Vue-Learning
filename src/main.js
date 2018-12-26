import 'bootstrap/dist/css/bootstrap.css'
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import moment from "moment"
Vue.filter("dateFormat", function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 完整導入
// import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
// // 將MintUI 安裝到Vue中
// Vue.use(MintUI)

// 按需導入
import { Header, Swipe, SwipeItem, Button } from "mint-ui"
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

import app from "./App.vue"
import router from "./router.js"

import VueResource from "vue-resource"
Vue.use(VueResource)
// 設置請求根路徑
Vue.http.options.root = 'http://vue.studyit.io';


var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router
})