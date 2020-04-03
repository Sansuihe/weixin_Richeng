// pages/message/message.js
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
import Notify from '@vant/weapp/notify/notify';
import Toast  from '@vant/weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isWeixin:true,
    isDisabled:false,
    userName:'',
    userphone:'',
    Olduserphone:'',
    userCode:'',
    code:'',
    showcode:'发送验证码',
    snsMsgWait: 10
  },
  changeuserName (event) {this.setData({ userName: event.detail})},
  changeuserphone (event) {this.setData({ userphone: event.detail})},
  changeuserCode (event) {this.setData({ userCode: event.detail})},
  bindWx(){
    wx.login({
      success: (res)=>{    
        console.log(res);
        utlis.post(Api.bindWx,
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

  faCode(){
    var that = this;
    if (that.data.userphone== '') {
      Notify({ type: 'danger', message: '号码不能为空'});
    } else if (that.data.userphone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(that.data.userphone)) {
      Notify({ type: 'danger', message: '手机号格式不正确'});
    } else  if(that.data.isDisabled == false){
      this.setData({ isDisabled: true, });
      var int =Math.floor(Math.random()*100000 +10000);
      Notify({ type: 'success', message: '微日程管理验证码：'+int });
      var inter = setInterval(function() {
        this.setData({
          isDisabled: true,
          code:int,
          showcode: this.data.snsMsgWait + 's后重发',
          snsMsgWait: this.data.snsMsgWait - 1
        });
        if (this.data.snsMsgWait < 0) {
          clearInterval(inter)
          this.setData({
            showcode: '发送验证码',
            snsMsgWait: 10,
            isDisabled: false
          });
        }
      }.bind(this), 1000);
    }
    console.log(int);
    // 60秒后重新获取验证码
  },

  geRen(){
    utlis.get(Api.auth,).then((res)=>{
      if(res.code == 0){
        this.setData({
          userName:res.data.name,
          userphone:res.data.mobile,
          Olduserphone:res.data.mobile,
        })
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      Toast.fail(res.msg);
    });
  },

  btons(){
    var that = this
     if (that.data.userphone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(that.data.userphone)) {
      Toast.fail('手机号格式不正确');return
    }else if (that.data.userName =='' || that.data.userName.trim()=='' ) {
      Toast.fail('请输入用户名');return
    }if (that.data.userphone != that.data.Olduserphone && that.data.userCode == '') {
      Toast.fail('请输入验证码');return
    } else if(that.data.userphone != that.data.Olduserphone && that.data.userCode != that.data.code) {Toast.fail('验证码错误');return
    }else{
      that.xiugai();
    }
  },
  xiugai(){//
    utlis.post(Api.editUserInfo,
      {
      name:this.data.userName,
      mobile:this.data.userphone,
    },true
    ).then((res)=>{
      if(res.code == 0){
        Toast.fail(res.msg);
      }else{
        wx.showLoading({title: res.msg,})
        setTimeout(function(){wx.hideLoading()},1000)
      }
    }).catch((res)=>{
      Toast.fail(res.msg);
    });
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