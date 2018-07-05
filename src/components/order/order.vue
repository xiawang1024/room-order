<template>
    <div class="order">
        <div class="g-mark" v-show="isShowDate"></div>
        <div class="g-hd">
            <div class="room-info">
                <p class="room-num">房间号：{{roomId}}</p>
                <p class="title">
                    已选择预约时间段：
                    <span class="time-range">
                        {{timeRange}}
                    </span>
                    <!-- <span class="time-range" @click="openDate">
                        {{timeRange}}
                        <div class="date-options" v-show="isShowDate">
                            <span class="arrow"></span>
                            <div class="date" v-for="(item,index) of dateList" @click.stop="tabSwitch(item,index)">{{item}}</div>
                        </div>
                    </span> -->
                </p>
                <div class="date-wrap">
                  日期：<div class="date" v-for="(item,index) of dateList" :class="tabIndex == index ? 'active' : ''" @click.stop="tabSwitch(item,index)">{{item}}</div>
                </div>
            </div>

            <div class="btn-wrap">
              <button class="clear-btn login-out" @click="loginOut">注销</button>
              <button class="order-btn" @click="selectYes">
                  预约
              </button>
              <button class="primary-btn" @click="myOrder">
                  我的预约
              </button>
              <button class="clear-btn" @click="selectNo">
                  重新选择
              </button>
            </div>
        </div>
        <div class="time-wrap" >
            <span class="time"
                ref="time"
                v-for="(item,index) of timeList"
                :class="[{disable:item.disable,selected:index == selectStartIndex || index >= selectStartIndex && index <= selectEndIndex}]"
                @click="selectTime(item,index)"
            >{{item.time}}</span>
        </div>
    </div>
</template>

<script>
const HOUR = 24
const LIST = [
            [{star:'09:00',end:'11:00'},{star:'18:15',end:'18:30'},{star:'20:45',end:'21:00'},{star:'19:15',end:'19:30'}],
            [{star:'08:00',end:'11:00'},{star:'19:15',end:'19:30'}],
            [{star:'03:15',end:'03:30'},{star:'20:45',end:'21:00'},{star:'20:00',end:'20:15'}]
        ]
import { getUserOrderInfo, postOrderInfo } from '@/api'

