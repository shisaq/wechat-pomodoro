// pages/pomodoro/pomodoro.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    actionName: "开始",
    currentColor: "primary",
    clockRightStyle: "none",
    clockLeftStyle: "none",
    spotStyle: "none",
    duration: 1500,
    timeLeft: null,
    timer: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      timer: this.timeFormat(this.data.duration)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  /**
   * 开始计时
   */
  startClock: function () {
    const { duration } = this.data;
    this.setData({
      actionName: "停止",
      currentColor: "warn",
      clockRightStyle: `rotate-bg-1 ${duration}s infinite steps(${duration})`,
      clockLeftStyle: `rotate-bg-2 ${duration}s infinite steps(${duration})`,
      spotStyle: `rotate-marker ${duration}s infinite steps(${duration})`
    });
    this.countdown();
  },

  /**
  * 停止计时
  */
  stopClock: function () {
    const { duration } = this.data;
    const timer = this.timeFormat(duration);
    console.log(duration)

    clearInterval(app.globalData.timeInterval);
    this.setData({
      actionName: "开始",
      currentColor: "primary",
      clockRightStyle: "none",
      clockLeftStyle: "none",
      spotStyle: "none",
      timeLeft: duration,
      timer: timer
    });
  },

  /**
   * 用户点击开关按钮
   */
  switchStatus: function() {
    console.log(`触发switch按钮，当前值为：${this.data.actionName}`);

    if (this.data.actionName == "开始") {
      // 目前是停止状态，点击后变为开始状态
      this.startClock();
    } else {
      // 目前是开始状态，点击后变为停止状态
      this.stopClock();
    }
  },

  /**
   * 传入秒数，格式化倒计时
   */
  timeFormat: function(second) {
    const min = Math.floor(second / 60); // 分钟位
    const sec = second - min * 60; // 秒位
    return `${("0" + min).slice(-2)}:${("0"+sec).slice(-2)}`
  },

  /**
   * 时间计算
   */
  countdown: function () {
      app.globalData.timeInterval = setInterval(() => {
      const timeLeft = (this.data.timeLeft || this.data.duration) - 1
      if (timeLeft <= 0) {
        this.stopClock()
      } else {
        this.setData({
          timeLeft: timeLeft,
          timer: this.timeFormat(timeLeft)
        });
      }
    }, 1000);
  }
});
