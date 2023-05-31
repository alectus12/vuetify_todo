import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CompletedListView from "../views/CompletedListView.vue";
import ToDoListView from "../views/ToDoListView.vue";
import LoginPageView from "../views/LoginPageView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "dashboard",
    component: ToDoListView,
  },
  {
    path: "/completed_list",
    name: "profile",
    component: CompletedListView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginPageView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem("userToken") == null) {
      next({
        path: "/login",
        params: { nextUrl: to.fullPath },
      });
    } else {
      // if (!store.state.isAuthenticated) {
      //   next({
      //     path: "/login",
      //     params: { nextUrl: to.fullPath },
      //   });
      // } else {
      //   next();
      // }
    }
  } else {
    next();
  }
});

export default router;
