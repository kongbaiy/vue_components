<template>
  <div>
    <h1>virtual list</h1>
    <virtual-scroller v-model="list" @scrollTop="onScrollTop" @scrollBottom="onScrollBottom">
      <template slot-scope="scope">
        <div class="list-item">{{ scope.title }}{{ scope.index }}</div>
      </template>
    </virtual-scroller>
  </div>
</template>

<script>
export default {
  components: {
    VirtualScroller: () => import("@/app/components/list/VirtualScroller"),
  },

  data() {
    return {
      page: 1,
      list: [],
    };
  },

  mounted() {
    this.renderList();
  },

  methods: {
    onScrollTop() {
      console.log('yes scroll top');
    },
    onScrollBottom() {
      console.log('yes scroll bottom');
      this.renderList(true);
    },

    renderList(isMore) {
      console.log('isMore:', isMore);
      let arr = [];
      for (let i = 0; i < 20; i++) {
        arr.push({
          title: "list",
          index: i + 1,
        });
      }

      if(isMore) {
        arr = this.list.concat(arr);
      }
      this.list = arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.list-item {
  height: 110px;
  background-color: #ddd;
  border-bottom: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  font-size: 30px;
  line-height: 110px;
}
</style>
