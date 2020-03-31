// pages/register/register.js
import Notify from '@vant/weapp/notify/notify';
import Toast  from '@vant/weapp/toast/toast';
import {Api} from '../../utils/api';
import utlis from '../../utils/util';
Page({
  /**
   * 页面的初始数据
   */
  data: { 
    username:'',
    userphone:'',
    userCode:'',
    userpass:'',
    userpassword:'',
    isDisabled:false,
    showcode:'发送验证码',
    code:0,
    snsMsgWait: 10
  },

  changeusername (event) {this.setData({ username: event.detail})},
  changeuserphone (event) {this.setData({userphone: event.detail})},
  changeuserCode (event) {this.setData({userCode: event.detail})},
  changeuserpass (event) {this.setData({userpass: event.detail})},
  changeuserpassword (event) {this.setData({userpassword: event.detail})},
  
  register(){
    var that = this

    console.log(that.data.username);
    console.log(that.data.userphone);
    console.log(that.data.userCode);
    console.log(that.data.userpass);
    console.log(that.data.userpassword);
   
    if (that.data.userphone.trim().length != 11 || !/^1[3|4|5|6|7|8|9]\d{9}$/.test(that.data.userphone)) {
      Toast.fail('手机号格式不正确');return
    }else if (this.data.userCode == '') {
      Toast.fail('请输入验证码');return
    } else if (this.data.userCode != this.data.code) {
      Toast.fail('验证码错误');return
    }else if (this.data.userpass.length<6) {
      Toast.fail('密码至少6位');return
    } else if (this.data.userpass == '') {
      Toast.fail('请输入密码');return
    } else if (this.data.userpass != this.data.userpassword) {
      Toast.fail('两次密码不一致');return
    }else{
      that.zhuce();
    }
  },

  zhuce(){
    var that = this;
    var mydata = {
      'mobile':that.data.userphone,
      "code": "dode",
      "password": that.data.userpassword
    }
    utlis.post(Api.editUserPassword,mydata,true).then((res)=>{
      if(res.code == 0){
        Toast.fail('修改成功！');
        setTimeout(function () {
          wx.navigateBack();
         }, 1000) //延迟时间 这里是1秒
      }else{
        Toast.fail(res.msg);
      }
    }).catch((res)=>{
      Toast.fail(res.msg);
    });
  },

  onClickIcon(){
    console.log(0);
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