// pages/message/message.js
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  bindWx(){
    wx.login({
      success: (res)=>{    
        console.log(res);
        utlis.post(Api.bindWx,
          {   code: res.code},
          ).then((res)=>{
          if(res.code == 0){
            wx.showLoading({title: res.msg,})
            setTimeout(function () {
              setTimeout(function(){wx.hideLoading()},1000) }, 1000) //延迟时间 这里是1秒
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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