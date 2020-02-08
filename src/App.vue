<template>
  <div id="app">
    <Menu :items="navItems" />
    <router-view />
  </div>
</template>

<script>
import Menu from "./components/Menu";

export default {
  name: "app",
  components: {
    Menu
  },
  data() {
    return {
      navItems: [],
      stoptedTimers: []
    };
  },
  computed: {
    timers() {
      return this.$store.state.timers;
    }
  },
  watch: {
    timers(value) {
      this.checkStoptedTimers(value);
    }
  },
  mounted() {
    this.$store.dispatch("setTimers").then(() => {
      this.$store.dispatch("startTimers");
      this.navItems = this.getNavItems();
    });
  },
  methods: {
    getNavItems() {
      const items = [{ title: "Home", to: "/" }];
      this.timers.forEach(timer => {
        items.push({ title: timer.name, to: `/${timer.name}` });
      });
      return items;
    },
    checkStoptedTimers(timers) {
      timers.forEach(timer => {
        const exist = this.stoptedTimers.includes(timer.name);
        if (timer.time <= 0 && !exist) {
          this.stoptedTimers.push(timer.name);
          this.notify("App", `Timer ${timer.name} stopted!`);
        }
      });
    },
    notify(title, message) {
      const h = this.$createElement;
      this.$notify({
        title,
        message: h("i", { style: "color: teal" }, message)
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
