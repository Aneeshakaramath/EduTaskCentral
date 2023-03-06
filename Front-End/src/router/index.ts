import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import LoginForm from "../components/Login-Form.vue";
import RegisterForm from "../components/Register-Form.vue";
import Logout from "../components/Logout.vue";
import Home from "../components/Home.vue";
import Dashboard from "../components/dashboard/Dashboard.vue";
import Task from "../components/Task/Task.vue";
import consolidatedTaskView from "../components/Task/consolidatedTaskView.vue"
import Group from "../components/Group/Group.vue";
import TaskById from "../components/TaskById/TaskById.vue";

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
      path: "/home",
      name: "home",
      component: Home,
      children: [
        {
          path: "",
          redirect: "/home/dashboard"
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard,
        },
        {
          path: "task",
          name: "task",
          component: Task,
          children: [
            {
              path: "taskAssignedToMe",
              component: consolidatedTaskView,
              name: "taskAssignedToMe",
              props: { taskListType: 'taskAssignedToMe' }
            },
            {
              path: "taskAssignedByMe",
              name: "taskAssignedByMe",
              component: consolidatedTaskView,
              props: { taskListType: 'taskAssignedByMe' }
            }
          ]
        },
        {
          path: "taskById/:taskId",
          name: "taskById",
          component: TaskById,
          // props: true
         //  props: { taskId:'123' }
        },
        {
          path: "group",
          name: "group",
          component: Group,
        },
      ]
    },
  ],
});

export default router;
