// pages/details/details.js
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    datas:[],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = options.data;
    if(data == 0){
      console.log('data==',options.data);
      wx.setNavigationBarTitle({title: '今日' })
      this.date();
    }else if(data == 1){
      console.log('data==',options.data);
      wx.setNavigationBarTitle({title: '本周' })
      this.thisWeek();
    }else if(data == 2){
      console.log('data==',options.data);
      wx.setNavigationBarTitle({title: '下周' })
      this.nextWeek()
    }else if(data == 3){
      console.log('data==',options.data);
      wx.setNavigationBarTitle({title: '所有' })
      this.all();
    }
  },
  date(){//今天
    utlis.post(Api.date,true).then((res)=>{
      if(res.code == 0){
        console.log('res1==',res);
        this.setData({
          data:res.data,
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

  thisWeek(){ //本周
    utlis.get(Api.thisWeek,).then((res)=>{
      if(res.code == 0){
        var res = res;
        console.log('==>res',res),
        this.setData({ datas:res.data})
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
    });
  },

  nextWeek(){ //下周
    utlis.get(Api.nextWeek,).then((res)=>{
      if(res.code == 0){
        var res = res;
        console.log('==>res',res),
        this.setData({ datas:res.data})
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
    });
  },

  all(){ //全部
    utlis.get(Api.all,).then((res)=>{
      if(res.code == 0){
        var res = res;
        console.log('==>res',res),
        this.setData({ datas:res.data})
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
    });
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