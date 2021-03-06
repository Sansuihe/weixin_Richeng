import {Api} from '../../utils/api';
import utlis from '../../utils/util';
import Toast  from '@vant/weapp/toast/toast';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    disabled:false,
    no:'',
    pwd:'',
    noinput:false,
    pwdinput:false,
  },
  noinput:function(e){
    this.setData({no:e.detail.value});
    this.setData({noinput:true});
    if(this.data.noinput==true && this.data.pwdinput==true){
      this.setData({ disabled: false });
    }
 
  },
  pwdinput: function (e) {
    this.setData({ pwd: e.detail.value });
    this.setData({ pwdinput: true });
    if (this.data.noinput == true && this.data.pwdinput == true) {
      this.setData({ disabled: false });
    }
  },
  login(){
    var that = this;
    var mydata = {
      "username": that.data.no,
      "password": that.data.pwd
    }
    utlis.post(Api.login,mydata).then((res)=>{
      if(res.code == 0){
        wx.showLoading({title: '登录中...',})
        setTimeout(function () {
          wx.switchTab({ url:"/pages/my/my"})
         }, 1000) //延迟时间 这里是1秒
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      wx.showLoading({title: res.msg,})
      setTimeout(function(){wx.hideLoading()},1000)
    });
  },

  wxLogin(){
    wx.login({
      success: (res)=>{    
        console.log(res);
        utlis.post(Api.wxLogin,
          {   code: res.code},
          ).then((res)=>{
          if(res.code == 0){
            wx.showLoading({title: '微信登录中...',})
            setTimeout(function () {
              wx.switchTab({ url:"/pages/my/my"})
            }, 1000) //延迟时间 这里是1秒
          }else{
            wx.showLoading({title: res.msg,})
            setTimeout(function(){wx.hideLoading()},1000)
          }
        }).catch((res)=>{
            wx.showLoading({title: res.msg,})
            setTimeout(function(){wx.hideLoading()},1000)
        });
      }
    }) 
  },

  register(){
    wx.navigateTo({
      url: '../register/register'
   })
  },

  wanji(){
    wx.navigateTo({
      url: '../forgetCode/forgetCode'
   })
  },
  formSubmit: function (e) {
    
 
   
    console.log(e);
    // this.setData({ disabled: true});
    // wx.request({
    //   url: app.globalData.url.login, //仅为示例，并非真实的接口地址
    //   data: {
    //     no: e.detail.value.no,
    //     pwd: e.detail.value.pwd
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res);
    //     if (res.statusCode == 200) {
    //       if (res.data.error == true) {
    //         wx.showToast({
    //           title: res.data.msg,
    //           icon: 'none',
    //           duration: 2000
    //         })
    //       } else {
    //         wx.setStorageSync('student', res.data.data);
    //         wx.showToast({
    //           title: res.data.msg,
    //           icon: 'success',
    //           duration: 2000
    //         })
    //         setTimeout(function(){
    //           wx.switchTab({
    //             url: '../teacher/teacher',
    //           })
    //         },2000)
    //       }
    //     }else{
    //       wx.showToast({
    //         title: '服务器出现错误',
    //         icon: 'none',
    //         duration: 2000
    //       })
    //     }
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({disabled:false});
    var student = wx.getStorageSync('student');
    if (typeof (student) == 'object' && student.no != '' && student.classid != '') {
      wx.switchTab({
        url: '../teacher/teacher',
      })
    }
  },
 
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(this.data.no=='' || this.data.pwd==''){
      this.setData({ disabled: true });
    }else{
      this.setData({ disabled: false });
    }
  },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
 
  },
 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
 
  },
 
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
 
  },
 
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
 
  },
 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
 
  }
})
