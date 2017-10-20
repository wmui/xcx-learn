// pages/movies/more-movie/more-movie.js
import utils from '../../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryName:'',
    movies: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 拿到分类名字
    let category = options.category
    this.setData({
      categoryName: category
    })
    let dataUrl = "";
    switch (category) {
      case "最近热映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/in_theaters";
        break;
      case "即将上映":
        dataUrl = app.globalData.doubanBase +
          "/v2/movie/coming_soon";
        break;
      case "Top250":
        dataUrl = app.globalData.doubanBase + "/v2/movie/top250";
        break;
    }
    utils.http(dataUrl, this.proccessData)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 动态title
    wx.setNavigationBarTitle({
      title: this.data.categoryName
    })
  },
  proccessData: function (data) {
    let movies = []
    // console.log(data)
    for (let key in data.subjects) {
      let subject = data.subjects[key]
      let title = subject.title
      if (subject.title.length > 6) {
        title = subject.title.slice(0, 6) + '...'
      }
      let tmp = {
        stars: utils.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(tmp)
    }
    this.setData({
      movies:movies
    })
  }
})