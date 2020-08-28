<template>
    <div class="radio-itemBox">
        <div :class="['radio-item', $parent.$data.radioValue === value &&'radio-item_active']" @click="onRadioItem(label, value)">{{label}}</div>
    </div>
</template>

<script>
    export default {
        props: {
            label: {
                type: String,
                default: ''
            },
            value: {
                type: String,
                default: ''
            }
        },

        methods: {
            onRadioItem(label, value) {
                this.$parent.$data.label = label;
                this.$parent.$data.radioValue = value;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .radio-itemBox {
        .radio-item {
            width: 163px;
            height: 44px;
            background-color: #F8F8F8;
            border: 1px solid rgba(248,248,248,1);
            border-radius: 4px;
            font-size: 16px;
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            color: rgba(29,32,40,1);
            text-align: center;
            line-height: 44px;
        }

        .radio-item_active {
            background-color: rgba(38,137,254, 0.1);
            border: 1px solid rgba(38,137,254,1);
            color: rgba(38,137,254,1);
        }
    }
</style>
