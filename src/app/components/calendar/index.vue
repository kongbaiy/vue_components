<template>
    <div>
        <div class='calendar' :style="{ height }" @scroll="_onScroll($event.target)">
           <div class="week-box">
                <div class='week'>
                    <div class='week-item'>一</div>
                    <div class='week-item'>二</div>
                    <div class='week-item'>三</div>
                    <div class='week-item'>四</div>
                    <div class='week-item'>五</div>
                    <div class='week-item'>六</div>
                    <div class='week-item'>七</div>
                </div>
                <div class="week-blank"></div>
           </div>

            <div :id='"ym_" + item.year + "-" +item.month' class='month' v-for='(item, index) in dates' :key='index'>
                <p class='date'>{{item.year || '--'}} 年 {{item.month || '--'}} 月</p>
                <div class='days'>
                    <div :class='["day", activeMonthIndex == index && activeDayIndex == cindex && "active-day"]' v-for='(citem, cindex) in item.date' :key='cindex'>
                        <div class='day-content' v-if='citem' @click="_getDay(index, item, cindex, citem)">
                            <p class='day-text'>{{citem.day}}</p>
                            <p class="day-hint">{{citem.holiday}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getLunarDate, getLunarDateString } from './LunarCalendar'

    export default {
        props: {
            height: {
                type: String,
                default: "100vh"
            },

            // 距离底部触发值
            lowerTriggerValue: {
                type: [String, Number],
                default: 600
            },

            showToDay: {
                type: Boolean,
                default: true
            }
        },

        data(){
            return {
                dates: [],
                getLunarDate,
                getLunarDateString,
                activeMonthIndex:  -1,
                activeDayIndex: -1,
                year: ''
            }
        },

        created(){
            // 初始化
            this._renderYear('', res => {
                let date = new Date(),
                    year = date.getFullYear(),
                    month = date.getMonth() + 1;

                if(month == 12){
                    this._renderYear(++ this.year);
                }
               this.$nextTick(callback => {
                    let calendar_el = document.querySelector('.calendar'),
                        month_el = document.querySelector('#ym_' + year + '-' + month),
                        week_el = document.querySelector('.week');

                    calendar_el.scrollTop = month_el.offsetTop - week_el.clientHeight;
               });
            });
        },

        methods: {
            _getDay(index, item, cindex, citem){
                this.activeMonthIndex = index;
                this.activeDayIndex = cindex;
                this.$emit('day', {
                    detail: {
                        year: item.year,
                        month: item.month,
                        day: citem.day,
                        holiday: citem.holiday
                    }
                });
            },

            _onScroll(e){
                if(e.scrollTop + e.clientHeight >= e.scrollHeight - this.lowerTriggerValue){
                    this._renderYear(++ this.year);
                }
            },

            _getLunar(year, month, day){
                if(year && month && day){
                    let lunarDate = getLunarDate(year + '-' + month + '-' + day)
                    return getLunarDateString(lunarDate);
                }
            },

            _getHoliday(params = {}){
                let bmon = params.bmon,
                    bday = params.bday,
                    smon = params.smon,
                    sday = params.sday,
                    str = "",
                    flag = "";

                if ((bmon == 1) && (bday == 1)) {
                    str = "元旦";
                    flag = "active1";
                } else if ((bmon == 3) && (bday == 8)) {
                    str = "妇女节";
                    flag = "active1";
                } else if ((bmon == 3) && (bday == 12)) {
                    str = "植树节";
                    flag = "active1";
                } else if ((bmon == 4) && (bday == 5)) {
                    str = "清明节";
                    flag = "active1";
                } else if ((bmon == 5) && (bday == 1)) {
                    str = "劳动节";
                    flag = "active1";
                } else if ((bmon == 5) && (bday == 4)) {
                    str = "青年节";
                    flag = "active1";
                } else if ((bmon == 6) && (bday == 1)) {
                    str = "儿童节";
                    flag = "active1";
                } else if ((bmon == 7) && (bday == 1)) {
                    str = "建党节";
                    flag = "active1";
                } else if ((bmon == 8) && (bday == 1)) {
                    str = "建军节";
                    flag = "active1";
                } else if ((bmon == 9) && (bday == 10)) {
                    str = "教师节";
                    flag = "active1";
                } else if ((bmon == 10) && (bday == 1)) {
                    str = "国庆节";
                    flag = "active1";
                } else if ((bmon == 12) && (bday == 24)) {
                    str = "平安夜";
                    flag = "active1";
                } else if ((bmon == 12) && (bday == 25)) {
                    str = "圣诞";
                    flag = "active1";
                } else if ((smon == "正") && (sday == "初一")) {
                    str = "春节";
                    flag = "active1";
                } else if ((smon == "正") && (sday == "十五")) {
                    str = "元宵节";
                    flag = "active1";
                } else if ((smon == "二") && (sday == "初二")) {
                    str = "龙抬头";
                    flag = "active1";
                } else if ((smon == "五") && (sday == "初五")) {
                    str = "端午节";
                    flag = "active1";
                } else if ((smon == "七") && (sday == "初七")) {
                    str = "七夕";
                    flag = "active1";
                } else if ((smon == "八") && (sday == "十五")) {
                    str = "中秋节";
                    flag = "active1";
                } else if ((smon == "九") && (sday == "初九")) {
                    str = "重阳节";
                    flag = "active1"
                } else if ((smon == "腊") && (sday == "廿三")) {
                    str = "小年";
                    flag = "active1"
                } else if ((smon == "腊") && (sday == "三十")) {
                    str = "除夕";
                    flag = "active1"
                } else {
                    str = "";
                    flag = ""
                }
                return { str, flag }
            },

            _getMonth(y, m){
                let date = new Date(),
                    year = y || date.getFullYear(),
                    month = m || date.getMonth() + 1,
                    current_day = date.getDate(),
                    days = new Date(year, month, 0).getDate(),
                    week = new Date(Date.parse(year + '/' + month + '/1')).getDay(),
                    month_days = [],
                    holiday = {};

                month_days = new Array(week > 0 ? week -= 1 : week = 6);

                for (let i = 0; i < days; i++) {
                    holiday = this._getHoliday({
                           bmon: month,
                           bday: i + 1 ,
                           smon: this._getLunar(year, month, i + 1 ) ? this._getLunar(year, month, i + 1 ).month : '',
                           sday: this._getLunar(year, month, i + 1 ).day ? this._getLunar(year, month, i + 1 ).day : ''
                    }).str;

                    if(y == date.getFullYear() && m == date.getMonth() + 1 && current_day == i + 1){
                        if(this.showToDay && !holiday){
                            holiday = '今日';
                            this.activeMonthIndex = m - 1;
                            this.activeDayIndex = (week - 1) + current_day;
                        }
                    }
                    month_days.push({ day: i + 1, holiday });
                }
               return month_days
            },

            _renderYear(year, callback){
                let date = new Date();

                this.year = year || date.getFullYear();

                for(let i = 0;i < 12; i++){
                    this.dates.push({
                        year: this.year,
                        month: i + 1,
                        date: this._getMonth(this.year, i + 1)
                    });
                }
                if(typeof callback === 'function') callback(this.year);
            }
        }
    }
