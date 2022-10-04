import { defineStore } from "pinia";

const state = {
  user: {
    id: null,
    username: null,
    name: null,
    location_id: null,
    role: null,
    roles: [],
    email: null,
    emp_number: null,
  },
  lastReadVersionId: null,
  appVersion: null,
  token: null,
  box_token: null,
  preferences: {
    location_id: [],
    client_id: null,
    sep_id: null,
    sel_header_id: null,
  },
};

const actions = {
  SET_USER_PREFERENCES(payload) {
    this.preferences = { ...payload };
  },
};

const getters = {};

export const useAuthStore = defineStore("Auth", {
  state: () => {
    return state;
  },
  actions,
  getters,
  persist: true,
});
