var checkboxes = document.querySelectorAll(".inbox input[type='checkbox']");
var lastChecked;
function handleCheck(e) {
    var _this = this;
    var inBetween = false;
    if (e.repeat)
        return;
    if (e.shiftKey && this.checked) {
        checkboxes.forEach(function (checkbox) {
            // console.log(checkbox);
            if (checkbox === _this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }
            if (inBetween) {
                checkbox.checked = true;
            }
        });
    }
    lastChecked = this;
}
checkboxes.forEach(function (checkbox) {
    return checkbox.addEventListener("click", handleCheck);
});
// let inBetween = false;
// checkboxes.forEach((checkbox) =>
//   checkbox.addEventListener("keydown", (e) => {
//     if (e.repeat) return;
//     if (e.shiftKey && checkbox.checked) {
//       // lastChecked = checkbox;
//       console.log('lastChecked');
//     }
//   })
// );
// window.addEventListener("keydown", (e) => {
//   checkboxes.forEach((checkbox) =>
//     checkbox.addEventListener("click", () => {
//       if (e.shiftKey && checkbox == lastChecked) {
//         console.log("testing");
//       }
//     })
//   );
// });
