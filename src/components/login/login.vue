<template>
	<div class="login">
		<h1 class="title">登录</h1>
    <img src="http://www.hndt.com/podcast/1111/res/xtmZ0Bee.png?1508751589195" alt="" class="avatar">
    <p class="name">姓名：<span class="text">{{username || '***'}}</span></p>
    <p class="code">编号：<span class="text">{{usercode || '***'}}</span></p>
    <p v-show="!isLogin" class="tips">（请刷卡后确认您的姓名和编号无误后，点击登录）</p>
    <button v-show="!isLogin" class="submit" @click="login">登录</button>
    <p v-show="isLogin" class="loginTips">登录成功，请点击左侧的房间进行预约！</p>
    <p><input type="text" id="cardId" v-model="cardId" style="ime-mode:disabled"  @blur="iptFocus"></p>
	</div>
</template>

<script>
const maxTime = 15  //n秒无操作自动退出
 export default {
	data () {
		return {
      isLogin:false,
      username:'',
      usercode:'',
      cardId:'',
      isNewGetCard:true
		}
  },
  mounted() {
    document.getElementById('cardId').focus()
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
        this.getUserInfo()
      }

    }
  },
  methods:{
    getUserInfo() {
      setTimeout(() => {
        this.username = 'wx'
        this.usercode = '020978'
      }, 500);
    },
    login() {
      let isGetCard = this._getCard() //TODO:是否刷卡  this._getCard()获取
      if(isGetCard) {
        setTimeout(() => {
          this._timeAgo()
          this.isLogin = true
          this._saveLogin()
          this.$toasted.show('登录成功！',{type:'success'})
        },1000)

      }else {
         this.$toasted.show('请先刷卡获取您的信息，谢谢！',{type:'error'})
      }
    },
    _getCard() {
      return !!(this.username && this.usercode)
    },
    _loginOut() {
      this.username = ''
      this.usercode = ''
      this.isLogin = false
      this._clearLogin()
      this.$router.push({path:'/login'})
    },
    _saveLogin() {
      window.localStorage.isLogin = 1
    },
    _timeAgo() {  //无操作自动退出  从登录开始执行
      let time = maxTime
      document.body.addEventListener('touchstart',() => {
        time = maxTime

      },false)
      document.body.addEventListener('click',() => {
        time = maxTime

      },false)
      let intervalId = setInterval(() => {
        time--;
        if(time<=0) {
          this.$toasted.show('超过15秒未操作，已自动退出！',{type:'info'})
          this.cardId = ''
          this._loginOut()
          clearInterval(intervalId)
        }
      },1000)
    },
    _clearLogin() {
      window.localStorage.isLogin = 0
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

  .avatar {
    width: 300px;
    border-radius: 50%;
    margin-top: 80px;
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
