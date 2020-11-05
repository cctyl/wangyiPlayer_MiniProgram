import request from '../../utils/request.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: [], //轮播图列表
    recommendSongList: [], //推荐歌曲列表
    topList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {

    //获取banner列表
    let bannerListData = await request('/banner', {
      type: 2
    });
    this.setData({

      bannerList: bannerListData.banners
    });

    //获取推荐歌曲数据
    let recommendData = await request('/personalized', { limit: 5 });
    this.setData({
      recommendSongList: recommendData.result
    });


    //获取歌曲排行榜数据
    let ids = ["19723756","3778678","71385702","2884035","5201625538"]; //写死几个排行榜的id
    //存放处理后的排行榜对象
    let topArray =[];
    for (let i=0;i<ids.length;i++){
      //得到原始数据，数据量特别大
      let tempData = await request('/playlist/detail',{id:ids[i]});
      //转换成自己的对象
      let myTop ={
        name: tempData.playlist.name,
        tracks: tempData.playlist.tracks.slice(0,3)
      };

      topArray.push(myTop);


      this.setData({
        topList : topArray
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