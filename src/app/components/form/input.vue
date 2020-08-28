<template>
    <div>
        <div class="input-box">
            <input :type="type" :placeholder="placeholder" :minlength="minlength" :maxlength="maxlength" v-model="val" @blur="onBlur" @input="onInput">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            type: {
                type: String,
                default: 'text'
            },

            placeholder: {
                type: String,
                default: ''
            },

            maxlength: {
                type: String,
                default: ''
            },

            minlength: {
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
            event: 'input'
        },

        data() {
            return {
                val: this.value
            }
        },

        methods: {
            onBlur() {
                const { prop, $parent } = this.$parent;

                if (typeof  $parent.rules[prop] === 'function') {
                    $parent.rules[prop]('', res => {
                        if (!this.val.length) {
                            this.$parent.setMsg(res.message);
                        }
                    });
                }
            },

            onInput() {
                if (this.maxlength && this.val > this.maxlength) {
                    this.val = this.val.slice(0, this.maxlength)
                }

                // this.$emit('input', this.HTMLEncode(this.val));
                this.$emit('input', this.val);
            },

            /**
             * 标签转义
             * @param html
             * */
            HTMLEncode(html) {
                let temp = document.createElement('div');
                (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);

                let output = temp.innerHTML;
                temp = null;
                return output;
            },

            /**
             * 标签反转义
             * @param {string} text
             * */
            HTMLDecode(text) {
                let temp = document.createElement('div');
                temp.innerHTML = text;

                let output = temp.innerText || temp.textContent;
                temp = null;
                return output;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .input-box {
        display: flex;
        align-items: center;
        padding: 0 12px;
        height: 44px;
        background-color: #F7F7F7;
        border-radius: 4px;
        input {
            width: 100%;
            background-color: transparent;
            font-size: 16px;
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            color: rgba(29,32,40, 1);
            line-height: normal;
            &::placeholder {
                color: rgba(29,32,40, 0.3);
            }
        }
    }
</style>
