<template>
	<div class="login">
		<h1 class="title">登录</h1>
    <img src="http://www.hndt.com/podcast/1111/res/xtmZ0Bee.png?1508751589195" alt="" class="avatar">
    <p class="name">姓名：<span class="text">{{username || '***'}}</span></p>
    <p class="code">编号：<span class="text">{{usercode || '***'}}</span></p>
    <p v-show="!isLogin" class="tips">（请刷卡后确认您的姓名和编号无误后，点击登录）</p>
    <button v-show="!isLogin" class="submit" @click="login">登录</button>
    <p v-show="isLogin" class="loginTips">登录成功，请点击左侧的房间进行预约！</p>
	</div>
</template>

<script>
const maxTime = 10  //n秒无操作自动退出
 export default {
	data () {
		return {
      isLogin:false,
      username:'',
      usercode:''
		}
  },
  mounted() {
    this._loginOut()
  },
	components: {

  },
  methods:{
    login() {
      let isGetCard = true //TODO:是否刷卡  this._getCard()获取
      if(isGetCard) {
        this._saveLogin()
        setTimeout(() => {
          this._timeAgo()
          this.isLogin = true
          this.username = 'wx'
          this.usercode = '020978'
          this.$toasted.show('登录成功！',{type:'success'})
        },1000)

      }else {
         this.$toasted.show('请先刷卡获取您的信息，谢谢！',{type:'error'})
      }
    },
    _loginOut() {
      this.username = ''
      this.usercode = ''
      this.isLogin = false
      this._clearLogin()
      this.$router.push({path:'/login'})
    },
    _getCard() {
      // TODO:刷卡
    },
    _saveLogin() {
      window.localStorage.isLogin = 1
    },
    _timeAgo() {  //无操作自动退出  从登录开始执行
      let time = maxTime
      document.body.addEventListener('touchstart',() => {
        time = maxTime
        console.log('touch')
      },false)
      document.body.addEventListener('click',() => {
        time = maxTime
        console.log('click')
      },false)
      let intervalId = setInterval(() => {
        time--;
        if(time<=0) {
          this._loginOut()
          clearInterval(intervalId)
        }
      },1000)
    },
    _clearLogin() {
      window.localStorage.isLogin = 0
    }

  }
 }
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

.login {
  width: 1080px;
  text-align: center;
  font-size: 36px;

  .title {
    font-size: 60px;
    padding-top: 100px;
  }

  .avatar {
    width: 300px;
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
