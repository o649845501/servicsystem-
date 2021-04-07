var app = getApp()
Component({
  options: {
    addGlobalClass: true,
  },
  data: {
    url:app.globalData.url,
    campus:'',
    dorm_id:'',
    name: '',
    img_src:'',
    servic: '',
    starCount: 0,
    forksCount: 0,
    visitTotal: 0,
    basicsList: [{
      icon: 'usefullfill',
      name: '上报'
    }, {
      icon: 'radioboxfill',
      name: '等待'
    }, {
      icon: 'roundclosefill',
      name: '维修'
    }, {
      icon: 'roundcheckfill',
      name: '完成'
    }, ],
    basics: 1,
    numList: [{
      name: '开始'
    }, {
      name: '等待'
    }, {
      name: '错误'
    }, {
      name: '完成'
    }, ],
    num: 1,
    scroll: 1
  },
  attached() {
    console.log("success")
    let that = this;
    wx.showLoading({
      title: '数据加载中',
      mask: true,
    })
    let i = 0;
    numDH();
    function numDH() {
      if (i < 20) {
        setTimeout(function () {
          that.setData({
            starCount: i,
            forksCount: i,
            visitTotal: i
          })
          i++
          numDH();
        }, 20)
      } else {
        that.setData({
          starCount: that.coutNum(3000),
          forksCount: that.coutNum(484),
          visitTotal: that.coutNum(24000)
        })
      }
    }
    wx.hideLoading()
  },
  methods: {
    onShow:function()
    {
      var that = this
wx.request({
    url: app.globalData.url+'/index.php/Myservic/index',
    data: {
    openid: app.globalData.openid
    },
    success(res)
    {
      console.log(res)
      var servicdata = new Array()
      servicdata = res.data
      that.setData({
        servic : servicdata,
        name : servicdata[0]['name'],
        dorm_id:servicdata[0]['dorm_id'],
        campus : servicdata[0]['campus']
      })
    
    
    console.log(that.data.servic)
      //console.log(that.data.servic)
    }
})
    },
    coutNum(e) {
      if (e > 1000 && e < 10000) {
        e = (e / 1000).toFixed(1) + 'k'
      }
      if (e > 10000) {
        e = (e / 10000).toFixed(1) + 'W'
      }
      return e
    },
    CopyLink(e) {
      wx.setClipboardData({
        data: e.currentTarget.dataset.link,
        success: res => {
          wx.showToast({
            title: '已复制',
            duration: 1000,
          })
        }
      })
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
    showQrcode() {
      wx.previewImage({
        urls: ['https://image.weilanwl.com/color2.0/zanCode.jpg'],
        current: 'https://image.weilanwl.com/color2.0/zanCode.jpg' // 当前显示图片的http链接      
      })
    },
  },
  onLoad:function(_option)
  {
console.log('123')
  }
})
