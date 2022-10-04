import { axiosInstance } from "boot/axios";
import { defineStore } from "pinia";

const state = {
  projects: [],
  scopes_options: [],
  roles: [],
  projectPhases: [
    { id: 1, name: "Backlog" },
    { id: 2, name: "Forecast" },
    // { id: 3, name: 'Tender' },
    { id: 4, name: "Upside" },
  ],
};

const actions = {
  getResourceDemands(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/src/stores/snop/resource-demands.json", {
          params: payload,
        })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
          reject(er);
        });
    });
  },
  getRoles() {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/roles")
        .then((response) => {
          this.SET_ROLES(response.data.data);
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
          reject(er);
        });
    });
  },
  showResourceDemand(id) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/resource-demands/" + id)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
          reject(er);
        });
    });
  },
  storeResourceDemand(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/resource-demands", payload)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
          reject(er);
        });
    });
  },
  updateResourceDemand(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch("/resource-demands/" + payload.id, payload)
        .then((response) => {
          // commit('UPDATE_PROJECT_SCOPES', response.data.data)
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
          reject(er);
        });
    });
  },
  updateBatchResourceDemands(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch("/resource-demands/batch", payload)
        .then((response) => {
          // commit('UPDATE_PROJECT_SCOPES', response.data.data)
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
          reject(er);
        });
    });
  },
  deleteBatchResourceDemands(payload) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/resource-demands/destroy-batch", payload)
        .then((response) => {
          // console.log(response.data)
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
          reject(er);
        });
    });
  },
  SET_PROJECTS(payload) {
    this.projects = payload;
  },
  UPDATE_PROJECT_SCOPES(payload) {
    this.scopes_options = payload;
  },
  SET_ROLES(payload) {
    this.roles = payload;
  },
};

const getters = {
  getPhase: (state) => (id) => {
    if (id)
      return state.projectPhases.find((element) => element.id === id).name;
    return null;
  },
  getDepartments: (state) => {
    const uniques = new Set();
    const filteredArray = state.roles.filter((el) => {
      // console.log(el)
      const duplicate = uniques.has(el.department);
      // console.log(duplicate)
      uniques.add(el.department);
      // console.log(uniques)
      return !duplicate;
    });
    return filteredArray;
    // return state.roles
  },
};

export const useResourceDemandStore = defineStore("ResourceDemand", {
  state: () => {
    return state;
  },
  actions,
  getters,
});
