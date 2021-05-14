<template>
  <div>
    <!-- <ul class="list" @scroll="onListScroll">
      <li class="list-item" v-for="(item, index) in list" :key="index">
        {{ item.title }}
      </li>
    </ul> -->
    <virtual-scroller :data="list" @add="onAdd">
      <div class="list-item" v-for="(item, index) in list" :key="index">{{ item.title }}</div>
    </virtual-scroller>
  </div>
</template>

<script>
export default {
  components: {
    VirtualScroller: () => import('@/app/components/list/VirtualScroller')
  },

  data() {
    return {
      list: [
        { title: "list title1" },
        { title: "list title2" },
        { title: "list title3" },
        { title: "list title4" },
        { title: "list title5" },
        { title: "list title6" },
        { title: "list title7" },
        { title: "list title8" },
        { title: "list title9" },
        { title: "list title10" },
        { title: "list title11" },
        { title: "list title12" },
        { title: "list title13" },
        { title: "list title14" },
        { title: "list title15" },
        { title: "list title16" },
        { title: "list title17" },
        { title: "list title18" },
        { title: "list title19" },
        { title: "list title20" },
      ],
      scrollTop: 0,
      startSetTimeout: "",
      lock: false
    };
  },

  mounted() {},

  methods: {
    // onListScroll({ target }) {
    //   const { scrollTop, scrollHeight, offsetHeight } = target;
    //   const scroll_val = 110;

    //   if (this.scrollTop && scrollTop < this.scrollTop) {
    //     console.log("top");

    //     if (scroll_val && scrollTop <= scroll_val) {
    //       console.log("top trigger");
    //     }
    //   } else {
    //     console.log("bottom");

    //     if (scrollTop >= scrollHeight - offsetHeight - scroll_val && !this.lock) {
    //       let length = this.list.length;

    //       this.lock = true;
    //       console.log("bottom trigger");
    //       clearTimeout(this.startSetTimeout);
    //       this.list = this.list.slice(length / 2);
    //       this.startSetTimeout = setTimeout(callback => {
    //         let arr = [];

    //         for(let i = 0; i < 15; i++) {
    //           arr.push({ title: 'list title' + (length + i + 1) });
    //         }
    //         this.list = this.list.concat(arr);
    //         this.lock = false;
    //       }, 600);
    //     }
    //   }
    //   this.scrollTop = scrollTop;
    // },

    onAdd(data) {
      let arr = [], length = this.list.length;

      for(let i = 0; i < 15; i++) {
        arr.push({ title: 'list title' + (length + i + 1) });
      }
      this.$nextTick(callback => {
      this.list = data;

         this.list = this.list.concat(arr);
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.list {
  margin: 20px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: calc(100vh - 40px);
  .list-item {
    height: 60px;
    border-bottom: 1px solid;
    border-color: rgba(0, 0, 0, 0.1);
    font-size: 20px;
    line-height: 60px;
  }
}
.list-item {
    height: 60px;
    border-bottom: 1px solid;
    border-color: rgba(0, 0, 0, 0.1);
    font-size: 20px;
    line-height: 60px;
  }
</style>
