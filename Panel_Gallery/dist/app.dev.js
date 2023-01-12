"use strict";

var panels = document.querySelectorAll('.panels__panel'); // console.log(panels)

function toggleOpen() {
  var _this = this;

  panels.forEach(function (panel) {
    if (panel.classList.contains('open') && !_this.classList.contains('open')) {
      panel.classList.remove('open');
    }
  });
  this.classList.toggle('open');
}

function toggleActive(e) {
  if (e.propertyName.includes('flex')) {
    this.classList.toggle('open--active');
  }
}

panels.forEach(function (panel) {
  return panel.addEventListener('click', toggleOpen);
});
panels.forEach(function (panel) {
  return panel.addEventListener('transitionend', toggleActive);
});