// import utils from '../../../utils/util.js'
import Movie from './class/Movie.js'
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
    // utils.http(url,this.processData)
    // 对象方式
    let movie = new Movie(url)
    movie.getData((result) => {
      this.setData({
        movie: result
     })
    })
  },
  // onReady: function() {
  // console.log(this.movie)
  //  let title = this.movie.title
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