import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import CompletedListView from "../views/CompletedListView.vue";
import ToDoListView from "../views/ToDoListView.vue";

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
  // {
  //   path: "/to_do_list",
  //   name: "to-do",
  //   component: ToDoListView,
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
