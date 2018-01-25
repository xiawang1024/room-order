<template>
    <div class="order">
        <div class="g-mark" v-show="isShowDate"></div>
        <div class="g-hd">
            <div class="room-info">
                <p class="room-num">房间号：1</p>
                <p class="title">
                    已选择预约时间段：
                    <span class="time-range" @click="openDate">
                        {{timeRange}}
                        <div class="date-options" v-show="isShowDate">
                            <span class="arrow"></span>
                            <div class="date" v-for="(item,index) of dateList" @click.stop="tabSwitch(item,index)">{{item}}</div>
                        </div>
                    </span>
                </p>
            </div>
             <div class="btn-wrap">
                <button class="order-btn" @click="selectYes">
                    预约
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
export default {
    name:'order',
    data (){
        return {
            tabIndex:0,
            isShowDate:false,
            dateList:[],
            timeList:[],            
            selectNum:0,
            selectStartIndex:1000,
            selectEndIndex:-1
        }
    },
    created() {
        this._initTimeArr()
        this._initDateArr()
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
        }                
    },
    watch:{
        selectNum(newVal,oldVal) {                  
            if(newVal == 2) {
                this.selectNum = 0
            } 
        }
    },
    methods:{
        tabSwitch(item,index) {
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
            this._disableArr(LIST[index],arr)    
            this.timeList = arr
        },
        _disableArr (arrList,arr) {
            let len = arrList.length;
            for(let i =0 ;i<len; i++) {
                let item = arrList[i]
                console.log('------------------------------------');
                console.log(item);
                console.log('------------------------------------');
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
            this._postTimeRange()
            setTimeout(() => {
                this._clearSelect()                
                LIST[0].push({star:'12:15',end:'12:30'})
                this._initTimeArr()
                this.$toasted.show('预约成功！',{type:'success'})
            },3500)
            
        },
        selectNo () {           
            this._clearSelect()
        },
        //异步提交数据
        _postTimeRange() {
            console.log(this.timeRange)
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
@import '~common/stylus/mixin.styl'
.order
    @media screen and (min-width:601px)       
        font-size 20px
    @media screen and (min-device-width :376px) and (max-device-width:600px)      
        font-size 36px
    @media screen and (max-device-width:375px)        
        font-size 36px
    display flex
    flex-direction column
    position fixed
    width 1080px
    height 100%
    padding 40px
    box-sizing border-box
    .g-mark        
        position fixed
        top 0
        right 0
        bottom 0
        left 0
        background rgba(0,0,0,0.6)
    .g-hd
        display flex
        height 80px
        .room-info
            width 100%
            box-sizing border-box
            .room-num,.title
                line-height 40px
                .time-range
                    position relative
                    font-weight 700
                    color #0081dc
                    cursor pointer
                    .date-options                        
                        position absolute
                        z-index 1024
                        top 46px
                        left -30px
                        width 140px
                        text-align center
                        height 130px
                        background #ffffff
                        border-radius 6px
                        cursor pointer
                        .arrow
                            position absolute
                            top -38px
                            left 50px
                            display block                                                        
                            border 20px solid rgba(0,0,0,0)
                            border-bottom-color #ffffff
                        .date
                            height 43px
                            border-bottom 1px solid #999999
                            box-sizing border-box
                            &:last-child
                                border none
        .btn-wrap
            display flex
            align-items center
            justify-content space-around
            .order-btn,.clear-btn    
                background #ffffff             
                width 140px
                height 50px
                cursor pointer
                border-radius 6px 
                font-size 16px
                outline none               
                &:active
                    background rgba(0,0,0,.2)
            .order-btn
                border 1px solid #4caf50
                color #4caf50
            .clear-btn
                border 1px solid #f44336
                color #f44336
                margin-left 10px
    .time-wrap
        flex 1
        margin-top 20px
        display flex
        flex-wrap wrap
        align-items center
        overflow auto
        &::-webkit-scrollbar-track-piece
            width 6px
            background-color:#4e4e5a  
        &::-webkit-scrollbar
            width:4px
            height:6px 
        &::-webkit-scrollbar-thumb
            height:10px
            background:#0081dc   
            cursor:pointer
        &::-webkit-scrollbar-thumb:hover
            background:#0081dc
            cursor:pointer
        .time
            display flex 
            align-items center
            justify-content center
            flex 0 0 2.26rem
            width 250px
            height 100px
            text-align center
            border 1px solid #999999
            box-sizing border-box
            cursor pointer
            &.disable
                background #ababab
            &.selected
                background: #0081dc
                color #ffffff
    
</style>
