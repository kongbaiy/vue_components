<template>
    <div>
        <ul class="list" @scroll="onListScroll">
            <li class="list-item" v-for="(item, index) in 11" :key="index">{{'item' + index}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                list: [
                    
                ],
                scrollTop: 0
            }
        },

        mounted() {
        },

        methods: {
            onListScroll({ target }) {
                const { scrollTop, scrollHeight, offsetHeight } = target;
                const scroll_trigger_val = 110;

                if(this.scrollTop && scrollTop < this.scrollTop) {
                    console.log('top');

                    if(scroll_trigger_val && scrollTop <= scroll_trigger_val) {
                        console.log('top trigger');
                    }
                } else {
                    console.log('bottom');

                    if(scrollTop >= scrollHeight - offsetHeight - scroll_trigger_val) {
                        console.log('bottom trigger');
                    }
                }
                this.scrollTop = scrollTop;
            },


        }
        
    }
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
            border-color: rgba(0,0,0,0.1);
            font-size: 20px;
            line-height: 60px;
        }
    }
</style>