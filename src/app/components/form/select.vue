<template>
    <div>
        <div class="select" ref="select">
            <div class="select-inputBox" @click="onSelectInput">
                <input
                    type="text"
                    :placeholder="placeholder"
                    readonly
                    class="select-input"
                    ref="select-input"
                    v-model="label"
                    @blur="onBlur"
                />
                <img
                    src="@/assets/imgs/bottom_arrows_icon.png"
                    alt=""
                    :class="[
                        'pullDown-arrows-icon',
                        isFocus && 'pullDown-arrows-icon_active'
                    ]"
                />
            </div>
            <div class="select-list" ref="select-list" v-show="isFocus">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
// select的input在ios中点击别处不能失去焦点
export default {
    props: {
        placeholder: {
            type: String,
            default: ''
        },
        value: {
            type: [String, Number],
            default: ''
        }
    },

    model: {
        prop: 'value',
        event: 'change'
    },

    data() {
        return {
            isFocus: false,
            label: '',
            val: this.value
        };
    },

    watch: {
        value: {
            handler(n) {
                this.val = n;
                this.initSyncLabelValueData();
            },
            deep: true,
            immediate: true
        },

        val(n) {
            this.$emit('change', n);
        },

        isFocus(n) {
            const viewPortHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            let select_list_el = this.$refs['select-list'];

            if (n) {
                this.$nextTick(callback => {
                    if (
                        select_list_el.getBoundingClientRect().top +
                            select_list_el.getBoundingClientRect().height >
                        viewPortHeight
                    ) {
                        select_list_el.style.top = `-${select_list_el.getBoundingClientRect()
                            .height + 4}px`;
                    }
                });
            } else {
                select_list_el.style = '';
            }
        }
    },

    mounted() {
      // 多次绑定事件
      // document.body.addEventListener('touchend', (e) => {
      //   // e.stopPropagation();
      //   const { offsetParent, localName } = e.target;
      //   if(offsetParent.className.indexOf('select') < 0 && localName !== 'input') {
      //     this.isFocus = false;
      //   }
      // });
      // if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
      //   document.body.ontouchend = this.onBodyTouchend; //pc 端有效（isFocus 值打印后已改变， 但查看Vue data.isFocus 的变量未改变）
      // }

      // setInterval(callback => {
      //   console.log('setInterval isFocus:', this.isFocus);
      // }, 1000);


      if(/iPhone|mac|iPod|iPad/i.test(navigator.userAgent)){
        document.body.addEventListener('touchend', this.onBodyTouchend);
      }
    },

    methods: {
      onBodyTouchend(e) {
        const { offsetParent, localName } = e.target;

        if(offsetParent.className.indexOf('select') < 0 && localName !== 'input') {
          this.isFocus = false;
          console.log('onBodyTouchend isFocus:', this.isFocus);
        }
      },

        onBlur() {
          this.clickTagEl(this.$refs['select-list'], status => {
            this.isFocus = false;
            document.onmouseup = null;
          });
        },

        clickTagEl(el, callback) {
            document.onmouseup = () => {
                let e = event || window.event,
                    target = event.target || event.srcElement,
                    click_el = el;

                if (!(target === click_el) && !click_el.contains(target)) {
                    callback(false);
                } else {
                    callback(true);
                }
            };
        },

        onSelectInput(e) {
            this.isFocus = !this.isFocus;
            console.log('onSelectInput isFocus:', this.isFocus);

            if (this.isFocus) {
              this.$refs['select-input'].focus();
            }
        },

        /**
         * 初始化同步label value数据
         * 避免验证冲突
         * */

        initSyncLabelValueData() {
            this.$nextTick(callback => {
                const { $children } = this;

                for (let i = 0; i < $children.length; i++) {
                    if (this.value === $children[i].value) {
                        this.label = $children[i].label;
                        break;
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import url('./index.css');

.select {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 12px;
    height: 44px;
    background-color: #f7f7f7;
    border-radius: 4px;
    .select-inputBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        input {
            flex: 1;
            background-color: transparent;
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(29, 32, 40, 1);
            line-height: normal;
            &::placeholder {
                color: rgba(29, 32, 40, 0.3);
            }
        }
        .pullDown-arrows-icon {
            width: 16px;
            height: 16px;
            transition: all 90ms ease-out;
        }
        .pullDown-arrows-icon_active {
            transform: rotate(-180deg);
            transition: all 150ms ease-in;
        }
    }
}

.select-list {
    position: absolute;
    left: 0;
    top: 110%;
    z-index: 9;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    max-height: 200px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 4px;
}
</style>
