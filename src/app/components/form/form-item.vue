<template>
    <div class="form-item">
        <p class="label">
            <span class="required-logo" v-if="required">*</span>{{label}}
        </p>
        <slot></slot>
        <p class="hint-info">{{errMsg}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            required: {
                type: Boolean,
                default: false
            },
            label: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
                default: ''
            }
        },

        data() {
            return {
                errMsg: ''
            }
        },

        methods: {
            setMsg(msg) {
                this.errMsg = msg || '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-item {
        .label {
            min-height: 28px;
            font-size: 12px;
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            color: #929498;
            .required-logo {
                color: #FF2352;
            }
        }

        .hint-info {
            min-height: 16px;
            font-size: 12px;
            font-family: PingFangSC-Regular,PingFang SC;
            font-weight: 400;
            word-break: break-all;
            color: #FF2352;
            line-height: 16px;
        }
    }

</style>

