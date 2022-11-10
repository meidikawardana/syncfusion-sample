import { axiosRetryInstance } from "boot/axios";
import { defineStore } from "pinia";

const state = {
  departments: [],
};

const actions = {
  getDepartments() {
    return new Promise((resolve, reject) => {
      axiosRetryInstance
        .get("/departments")
        .then((response) => {
          this.SET_DEPARTMENTS(response.data.data);
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
        });
    });
  },
  SET_DEPARTMENTS(payload) {
    this.departments = payload;
  },
};

const getters = {
  getDepartmentName: (state) => (id) => {
    if (id) {
      const department = state.departments.find((element) => element.id === id);
      return department.name;
    }
    return null;
  },
};

export const useDepartmentStore = defineStore("Department", {
  state: () => {
    return state;
  },
  actions,
  getters,
  persist: true,
});
