<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl'
#app
  width 1080px
  margin 0 auto
</style>
