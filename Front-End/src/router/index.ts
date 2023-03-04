import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import LoginForm from "../components/Login-Form.vue";
import RegisterForm from "../components/Register-Form.vue";
import Logout from "../components/Logout.vue";
import Dashboard from "../components/Dashboard.vue";

const router = createRouter({
  history: createWebHashHistory(), // createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/logout",
      name: "logout",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import("../components/Logout.vue"),
      component: Logout
    },
    {
      path: "/login",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/signup",
      name: "signup",
      component: RegisterForm,
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
    },
  ],
});

export default router;
