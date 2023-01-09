const checkboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  ".inbox input[type='checkbox']"
);

let lastChecked: Node;

function handleCheck(e) {
  let inBetween = false;

  if (e.repeat) return;

  if (e.shiftKey && this.checked) {
    checkboxes.forEach((checkbox) => {
      // console.log(checkbox);
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }

      if (inBetween) {
        checkbox.checked = true;
      }
    });
  }

  lastChecked = this;
}

checkboxes.forEach((checkbox) =>
  checkbox.addEventListener("click", handleCheck)
);

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
