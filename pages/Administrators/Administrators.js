// pages/Administrators/Administrators.js
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pages:1,
    total:10,
    list:[
      // {name:'用户名',mobile:'13763914875',loginTime:'2020-08-20'}
    ],
  },

  users(){
    console.log('11');
    if(this.data.total > this.data.list.length){
      var strs = Api.users+'10'+"/"+this.data.pages;
      utlis.get(strs,).then((res)=>{
        if(res.code == 0){
          console.log('res1==',res)
          this.setData({
            pages:this.data.pages+1,
            list:this.data.list.concat(res.data.records),
            total:res.data.total,
          })
        }else{
          wx.showLoading({title: res.msg,})
          wx.navigateBack({});
          setTimeout(function(){wx.hideLoading()},1000)
        }
      }).catch((res)=>{
        wx.navigateBack({});
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.users()
  },

  addClass(){ wx.navigateTo({url: '../listsetting/listsetting'})},

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
    this.users();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})