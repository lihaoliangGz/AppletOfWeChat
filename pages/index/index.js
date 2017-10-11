//index.js
//获取应用实例
//// The localValue can only be used in file index.js.不同的文件中可以声明相同名字的变量和函数，不会互相影响
var localValue = 'index'
const app = getApp()
console.log(app.globalData)

var util = require('../../utils/util.js')

Page({
  data: {
    name: 'WeChat', //绑定数据测试
    motto: 'Hello World',
    array: [{ 'msg': 1 }, { 'msg': 2 }],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //绑定数据测试
  changeName: function (e) {
    this.setData({
      name: 'MINA'
    })
  },

  //调用公共代码函数
  SayHello: function () {
    util.sayHello('MINA')
  },

  tapTest: function (event) {
    //console.log(event)
    for (var i = 0; i < 10; i++) {
      console.log(i)
    
    }


  },

  //测试网络请求API
  requestTest:function(){
    wx.request({
      url: 'http://www.baidu.com',

      success:function(res){
        console.log(res.data);
      }

    })
  },

  //测试设备的API
  systemTest:function(){
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.brand);//手机品牌
        console.log(res.model);//手机型号
        console.log(res.pixelRatio);//设备像素比
        console.log(res.screenWidth);//屏幕宽度
        console.log(res.screenHeight);//屏幕高度
        console.log(res.windowWidth);//可使用窗口宽度
        console.log(res.windowHeight);//可使用窗口高度
        console.log(res.language);//微信设置的语言
        console.log(res.version);//微信版本号
        console.log(res.system);//操作系统版本
        console.log(res.platform);//客户端平台
        console.log(res.fontSizeSetting);//用户字体大小设置
        console.log(res.SDKVersion);//客户端基础库版本
      },

      fail:function(){

      },

      complete:function(res){
        console.log(res);
        console.log("接口调用结束的回调函数（调用成功、失败都会执行）");
      }

    })

    var res=wx.getSystemInfoSync()
    console.log(res.brand);
    
    var abc = wx.canIUse('openBluetoothAdapter')
    console.log(abc);
  },

  //媒体API
  mediaTest:function(){
    //图片
    // wx.chooseImage({

    //   success: function(res) {
    //     console.log(res.tempFilePaths)
    //     console.log(res.tempFiles)
    //   },

    //   complete:function(res){
    //     console.log(res)
    //   }

    // })

    //录音
    wx.startRecord({
      success:function(res){
        var tempFilePath=res.tempFilePath;
        console.log(tempFilePath)
      },

      fail:function(res){
        //录音失败
      }
    })

    setTimeout(function(){
      wx.stopRecord();
    },10000)

  }


})
