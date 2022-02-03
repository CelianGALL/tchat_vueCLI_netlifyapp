import Vue from 'vue'
import axios from 'axios'
import router from './router/index.js'
import App from './App.vue'
import store from './store'
import { Outils } from './mixins/tools.js'

Vue.mixin(Outils);

Vue.config.productionTip = false

Vue.prototype.$api = axios.create({
    baseURL: "https://allweb.fun/coop/api/",
    params: {},
    headers: {
        "Authorization": "78f82a72e017cac77d925470742c28fb8919506d"
    }
});

Vue.prototype.$api.interceptors.request.use(function(config) {
    if (store.state.token) {
        config.params.token = store.state.token;
    }
    return config;
})

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')