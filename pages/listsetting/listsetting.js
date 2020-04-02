// pages/listsetting/listsetting.js
import Dialog from '/@vant/weapp/dialog/dialog';
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    id:'',
    icon:'',
    title:'',
    bianji:{id:'',icon:'',title:''},
    richenglist:[
      {'title':'biaoti'},
      {'title':'biaoti2'}
    ],
    list:[
      {title:'页面的初始数据',id:0,icon:'add'}
    ]
  },
  changeicon (event) {this.setData({ icon: event.detail})},
  changetitle (event) {this.setData({ title: event.detail})},


  coms(e){
    var data = e.currentTarget.dataset.item
    this.setData({
      show:true,
      id:data.id,
      title:data.title,
      icon:data.icon,
    });
  },
 
  onCancel(){
    this.setData({
      show:false,
      id:'',
      title:'',
      icon:'',
    })
  },
  Addlist(){
    this.setData({
      show:true,
      id:'',
      title:'',
      icon:'',
    })
  },
  scheduleType(){ //scheduleType
    console.log('1');
    utlis.get(Api.scheduleType,).then((res)=>{
      if(res.code == 0){
        this.setData({richenglist:res.data })
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
    });
  },

  SavescheduleType(){ //scheduleType
    console.log(this.data.bianji);
    utlis.post(Api.scheduleType,
      {
        id:this.data.id,
        title:this.data.title,
        icon:this.data.icon.trim(),
      },true
    ).then((res)=>{
      if(res.code == 0){
        this.scheduleType();
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
    });
  },

  delScheduleType(e){ //scheduleType
    var str = Api.delScheduleType + e.currentTarget.dataset.item.id
    utlis.post(str,
    ).then((res)=>{
      if(res.code == 0){
        this.scheduleType();
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
    });
  },

  toimg(){
    wx.navigateTo({url: '../toimgs/toimgs'})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.scheduleType()
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