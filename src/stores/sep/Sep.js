import { defineStore } from "pinia";
import { axiosInstance, axiosRetryInstance } from "boot/axios";

const state = {
  headerIds: [],
  headersDashboardData: [],

  sepStatus: [
    { id: 1, name: "Pending", class: "secondary" },
    { id: 2, name: "Approved", class: "primary" },
    // { id: 3, name: 'Ready for Closeout', class: 'primary' },
    { id: 4, name: "Cancelled", class: "warning" },
    { id: 5, name: "Closed", class: "blue" },
  ],
};

const actions = {
  getHeaders(payload) {
    return new Promise((resolve, reject) => {
      axiosRetryInstance
        .get("/headers", { params: payload })
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
        });
    });
  },
  getHeadersDashboard(payload) {
    return new Promise((resolve, reject) => {
      axiosRetryInstance
        .get("/headers/dashboard", { params: payload })
        .then((response) => {
          this.headersDashboardData = [...response.data.data];
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
        });
    });
  },
  filterHeaderId(payload) {
    return new Promise((resolve, reject) => {
      axiosRetryInstance
        .get("/src/stores/sep/filter-id.json", { params: payload })
        .then((response) => {
          this.SET_HEADER_IDS(response.data.data);
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
        });
    });
  },
  showHeader(id) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .get("/headers/" + id)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
          reject(er);
        });
    });
  },
  storeHeader(header) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/headers", header)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
        });
    });
  },
  updateHeader(header) {
    return new Promise((resolve, reject) => {
      axiosInstance
        .patch("/headers/" + header.id, header)
        .then((response) => {
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
        });
    });
  },
  SET_HEADER_IDS(headerIds) {
    this.headerIds = headerIds;
  },
};

const getters = {};

export const useSepStore = defineStore("Sep", {
  state: () => {
    return state;
  },
  actions,
  getters,
});
