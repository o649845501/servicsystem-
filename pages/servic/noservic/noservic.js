const app = getApp();
Page({
  data: {
    noservic: ''
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  gridchange: function (e) {
    this.setData({
      gridCol: e.detail.value
    });
  },
  gridswitch: function (e) {
    this.setData({
      gridBorder: e.detail.value
    });
  },
  menuBorder: function (e) {
    this.setData({
      menuBorder: e.detail.value
    });
  },
  menuArrow: function (e) {
    this.setData({
      menuArrow: e.detail.value
    });
  },
  menuCard: function (e) {
    this.setData({
      menuCard: e.detail.value
    });
  },
  switchSex: function (e) {
    this.setData({
      skin: e.detail.value
    });
  },
//点击确认返回订单id给后端
queren:function(e)
{
  var that = this;
wx.request({
  url: app.globalData.url+'/index.php/Servic/acceptservic',
  data:{
    id: e.currentTarget.dataset.value,
    usersession:app.globalData.usersession
  },
  success(res)
  {
    console.log(res)
    if(res =1)
    {
    wx.showToast({
      title: '确认成功',
    })
    that.onShow();
    }
  else
  {
    wx.showToast({
      title: '发生错误',
    })
  }
  }
  
})
},
  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },
  //监听页面加载请求未维修数据
onShow:function()
{
  var that = this;
wx.request({
  url: app.globalData.url+'/index.php/Servic/wxnoservic',
  success(res)
  {
    var servicdata = new Array()
    servicdata = res.data
    console.log(servicdata)
    that.setData({
      noservic:servicdata
    })
  }
})
},
  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection =='left'){
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },
})