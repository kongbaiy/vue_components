<template>
    <div>
        <div
            :class="[
                'select-option',
                $parent.$data.val === value && 'select-option_active'
            ]"
            @click="onSelectOption(label, value)"
        >
            {{ label }}
        </div>
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
        onSelectOption(label, value) {
            this.$parent.$data.label = label;
            this.$parent.$data.val = value;
        }
    }
};
</script>

<style lang="scss" scoped>
.select-option {
    padding: 6px 12px;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(29, 32, 40, 0.6);
    line-height: 20px;
}

.select-option_active {
    color: rgba(29, 32, 40, 1);
    background-color: #f7f7f7;
}
</style>
