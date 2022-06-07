import Vue from "vue";
import Vuex from "vuex";

import Schedule from "./tsp/Schedule";

Vue.use(Vuex);

let store = null;
export default function (/* { ssrContext } */) {
  store = new Vuex.Store({
    modules: {
      Schedule,
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return store;
}

export { store };
