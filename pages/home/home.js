// pages/home/home.js
const radixtool = require('../../lib/radix.js')
const viewtool = require('../../lib/view.js')
const datetool = require('../../lib/date.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: ['视图容器', '基础内容', '表单组件', '媒体组件', '实时音视屏'],
    values: [
      ['movable-view', 'cover-view'].join(' '), 
      ['icon', 'rich-text', 'progress'].join(' '),
      ['checkbox', 'picker', 'radio'].join(' '),
      ['audio', 'video', 'radio', 'camera'].join(' '),
      ['livePlay'].join(' '),
    ],
    pgs: ['01_view', '02_basic', '03_form', '04_media', '05_livePlay']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var tt = radixtool.hexStr2UInts('0a10')
    // var ss = radixtool.uint8Array2Buffer(tt)
    // console.log(tt, ss)
    // var v = radixtool.arrayBuffer2HexStr(ss)
    // console.log(v)
    // var pg = viewtool.prePage()
    // console.log(pg)
    viewtool.showMention('加载成功', true)
    // console.log(datetool.dateWithDaySpan(1))
    console.log(datetool.currentTimestamp())
  },

  selectIndexEvent: function (e) {
    var that = this

    let pg = that.data.pgs[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: '../' + pg + '/' + pg,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})