</script>

<style scoped>
    div{
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-user-select: none;
        -moz-user-focus: none;
        -moz-user-select: none;
    }

    .calendar{
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .week{
        position: fixed;
        top: 0;
        left: 0;
        overflow: hidden;
        padding: 0 12px;
        width: calc(100% - 24px);
        height: 43px;
        background-color: #fff;
        border-top: 1px solid rgba(0,0,0,0.03);
    }

    .week-blank{
        height: 43px;
    }

    .week-item{
        float: left;
        margin-right: 10px;
        width: 40px;
        font-size:14px;
        font-family:Inter-Regular,Inter;
        font-weight:400;
        color:rgba(29,32,40,0.3);
        text-align: center;
        line-height: 43px;
    }

    .date{
        margin: 0 10px;
        height: 30px;
        background-color:rgba(0,0,0,0.03);
        border-radius:2px;
        font-size: 14px;
        font-family:Inter-Regular,Inter;
        font-weight:400;
        color:rgba(29,32,40,1);
        text-align: center;
        line-height: 30px;
    }

    .days{
        overflow: hidden;
        margin-top: 10px;
        padding: 0 12px;
    }

    .day{
        float: left;
        margin-bottom: 10px;
        margin-right: 10px;
        width: 40px;
        height: 40px;
        background-color: transparent;
        border-radius: 50%;
        font-size: 0;
        transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }

    .day-content{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .day-text{
        font-size:16px;
        font-family:Inter-Regular,Inter;
        font-weight:400;
        color:rgba(29,32,40,1);
        transition: all 0.1s linear;
    }

    .day-hint{
        min-height: 11px;
        font-size:8px;
        font-family:Inter-Regular,Inter;
        font-weight:400;
        color:#C9CACC;
        transition: all 0.1s linear;
    }

    .active-day{
        background-color: #2689FE;
        transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    }

    .active-day p{
        color: #fff;
        transition: all 0.1s linear;
    }
</style>
