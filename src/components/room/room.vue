<template>
    <div class="room-wrap">
      <h2 class="title">河南广播电视台直播间预约系统</h2>
      <div class="room">
          <div class="item" v-for="n of 26" @click="goToOrder(n)">
              <p class="num">房间号：{{n}}</p>
              <p class="state">房间状态：可预约</p>
          </div>
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
        goToOrder(n) {
          eventBus.$emit('order',n)
          this.$router.push({path:'/order'})
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

.room-wrap {
  position: fixed;
  width: 1080px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.title {
  text-align: center;
  font-size: 50px;
  padding: 28px 0;
}

.room {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 1080px;
  padding: 0 40px;
  box-sizing: border-box;
  overflow: auto;

  .title {
    display: block;
    font-size: 30px;
  }

  .item {
    @media screen and (min-width: 601px) {
      flex: 0 0 2.125rem;
      height: 2.125rem;
      font-size: 20px;
    }

    @media screen and (min-device-width: 376px) and (max-device-width: 600px) {
      flex: 0 0 2.9rem;
      height: 2.9rem;
      font-size: 36px;
    }

    @media screen and (max-device-width: 375px) {
      flex: 0 0 4.4rem;
      height: 4.4rem;
      font-size: 36px;
    }

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: #999999;
    text-align: center;
    margin: 10px;
    box-sizing: border-box;

    .num, .state {
      flex: 0 0 100%;
      width: 100%;
    }
  }
}
</style>
