<template>
  <div id="app">
    <div class="left">
      <room></room>
    </div>
    <div class="right">

        <router-view/>
      <!-- </transition> -->
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

  },
  methods:{

  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to { /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}

#app {
  width: 2160px;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}

.left {
  flex: 1;
  width: 1080px;
}

.right {
  flex: 1;
  width: 1080px;
}
</style>
