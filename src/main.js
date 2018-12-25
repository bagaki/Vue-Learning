import 'bootstrap/dist/css/bootstrap.css'
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 完整導入
// import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
// // 將MintUI 安裝到Vue中
// Vue.use(MintUI)

// 按需導入
import { Header } from "mint-ui"
Vue.component(Header.name, Header)

import app from "./App.vue"
import router from "./router.js"


var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router
})