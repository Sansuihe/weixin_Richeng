// pages/addRicheng/addRicheng.js
import Dialog from '/@vant/weapp/dialog/dialog';
import times from '../../utils/times';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    richenglist:[{'title':'biaoti'},{'title':'biaoti2'}],
    remindshowList:[
      {'title':'不提醒'},
      {'title':'准时提醒'},
      {'title':'提前五分钟'},
      {'title':'提前30分钟'},
      {'title':'提前1小时'},
      {'title':'提前1天'},
    ],
    repeatshowList:[
      {'title':'无'},
      {'title':'每天'},
      {'title':'每周'},
      {'title':'工作日（周一-周五）'},
      {'title':'每月'},
      {'title':'每年'},
    ],
    title:'',
    jop:'工作列表',
    time1:'',
    time2:'',
    site:'',
    comment:'',
    remind:'',
    repeat:'',

    timeIndex:0,
    show: false,
    remindshow:false,
    repeatshow:false,
    checked:true,
    showTime:false,
    minHour: 10,
    maxHour: 20,
    
    minDate: new Date().getTime(),
    maxDate: new Date(2050, 10, 1).getTime(),
    currentDate: new Date().getTime(),
  },
  onChangetitle (event) {this.setData({ title: event.detail})},
  onChangesite (event) {this.setData({ site: event.detail})},
  onChangecomment (event) {this.setData({ comment: event.detail})},
  onChange({ detail }) {this.setData({ checked: detail })},
  showPop(){this.setData({show:true})},
  remind(){this.setData({remindshow:true})},
  repeat(){this.setData({repeatshow:true})},

  xuanzeliebiao(e){
    console.log( e.currentTarget.dataset.item);
    this.setData({show:false,jop:e.currentTarget.dataset.item.title});
  },
  xuanzetixin(e){
    console.log( e.currentTarget.dataset.item);
    this.setData({remindshow:false,remind:e.currentTarget.dataset.item.title});
  },
  xuanzechongfu(e){
    console.log( e.currentTarget.dataset.item);
    this.setData({repeatshow:false,repeat:e.currentTarget.dataset.item.title});
  },

  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
  },
  times(event){
    console.log(event.currentTarget.dataset.index);
    this.setData({showTime:true,timeIndex:event.currentTarget.dataset.index});
  },
  showTime1(value){
    
    if(this.data.timeIndex == 1){
      console.log('time1==>',this.data.currentDate);
      console.log(times.js_date_time(this.data.currentDate,));
      this.setData({
        time1 :(this.data.currentDate)
      });
    }else{
      console.log('time2==>',this.data.currentDate);
      this.setData({
        time2:(this.data.currentDate)
      });
    }
    this.setData({showTime:false,});
  },
  showTime2(){},
  addRichen(){
   
  },
  getUserInfo(event) {
    console.log('==>1',event.detail);
  },
  onTrue(){
    console.log('==>1');
  },

  onClose() { this.setData({ remindshow: false });},
  onCloserepeat() {this.setData({ repeatshow: false });},
  onCloseshowTime(){ this.setData({ showTime: false });},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = options.data;
    if(data == 1 || data == undefined ){
      console.log('data==',options.data);
      wx.setNavigationBarTitle({title: '添加日程' })
      this.addRichen()
    }else if(data == 2){
      console.log('id==',options.id);
      wx.setNavigationBarTitle({title: '日程编辑' })    
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