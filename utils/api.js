const heards = 'http://192.168.1.129:8899/schedule';

const Api = {
  auth: heards+'/auth',//信息
  login: heards+'/auth/login',//登录
  register: heards+'/auth/register',//注册
  editUserPassword: heards+'/auth/editUserPassword',//改密码
  schedule: heards+'/schedule',//获取日程列表
  date: heards+'/schedule/date',//具体时间日程
  thisWeek:heards+'/schedule/thisWeek', //获取本周日程详情
  nextWeek:heards+'/schedule/nextWeek', // 获取下周日程详情
  all:heards+'/schedule/all', // 获取所有日程详情
  scheduleType:heards+'/admin/scheduleType', // 获取日程分类列表
  saveItem:heards+'/schedule/saveItem', // 保存日程详情
  users:heards+'/admin/users/', // 查看所有用户  
  delScheduleType:heards+'/admin/delScheduleType/', // 删除指定日程分类  
  wxLogin:heards+'/auth/wxLogin', // 微信登录 
  bindWx:heards+'/auth/bindWx', // 微信登录 
}







export {Api}