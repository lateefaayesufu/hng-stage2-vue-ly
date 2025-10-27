// import { createRouter, createWebHistory } from "vue-router";
// import { useAuth } from "../composables/useAuth";
// import { useToast } from "../composables/useToast";

// // Layout
// import Layout from "../components/Layout.vue";

// // Pages
// import Home from "../pages/Home.vue";
// import Login from "../pages/Login.vue";
// import Signup from "../pages/Signup.vue";
// import Dashboard from "../pages/Dashboard.vue";
// import TicketList from "../pages/TicketList.vue";
// import TicketForm from "../pages/TicketForm.vue";

// const routes = [
//   {
//     path: "/",
//     component: Layout,
//     children: [
//       {
//         path: "",
//         name: "Home",
//         component: Home,
//       },
//       {
//         path: "/dashboard",
//         name: "Dashboard",
//         component: Dashboard,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "/tickets",
//         name: "TicketList",
//         component: TicketList,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "/tickets/new",
//         name: "TicketCreate",
//         component: TicketForm,
//         meta: { requiresAuth: true },
//       },
//       {
//         path: "/tickets/:id",
//         name: "TicketEdit",
//         component: TicketForm,
//         meta: { requiresAuth: true },
//       },
//     ],
//   },
//   // Auth routes (no layout)
//   {
//     path: "/auth/login",
//     name: "Login",
//     component: Login,
//     meta: { requiresGuest: true },
//   },
//   {
//     path: "/auth/signup",
//     name: "Signup",
//     component: Signup,
//     meta: { requiresGuest: true },
//   },
//   // 404
//   {
//     path: "/:pathMatch(.*)*",
//     redirect: "/",
//   },
// ];

// const router = createRouter({
//   history: createWebHistory(),
//   routes,
// });

// // Navigation guards
// router.beforeEach((to, from, next) => {
//   const { isAuthenticated, loading } = useAuth();
//   const { error } = useToast();

//   // Wait for auth to initialize
//   if (loading.value) {
//     // In a real app, you'd wait for loading to finish
//     // For now, we check synchronously
//   }

//   // Check if route requires authentication
//   if (to.meta.requiresAuth && !isAuthenticated.value) {
//     error("Your session has expired — please log in again.");
//     next({ name: "Login", query: { redirect: to.fullPath } });
//     return;
//   }

//   // Check if route requires guest (redirect authenticated users)
//   if (to.meta.requiresGuest && isAuthenticated.value) {
//     next({ name: "Dashboard" });
//     return;
//   }

//   next();
// });

// export default router;
