import { createWebHistory, createRouter } from "vue-router";

import Auth from "@/components/Auth.vue";
import Signup from "@/components/Signup.vue";
import Main from "@/components/Main.vue";

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/signup",
    name: "Sign up",
    component: Signup,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
