import utils from '../../../../utils/util.js'
class Movie {
  constructor(url){
    this.url = url
  }

  getData(cb){
   this.cb = cb
   utils.http(this.url, this.processData.bind(this))
  //  console.log(this) // 指向实例
  // processData方法绑定this后，processData的this也指向实例
  }

  processData (data) {
    // console.log(this) // undefined
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
   this.cb(movie)
  }
}

export default Movie