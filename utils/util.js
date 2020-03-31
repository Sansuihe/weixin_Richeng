const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * GET请求封装
 */
function get(url, data = {},isJson = false) {
  return request(url, data, 'GET',isJson)
}

/**
 * POST请求封装
 */
function post(url, data = {},isJson = false) {
  return request(url, data, 'POST',isJson)
}

/**
 * 微信的request
 */
function request(url, data = {}, method = "GET",isJson) {
  let cookie = wx.getStorageSync('cookieKey');//取出Cookie
  console.log('==    cookie' + cookie)
  wx.showLoading({ title: "正在加载中...",})
  var contentType = isJson ? 'application/json' : "application/x-www-form-urlencoded";
  console.log('类型==',contentType);
  return new Promise(function(resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'Content-Type': contentType,
        'Cookie':cookie?cookie:''
      },
      success: function(res) {
        wx.hideLoading();
        if (res && res.header && res.header['Set-Cookie']) {
          console.log('***',res.header['Set-Cookie'])
          wx.setStorageSync('cookieKey', res.header['Set-Cookie']);   //保存Cookie到Storage
        }
        console.log('1===================================================================')
        console.log('==    接口地址：' + url)
        console.log('==    接口参数：' + JSON.stringify(data))
        console.log('==    请求类型：' + method)
        console.log("==    接口状态：" + res.statusCode);
        console.log('2===================================================================')
        console.log('响应：', res.data);
        if (res.data) {
          /** start 根据需求 接口的返回状态码进行处理 */
          if (res.statusCode == 200) {
            resolve(res.data); //request success
            if(res.data.code == 401){wx.navigateTo({ url: '../login/login'})}
          }else {
            reject(res.data); //request failed
          }
          /** end 处理结束*/
        }
   
        // return res.data;
        // reject(res.data);
        // if (res.statusCode == 200) {
        //   // console.log('== res：' + res.data)
        //   reject(res.data);
        // } else if (res.data.code == 401) {
        //   //此处验证了token的登录失效，如果不需要，可以去掉。
        //   //未登录，跳转登录界面
        //   reject("登录已过期")
        //   // wx.showModal({
        //   //   title: '提示',
        //   //   content: '登录已过期，请立即登录，否则无法正常使用',
        //   //   success(res) {
        //   //     if (res.confirm) {
        //   //       console.log('用户点击确定')
        //   //       wx.navigateTo({
        //   //         url: '/pages/login/login?toPageUrl=401',
        //   //       })
        //   //     } else if (res.cancel) {
        //   //       console.log('用户点击取消')
        //   //     }
        //   //   }
        //   // })
        // } else {
        //   //请求失败
        //   reject("请求失败：" + res.statusCode)
        // }
      },
      fail: function(err) {
        wx.hideLoading();
        //服务器连接异常
        console.log('3================================================')
        console.log('==    接口地址：' + url)
        console.log('==    接口参数：' + JSON.stringify(data))
        console.log('==    请求类型：' + method)
        console.log("==    服务器连接异常")
        console.log('=====================================================================')
        reject("服务器连接异常，请检查网络再试")
      }
    })
  });
}


module.exports = {
  formatTime: formatTime,
  request,
  get,
  post
}