export default {
    name:'order',
    data (){
        return {
          roomId:1,
          surplusTime:240,
          counttimeArr:[],
          tabIndex:0,
          isShowDate:false,
          dateList:[],
          timeList:[],
          selectNum:0,
          selectStartIndex:1000,
          selectEndIndex:-1,
          time1List:[],
          time2List:[],
          time3List:[],

        }
    },
    created() {
        eventBus.$on('order',(msg) => {
          this._getUserOrderInfo(msg)
          this.roomId = msg
        })
        this.roomId = this.$route.query.roomId
        this._initTimeArr()
        this._initDateArr()
        this._getUserOrderInfo(this.roomId)
    },
    computed :{
        timeRange() {
            let time = ''
            if(this.timeList[this.selectStartIndex]) {
                time = `${this.timeList[this.selectStartIndex].time}-`
                if(this.timeList[this.selectEndIndex]) {
                    time = `${this.timeList[this.selectStartIndex].time}-${this.timeList[this.selectEndIndex].time}`
                }
            }
            return this.dateList[this.tabIndex] + ' ' + time
        },
        userTimeList() {
          let arr = []
          arr.push(this.time1List)
          arr.push(this.time2List)
          arr.push(this.time3List)
          return arr
        }
    },
    watch:{
        selectNum(newVal,oldVal) {
            if(newVal == 2) {
                this.selectNum = 0
            }
        },
    },
    methods:{
        //异步提交数据
        postTimeRange() {
          let userInfo = JSON.parse(localStorage.userInfo)
          let userId = userInfo.userId
          postOrderInfo(userId,this.roomId,this.timeRange).then(() => {

                this._clearSelect()
                this._initTimeArr('',this.tabIndex)
                this.$toasted.show('预约成功！',{type:'success'})
                this.$nextTick(() => {
                  this._getUserOrderInfo(this.roomId)
                })
          })
            console.log(this.timeRange)
        },
        _getUserOrderInfo(roomId) {

          let userInfo = JSON.parse(localStorage.userInfo)
          let userId = userInfo.userId
          getUserOrderInfo(userId,roomId).then(res => {
            let data = res.data

            let counttime = data.counttime
            let counttimeArr = counttime.split(',')
            this.counttimeArr = counttimeArr
            let { todaytime, tomtime, threetime } = data.seldate
            let timeList = []
            let time1 = ((todaytime || []))
            let time2 = ((tomtime || []))
            let time3 = ((threetime || []))
            this.time1List = time1
            this.time2List = time2
            this.time3List = time3

            this.$nextTick(()=>{
              this.tabSwitch(this.dateList[0],this.tabIndex)
            })
          })
        },
        tabSwitch(item,index) {
            this.surplusTime = 240 - parseInt(this.counttimeArr[index])
            this.tabIndex = index
            this._clearSelect()
            let suffix = ' 00:00'
            let date = item + suffix
            this._initTimeArr(date,index)
            this.isShowDate = false
        },
        openDate () {
            this.isShowDate = true
        },
        _initDateArr() {
            this.dateList = this._getDay(3)
        },
        _initTimeArr(date = '',index = 0) {
            let nowTime = new Date()
            if(index == 0) {
                nowTime = new Date()
            }else {
                nowTime = new Date(date)
            }
            let nowHour = nowTime.getHours()
            let nowMinute = nowTime.getMinutes()
            let len = nowHour
            if( nowMinute > 45 ) {
                len ++
            }
            let arr = []

            for(let hour = 0; hour < HOUR; hour++){
                let minute = '00'
                for(let j = 0; j<4; j++){
                    let disable = false
                    if(hour == nowHour) {
                        if(Number(minute) < nowMinute ) {
                            disable = true
                        }
                    }
                    arr.push({
                        time:`${hour}:${minute}`,
                        disable:disable
                    })
                    if(minute == '00'){
                        minute = 0
                    }
                    minute += 15
                }
            }
            // for(let hour = len; hour < HOUR; hour++){
            //     let minute = '00'
            //     for(let j = 0; j<4; j++){
            //         let disable = false
            //         if(hour == nowHour) {
            //             if(Number(minute) < nowMinute ) {
            //                 disable = true
            //             }
            //         }
            //         arr.push({
            //             time:`${hour}:${minute}`,
            //             disable:disable
            //         })
            //         if(minute == '00'){
            //             minute = 0
            //         }
            //         minute += 15
            //     }
            // }
            // console.log(len)
            if(index == 0) {
                arr = arr.slice(len*4)
            }
            if(this.userTimeList.length > 0) {
              this._disableArr(this.userTimeList[index],arr)

            }
            this.timeList = arr
        },
        _disableArr (arrList,arr) {
            let len = arrList.length;
            for(let i =0 ;i<len; i++) {
                let item = arrList[i]
                // console.log('------------------------------------');
                // console.log(item);
                // console.log('------------------------------------');
                arr.forEach((val,index,arr) => {

                    if(this._deletZero(val.time) >= this._deletZero(item.star) && this._deletZero(val.time) <= this._deletZero(item.end)){
                        arr[index].disable = true

                    }

                })
            }
            return arr
        },
        _deletZero (val) {
            let prefix = '2000/01/01 '
            return new Date(prefix+val).getTime();
        },
        selectYes() {
            if(this.selectStartIndex == 1000) {
                this.$toasted.show('请选择开始时间！',{type:'error'})
                return
            }
            if(this.selectEndIndex == -1) {
                this.$toasted.show('请选择结束时间！',{type:'error'})
                return
            }
            this.$toasted.show('数据玩命提交中，请耐心等待！',{type:'info'})
            this.postTimeRange()


        },
        selectNo () {
            this._clearSelect()
        },
        myOrder() {

          this.$router.push({path:'/myOrder',query:{roomId:this.roomId}})
        },
        loginOut(){
          eventBus.$emit('loginOut')
        },

        selectTime(item,index) {
            if(item.disable) {
                this.$toasted.show('此时间段不可预约！',{type:'error'})
                return
            }
            this.selectNum ++
            if(this.selectNum == 1) {
                this.startTime = item.time
                this.selectStartIndex = index
                this.selectEndIndex = -1
            }else if (this.selectNum == 2) {
                if(this.selectStartIndex == index ) {
                    this.$toasted.show('开始时间和结束时间不能相同！',{type:'error'})
                    this._clearSelect()
                    this._removeClass(index)
                    return
                }
                this.selectEndIndex = index
                this.endTime = item.time
                //开始时间，结束时间大小交换
                if(this.selectEndIndex < this.selectStartIndex) {
                    let c = this.selectStartIndex
                    this.selectStartIndex = this.selectEndIndex
                    this.selectEndIndex = c
                }
                this._acrossTimeRange(this.selectStartIndex,this.selectEndIndex)
                this._rangeTimeLimit(this.selectStartIndex,this.selectEndIndex)
            }
        },
        //判断时间段交叉
        _acrossTimeRange(start,end) {
            for(let i =start;i<end;i++) {
                let item = this.timeList[i]
                if(item.disable) {
                    this.$toasted.show('此时间段交叉，请重新选择！',{type:'error'})
                    this._clearSelect()
                    this._removeClass(start)
                    this._removeClass(end)
                    return
                }
            }
        },
        //限制时间段范围选择
        _rangeTimeLimit(start,end) {
          let surplusTime = this.surplusTime
          let surplusIndex = surplusTime / 15
          if(end - start >= surplusIndex) {
            this.$toasted.show('今日总预约时间已超过上限4个小时！请缩小时间范围再次尝试！',{type:'error'})
            this._clearSelect()
            this._removeClass(start)
            this._removeClass(end)
            return
          }
        },
        _removeClass(index) {
            this.$refs.time[index].classList.remove('selected')
        },
        _clearSelect() {
            this.selectStartIndex = 1000
            this.selectEndIndex = -1
        },
        _getDay(day) {
            let dateArr = []
            for(let i = 0;i<day; i++) {
                let date = new Date()
                date.setDate(date.getDate() + i)
                let y = date.getFullYear(),
                    m = date.getMonth() + 1,
                    d = date.getDate();
                    dateArr.push(`${y}-${m}-${d}`)
            }
            return dateArr
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin.styl';

.order {
  @media screen and (min-width: 601px) {
    font-size: 20px;
  }

  @media screen and (min-device-width: 376px) and (max-device-width: 600px) {
    font-size: 36px;
  }

  @media screen and (max-device-width: 375px) {
    font-size: 36px;
  }

  display: flex;
  flex-direction: column;
  position: fixed;
  width: 1080px;
  height: 100%;
  padding: 30px 40px 30px 40px;
  box-sizing: border-box;

  .g-mark {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .g-hd {
    display: flex;
    height: 165px;
    flex: none;

    .room-info {
      width: 100%;
      box-sizing: border-box;

      .title {
        margin-top: 10px;
      }

      .date-wrap {
        margin-top: 10px;
        display: flex;
        line-height: 40px;
        font-size: 26px;

        .date {
          margin-right: 16px;
          border: 1px solid #ccc;
          padding: 5px 10px;
          border-radius: 8px;

          &.active {
            background: #0081dc;
            color: #fff;
          }
        }
      }

      .room-num, .title {
        line-height: 40px;
        font-size: 26px;

        .time-range {
          position: relative;
          font-weight: 700;
          color: #0081dc;
          cursor: pointer;

          .date-options {
            position: absolute;
            z-index: 1024;
            top: 46px;
            left: -30px;
            width: 140px;
            text-align: center;
            height: 130px;
            background: #ffffff;
            border-radius: 6px;
            cursor: pointer;

            .arrow {
              position: absolute;
              top: -38px;
              left: 50px;
              display: block;
              border: 20px solid rgba(0, 0, 0, 0);
              border-bottom-color: #ffffff;
            }

            .date {
              height: 43px;
              border-bottom: 1px solid #999999;
              box-sizing: border-box;

              &:last-child {
                border: none;
              }
            }
          }
        }
      }
    }

    .btn-wrap {
      display: flex;
      align-items: center;
      justify-content: space-around;

      .login-out {
        position: absolute;
        top: 20px;
        right: 40px;
      }

      .order-btn, .clear-btn, .primary-btn {
        background: #ffffff;
        width: 120px;
        height: 52px;
        cursor: pointer;
        border-radius: 6px;
        font-size: 16px;
        outline: none;

        &:active {
          background: rgba(0, 0, 0, 0.2);
        }
      }

      .order-btn {
        border: 1px solid #4caf50;
        color: #4caf50;
      }

      .primary-btn {
        margin-left: 10px;
        border: 1px solid #0081dc;
        color: #0081dc;
      }

      .clear-btn {
        border: 1px solid #f44336;
        color: #f44336;
        margin-left: 10px;
      }
    }
  }

  .time-wrap {
    // flex: 1;
    // margin-top: 65px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar-track-piece {
      width: 6px;
      background-color: #4e4e5a;
    }

    &::-webkit-scrollbar {
      width: 4px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      height: 10px;
      background: #0081dc;
      cursor: pointer;
    }

    &::-webkit-scrollbar-thumb:hover {
      background: #0081dc;
      cursor: pointer;
    }

    .time {
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 0 0 2.26rem;
      width: 250px;
      height: 100px;
      text-align: center;
      border: 1px solid #999999;
      box-sizing: border-box;
      cursor: pointer;

      &.disable {
        background: #ababab;
      }

      &.selected {
        background: #0081dc;
        color: #ffffff;
      }
    }
  }
}
</style>
