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

    let type = event.currentTarget.id;
    let value = event.detail.value;

    this.setData({
      [type]: value
    });
  }
})