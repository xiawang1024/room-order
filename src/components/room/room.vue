<template>
    <div class="room">
        <div class="item" v-for="n of 10" @click="goToOrder">
            <p class="num">房间号：{{n}}</p>
            <p class="state">房间状态：可预约</p>
        </div>
    </div>
</template>

<script>
export default {
    name:'name',
    data() {
        return {

        }
    },
    created() {

    },
    methods:{
        goToOrder() {
            this.$router.push({path:'/order'})
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'
.room
    display flex
    align-items center
    flex-wrap wrap
    width 100%
    height 200px   
    padding 0 40px
    box-sizing border-box     
    .item
        @media screen and (min-width:601px)
            flex 0 0 2.125rem
            height 2.125rem
            font-size 20px
        @media screen and (min-device-width :376px) and (max-device-width:600px)
            flex 0 0 2.9rem            
            height 2.9rem
            font-size 36px
        @media screen and (max-device-width:375px)
            flex 0 0 4.4rem
            height 4.4rem
            font-size 36px
        display flex
        flex-wrap wrap
        align-items center
        background #999999
        text-align center
        margin 10px
        box-sizing border-box
        .num,.state
            flex 0 0 100%
            width 100%
</style>
