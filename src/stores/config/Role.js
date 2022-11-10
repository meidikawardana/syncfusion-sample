import { axiosRetryInstance } from "boot/axios";
import { defineStore } from "pinia";

const state = {
  roles: [],
};

const actions = {
  getRoles() {
    return new Promise((resolve, reject) => {
      axiosRetryInstance
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
  SET_ROLES(payload) {
    this.roles = payload;
  },
};

const getters = {
  getRoleName: (state) => (id) => {
    if (id) {
      const roles = state.roles.find((element) => element.id === id);
      return roles.role;
    }
    return null;
  },
};

export const useRoleStore = defineStore("Role", {
  state: () => {
    return state;
  },
  actions,
  getters,
  persist: true,
});
