const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    features: [
      {
        id: 'image',
        name: '图像识别',
        iconColor: '#34A853',
        description: '上传图片，AI帮你分析识别',
        path: '/pages/imageAnalysis/imageAnalysis'
      },
      {
        id: 'news',
        name: '每日资讯',
        iconColor: '#FBBC05',
        description: '获取AI推荐的精选内容',
        path: '/pages/news/news'
      }
    ]
  },
  
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', 
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  navigateToFeature(e) {
    const { feature } = e.currentTarget.dataset;
    wx.navigateTo({
      url: feature.path
    });
  }
}) 