import Vue from "vue";
import Router from "vue-router";
import home from "./views/home.vue";
import postDetails from "./views/postDetails.vue";
import login from "./views/login.vue";
import adminHome from "./views/adminHome.vue";
import adminAdd from "./views/adminAdd.vue";
import adminEdit from "./views/adminEdit.vue";
import store from './store';


Vue.use(Router)

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            component: home,
        },
        {
            path: '/postDetails/:id',
            component: postDetails,
            props: true,
        },
        {
            path: '/login',
            component: login,
        },
        {
            path: '/adminHome',
            component: adminHome,
            beforeEnter(to, from, next) {
                if (store.getters.password) {
                    next();
                } else {
                    next('/login');
                }
            }
        },
        {
            path: '/adminAdd',
            component: adminAdd,
            beforeEnter(to, from, next) {
                if (store.getters.password) {
                    next();
                } else {
                    next('/login');
                }
            }
        },
        {
            path: '/adminEdit/:id',
            component: adminEdit,
            props: true,
            beforeEnter(to, from, next) {
                if (store.getters.password) {
                    next();
                } else {
                    next('/login');
                }
            }
        },
        {
            path: "*",
            redirect: "/"
        }
    ]
})