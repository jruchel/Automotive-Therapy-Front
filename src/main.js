import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import About from './components/About.vue'
import Login from './components/Login.vue'

Vue.config.productionTip = false
Vue.use(Router)

const routes = [
    {path: '/home', component: Home},
    {path: '/about', component: About},
    {path: '/login', component: Login}
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

