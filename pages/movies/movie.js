import utils from '../../utils/util.js'
let app = getApp()
Page({
  data: {
    inTheaters: {},
    comingSoon: {},
    top250: {}
  },
  onLoad: function() {
    let inTheatersUrl = app.globalData.doubanBase +
      "/v2/movie/in_theaters?start=0&count=3"
    let comingSoonUrl = app.globalData.doubanBase +
      "/v2/movie/coming_soon?start=0&count=3"
    let top250Url = app.globalData.doubanBase +
      "/v2/movie/top250?start=0&count=3"

    this.getData(inTheatersUrl, 'inTheaters', '最近热映')
    this.getData(comingSoonUrl, 'comingSoon', '即将上映')
    this.getData(top250Url,'top250', 'Top250')
  },
  getData: function (url, keyApi, categoryTitle) {
    wx.request({
      url: url,
      header: {
        "Content-Type": "*"
      },
      method: 'GET',
      success: (res) => {
        // 成功回掉函数
        this.proccessData(res.data, keyApi, categoryTitle)
      },
      fail: (res) => {
        console.log(res)
      }
    })
  },
  // 消息队列
  proccessData: function(data, keyApi, categoryTitle) {
    let movies = []

    for (let key in data.subjects) {
      let subject = data.subjects[key]
      let title = subject.title
      if(subject.title.length > 6) {
        title = subject.title.slice(0,6)+'...'
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
    // console.log(movies)
    let readyData = {}
    readyData[keyApi] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(readyData)
  },
  onMoreMovies: function (event) {
    let category = event.currentTarget.dataset.category
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category
    })
  }
})