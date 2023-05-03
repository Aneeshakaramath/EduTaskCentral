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
import addTask from "../components/Task/addTask.vue";
import addTaskToGroup from "../components/Task/addTaskToGroup.vue";
import About from "../components/About.vue";
import CourseEnrollment from "../components/CourseEnrollment/courseEnrollment.vue";
import CourseDelivery from "../components/CourseDelivery/courseDelivery.vue";
import MyCourse from "../components/CourseDelivery/myCourse.vue";
import OtherCourse from "../components/CourseDelivery/otherCourse.vue";
import OverAllPlan from "../components/CourseDelivery/overallPlan.vue";
import Notification from "../components/Notification/Notification.vue";
import WeeklyPlan from "../components/CourseDelivery/weeklyPlan/weeklyPlan.vue";
import WeeklyModuleDetails from "../components/CourseDelivery/weeklyPlan/weeklyModuleDetails.vue";
import QuestionPaper from "../components/QuestionPaper/questionPaper.vue";
import Setting from "../components/QuestionPaper/setting.vue";
import Audit from "../components/QuestionPaper/audit.vue";
import QuestionPaperForm from "../components/QuestionPaper/questionPaperForm.vue";
import QuestionPaperDetails from "../components/QuestionPaper/questionPaperDetails.vue";

import { useUserStore } from "../stores/User";



const router = createRouter({
  history: createWebHashHistory(), // createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/about"
    },
    {
      path: "/about",
      name: "about",
      component: About,
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
            },
            {
              path: "createTask",
              name: "createTask",
              component: addTask,
            },
            {
              path: "addTaskToGroup",
              name: "addTaskToGroup",
              component: addTaskToGroup,
            }
          ]
        },
        {
          path: "taskById/:taskId",
          name: "taskById",
          component: TaskById,
          // props: true
         //  props: { taskId:'123' }
         beforeEnter(to, from,) {
            const store = useUserStore();
            store.fromRoute = from.name?.toString() || '';
          }
        },
        {
          path: "group",
          name: "group",
          component: Group,
        },
        {
          path: "questionPaper",
          name: "questionPaper",
          component: QuestionPaper,
          children: [
            {
              path: 'setting',
              component: Setting,
              name: "setting",
            },
            {
              path: 'audit',
              component: Audit,
              name: "audit",
            }
          ]
        },
        {
          path: "questionPaperForm",
          name: "questionPaperForm",
          component: QuestionPaperForm,
        },
        {
          path: "questionPaperDetails",
          name: "questionPaperDetails",
          component: QuestionPaperDetails,
        },
        {
          path: "courseEnrollment",
          name: "courseEnrollment",
          component: CourseEnrollment,
        },
        {
          path: "courseDelivery",
          name: "courseDelivery",
          component: CourseDelivery,
          children: [
            {
              path: 'myCourses',
              component: MyCourse,
              name: "myCourses",
            },
            {
              path: 'otherCourse',
              component: OtherCourse,
              name: "otherCourses",
            }
          ]
        },
        {
          path: "overallPlan",
          component: OverAllPlan,
          name: "overallPlan",
        },
        {
          path: "weeklyPlan",
          component: WeeklyPlan,
          name: "weeklyPlan",
        },
        {
          path: "weeklyPlanModuleDetails",
          component: WeeklyModuleDetails,
          name: "weeklyPlanModuleDetails"
        },
        {
          path: "notification",
          name: "notification",
          component: Notification,
        },
      ]
    },
  ],
});

export default router;