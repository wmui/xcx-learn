// pages/movies/more-movie/more-movie.js
import utils from '../../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categoryName:'',
    movies: [],
    isEmpty: false,
    requestUrl: '',
    totalCount: 0
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
    this.data.requestUrl = dataUrl
    utils.http(dataUrl, this.processData)
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
  processData: function (data) {
    let movies = []
    let that = this
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
    
    let totalMovies = []
    if (this.data.isEmpty) {
      totalMovies = movies
      that.data.isEmpty = true
    } else {
      // 有数据
      that.data.totalCount += 20
      that.data.isEmpty = false
      totalMovies = that.data.movies.concat(movies)
    }
    // console.log(that.data.totalCount)
    this.setData({
      movies: totalMovies
    })
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },
  // 上拉加载更多
  onReachBottom: function() {
    // console.log('scroll')
    let url = this.data.requestUrl+'?start=' + this.data.totalCount + '&count=20'
    utils.http(url, this.processData)
    wx.showNavigationBarLoading()
  },
  // 下拉刷新
  onPullDownRefresh: function(){
    let url = this.data.requestUrl +
      "?star=0&count=20"
    // 重置为默认值
    this.data.movies = []
    this.data.isEmpty = false
    this.data.totalCount = 0
    utils.http(url, this.processData)
    wx.showNavigationBarLoading()
  },
  onMovieTap: function (event) {
    let movieId = event.currentTarget.dataset.movieId
    // 带参数的路由跳转
    wx.navigateTo({
      url: '../detail-movie/detail-movie?id=' + movieId,
    })
  }
})