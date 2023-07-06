import { defineStore } from "pinia";
import { axiosRetryInstance } from "boot/axios";
import locations from './datasets/locations.json'

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
  getLocation: (state) => (id) => {
    return locations.find((element) => element.id === id)
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
