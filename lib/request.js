// 网络请求

const kDomain = 'https://smart-home.ke-er.com/'

function requestData(callBack, path, param, requestType) {
  var reqType = requestType
  if(reqType == undefined) {
    reqType = 'GET'
  }
  wx.request({
    header: {
      appKey: '12138'
    },
    url: kDomain + path,
    data: param,
    method: requestType?'':'', 
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
  requestData: requestData,
}