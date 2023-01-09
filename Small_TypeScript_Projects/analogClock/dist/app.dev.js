"use strict";

var secondsHand = document.getElementById('seconds');
var minutesHand = document.getElementById('minutes');
var hoursHand = document.getElementById('hours');

function setDate() {
  var now = new Date();
  var seconds = now.getSeconds();
  var secondsDegree = seconds / 60 * 360 + 90;
  secondsHand.style.transform = "rotate(".concat(secondsDegree, "deg)");
  var min = now.getMinutes();
  var minDegree = min / 60 * 360 + 90;
  minutesHand.style.transform = "rotate(".concat(minDegree, "deg)");
  var hour = now.getHours();
  var hourDegree = hour / 60 * 360 + 90;
  hoursHand.style.transform = "rotate(".concat(hourDegree, "deg)");
}

setInterval(setDate, 1000);