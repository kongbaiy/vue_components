<template>
  <div class="virtual-scroll-container" :style="{ height }" @scroll="_onScroll">
    <div class="content" :style="{ height: contentHeight }">
      <div class="viewing-area">
        <div
          v-for="(item, index) in list"
          :key="'slotbox_' + index"
          ref="slotbox"
          class="slot-box"
        >
          <slot v-bind="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: "value",
    event: "update",
  },

  props: {
    value: {
      type: Array,
      default: () => [],
    },
    height: {
      type: String,
      default: "100vh",
    },
    showNumber: {
      type: Number,
      default: 10,
    },
    triggerDistance: {
      type: Number,
      default: 20,
    },
  },

  data() {
    return {
      slotBoxHeight: 1,
      scrollTopVal: 0,
      pervScrollNum: 0,
      timeout: "",
    };
  },

  computed: {
    list() {
      const { value, scrollTopVal, slotBoxHeight, showNumber } = this;
      const start = Math.floor(scrollTopVal / slotBoxHeight),
        end = start + showNumber;

      return value.slice(start, end);
    },

    contentHeight() {
      const { value, slotBoxHeight } = this;

      return slotBoxHeight * (value.length - 1) + "px";
    },
  },

  mounted() {
    this.$nextTick(callback => {
      this.slotBoxHeight = this.$refs["slotbox"][0].offsetHeight;
    });
  },

  methods: {
    _onScroll({ target }) {
      const { scrollTop, scrollHeight, offsetHeight } = target;
      const { slotBoxHeight, triggerDistance } = this;
      const VA = document.querySelector(".viewing-area");
      const curr_scroll_num = Math.floor(scrollTop / slotBoxHeight);

      if (this.scrollTopVal && scrollTop < this.scrollTopVal) {
        if (triggerDistance && scrollTop <= triggerDistance) {
          this.$emit("scrollTop");
        }

        if (scrollTop < this.scrollTopVal && scrollTop < slotBoxHeight) {
          VA.setAttribute("style", `transform: translateY(${scrollTop}px)`);
        }
      } else {
        if (scrollTop >= scrollHeight - offsetHeight - triggerDistance) {
          this._antiShake(() => {
            this.$emit("scrollBottom");
          });
        }
      }

      if (this.pervScrollNum != curr_scroll_num) {
        this.pervScrollNum = curr_scroll_num;
        VA.setAttribute("style", `transform: translateY(${scrollTop}px)`);
      }
      this.scrollTopVal = scrollTop;
    },

    _antiShake(callback) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        callback();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.virtual-scroll-container {
  overflow: auto;
  .content {
    overflow: hidden;
  }
}
</style>
