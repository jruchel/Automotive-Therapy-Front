import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


new Vue({
    provide: {
        "serverUrl": "https://automotive-therapy.herokuapp.com"
    },
    render: h => h(App),
}).$mount('#app')

