import dataTimers from "../assets/data-timers.json";

export default {
  getTimers() {
    return new Promise(res => {
      setTimeout(() => {
        res(dataTimers);
      }, 1000);
    });
  }
};
