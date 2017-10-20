const convertToStarsArray = function (stars) {
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
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
export default {
  convertToStarsArray,
  http
}