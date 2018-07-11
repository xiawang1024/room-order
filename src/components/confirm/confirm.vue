<template>
 <div class="confirm" v-show="isOff">
   <div class="mark" ></div>
   <div class="body" >
     <h3 class="title">确认您的预约信息</h3>
     <div class="cont" v-if="orderInfo">
       <p class="desc">录播间名称：{{orderInfo.orderRoomName}}</p>
       <p class="desc">录播间地址：{{orderInfo.orderRoomAddress}}</p>
       <p class="desc">预约时间：{{orderInfo.orderTime}}</p>
     </div>
     <div class="btns-wrap">
       <button class="no" @click="off">取消</button>
       <button class="yes" @click="yesOrder">预约</button>
     </div>
   </div>
 </div>
</template>

<script>
 export default {
   name:'confirm',
   data () {
     return {
      //  isOff:true
     }
   },
   props:{
     isOff:{
       type:Boolean,
       default:false
     },
     orderInfo:{
       type:Object,
       default:() => {
         return {
         }
       }
     }
   },
   methods:{
     off() {
       this.$emit('cancelOrder')
     },
     yesOrder() {
       this.$emit('yesOrder')
     }
   }
 }
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

.confirm {
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
    background: rgba(0, 0, 0, 0.5);
  }

  .body {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    height: 400px;
    border-radius: 10px;
    padding: 30px;
    background: #fff;
    box-sizing: border-box;

    .title {
      text-align: center;
      font-size: 38px;
      font-weight: bold;
    }

    .cont {
      margin-top: 30px;
      margin-left: 30px;
      font-size: 30px;

      .desc {
        line-height: 1.8;
      }
    }

    .btns-wrap {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 30px;
      width: 100%;
      padding: 0 80px;
      box-sizing: border-box;

      button {
        display: inline-block;
        width: 150px;
        height: 70px;
        background: #0081dc;
        border: none;
        border-radius: 4px;
        outline: none;
        color: #ffffff;
        font-size: 32px;

        &:active {
          background: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
}
</style>
