var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'number':'',
    'dorm_id' : '',
    'datails' : '',
    'facility': '',
    'name' : '',
    'campus' : ['洗马河校区','倚象校区',],
    'index' : '',
    'campusvalue' : '',
    imgList: [],
  },
  Setname:function(e)
  {
    this.setData({
      name : e.detail.value
    });
  },
  Setnumber:function(e)
  {
    this.setData({
      number : e.detail.value
    });
  },
  Setdorm_id:function(e)
  {
    this.setData({
      dorm_id : e.detail.value
    });
  },
  Setfacility:function(e)
  {
    this.setData({
      facility : e.detail.value
    });
  },
  Setdatails:function(e)
  {
    this.setData({
      datails : e.detail.value
    });
  },
  bindCountryChange:function(e)
  {
    console.log(this.data.campus[e.detail.value]);
    this.setData({
      index : e.detail.value,
      campusvalue : this.data.campus[e.detail.value]
     
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.login({
      success (res) {
        if (res.code) {
          //console.log(res.code)
          //发起网络请求
          wx.request({
            url: app.globalData.url+'/index.php/Login/studentlogin',
            data: {
              code: res.code
            },
            success(res)
            {
             app.globalData.openid = res.data
             console.log(app.globalData.openid)
            }
          })
        } else {
          wx.showToast({
                      title: '获取微信id失败',
                })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  ChooseImage() {
    wx.chooseImage({
      count: 1, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album','camera'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '同学',
      content: '确定要删除这张照片吗？',
      cancelText: '再看看',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
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
  //授权方法
  bindGetUserInfo:function()
  {
   
// wx.getUserInfo({
//   success(res)
//   {
// console.log(res.userInfo)
//   }
// })
  },
  submitForm: function (e) {
    
    wx.uploadFile({
      url: app.globalData.url+'/index.php/AddStudent/recive_img', //接口
      filePath: this.data.imgList[0],
      name: 'file',
      formData: {
        'dorm_id' : this.data.dorm_id,
        'datails' : this.data.datails,
        'facility': this.data.facility,
        'name' : this.data.name,
        'campus' : this.data.campusvalue,
        'openid' : app.globalData.openid,
        'number' : this.data.number
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        var data = res.data;
        console.log(data);
        if(res.data == '1')
             {
               wx.showToast({
                 title: '提交成功',
               })
             }
             else
             {
               wx.showToast({
                 title: '提交失败',
               })
             }
        //do something
      },
      fail: function (error) {
        console.log(error);
      }
    })

  //  wx.request({
  //    url: 'http://localhost/index.php/AddStudent',
  //    data:{
  //      'dorm_id' : this.data.dorm_id,
  //      'datails' : this.data.datails,
  //      'facility': this.data.facility,
  //      'name' : this.data.name,
  //      'campus' : this.data.campusvalue,
  //      'openid' : app.globalData.openid,
  //      'number' : this.data.number
  //    },
  //    header: { 'content-type': 'application/x-www-form-urlencoded' },  
  //    method :'POST',
  //    success: function (res) {
  //      console.log(res.data);
  //      if(res.data == '1')
  //      {
  //        wx.showToast({
  //          title: '提交成功',
  //        })
  //      }
  //      else
  //      {
  //        wx.showToast({
  //          title: '提交失败',
  //        })
  //      }
  //    }
  //  })
  }
})