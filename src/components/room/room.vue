<template>
    <div class="room-wrap">
      <h2 class="title">河南广播录制间预约系统</h2>
      <div class="room">
          <div class="item" v-for="item in roomList" :key="item.roomId" @click="goToOrder(item.roomId)">
              <p class="num">{{item.roomname}}</p>
              <p class="address">{{item.address.slice(4)}}</p>
              <p class="state">房间状态：可预约</p>
          </div>
      </div>
    </div>
</template>

<script>
import { getRoomList } from '@/api'
export default {
  name:'room',
  data() {
      return {
        roomList:[]
      }
  },
  created() {
    this._getRoomList('C0003')
  },
  mounted() {
    eventBus.$on('loginOut',() => {
      this._getRoomList('C0003')
    })
    eventBus.$on('login',(username) => {
      this._getRoomList(username)
    })
  },
  methods:{
    _getRoomList(username) {
      getRoomList(username).then((res) => {
        let data = res.data
        let { roomList } = data
        this.$nextTick(() => {
          this.roomList = roomList
        })
      })
    },
    goToOrder(n) {
      console.log(window.localStorage.isLogin)
      if(this._isLogin()) {
        eventBus.$emit('order',n)
        this.$router.push({path:'/order',query:{roomId:n}})
      }else {
        this.$toasted.show('请先进行刷卡登录，谢谢！',{type:'error'})
        this.$router.push({path:'/login'})
      }
    },
    _isLogin() {
      let isLogin = window.localStorage.isLogin
      if(isLogin == 1) {
        return true
      }else {
        return false
      }
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
  padding: 0 40px 0 40px;
  box-sizing: border-box;
  overflow: auto;
  -webkit-overflow-scrolling: touch;

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
    background: rgba(0, 0, 0, 0.3);
    text-align: center;
    margin: 10px;
    box-sizing: border-box;

    .num, .state, .address {
      flex: 0 0 100%;
      width: 100%;
    }
  }
}
</style>
