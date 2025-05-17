// news.js
const app = getApp()

Page({
  data: {
    newsList: [],
    categories: ['推荐', '科技', '健康', '娱乐', '财经', '体育'],
    currentCategory: 0,
    loading: true,
    refreshing: false
  },

  onLoad() {
    this.loadNewsData();
  },

  // 切换分类
  switchCategory(e) {
    const index = e.currentTarget.dataset.index;
    if (index === this.data.currentCategory) return;
    
    this.setData({
      currentCategory: index,
      loading: true,
      newsList: []
    });
    
    this.loadNewsData();
  },

  // 加载新闻数据
  loadNewsData() {
    // 模拟API请求，获取新闻数据
    setTimeout(() => {
      // 模拟新闻数据
      const mockNews = this.getMockNewsData(this.data.categories[this.data.currentCategory]);
      
      this.setData({
        newsList: mockNews,
        loading: false,
        refreshing: false
      });
    }, 1500);
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      refreshing: true
    });
    
    this.loadNewsData();
    
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1500);
  },

  // 查看新闻详情
  viewNewsDetail(e) {
    const newsId = e.currentTarget.dataset.id;
    const newsItem = this.data.newsList.find(item => item.id === newsId);
    
    if (newsItem) {
      // 实际项目中应该跳转到新闻详情页
      wx.showModal({
        title: newsItem.title,
        content: `这是一个简单的新闻详情示例。\n\n${newsItem.summary}\n\n发布时间：${newsItem.publishTime}`,
        showCancel: false,
        confirmText: '关闭'
      });
    }
  },

  // 生成模拟新闻数据
  getMockNewsData(category) {
    const baseNews = [
      {
        id: 1,
        title: 'AI技术发展迅速，专家预测未来五年突破性进展',
        source: '科技日报',
        publishTime: '今天 08:30',
        imageUrl: '/images/news-ai.jpg',
        summary: '人工智能领域专家预测，未来五年内AI技术将迎来多个方向的突破性进展，包括自然语言处理、计算机视觉、强化学习等领域。'
      },
      {
        id: 2,
        title: '新研究表明：适度运动有助于提高记忆力和认知能力',
        source: '健康时报',
        publishTime: '今天 10:15',
        imageUrl: '/images/news-health.jpg',
        summary: '最新研究显示，每周进行3-4次中等强度的有氧运动，可以显著提高脑部健康，增强记忆力和认知能力。'
      },
      {
        id: 3,
        title: '全球科技巨头加大AI研发投入，竞争日趋激烈',
        source: '商业周刊',
        publishTime: '昨天 16:45',
        imageUrl: '/images/news-tech.jpg',
        summary: '全球主要科技公司纷纷增加在人工智能领域的研发投入，竞争格局日趋激烈，专利申请数量创历史新高。'
      },
      {
        id: 4,
        title: '数字化转型加速，传统行业迎来新机遇与挑战',
        source: '经济观察',
        publishTime: '昨天 14:20',
        imageUrl: '/images/news-digital.jpg',
        summary: '在疫情后时代，各行业数字化转型速度明显加快，传统企业面临转型升级的压力，同时也迎来了新的发展机遇。'
      },
      {
        id: 5,
        title: '专家建议：儿童每天使用电子设备时间不宜超过2小时',
        source: '教育日报',
        publishTime: '前天 09:10',
        imageUrl: '/images/news-children.jpg',
        summary: '儿童发展专家建议，为了保护视力和促进全面发展，12岁以下儿童每天使用电子设备的时间不应超过2小时。'
      }
    ];
    
    // 根据分类简单调整内容
    if (category !== '推荐') {
      return baseNews.map(function(news) {
        var result = {};
        result.id = news.id;
        result.title = '[' + category + '] ' + news.title;
        result.source = category + news.source.substring(2);
        result.publishTime = news.publishTime;
        result.imageUrl = news.imageUrl;
        result.summary = news.summary;
        return result;
      });
    }
    
    return baseNews;
  }
}) 