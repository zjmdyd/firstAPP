// pages/next/next.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,

    mToast: {
      animationData: {},
      text: '提示',
      display: 'none',
      opacity: 0,
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserInfo()
  },

  getUserInfo: function () {
    var that = this

    wx.getUserInfo({
      success: function (res) {
        console.log(res.userInfo)
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
  },

  loginEvent: function() {
    this.showMToast('哈哈', 700)
  },

  showMToast: function (msg, duration) {
    var that = this

    var mtoast = that.data.mToast
    if (mtoast.display == 'none') {
      mtoast.display = 'block';
      mtoast.opacity = 1;
      mtoast.text = msg;
      that.setData({
        mToast: mtoast
      });
      setTimeout(function () {
        mtoast.opacity = 0;
        that.setData({
          mToast: mtoast
        });
        
        setTimeout(function () {
          mtoast.display = 'none';
          that.setData({
            mToast: mtoast
          });
        }, 300);
      }, duration);
    }
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