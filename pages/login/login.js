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
  login () {

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
      return;
    }

    let phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
    if (!phoneReg.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确！',
        icon: 'none',
        duration: 2000

      })
      return;
    }


    let passwdReg =/^(\w){6,20}$/;
    if (!passwdReg.test(password)) {
      wx.showToast({
        title: '密码格式不正确！',
        icon: 'none',
        duration: 2000

      })
      return;
    }
  }

})