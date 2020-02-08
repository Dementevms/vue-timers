<template>
  <el-menu
    :default-active="`${activeIndex}`"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item
      v-for="(item, index) in items"
      :key="index"
      :index="`${index}`"
    >
      {{ item.title }}
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      activeIndex: null
    };
  },
  watch: {
    items() {
      this.init();
    }
  },
  methods: {
    init() {
      this.activeIndex = this.items.findIndex(
        item => item.to === this.$route.path
      );
    },
    handleSelect(key) {
      this.$router.push(this.items[key].to);
    }
  }
};
</script>
