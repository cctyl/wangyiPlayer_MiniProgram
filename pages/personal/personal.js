import request from '../../utils/request'

let startY = 0
let moveY = 0
let moveDistance = 0

Page({

  /**
   * 页面的初始数据
   */
  data: {

    coverTransform: 'translateY(0)',
    coverTransition: '',
    userInfo: {},//用户数据
    recentPlayLit: [] //用户最近播放记录

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = wx.getStorageSync('userInfo')

    if (userInfo) {
      this.setData({
        userInfo: JSON.parse(userInfo)
      })


      //获取用户的最近播放记录
      this.getUserPlayList(this.data.userInfo.userId);

    }

  },

  //获取用户最近播放记录
  async getUserPlayList (userId) {

    let data = await request('/user/record', { uid: userId, type: 1 },
      'POST'
    );

    let num = 0;
    let mydata = data.weekData.map(item=>{
      item.num =num++;
    });
    this.setData({
      recentPlayLit: data.weekData
    });


  },

  toLogin () {

    wx.navigateTo({
      url: '/pages/login/login'
    })
  },

  handleTouchStart (event) {
    startY = event.touches[0].clientY
    this.setData({
      coverTransform: ``
    })
  },

  handleTouchMove (event) {
    moveY = event.touches[0].clientY
    moveDistance = moveY - startY

    if (moveDistance < 0) {

      return
    }
    if (moveDistance > 80) {
      moveDistance = 80
    }
    this.setData({
      coverTransform: `translateY(${moveDistance}rpx)`
    })
  },
  handleTouchEnd () {
    this.setData({
      coverTransform: `translateY(0rpx)`,
      coverTransition: 'transform 1s linear'
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