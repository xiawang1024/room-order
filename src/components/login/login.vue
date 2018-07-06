<template>
	<div class="login">
		<h1 class="title">登录</h1>
    <div class="avatar-wrap">
      <img :src="userIcon || require('./avatar.png')" alt="" class="avatar">
    </div>
    <p class="name">姓名：<span class="text">{{username || '***'}}</span></p>
    <p class="code">编号：<span class="text">{{usercode || '***'}}</span></p>
    <p v-show="!isLogin" class="tips">（请刷卡后确认您的姓名和编号无误后，点击登录）</p>
    <!-- <touch-ripple> -->
      <button v-show="!isLogin" class="submit" @click="login">登录</button>
    <!-- </touch-ripple> -->
    <p v-show="isLogin" class="loginTips">登录成功，请点击左侧的房间进行预约！</p>
    <!-- <p>cardId：{{cardId}}{{time}}</p> -->
    <p><input type="text" id="cardId"></p>
	</div>
</template>

<script>
import { getUserInfo, login } from '@/api'
const MAX_TIME = 30 //n秒无操作自动退出
 export default {
	data () {
		return {
      time:0,
      isLogin:false,
      userIcon:'',
      username:'',
      usercode:'',
      cardId:'',
      isNewGetCard:true
		}
  },
  mounted() {
    $("#cardId").on("input propertychange", () => {
     this.cardId = $("#cardId").val()

     this._getUserInfo(this.cardId)
    });
    document.getElementById('cardId').focus()
    eventBus.$on('loginOut',() => {
      console.log('loginOut')
      this.cardId = ''
      this._loginOut()
    })
  },
	computed: {
    // usercode:function() {
    //   let len = this.cardId.length
    //   let newCode = ''
    //   if(len<=8){
    //     newCode = this.cardId
    //   }else {
    //     newCode = this.cardId.substring(len-8)
    //   }
    //   this.cardId = newCode
    //   return newCode
    // },
    userCodeId:function() {
      let len = this.cardId.length
      let newCode = ''
      if(len<=8){
        newCode = this.cardId
      }else {
        newCode = this.cardId.substring(len-8)
      }
      this.cardId = newCode
      return newCode
    }
  },
  watch:{
    userCodeId:function(newCode,oldCode) {
      if(newCode !== oldCode) {
        // alert('new')
        this.isNewGetCard = true
        //TODO:新刷卡用户...
        this._loginOut() //先退出旧用户
        // this.getUserInfo()
      }

    }
  },
  methods:{
    _getUserInfo(cardId) {

      getUserInfo(cardId).then((res) => {

        this._timeAgo()

        let data = res.data
        let userInfo = JSON.parse(data.s)
        this.username = userInfo.fConsumername
        this.usercode = userInfo.fConsumerno
        this.userIcon = userInfo.fPhotoaddr
      })

    },
    login() {
      let isGetCard = this._getCard() //TODO:是否刷卡  this._getCard()获取
      if(isGetCard) {
        eventBus.$emit('login',this.usercode)
        login(this.usercode).then(res => {
          let data = res.data
          if(data.b){
            this.isLogin = true
            this._saveLogin(data.user)
            this.$toasted.show('登录成功！',{type:'success'})
          }else {
            this.$toasted.show('登录失败，请重新刷卡登录！',{type:'success'})
          }
        })

      }else {
         this.$toasted.show('请先刷卡获取您的信息，谢谢！',{type:'error'})
      }
    },
    _getCard() {
      return !!(this.username && this.usercode)
    },
    _loginOut() {
      this.userIcon = ''
      this.username = ''
      this.usercode = ''
      this.isLogin = false
      this._clearLogin()
      this.$router.push({path:'/login'})
    },
    _saveLogin(info) {
      window.localStorage.isLogin = 1
      window.localStorage.userInfo = JSON.stringify(info)
    },
    _timeAgo() {  //无操作自动退出  从登录开始执行
      this.time = MAX_TIME;
      document.body.addEventListener('touchstart',() => {
        this.time = MAX_TIME;
      },false)
      document.body.addEventListener('click',() => {
        this.time = MAX_TIME;
      },false)
      // this.intervalId = setInterval(() => {
      //   console.log(this.time)
      //   this.time--;
      //   if(this.time<=0) {
      //     clearInterval(this.intervalId)
      //     this.$toasted.show('超过15秒未操作，已自动退出！',{type:'info'})
      //     this.cardId = ''
      //     this._loginOut()
      //   }
      // },1000)
      this.interval()
    },
    interval(){
      clearTimeout(this.timer)
      this.time--;
      if(this.time === 0){
        this.$toasted.show(`超过${MAX_TIME}秒未操作，已自动退出！`,{type:'info'})
        this.cardId = ''
        eventBus.$emit('autoLoginOut')
        this._loginOut()
      }else {
        this.timer = setTimeout(this.interval,1000)
      }
    },
    _clearLogin() {
      window.localStorage.isLogin = 0
      window.localStorage.userInfo = ''
    },
    iptFocus() {
      document.getElementById('cardId').focus()
    }
  }
 }
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

#cardId {
  position: absolute;
  top: -10px;
  // right: -100px;
  z-index: -100;
  width: 1px;
  height: 1px;
  border: none;
  background: none;
  // font-size: 10px;
  // border: 1px solid #ccc;
}

.login {
  position: relative;
  width: 1080px;
  text-align: center;
  font-size: 36px;
  background: #fff;

  .title {
    font-size: 60px;
    padding-top: 100px;
  }

  .avatar-wrap {
    margin-top: 80px;
    display: inline-block;
    width: 300px;
    height: 420px;
    // border-radius: 50%;
    overflow: hidden;
  }

  .avatar {
    width: 300px;
    height: 420px;
  }

  .name, .code {
    margin-top: 40px;
  }

  .tips {
    margin-top: 40px;
    font-size: 30px;
    color: #f44336;
  }

  .submit {
    margin-top: 80px;
    width: 300px;
    height: 80px;
    background: #0081dc;
    color: #fff;
    outline: none;
    border: none;
    border-radius: 10px;
    font-size: 36px;
    text-align: center;

    &:active {
      background: #0867ab;
    }
  }

  .loginTips {
    margin-top: 80px;
    font-size: 42px;
    color: #4caf50;
  }
}
</style>
