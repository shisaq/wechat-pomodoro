// pages/pomodoro/pomodoro.js
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    actionName: "开始",
    currentColor: "primary",
    rotateBgRight: "rotate-bg-1",
    rotateBgLeft: "rotate-bg-2",
    rotateMarker: "rotate-marker",
    clockRightStyle: "none",
    clockLeftStyle: "none",
    spotStyle: "none",
    workDuration: 1500,
    breakDuration: 300,
    timeLeft: null,
    workStatus: true,
    timer: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const { workDuration } = this.data;
    this.setData({
      timer: this.timeFormat(workDuration),
      timeLeft: workDuration,
      loop: "1",
      runningStyle: `linear`
    });
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
  startClock: function() {
    const { workDuration,
            rotateBgLeft,
            rotateBgRight,
            rotateMarker,
            loop,
            runningStyle } = this.data;
    const timer = this.timeFormat(workDuration);
    this.setData({
      actionName: "停止",
      currentColor: "warn",
      clockRightStyle: `${rotateBgRight} ${workDuration}s ${loop} ${runningStyle}`,
      clockLeftStyle: `${rotateBgLeft} ${workDuration}s ${loop} ${runningStyle}`,
      spotStyle: `${rotateMarker} ${workDuration}s ${loop} ${runningStyle}`,
      workDuration: workDuration,
      timer: timer
    });
    this.countdown();
  },

  /**
   * 停止计时
   */
  stopClock: function() {
    const { workDuration } = this.data;
    const timer = this.timeFormat(workDuration);
    console.log(workDuration);

    clearInterval(app.globalData.timeInterval);
    this.setData({
      actionName: "开始",
      currentColor: "primary",
      clockRightStyle: "none",
      clockLeftStyle: "none",
      spotStyle: "none",
      timeLeft: workDuration,
      timer: timer,
      workStatus: true
    });
  },

  /**
   * 工作/休息状态切换
   */
  refreshClock: function() {
    // 清除原有倒计时
    clearInterval(app.globalData.timeInterval);
    app.globalData.timeInterval = null;

    const { workDuration,
            breakDuration,
            workStatus,
            rotateBgLeft,
            rotateBgRight,
            rotateMarker,
            loop,
            runningStyle } = this.data;
    const duration = workStatus ? breakDuration : workDuration;
    const timer = this.timeFormat(duration);

    // 重置css3的animation
    this.setData({
      clockRightStyle: "none",
      clockLeftStyle: "none",
      spotStyle: "none"
    });
    // 给css足够的时间重置(15ms)，低于15ms，就有重置失败的可能
    // 参考：http://jsfiddle.net/chad/Ytvys/
    setTimeout(() => {
      this.setData({
        clockRightStyle: `${rotateBgRight} ${duration}s ${loop} ${runningStyle}`,
        clockLeftStyle: `${rotateBgLeft} ${duration}s ${loop} ${runningStyle}`,
        spotStyle: `${rotateMarker} ${duration}s ${loop} ${runningStyle}`,
        timeLeft: duration,
        timer: timer,
        workStatus: !workStatus
      });
    }, 15);
    // 重启倒计时
    this.countdown();
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
    return `${("0" + min).slice(-2)}:${("0" + sec).slice(-2)}`;
  },

  /**
   * 时间计算
   */
  countdown: function() {
    app.globalData.timeInterval = setInterval(() => {
      const timeLeft = this.data.timeLeft - 1;
      if (timeLeft <= 0) {
        this.refreshClock();
      } else {
        this.setData({
          timeLeft: timeLeft,
          timer: this.timeFormat(timeLeft)
        });
      }
    }, 1000);
  }
});
