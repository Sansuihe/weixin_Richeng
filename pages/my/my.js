// pages/my/my.js
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
import Toast  from '@vant/weapp/toast/toast';

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    mobile:'',
  },

  forgetCode(){
    wx.navigateTo({
      url: '../forgetCode/forgetCode'
   })
  },
  admins(){
    if(this.data.mobile == '15979820103'){
      wx.navigateTo({
        url: '../Administrators/Administrators'
     })
    }else{
      wx.showLoading({title: '您还不是管理员'})
      setTimeout(function(){wx.hideLoading()},1000)
    }
  },
  geRen(){
    utlis.get(Api.auth,).then((res)=>{
      if(res.code == 0){
        this.setData({
          name:res.data.name,
          mobile:res.data.mobile,
          
        })
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      console.log('res3==',res)
    });
  },
  ziliao(){
    wx.navigateTo({
      url: '../message/message'
   })
  },
  no(){
    wx.showLoading({title: '尚在开发中',})
    setTimeout(function(){wx.hideLoading()},1000)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.geRen();
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
    this.geRen()
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