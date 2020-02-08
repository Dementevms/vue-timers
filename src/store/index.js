import Vue from "vue";
import Vuex from "vuex";
import fetch from "../helpers/fetch";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    timers: []
  },
  mutations: {
    setTimers(state, payload) {
      state.timers = payload.timers;
    },
    updateTimers(state) {
      state.timers = state.timers.map(timer => {
        timer.time = timer.time > 0 ? timer.time - 1 : 0;
        return timer;
      });
    }
  },
  actions: {
    async setTimers({ commit }) {
      const payload = await fetch.getTimers("timers");
      commit("setTimers", payload);
    },
    startTimers({ commit }) {
      setInterval(() => {
        commit("updateTimers");
      }, 1000);
    }
  },
  modules: {}
});
