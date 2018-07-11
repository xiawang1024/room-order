<template>
 <div class="helper" v-show="isOff">
   <div class="mark"></div>
   <div class="body">
     <img src="./1.png" alt="" class="img">
     <img src="./2.png" alt="" class="img">
     <img src="./3.png" alt="" class="img">
     <img src="./4.png" alt="" class="img">
   </div>
   <div class="btn-wrap">
     <button @click="closeHelper">关闭</button>
   </div>
 </div>
</template>

<script>
 export default {
   name:'helper',
   data () {
     return {

     }
   },
   props:{
     isOff:{
       type:Boolean,
       default:false
     }
   },
   methods:{
     closeHelper() {
       this.$emit('closeHelper')
     }
   }
 }
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

.helper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  .mark {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
  }

  .body {
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 1080px;
    padding-top: 50px;
    background: #fff;
    font-size: 0;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    .img {
      width: 100%;
    }
  }

  .btn-wrap {
    position: absolute;
    top: 40%;
    right: 10%;

    button {
      display: inline-block;
      width: 160px;
      height: 80px;
      background: #0081dc;
      border: none;
      border-radius: 6px;
      outline: none;
      font-size: 32px;
      color: #ffffff;
    }
  }
}
</style>
