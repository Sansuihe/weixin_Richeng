// pages/list/list.js
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    all:0,
    today:0,
    thisWeek:0,
    nextWeek:0,
    guanli:true,
    showButton:true,
  },
  List(){
    utlis.get(Api.schedule,).then((res)=>{
      if(res.code == 0){
        console.log('res1==',res);
        var res = res.data;
        this.setData({
          all:res.all,
          today:res.today,
          thisWeek:res.thisWeek,
          nextWeek:res.nextWeek,
          list:res.list
        })
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
    });
  },
  all(){ wx.navigateTo({url: '../details/details?data=3'}) },
  today(){wx.navigateTo({url: '../details/details?data=0'})},
  thisWeek(){wx.navigateTo({url: '../details/details?data=1'})},
  nextWeek(){wx.navigateTo({url: '../details/details?data=2'})},
  Addlist(){wx.navigateTo({url: '../addList/addList'})},

  guanli(){
    this.setData({
      showButton:!this.data.showButton
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.List()
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
    this.List();
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
    this.List()
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