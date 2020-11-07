import request from '../../utils/request'

Page({
  data: {
    phone: '',
    password: ''
  },
  onLoad: function (options) {

  },
  /**
   * 当表单输入框发生改变，就触发这个方法
   */
  handlerInput (event) {

    let type = event.currentTarget.id
    let value = event.detail.value

    this.setData({
      [type]: value
    })
  },

  /**
   * 登陆的回调
   */
  async login () {

    let { phone, password } = this.data

    //手机号是否为空
    if (!phone) {
      wx.showToast({
        title: '手机号不能为空！',
        icon: 'none',
        duration: 2000

      })
      return
    }

    //密码是否为空
    if (!password) {
      wx.showToast({
        title: '密码不能为空！',
        icon: 'none',
        duration: 2000

      })
      return
    }

    let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确！',
        icon: 'none',
        duration: 2000

      })
      return
    }

    let data = await request('/login/cellphone', { phone: phone, password: password }, 'POST')

    if (data.code == 200) {

      wx.setStorageSync('userInfo', JSON.stringify(data.profile))
      wx.setStorageSync('token', data.token)

      wx.showToast(
        {
          title: '登陆成功！',
          icon: 'success',
          duration: 1000
        }
      )

      wx.reLaunch({
        url: '/pages/personal/personal'
      })
    } else if (data.code == 502) {

      wx.showToast(
        {
          title: '手机号或者密码错误！',
          icon: 'none',
          duration: 1000
        }
      )
    } else if (data.code == 400) {
      wx.showToast(
        {
          title: '手机号错误！',
          icon: 'none',
          duration: 1000
        }
      )
    } else {
      wx.showToast(
        {
          title: '登陆异常！',
          icon: 'none',
          duration: 1000
        }
      )
    }

    console.log(data)
  }

})