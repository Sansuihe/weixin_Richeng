const heards = 'http://192.168.1.84:8899/schedule';

const Api = {
  auth: heards+'/auth',//信息
  login: heards+'/auth/login',//登录
  register: heards+'/auth/register',//注册
  editUserPassword: heards+'/auth/editUserPassword',//改密码
  schedule: heards+'/schedule',//获取日程列表
  date: heards+'/schedule/date',//具体时间日程
  // 更多的配置项
}

export {Api}