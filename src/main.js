import 'bootstrap/dist/css/bootstrap.css'
import "./lib/mui/css/mui.min.css"
import "./lib/mui/css/icons-extra.css"

import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)

import Vue from "vue"
import Vuex from "vuex"
// 注冊vuex到vue中
Vue.use(Vuex)

import moment from "moment"
Vue.filter("dateFormat", function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 完整導入
import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
// // 將MintUI 安裝到Vue中
Vue.use(MintUI)

// 按需導入
// import { Header, Swipe, SwipeItem, Button, Lazyload } from "mint-ui"
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

import app from "./App.vue"
import router from "./router.js"
import VuePreview from "vue-preview"
Vue.use(VuePreview)
// 圖片預覽插件
import VueResource from "vue-resource"
Vue.use(VueResource)
// 設置請求根路徑
Vue.http.options.root = 'http://vue.studyit.io';
// 全局設置 post 時候表單數據格式組織形式
Vue.http.options.emulateJSON = true

// 每次進入網站，會調用MAIN.JS 在剛調用的時候，先從本地存儲中，把購物車的數據讀出來放到store中
var car = JSON.parse(localStorage.getItem("car") || "[]")
var store = new Vuex.Store({
    state: {
        // this.$store.***
        car: car  // 存儲購物車中的商品數據
    },
    mutations: {
        // this.$store.commit("方法名", "按需傳參，只有一個")
        addToCar(state, goodsinfo) {
            // 點擊加入購物車，吧商品信息，保存到store中的car上
            // 如果購物車中，已有該商品，就更新數量
            // 否則 push
            var flag = false

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            // 如果最終，循環完畢，得到的 flag 還是 false ，則吧商品數據直接 push 到 car
            if (!flag) {
                state.car.push(goodsinfo)
            }
            // 儅更新 car 之後，吧 car 數組，存儲到本地的 localStorage 中
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改購物車中商品的數量值
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = parseInt(goodsinfo.count)
                    return true
                }
            })
            // 儅修改完商品的數量，吧最新的購物車數據，保存到本地存儲中
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        removeFormCar(state, id) {
            state.car.some((item, i) => {
                if (item.id == id) {
                    state.car.splice(i, 1)
                    return true;
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id == info.id) {
                    item.selected = info.selected
                }
            })
            localStorage.setItem("car", JSON.stringify(state.car))
        }
    },
    getters: {
        // this.$store.getters.***
        // 相當 計算屬性，也相當於 filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state) {
            var o = {
                count: 0,
                amount: 0
            }
            state.car.forEach(item => {
                if (item.selected) {
                    o.count += item.count
                    o.amount += item.price * item.count
                }
            })
            return o
        }
    }
})

var vm = new Vue({
    el: "#app",
    render: c => c(app),
    router,
    store
})