<template>
  <div>
    <h1>virtual list</h1>
    <virtual-scroller v-model="list" :page="page" @load="onLoad">
      <template slot-scope="scope">
        <div class="list-item">
          {{scope.title}}{{scope.index}}
      </div>
      </template>
    </virtual-scroller>
  </div>
</template>

<script>
export default {
  components: {
    VirtualScroller: () => import('@/app/components/list/VirtualScroller'),
  },

  data() {
    return {
      page: 1,
      list: [
      ]
    };
  },

  mounted() {
    let arr = [];
    for(let i = 0;i < 20; i++) {
      arr.push({
        title: 'list',
        index: i + 1
      });
    }
     this.list = arr;
  },

  methods: {
    onLoad({ direction }) {
      // if (direction === 'up') {
      //   if(this.page < this.list.length - 1) {
      //     this.page ++;
      //   }
      // } else {
      //   if(this.page > 1) {
      //     this.page --;
      //   }
      // }
      // console.log(this.page);
    }
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
