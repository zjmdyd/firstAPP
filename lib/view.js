/*
  获取父page
*/
function prePage() {
  return getPageAtIndex(pagesLength - 2)
}

function getPageAtIndex(index) {
  var pages = getCurrentPages()
  var page = pages[index]
  return page
}

function pagesLength() {
  var pages = getCurrentPages()
  return pages.length
}

/*
  delay: 秒为单位,默认1.2s
*/
function showMention(msg, hidden, delay) {
  wx.showLoading({
    title: msg,
  })

  if (hidden == true) {
    if (delay == undefined) {
      delay = 1.2
    }
    setTimeout(function () {
      wx.hideLoading()
    }, delay * 1000)
  }
}

module.exports = {
  prePage: prePage,
  getPageAtIndex: getPageAtIndex,
  showMention: showMention,
}
