import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: "Home",
    component: () =>
        import ('../views/Home.vue'),
}, {
    path: '/creation-compte',
    name: "CreationCompte",
    component: () =>
        import ('../views/CreationCompte.vue'),
}, {
    path: '/connexion',
    name: "Connexion",
    component: () =>
        import ('../views/Connexion.vue'),
}, {
    path: '/conversations',
    name: "Conversations",
    component: () =>
        import ('../views/Conversations.vue'),
}, {
    path: '/creer-conversation',
    name: "CreerConv",
    component: () =>
        import ('../views/CreerConversation.vue'),
}, {
    path: '/membres',
    name: "Membres",
    component: () =>
        import ('../views/Membres.vue'),
}, {
    path: '/membre/:id',
    props: true,
    component: () =>
        import ('../views/FicheMembre.vue'),
}, {
    path: '/conversation/:id',
    props: true,
    component: () =>
        import ('../views/Conversation.vue'),
}, ];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;