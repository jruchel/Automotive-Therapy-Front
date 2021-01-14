import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Opinion from './components/Opinions/OpinionsPage.vue'
import Order from './components/Orders/OrderPage.vue'
import Login from './components/Login/LoginPage.vue'
import RespondOrders from "@/components/Moderator/RespondOrders";
import LandingPage from "@/components/LandingPage";

Vue.config.productionTip = false
Vue.use(Router)

const routes = [
    {path: '/opinion', component: Opinion},
    {path: '/order', component: Order},
    {path: '/login', component: Login},
    {path: '/orders', component: RespondOrders},
    {path: "/home", component: LandingPage, alias: ['/', '']}
]

const router = new Router({
    routes
})

new Vue({
    provide: {
        "serverUrl": "https://automotive-therapy.herokuapp.com"
    },
    router,
    render: h => h(App),
}).$mount('#app')

