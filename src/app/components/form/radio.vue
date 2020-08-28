<template>
    <div class="radio-box">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
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
                label: '',
                radioValue: this.value
            }
        },

        computed: {
            valueChange() {
                return this.value
            }
        },

        watch: {
            radioValue: {
                handler(n) {
                    this.$emit('change', n);
                },
                deep: true
            },
            valueChange: {
                handler(n) {
                    this.radioValue = n;
                },
                deep: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .radio-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>
