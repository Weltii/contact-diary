import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/entries",
    name: "Entries",
    component: () => import("../views/Entries.vue")
  },
  {
    path: "/myself",
    name: "Myself",
    component: () => import("../views/Myself.vue")
  },
  {
    path: "/contacts",
    name: "contacts",
    component: () => import("../views/Contacts.vue")
  },
  {
    path: "/contact-scanner",
    name: "Contact Scanner",
    component: () => import("../views/ContactScanner.vue")
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
