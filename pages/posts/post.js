import mockData from '../../data/data.js'
console.log(mockData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    listData: []
  },
  onPostDetail: function (event) {
    console.log(event)
    let id = event.currentTarget.dataset.postId
    // 路由跳转
    wx.navigateTo({
      url: './post-detail/post-detail?id=' + id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图
    let imgUrls = [
      {
        id:0,
        pic: '/images/01.jpg'
      },
      {
        id: 1,
        pic: '/images/02.jpg'
      },
      {
        id: 2,
        pic: '/images/03.jpg'
      }
    ]

    this.setData({
      imgUrls: imgUrls,
      listData: mockData
    })
  }
})