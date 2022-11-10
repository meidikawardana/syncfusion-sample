import { defineStore } from "pinia";
import { axiosRetryInstance } from "boot/axios";

const state = {
  locations: [],
};

const actions = {
  getLocations() {
    return new Promise((resolve, reject) => {
      axiosRetryInstance
        .get("/locations")
        .then((response) => {
          this.SET_LOCATIONS(response.data.data);
          resolve(response.data.data);
        })
        .catch((er) => {
          console.error(er);
        });
    });
  },
  SET_LOCATIONS(payload) {
    this.locations = payload;
  },
};

const getters = {
  getLocationName: (state) => (id) => {
    const location = state.locations.find((element) => element.id === id);
    return location.location;
  },
  getApacLocations: (state) => {
    return state.locations.filter((element) => element.type === "region");
  },
};

export const useLocationStore = defineStore("Location", {
  state: () => {
    return state;
  },
  actions,
  getters,
  persist: true,
});
