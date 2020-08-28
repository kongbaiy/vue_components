<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        model: {
            type: Object,
            default: () => {}
        },

        rules: {
            type: Object,
            default: () => {}
        }
    },

    data() {
        return {};
    },

    computed: {
        modelData() {
            return JSON.parse(JSON.stringify(this.model));
        }
    },

    watch: {
        modelData: {
            handler(n, o) {
                const { rules, $children } = this;

                for (let i in rules) {
                    if (n[i] !== o[i]) {
                        for (let e = 0; e < $children.length; e++) {
                            if (
                                i === $children[e].prop &&
                                $children[e].required
                            ) {
                                rules[i](n[i], res => {
                                    if (typeof res === 'object') {
                                        $children[e].setMsg(res.message);
                                    } else if (
                                        n[i] &&
                                        $children[e].errMsg.length
                                    ) {
                                        $children[e].setMsg();
                                    }
                                });
                                break;
                            }
                        }
                    }
                }
            },
            deep: true
        }
    },

    mounted() {
        const refs = this.$parent.$refs;

        for (let i in refs) {
            refs[i].validate = this.validateCallback;
        }
    },

    methods: {
        /**
         * 自定义组件方法没做函数校验
         * */
        validateCallback(fun) {
            const { model, rules, $children } = this;
            let valid = true, el_identifier;

            for (let i in rules) {
                for (let e = 0; e < $children.length; e++) {
                    if (i === $children[e].prop && $children[e].required) {
                        rules[i](model[i], res => {
                            if (typeof res === 'object') {
                                if (!el_identifier) el_identifier = i;

                                valid = false;
                                $children[e].setMsg(res.message);
                            } else {
                                $children[e].setMsg();
                            }
                        });
                        break;
                    }
                }
            }
            $children.map(item => {
                if (item.prop === el_identifier) {
                    window.scrollTo({
                        top: item.$el.offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
            fun(valid);
        }
    }
};
</script>
