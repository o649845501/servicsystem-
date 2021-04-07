// pages/servic/servic.js
var app = getApp()  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'user':'',
    'password':''
  },
  Setuser:function(e)
  {
    this.setData({
      user: e.detail.value
    });
  },
  Setpassword:function(e)
  {
    this.setData({
      password : e.detail.value
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //登录验证
  login: function (e) {
    var usersession = this.data.user
    wx.request({
      url: app.globalData.url+'/index.php/Login/wxlogin',
      data:{
        'user' : this.data.user,
        'password' : this.data.password,
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },  
      method :'POST',
      success: function (res) {
        console.log(res.data);
        //测试用判断
        if(res.data != null )
        {
          app.globalData.usersession = usersession
          wx.showToast({
            title: '提交成功',
          })
          wx.navigateTo({
            url: 'index/index',
          })
        }
        else
        {
          wx.showToast({
            title: '提交失败',
          })
        }
        //正式使用时启用
        // if(res.data == '1')
        // {
        //   wx.showToast({
        //     title: '提交成功',
        //   })
        // }
        // else
        // {
        //   wx.showToast({
        //     title: '提交失败',
        //   })
        // }
      }
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