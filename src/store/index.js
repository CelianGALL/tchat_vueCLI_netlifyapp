import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})

export default new Vuex.Store({
    plugins: [vuexLocal.plugin],
    state: {
        token: [],
        member: [],
        members: [],
    },
    mutations: {
        // Une mutation a toujours en premier paramètre l'état
        setConnexion(state, token) {
            state.token = token;
        },
        setMember(state, member) {
            state.member = member;
        },
        destroyStorage(state) {
            state.token = [];
            state.member = [];
        },
    },
    actions: {},
    modules: {}
})