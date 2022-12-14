import { axiosRetryInstance } from "boot/axios";
import { defineStore } from "pinia";

const state = {
  clients: [],
};

const actions = {
  getClients() {
    return new Promise((resolve, reject) => {
      axiosRetryInstance
        .get("/clients")
        .then((response) => {
          this.SET_CLIENTS(response.data.data);
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
        });
    });
  },
  SET_CLIENTS(payload) {
    this.clients = payload;
  },
};

const getters = {
  getClientName: (state) => (id) => {
    if (id) {
      const client = state.clients.find((element) => element.id === id);
      return client.description;
    }
    return null;
  },
};

export const useClientStore = defineStore("Client", {
  state: () => {
    return state;
  },
  actions,
  getters,
  persist: true,
});
