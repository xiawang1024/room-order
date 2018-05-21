<template>
  <div id="app">
    <div class="left">
      <room></room>
    </div>
    <div class="right">
      <router-view/>
    </div>
  </div>
</template>

<script>
import room from './components/room/room'
export default {
  name: 'app',
  components:{
    room
  },
  mounted() {
    const maxTime = 5  //5s 退出
    let time = maxTime
    document.body.addEventListener('click',() => {
      time = maxTime
      console.log('touch')
    },false)
    let intervalId = setInterval(() => {
      time--;
      if(time<=0) {
        this.loginOut()
        clearInterval(intervalId)
      }
    },1000)
  },
  methods:{
    loginOut() {
      console.log('退出')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

#app {
  display: flex;
}

.left {
  flex: 1;
  width: 1080px;
}

.right {
  flex: 1;
}
</style>
