import moment from 'moment'
// 短时间
export const shortTime = function (value) {
    return moment(value).format('YYYY-MM-DD');
}

// 长时间
export const time = function (value) {
    return moment(value).format('YYYY-MM-DD HH:mm:ss');
}

//
export const leaveTime = function (value) {
    return moment(value).format('YYYY-MM-DD HH:mm');
}

// 短时间
export const monthTime = function (value) {
    return moment(value).format('YYYY-MM');
}

export const yearTime = function (value) {
    return moment(value).format('YYYY');
}

// isBefore: 判断date1是否date2之前的时间
export const isBefore = function (date1, date2) {
    return moment(date1).isBefore(date2)
}

/**  addDate: 获取几天之后的时间  days:Number 当前时间'2019/12/24',传入6,则返回'2019/12/30' */
export const addDate = function (days) {
    return moment().add(days, 'days').format('YYYY/MM/DD')
}   

// 当月第一天和最后一天   传入一个日期，返回数组['2019/12/1','2019/12/31']
export const lastDateofMonth = function (d) {
    let firstDate = moment(d).startOf('month').format('YYYY/MM/DD');
    let endDate = moment(d).endOf('month').format('YYYY/MM/DD');
    let Datearr = [];
    Datearr.push(firstDate);
    Datearr.push(endDate);
    return Datearr;
}
// 根据生日获取年龄
export const getAge = function(birth){
    // 获取年龄
    let birthday = moment(birth);
    let d = moment(); 
    let age = d.year()-birthday.year()-((d.month()<birthday.month()|| d.month()==birthday.month() && d.date()<birthday.date())?1:0);
    return age
}