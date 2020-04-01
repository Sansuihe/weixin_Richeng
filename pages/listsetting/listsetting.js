// pages/listsetting/listsetting.js
import Dialog from '/@vant/weapp/dialog/dialog';
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
  dels(e){
    console.log( e.currentTarget.dataset.item);
    this.setData({show:false,jop:e.currentTarget.dataset.item.title});
  },
  onTrue(){

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