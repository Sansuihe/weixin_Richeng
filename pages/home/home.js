// pages/home/home.js
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    minDate: new Date(2020, 4, 1).getTime(),
    maxDate: new Date(2029, 1, 31).getTime(),
    time:'',
    show:false,
    richengList:[],
    show:false
  },
  addricheng(){
    wx.navigateTo({
      url: '../addRicheng/addRicheng?data=1',
    })
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
   
    // this.setData({
    //   // show: false,
    //   // time: this.formatDate(event.detail)
    // });
    var d= event.detail;
    var date=d.getFullYear() + '-' + ((d.getMonth() + 1) >=10 ?(d.getMonth() + 1) : ('0'+(d.getMonth() + 1))) + '-' + (d.getDate()>=10 ?d.getDate() :('0'+d.getDate())); 
    wx.showLoading({title:date});
    setTimeout(function(){wx.hideLoading()},1000)
    console.log(date)
    this.setData({
      time:date
    })
    this.date(date);
  },
  date(date){
    var that = this;
    console.log('-->'.date)
    utlis.post(Api.date,date,true).then((res)=>{
      if(res.code == 0){
        this.setData({
          richengList:res.data
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

  guanlianniu(){
    this.setData({
      show :!this.data.show
    });
  },
  delSchedule(e){
    var that = this;
    var id = e.currentTarget.dataset.item.id;
    utlis.post(Api.delItem+id,).then((res)=>{
      if(res.code == 0){
        this.date(this.data.time);
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
    });
  },
  openTo(e){
    if(this.data.show == false){
      var item = JSON.stringify(e.currentTarget.dataset.item)
      wx.navigateTo({url: '../addRicheng/addRicheng?item='+item+'&&data=2'})
    }
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var d = new Date();
    var date=d.getFullYear() + '-' + ((d.getMonth() + 1) >=10 ?(d.getMonth() + 1) : ('0'+(d.getMonth() + 1))) + '-' + (d.getDate()>=10 ?d.getDate() :('0'+d.getDate())); 
    this.date(date)
    this.setData({
      time:date
    })
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
   console.log('11')
   if(this.data.time!= ''){
    this.date(this.data.time);
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
