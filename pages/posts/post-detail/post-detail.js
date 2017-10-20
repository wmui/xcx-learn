import mockData from '../../../data/data.js'
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
    collected: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let postId = options.id
    let postData = mockData[postId]
    // console.log(options)
    this.setData({
      postData: postData,
      postId: postId
    })

    let collectionState = wx.getStorageSync('collectionState')
    // 初始化收藏状态
    if (collectionState) {
      this.setData({
        collected: collectionState[postId]
      })
    } else {
      // 首次进入
      let collectionState = {}
      collectionState[postId] = false
      wx.setStorageSync('collectionState', collectionState)
    }

    // 音乐
    if (app.globalData.g_isMusicPlay && app.globalData.g_musicPostId === postId){
      this.setData({
        isPlayingMusic: true
      })
    }

    // 状态同步
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isMusicPlay = false
    })

    wx.onBackgroundAudioStop(() => {
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isMusicPlay = false
    })
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isMusicPlay = true
    })
  },
  onMusicTap: function(){
    let postId = this.data.postId
    let isPlayingMusic = !this.data.isPlayingMusic
    let postData = this.data.postData

    app.globalData.g_musicPostId = postId

    if (isPlayingMusic) {

      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg,
      })

      // 用于改变图标样式
      this.setData({
        isPlayingMusic: true
      })
      // 更新全局播放状态
      app.globalData.g_isMusicPlay = true
    } else {
      wx.pauseBackgroundAudio()
      // 用于改变图标样式
      this.setData({
        isPlayingMusic: false
      })
      // 更新全局播放状态
      app.globalData.g_isMusicPlay = false
    }
  },
  onColletionTap: function () {
    let postId = this.data.postId
    let collectionState = wx.getStorageSync('collectionState')
    collectionState[postId] = !collectionState[postId]
    wx.setStorageSync('collectionState', collectionState)
    this.setData({
      collected: collectionState[postId]
    })
    
  },
  onShareTap: function() {
    let itemList = [
      '微博',
      '朋友圈',
      'QQ空间'
    ]
    wx.showActionSheet({
      itemList: itemList,
      success: (res) => {
        wx.showModal({
          title: '分享到' + itemList[res.tapIndex],
          content: '无法实现分享',
        })
      }
    })
  }
})