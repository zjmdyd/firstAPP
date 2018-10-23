// 日期时间处理

/*
  当前时间戳(秒)
  getTime()返回从 1970 年 1 月 1 日至今的毫秒数
*/
function currentTimestamp() {
  var date = new Date()
  return date.getTime() / 1000
}

function dateWithDaySpan(span) {
  var date = new Date()
  var timeStamp = date.getTime() + 3600 * 24 * 1000 * span
  date.setTime(timeStamp)
  console.log('过期时间 = ' + date.toLocaleString())
}

/*
  时间对象
*/
function dateObject() {
  var curDate = new Date()
  console.log('当前时间_toLocaleString = ' + curDate.toLocaleString())
  console.log('当前时间_toString = ' + curDate.toString())
  console.log('当前时间_toTimeString = ' + curDate.toTimeString())
  console.log('当前时间_toDateString = ' + curDate.toDateString())
  console.log('当前时间_toUTCString = ' + curDate.toUTCString())
  console.log('当前时间_toLocaleTimeString = ' + curDate.toLocaleTimeString())
  console.log('当前时间_toLocaleDateString = ' + curDate.toLocaleDateString())
}

module.exports = {
  currentTimestamp: currentTimestamp,
  dateWithDaySpan: dateWithDaySpan,
}

/*
index.js? [sm]:41 当前时间_toLocaleString = 11/16/2017, 9:32:23 AM
index.js? [sm]:41 当前时间_toString = Thu Nov 16 2017 09:32:23 GMT+0800 (CST)
index.js? [sm]:42 当前时间_toTimeString = 09:32:23 GMT+0800 (CST)
index.js? [sm]:43 当前时间_toDateString = Thu Nov 16 2017
index.js? [sm]:44 当前时间_toUTCString = Thu, 16 Nov 2017 01:32:23 GMT
index.js? [sm]:45 当前时间_toLocaleTimeString = 9:32:23 AM
index.js? [sm]:46 当前时间_toLocaleDateString = 11/16/2017
*/