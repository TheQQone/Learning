// imageAnalysis.js
const app = getApp()

Page({
  data: {
    imageSrc: '',
    analysisResult: null,
    isAnalyzing: false,
    showResult: false
  },

  onLoad() {
    // 页面加载时的逻辑
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePaths = res.tempFilePaths
        this.setData({
          imageSrc: tempFilePaths[0],
          analysisResult: null,
          showResult: false
        });
      }
    })
  },

  // 分析图片
  analyzeImage() {
    if (!this.data.imageSrc) {
      wx.showToast({
        title: '请先选择图片',
        icon: 'none'
      });
      return;
    }

    this.setData({
      isAnalyzing: true
    });

    // 模拟AI分析过程（实际应该调用API）
    setTimeout(() => {
      // 示例分析结果（实际项目中应该从API获取）
      const mockResult = {
        tags: ['建筑', '自然', '城市', '户外'],
        objects: [
          { name: '建筑物', confidence: 0.95, confidencePercent: '95' },
          { name: '天空', confidence: 0.92, confidencePercent: '92' },
          { name: '树木', confidence: 0.85, confidencePercent: '85' },
          { name: '道路', confidence: 0.78, confidencePercent: '78' }
        ],
        description: '这张图片展示了一座城市中的建筑物，周围有树木和开阔的天空，可能是在一个晴朗的日子拍摄的城市风景。',
        dominant_colors: [
          { color: '#4285F4', percentage: 0.3, percentageValue: '30' },
          { color: '#34A853', percentage: 0.25, percentageValue: '25' },
          { color: '#FBBC05', percentage: 0.2, percentageValue: '20' },
          { color: '#EA4335', percentage: 0.15, percentageValue: '15' },
          { color: '#FFFFFF', percentage: 0.1, percentageValue: '10' }
        ]
      };

      this.setData({
        analysisResult: mockResult,
        isAnalyzing: false,
        showResult: true
      });
    }, 2000);
  },

  // 重新选择图片
  resetImage() {
    this.setData({
      imageSrc: '',
      analysisResult: null,
      showResult: false
    });
  },

  // 预览图片
  previewImage() {
    if (this.data.imageSrc) {
      wx.previewImage({
        urls: [this.data.imageSrc],
        current: this.data.imageSrc
      });
    }
  }
}) 