<template>
  <div class="virtual-scroll-container" :style="{ height }" @scroll="_onScroll">
    <div class="content" :style="{ height: `${(value.length - 1) * 111}px` }">
      <div class="viewing-area">
        <div v-for="(item, index) in list" :key="index" class="slot-box">
          <slot v-bind="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'update',
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    height: {
      type: String,
      default: '100vh'
    },
    page: {
      type: [Number, String],
      default: 1
    }
  },

  data() {
    return {
      scrollTopVal: 0,
      timeout: '',
      perNum: 0
    };
  },

  mounted() {
  },

  computed: {
    list() {
      const { value, scrollTopVal } = this;
      const start = Math.floor(scrollTopVal / 110),
        end = start + 10;

      return value.slice(start, end);
    }
  },

  methods: {
    _onScroll({ target }) {
      const { scrollTop } = target;
      const VA = document.querySelector(".viewing-area");
      const curNum =  Math.floor(scrollTop / 110);

      if (this.scrollTopVal && scrollTop < this.scrollTopVal) {

      } else {

      }


      // VA.setAttribute('style', `margin-top:(${scrollTop}px)`);
      if(this.perNum != curNum || scrollTop < 56) {
        this.perNum = curNum;
        VA.setAttribute('style', `transform: translateY(${scrollTop}px)`);
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
