import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    recommendList:[],
    topList:[],
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    //轮播图
    let bannerData = await request("/banner",{type:2});
    this.setData({
      bannerList: bannerData.banners
    });

    //推荐歌单
    let recommendData = await request("/personalized",{limit:5});
    this.setData({
      recommendList: recommendData.result
    });

    //歌曲排行榜
    let index = 0;
    let resultArr = []; //最终目标数组
    while(index<5){
      //拿到元数据
      let tempData = await request("/top/list",{idx:index++});

      //解析，拿到一个榜单的数据
      let top = {
        name: tempData.playlist.name,
        tracks: tempData.playlist.tracks.slice(0,3)
      };

      //放入大数组中
      resultArr.push(top);

      //把数据设置到Data中
      this.setData({
        topList: resultArr
      });
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
