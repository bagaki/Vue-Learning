import VueRouter from "vue-router"
import account from "./main/Account.vue"
import goodslist from "./main/GoodsList.vue"
import signin from "./subcom/signin.vue"
import register from "./subcom/register.vue"


var router = new VueRouter({
    routes: [
        {
            path: '/account',
            component: account,
            children: [
                { path: 'signin', component: signin },
                { path: 'register', component: register }
            ]
        },
        { path: '/goodslist', component: goodslist }
    ]
})

// 吧路由對象暴露出去
export default router