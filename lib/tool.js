var app = getApp()

/*
  16进制字符串转整形数组
*/
function str2Bytes(str) {
  var len = str.length;
  if (len % 2 != 0) {
    return null;
  }
  var hexA = new Array();
  for (var i = 0; i < len; i += 2) {
    var s = str.substr(i, 2);
    var v = parseInt(s, 16);
    hexA.push(v);
  }

  return hexA;
}

/*
  整形数组转buffer
*/
function array2Buffer(arr) {
  let buffer = new ArrayBuffer(arr.length)
  let dataView = new DataView(buffer)
  for (let i = 0; i < arr.length; i++) {
    dataView.setUint8(i, arr[i])
  }

  return buffer
}

/*
  16进制字符串转数组
*/
function string2Buffer(str) {
  let arr = str2Bytes(str);
  return array2Buffer(arr)
}


function stringToByte(str) {
  var bytes = new Array();
  var len, c;
  len = str.length;
  for (var i = 0; i < len; i++) {
    c = str.charCodeAt(i);
    if (c >= 0x010000 && c <= 0x10FFFF) {
      bytes.push(((c >> 18) & 0x07) | 0xF0);
      bytes.push(((c >> 12) & 0x3F) | 0x80);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000800 && c <= 0x00FFFF) {
      bytes.push(((c >> 12) & 0x0F) | 0xE0);
      bytes.push(((c >> 6) & 0x3F) | 0x80);
      bytes.push((c & 0x3F) | 0x80);
    } else if (c >= 0x000080 && c <= 0x0007FF) {
      bytes.push(((c >> 6) & 0x1F) | 0xC0);
      bytes.push((c & 0x3F) | 0x80);
    } else {
      bytes.push(c & 0xFF);
    }
  }

  return array2Buffer(bytes);
} 

/*
  ArrayBuffer转十六进制字符串
*/
function uint8Array2Str(buffer) {
  var str = "";
  let dataView = new DataView(buffer)
  for (let i = 0; i < dataView.byteLength; i++) {
    var tmp = dataView.getUint8(i).toString(16)
    if (tmp.length == 1) {
      tmp = "0" + tmp
    }
    str += tmp
  }
  return str;
}

function reverse16(str16) {
  //十六进制倒序,非十六进制返回空
  var strarr = (str16 + "").split("");
  if (strarr.length % 2 == 0) {
    var s = new Array();
    for (var i = strarr.length - 1; i > 0; i = i - 2) {
      s.push(strarr[i - 1]);
      s.push(str16[i]);
    }
    var str = s.join("");
    return str;
  }
  return "";
}

/*
  delay: 秒为单位,默认1.5s
*/
function showMention(msg, hidden, delay) {
  wx.showLoading({
    title: msg,
  })

  if (hidden == true) {
    if (delay == undefined) {
      delay = 1.5
    }
    setTimeout(function () {
      wx.hideLoading()
    }, delay * 1000)
  }
}

function prePage() {
  return getPageIndex(2)
}

function getPageIndex(index) {
  var pages = getCurrentPages()  
  var page = pages[pages.length - index]
  return page
}

// 合并json数据
function combineJson(json1, json2) {
  var json = {}
  for (var attr in json1) {
    json[attr] = json1[attr]
  }

  for (var attr in json2) {
    json[attr] = json2[attr]
  }

  return json
}

// 当前时间(秒)
function currentTime() {
  var date = new Date()
  return date.getTime / 1000
}

function requestData(callBack, path, param, requestType) {
  wx.request({
    header: {
      token: app.globalData.token
    },
    url: app.globalData.kDomain + path,
    data: param,
    if(requestType) {
      data: requestType
    },
    success: function (res) {
      console.log(res)

      if (res.data.code == 0) {
        callBack(true, res)
      } else {
        showMention(res.data.msg, true)
        callBack(false, res)
      }
    },
    fail: function (res) {
      callBack(null)
    }
  })
}

module.exports = {
  showMention: showMention,
  currentTime: currentTime,
  prePage: prePage,
  getPageIndex: getPageIndex,
  combineJson: combineJson,
  string2Buffer: string2Buffer,
  uint8Array2Str: uint8Array2Str,
  reverse16: reverse16,
  requestData: requestData,
  stringToByte: stringToByte,
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

  var timeStamp = curDate.getTime() + 3600 * 24 * 1000  // 第二天同一时间
  var nextDate = new Date()
  nextDate.setTime(timeStamp)
  console.log('过期时间 = ' + nextDate.toLocaleString())
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

/* 快捷键

格式调整
　　Ctrl+S：保存文件

　　Ctrl+[， Ctrl+]：代码行缩进

　　Ctrl+Shift+[， Ctrl+Shift+]：折叠打开代码块

　　Ctrl+C Ctrl+V：复制粘贴，如果没有选中任何文字则复制粘贴一行

　　Shift+Alt+F：代码格式化

　　Alt+Up，Alt+Down：上下移动一行

　　Shift+Alt+Up，Shift+Alt+Down：向上向下复制一行

　　Ctrl+Shift+Enter：在当前行上方插入一行

光标相关

　　Ctrl+End：移动到文件结尾

　　Ctrl+Home：移动到文件开头

　　Ctrl+i：选中当前行

　　Shift+End：选择从光标到行尾

　　Shift+Home：选择从行首到光标处

　　Ctrl+Shift+L：选中所有匹配

　　Ctrl+D：选中匹配

　　Ctrl+U：光标回退
*/