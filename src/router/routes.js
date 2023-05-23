const routes = [
  {
    path: "/",
    component: () => import("layouts/Demo.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },

  {
    path: "/tsp-schedule",
    component: () => import("layouts/TspScheduleGantt.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },

  {
    path: "/resource-demand",
    component: () => import("src/pages/ResourceDemand/ResourceDemandsGrid.vue"),
    meta: {
      title: "Resource Demand",
      name: "Resources Demand",
      requiresAuth: true,
    },
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
