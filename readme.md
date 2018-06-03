# 微信小程序 - 番茄时钟🍅

## 界面截图

![小程序-番茄时钟](https://i.loli.net/2018/06/03/5b134fec1e540.png)

## 功能

1. 点击开始/停止
2. 工作(25分钟)-休息(5分钟)循环
3. CSS3轻量流畅动画

## Todos

1. 增加工作/休息的input框，自定义番茄时长
2. 运用微信hide/show方法，动态存储当前剩余时长
3. 用户登录与每日数据统计
4. 自定义颜色与皮肤

## 难点

1. 小程序**用完即走**的特性，导致用户离开5分钟后，自动销毁，无法正常走完25分钟的番茄；
2. iPhone界面，轮盘转到3/4时，有短暂断点。微信开发者工具无此情况。
3. CSS3的动画效果无法实现直接重置，必须用setTimeout 15ms的时间重置。参考：[Reset CSS Animations](http://jsfiddle.net/chad/Ytvys/)

## 参考文献

* [Restart animation in CSS3: any better way than removing the element?](https://stackoverflow.com/questions/6268508/restart-animation-in-css3-any-better-way-than-removing-the-element)
* [Restart CSS Animation](https://css-tricks.com/restart-css-animation/)
* [creating and animating a clock, using simple CSS animations](https://cssanimation.rocks/clocks/)
* [Apple Watch Dials](https://cssanimation.rocks/watch/)
* [CSS Animations Level 1](https://www.w3.org/TR/css-animations-1/#animations)
