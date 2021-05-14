<template>
  <div>
    <div :style="{ height }" class="scroll" @scroll="onScroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import VirtualScrolled from '@/utils/VirtualScroller';

export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '100vh'
    },
    triggerDistance: {
      type: Number,
      default: 100
    }
  },

  data() {
    return {
      scrollTopVal: 0,
      lock: false
    }
  },

  methods: {
    onScroll({ target }) {
      const { scrollTop, scrollHeight, offsetHeight } = target;
      const { data, triggerDistance, scrollTopVal } = this;
      const handel = VirtualScrolled(data);

      if (scrollTopVal && scrollTop < scrollTopVal) {
        if (triggerDistance && scrollTop <= triggerDistance) {
        }
      } else {
        if (scrollTop >= scrollHeight - offsetHeight - triggerDistance && !this.lock) {
          this.lock = true;
          handel((data) => {
            this.lock = false;
            this.$emit('add', data);
          });
        }
      }
      this.scrollTopVal = scrollTop;
    },
  }
};
</script>

<style lang="scss" scoped>
  .scroll {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
</style>
