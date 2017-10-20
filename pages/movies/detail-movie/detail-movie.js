// pages/movies/detail-movie/detail-movie.js
import utils from '../../../utils/util.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
   movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let movieId = options.id
    // 请求电影详情数据
    let url = app.globalData.doubanBase +'/v2/movie/subject/'+movieId
    utils.http(url,this.processData)
  },
  processData: function(data) {
    // console.log(data)

    if (!data) {
      return;
    }
    let director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    let movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: utils.convertToStarsArray(data.rating.stars),
      score: data.rating.average,
      director: director,
      casts: utils.convertToCastString(data.casts),
      castsInfo: utils.convertToCastInfos(data.casts),
      summary: data.summary
    }
    this.setData({
      movie: movie
    })
  },
  // onReady: function() {
  //   // 动态标题,异步出错
  //   let title = this.movie.title
  //   wx.setNavigationBarTitle({
  //     title: title
  //   })
  // },
  // 查看大图
  viewMoviePostImg: function(e) {
    let src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  }
})