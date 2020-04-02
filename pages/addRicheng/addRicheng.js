// pages/addRicheng/addRicheng.js
import Dialog from '/@vant/weapp/dialog/dialog';
import times from '../../utils/times';
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    richenglist:[
      {id: 1, title: "会议", createTime: "2020-03-29 00:35:24", icon: "icontest"}
    ],
    remindshowList:[
      {'title':'不提醒',time:-1},
      {'title':'准时提醒',time:0},
      {'title':'提前五分钟',time:5},
      {'title':'提前30分钟',time:30},
      {'title':'提前1小时',time:60},
      {'title':'提前1天',time:1440},
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
    scheduleId:{id: 2, title: "其他", createTime: "2020-03-29 00:45:14", icon: "icontest"},
    time1:{'date':'','week':''},
    time2:{'date':'','week':''},
    site:'',
    comment:'',
    remind:'',//{title: "提前五分钟", time: 5},
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
    this.setData({
      show:false,
      scheduleId:e.currentTarget.dataset.item,
    });
  },
  xuanzetixin(e){
    console.log( e.currentTarget.dataset.item);
    this.setData({
        remindshow:false,
        remind:e.currentTarget.dataset.item
      }
    );
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
    console.log('时间戳==>',this.data.currentDate);
    var _time = times.js_date_time(this.data.currentDate);
    var _weeks= times.js_date_yyyy(this.data.currentDate);
    var weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var date = _weeks ;  //※※※注意，日期格式一定要为xxxx/xx/xx,别的格式Android 和iOS有兼容问题。
    var week = weekArray[new Date(date).getDay()];  //注意此处必须是先new一个Date

    if(this.data.timeIndex == 1){
      console.log(week)
      this.setData({
        time1:{'date':_time,'week':week},
      });
    }else{
      console.log('time2==>',this.data.currentDate);
      this.setData({
        time2:{'date':_time,'week':week},
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
  dpTime(){
    var timestamp = Date.parse(new Date()); 
    console.log('时间戳==>',timestamp);
    var _time = times.js_date_time(this.data.currentDate);
    var _weeks= times.js_date_yyyy(this.data.currentDate);
    var _weekArray = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    var _date = _weeks ;  //※※※注意，日期格式一定要为xxxx/xx/xx,别的格式Android 和iOS有兼容问题。
    var _week = _weekArray[new Date(_date).getDay()];  //注意此处必须是先new一个Date

    this.setData({
      time1:{'date':_time,'week':_week},
      time2:{'date':_time,'week':_week},
    });
  },
  wxLogin(){
    wx.login({
      success: (res)=>{    
        console.log(res);
        utlis.post(Api.wxLogin,
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
  onTabs(){ //提交
    console.log('1');
    // this.wxLogin();
    utlis.post(Api.saveItem,
      { 
        "id": this.data.id,
        "title": this.data.title,
        "address":this.data.site,
        'remark':this.data.comment,
        'scheduleId':this.data.scheduleId.id,
        "scheduleEndTime": this.data.time1.date,
        "scheduleStartTime": this.data.time2.date,
        'isRepetition':this.data.repeat,
        'ahead':this.data.remind.time,
        'any':this.data.checked==true?1:0
      },
      true
      ).then((res)=>{
      if(res.code == 0){
        wx.showLoading({title: res.msg,})
        setTimeout(function () {
          setTimeout(function(){wx.hideLoading()},1000)
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
  scheduleType(){ //scheduleType类型
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
  onLoad: function (options) {
    let data = options.data;
    this.scheduleType();
    if(data == 1 || data == undefined ){
      console.log('data==',options.data);
      wx.setNavigationBarTitle({title: '添加日程' })
      this.addRichen();
      this.dpTime();
    }else if(data == 2){
      console.log('id==',options.id);
      wx.setNavigationBarTitle({title: '日程编辑' })    
      this.setData({ type:data });
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