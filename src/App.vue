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
