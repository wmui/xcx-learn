const convertToStarsArray = function (stars) {
  let num = stars.toString().substring(0, 1);
  let array = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}

const http = function (url, callback) {
  wx.request({
    url: url,
    header: {
      "Content-Type": "*"
    },
    method: 'GET',
    success: (res) => {
      callback(res.data)
    },
    fail: (res) => {
      console.log(res)
    }
  })
}
// 人物姓名处理
const convertToCastString = function(casts) {
  let castsjoin = "";
  for (let idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

const convertToCastInfos = function(casts) {
  let castsArray = []
  for (let idx in casts) {
    let cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

export default {
  convertToStarsArray,
  http,
  convertToCastString,
  convertToCastInfos
}