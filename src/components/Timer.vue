<template>
  <div class="timer">
    <h1>This is an timer page: {{ id }}</h1>
    <div class="timer__value">{{ printTime }}</div>
  </div>
</template>

<script>
export default {
  name: "Timer",
  data() {
    return {
      id: null
    };
  },
  computed: {
    time() {
      const timer = this.$store.state.timers.find(
        timer => timer.name === this.id
      );
      return timer ? timer.time : null;
    },
    printTime() {
      const time = this.time;
      const h = this.getHours(time);
      const m = this.getMinutes(time);
      const s = this.getSeconds(time);
      return `${h}:${m}:${s}`;
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.id = to.params.id;
    next();
  },
  mounted() {
    this.id = this.$route.params.id;
  },
  methods: {
    getHours(time) {
      const h = parseInt(time / 3600);
      return h > 9 ? h : `0${h}`;
    },
    getMinutes(time) {
      const m = parseInt((time / 60) % 60);
      return m > 9 ? m : `0${m}`;
    },
    getSeconds(time) {
      const s = parseInt((time % 3600) % 60);
      return s > 9 ? s : `0${s}`;
    }
  }
};
</script>
