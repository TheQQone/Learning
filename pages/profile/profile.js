// profile.js
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'),
    functionItems: [
      {
        id: 'history',
        name: '历史记录',
        icon: '/images/history.png',
        color: '#5DADE2'
      },
      {
        id: 'favorite',
        name: '我的收藏',
        icon: '/images/favorite.png',
        color: '#F7DC6F'
      },
      {
        id: 'feedback',
        name: '意见反馈',
        icon: '/images/feedback.png',
        color: '#82E0AA'
      },
      {
        id: 'settings',
        name: '设置',
        icon: '/images/settings.png',
        color: '#BFC9CA'
      }
    ],
    aboutItems: [
      {
        id: 'about',
        name: '关于我们',
        icon: '/images/about.png'
      },
      {
        id: 'privacy',
        name: '隐私政策',
        icon: '/images/privacy.png'
      },
      {
        id: 'terms',
        name: '用户协议',
        icon: '/images/terms.png'
      },
      {
        id: 'contact',
        name: '联系客服',
        icon: '/images/contact.png'
      }
    ],
    versionInfo: 'v1.0.0'
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    wx.getUserProfile({
      desc: '用于完善会员资料', 
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },

  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  handleFunctionTap(e) {
    const { id } = e.currentTarget.dataset;
    
    // 根据功能ID处理不同的点击事件
    switch (id) {
      case 'history':
        wx.showToast({
          title: '暂无历史记录',
          icon: 'none'
        });
        break;
      case 'favorite':
        wx.showToast({
          title: '暂无收藏内容',
          icon: 'none'
        });
        break;
      case 'feedback':
        wx.showModal({
          title: '意见反馈',
          content: '您的宝贵意见是我们不断改进的动力',
          confirmText: '去反馈',
          success(res) {
            if (res.confirm) {
              // 可以跳转到反馈页面
              wx.showToast({
                title: '功能开发中',
                icon: 'none'
              });
            }
          }
        });
        break;
      case 'settings':
        wx.showActionSheet({
          itemList: ['清除缓存', '检查更新', '深色模式'],
          success(res) {
            if (res.tapIndex === 0) {
              wx.showToast({
                title: '缓存已清除',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: '功能开发中',
                icon: 'none'
              });
            }
          }
        });
        break;
    }
  },

  handleAboutTap(e) {
    const { id } = e.currentTarget.dataset;
    
    // 根据关于项ID处理不同的点击事件
    switch (id) {
      case 'about':
        wx.showModal({
          title: '关于我们',
          content: 'AI智能助手是一款基于人工智能技术的小程序，提供图像识别、资讯推送等服务，旨在为用户提供便捷的AI体验。',
          showCancel: false
        });
        break;
      case 'privacy':
        wx.showToast({
          title: '隐私政策页面开发中',
          icon: 'none'
        });
        break;
      case 'terms':
        wx.showToast({
          title: '用户协议页面开发中',
          icon: 'none'
        });
        break;
      case 'contact':
        wx.showModal({
          title: '联系客服',
          content: '客服电话：400-123-4567\n工作时间：周一至周五 9:00-18:00',
          showCancel: false
        });
        break;
    }
  }
}) 