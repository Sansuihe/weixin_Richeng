// pages/addList/addList.js
import Dialog from '/@vant/weapp/dialog/dialog';
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inner:'',
    show:false,
    jop:'选择分类',
    type:{},
    richenglist:[
      {'title':'biaoti'},
      {'title':'biaoti2'}
    ],
  },
  onChangeinner (event) {this.setData({ inner: event.detail})},
  onClose() { this.setData({ show: false });},
  xuanzhe(){this.setData({show:true}) },
  xuanzeliebiao(e){
    console.log( e.currentTarget.dataset.item);
    this.setData({show:false,jop:e.currentTarget.dataset.item.title,type:e.currentTarget.dataset.item},);
  },
  queding(){ //提交
    console.log('1');
    utlis.post(Api.schedule,
      {
        typeId:this.data.type.id,
        title:this.data.inner,
      },
      true
      ).then((res)=>{
      if(res.code == 0){
        console.log('res1==',res);
        wx.showLoading({title: res.msg,})
        setTimeout(function () {
          wx.navigateBack({})
          // var page = getCurrentPages();
          // var beforePage = pages[pages.length - 1];
          // beforePage.initial();
          // wx.navigateBack({})
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
 
  /**
   * 生命周期函数--监听页面加载
   */

  getLi(id){
    utlis.get(Api.getLi+id,).then((res)=>{
      if(res.code == 0){
        this.setData({
          id:res.data.id,
          inner:res.data.title,
          // jop : 
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
  onLoad: function (options) {
   this.scheduleType();
   var id = options.id
   if(id!=null){
     this.getLi(id)
    //  var data = JSON.parse(options.id);
    //  var inners = data.title;
    // //  var id = data.typeId;
    //  var typeName = data.typeName;
    //  this.setData({
    //    inner:inners,
    //    jop:typeName,
    //   //  type:{id:id,}
    //  })
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