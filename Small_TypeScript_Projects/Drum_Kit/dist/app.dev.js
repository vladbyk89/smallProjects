"use strict";

function playSound(e) {
  var audio = this.document.querySelector("audio[data-key=\"".concat(e.key, "\"]"));
  var key = this.document.querySelector(".keys__key[data-key=\"".concat(e.key, "\"]"));
  if (!audio) return; //stop the function from running

  audio.currentTime = 0; //rewind to start of sound

  audio.play();
  key.classList.add('keys__key--playing');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; //skip it if it's not a transform

  this.classList.remove('keys__key--playing');
}

var keys = document.querySelectorAll('.keys__key');
keys.forEach(function (key) {
  return key.addEventListener('transitionend', removeTransition);
});
window.addEventListener('keydown', playSound);