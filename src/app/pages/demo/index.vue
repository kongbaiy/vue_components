<template>
  <div class="demo">
    <ul class="list">
      <li class="list-item" v-for="(item, index) in list" :key="index" @click="onListItem(item)">
        {{item.name}}
        <img src="@/assets/imgs/more_icon.png" alt="" class="more-icon">
      </li>
    </ul>

    <div class="view" ref="view" v-show="showView">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [],
        showView: false
      }
    },

    watch: {
      $route: {
        handler(to, from) {
          this.$nextTick(callback => {
            if (to.name === 'demo') {
              this.setViewShow(false);
            } else {
              this.setViewShow(true);
            }
          });
        },
        deep: true,
        immediate: true
      }
    },

    created() {
      const routes = this.$router.options.routes;

      for(let i = 0;i < routes.length; i++) {
        if(routes[i].name === 'demo') {
          this.list = routes[i].children;
          break;
        }
      }

    },

    methods: {
      onListItem(item) {
        this.$router.push(item.path);
      },

      /**
       * 设置视图显示
       * @param {boolean} status
       * */
      setViewShow(status) {
        const { view } = this.$refs;

        if(status) {
          this.showView = true;

          this.$nextTick(callback => {
            view.offsetHeight;
            view.setAttribute('class', 'view view_active');
          });
        } else {
          view.setAttribute('class', 'view');
        }
      }
    }
  }
</script>

<style scoped>
  .list {
    margin: 20px;
  }

  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 40px;
    border-bottom: 1px solid #F7F7F7;
    line-height: 40px;
    font-size: 16px;
  }

  .list-item * {
    color: rgba(0,0,0,0.9);
  }

  .more-icon {
    width: 15px;
  }

  .view {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    position: fixed;
    top: 0;
    left: 100%;
    z-index: 9;
    width: 100%;
    height: 100%;
    background-color: #fff;
    -webkit-transition: left 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
    transition: left 0.1s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  }

  .view_active {
    left: 0;
  }

</style>
