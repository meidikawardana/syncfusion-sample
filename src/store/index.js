import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let store = null;
export default function (/* { ssrContext } */) {
  store = new Vuex.Store({
    modules: {
      // example
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
  });

  return store;
}

export { store };
