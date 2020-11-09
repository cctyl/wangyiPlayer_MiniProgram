import request from '../../utils/request'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoGroupList: [],
    videoList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getVideoGroupList()

  },

  /**
   * 获得导航标签的数据
   * @returns {Promise<void>}
   */
  async getVideoGroupList () {

    let groupListData = await request('/video/group/list')
    let rawData = groupListData.data.splice(0, 14)
    this.setData({
      videoGroupList: rawData,
      navId: rawData[0].id
    })

    this.getVideoList(this.data.navId)
  },

  // 获取视频列表数据
  async getVideoList (navId) {

    wx.showLoading({
      title:"正在加载中...",
      mask:true
    });
    let groupListData = await request('/video/group', { id: navId })

    let index = 0
    let rawData = groupListData.datas.map(item => {
      item.num = index++
      return item
    })

    this.setData({
      videoList: rawData
    })
    wx.hideLoading();
  },

  //获取当前视频播放url
  async playVideo (event) {
    let id = event.currentTarget.id
    let urlData = await request('/video/url', { id: id })

    let url = urlData.urls[0].url;
    debugger
    console.log(url)
    wx.navigateTo({
      url:`/pages/play/play?url=`+url
    });



  },

  changeNav (event) {

    let navId = event.currentTarget.id
    this.setData({
      navId: navId * 1
    });


    //更新视频列表
    this.getVideoList(navId);
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