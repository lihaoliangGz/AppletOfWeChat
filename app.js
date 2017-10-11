//app.js
App({

  //生命周期函数--监听小程序初始化（全局只触发一次）
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  //生命周期函数--监听小程序显示,当小程序启动，或从后台进入前台显示
  onShow:function(options){
    //Do something when show
    console.log('onShow方法执行\n\n'+options.scene);
  },

  //生命周期函数--监听小程序隐藏,当小程序从前台进入后台
  onHide:function(options){
    //Do something when hide
    console.log("onHide方法执行\n\n"+options)

  },

  //错误监听函数
  onError:function(msg){
    console.log(msg)
  },

  globalData: {
    userInfo: null
  }
})