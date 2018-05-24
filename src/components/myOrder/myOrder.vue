<template>
    <div class="my-order">
      <div class="g-hd">
        <span class="icon-back" @click="backOrder"></span>
        我的预约信息
      </div>
      <div class="m-type">
          <span class="name">预约人</span>
          <span class="room-id">预约录播间号</span>
          <span class="time-range">预约起止时间</span>
          <span class="time-created">预约时间</span>
      </div>
      <ul class="list-wrap">

        <li class="list" v-for="n of 18">
          <span class="name">预约人人</span>
          <span class="room-id">2007录播间</span>
          <div class="time-range">
            <p class="time-start">
              <span class="start"></span>
              <span class="time">2018-05-17 17:45:00</span>
            </p>
            <p class="time-end">
              <span class="end"></span>
              <span class="time">2018-05-17 18:45:00</span>
            </p>
          </div>
          <span class="time-created">2018-05-17 17:37:00</span>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  name:'my-order',
  data() {
      return {

      }
  },
  created() {
    this.roomId = this.$route.query.roomId
  },
  methods:{
    backOrder() {
      this.$router.push({path:'/order',query:{roomId:this.roomId}})
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

.my-order {
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 1080px;
  padding: 20px 40px 20px 40px;
  box-sizing: border-box;
  font-size: 27px;

  .g-hd {
    position: relative;
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    font-size: 34px;
    border-bottom: 1px solid #666;

    .icon-back {
      position: absolute;
      top: 0;
      left: 0;
      display: inline-block;
      width: 80px;
      height: 120px;
      background: url('./icon-back.png') center center no-repeat;
      background-size: contain;
    }
  }

  .m-type {
    display: flex;
    width: 100%;
    height: 120px;
    align-items: center;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    border-bottom: 1px solid #bcbcbc;

    .name {
      width: 140px;
    }

    .room-id {
      width: 240px;
    }

    .time-range {
      width: 360px;
    }

    .time-created {
      display: inline-block;
      width: 300px;
    }
  }

  .list-wrap {
    width: 1000px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    box-sizing: border-box;

    .list {
      width: 1000px;
      display: flex;
      padding: 20px 0;
      margin-right: 0;
      align-items: center;
      text-align: center;
      box-sizing: border-box;
      border-bottom: 1px dashed #ccc;

      .name {
        width: 140px;
      }

      .room-id {
        width: 240px;
      }

      .time-range {
        width: 360px;

        .time-start {
          margin-bottom: 8px;

          .start {
            vertical-align: middle;
            display: inline-block;
            width: 32px;
            height: 32px;
            background: url('./icon-start.png') center center no-repeat;
            background-size: cover;
          }

          .time {
            vertical-align: middle;
            font-size: 27px;
          }
        }

        .time-end {
          margin-top: 8px;

          .end {
            vertical-align: middle;
            display: inline-block;
            width: 32px;
            height: 32px;
            background: url('./icon-end.png') center center no-repeat;
            background-size: cover;
          }

          .time {
            vertical-align: middle;
            font-size: 27px;
          }
        }
      }

      .time-created {
        display: inline-block;
        width: 300px;
      }
    }
  }
}
</style>
