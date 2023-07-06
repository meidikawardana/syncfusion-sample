const routes = [
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

  {
    path: "/",
    component: () => import("src/pages/Kanban/KanbanPage.vue"),
    meta: {
      title: "Kanban Overview",
      name: "Kanban Overview",
      requiresAuth: false,
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
