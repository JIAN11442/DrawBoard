let container = document.querySelector(".container");
let gridWidth = document.getElementById("input-width-range");
let gridHeight = document.getElementById("input-height-range");
let widthValue = document.getElementById("input-width-value");
let heightValue = document.getElementById("input-height-value");
let colorRange = document.getElementById("input-color-range");
let colorValue = document.getElementById("input-color-value");
let createbtn = document.getElementsByClassName("create-grid")[0];
let clearbtn = document.getElementsByClassName("clear-grid")[0];
let erasebtn = document.getElementsByClassName("erase-btn")[0];
let paintbtn = document.getElementsByClassName("paint-btn")[0];

// Default stage
gridWidth.value = 50;
gridHeight.value = 50;
colorValue.setAttribute("placeholder", colorRange.value);
widthValue.setAttribute("placeholder", gridWidth.value);
heightValue.setAttribute("placeholder", gridHeight.value);
widthValue.addEventListener("focus", () => {
  widthValue.value = "";
  widthValue.setAttribute("placeholder", "");
});
heightValue.addEventListener("focus", () => {
  heightValue.value = "";
  heightValue.setAttribute("placeholder", "");
});
colorValue.addEventListener("focus", () => {
  colorValue.value = "";
  colorValue.setAttribute("placeholder", "");
});
widthValue.addEventListener("blur", () => {
  widthValue.setAttribute("placeholder", gridWidth.value);
});
heightValue.addEventListener("blur", () => {
  heightValue.setAttribute("placeholder", gridHeight.value);
});
colorValue.addEventListener("blur", () => {
  colorValue.setAttribute("placeholder", colorRange.value);
});

// Color Range
colorRange.addEventListener("change", () => {
  colorValue.value = colorRange.value;
});

colorValue.addEventListener("change", () => {
  colorRange.value = colorValue.value;
});

// Grid Width
gridWidth.addEventListener("mousemove", () => {
  widthValue.value = gridWidth.value;
});

widthValue.addEventListener("change", () => {
  const gridWidth_max = gridWidth.max;
  const gridWidth_min = gridWidth.min;

  if (widthValue.value > parseInt(gridWidth_max)) {
    Swal.fire({
      icon: "warning",
      title: "警告",
      text: `超過最大寬度${gridWidth_max}`,
    }).then(() => {
      widthValue.focus();
    });
    widthValue.value = "";
  } else if (widthValue.value < parseInt(gridWidth_min)) {
    Swal.fire({
      icon: "warning",
      title: "警告",
      text: `低於最小寬度${gridWidth_max}`,
    }).then(() => {
      widthValue.focus();
    });
    widthValue.value = "";
  } else {
    gridWidth.value = widthValue.value;
  }
});

// Grid Height

gridHeight.addEventListener("mousemove", () => {
  heightValue.value = gridHeight.value;
});

heightValue.addEventListener("change", () => {
  const gridHeight_max = parseInt(gridHeight.max);
  const gridHeight_min = parseInt(gridHeight.min);
  if (heightValue.value > gridHeight_max) {
    alert(`超過最大寬度${gridHeight_max}`);
    heightValue.value = "";
  } else if (heightValue.value < gridHeight_min) {
    alert(`低於最小寬度${gridHeight_min}`);
    heightValue.value = "";
  } else {
    gridHeight.value = heightValue.value;
  }
});

// switch text input function------------------------------------------------------------

function focusTo(element) {
  try {
    document.getElementById(element).focus();
  } catch (e) {
    document.getElementsByClassName(element)[0].focus();
  }
}

function isNumeric(value) {
  let isNumeric = !isNaN(parseFloat(value)) && isFinite(value); // 判斷是否是數字
  return isNumeric;
}

function customize_alert(event, icon, title, text) {
  Swal.fire({
    icon: icon,
    title: title,
    text: text,
  }).then(() => {
    try {
      document.getElementById(event.target.id).focus();
    } catch (e) {
      document.getElementsByClassName(event.target.class)[0].focus();
    }
  });
}

function KeyPressFocus(event, nextLocation, previousLocation) {
  try {
    if (event.keyCode == 13 && event.shiftKey) {
      focusTo(previousLocation);
    } else if (event.keyCode == 13 && isNumeric(event.target.value) == false) {
      customize_alert(event, "warning", "警告", "請輸入數值");
    } else if (event.keyCode == 13) {
      focusTo(nextLocation);
    }
  } catch (e) {
    customize_alert(event, "error", "提醒", "已無其他快捷移動目標");
  }
}

// create grid ------------------------------------------------------------

let draw = false;
let erase = false;
let DevideType = "";

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

function isTouchDevide() {
  try {
    document.createEvent("TouchEvent");
    DevideType = "touch";
    return true;
  } catch (e) {
    DevideType = "mouse";
    return false;
  }
}

isTouchDevide();

createbtn.addEventListener("click", () => {
  container.innerHTML = "";
  for (let i = 0; i < gridHeight.value; i++) {
    let gridRow = document.createElement("div");
    gridRow.classList.add("gridRow");
    for (let j = 0; j < gridWidth.value; j++) {
      let gridCol = document.createElement("div");
      gridCol.classList.add("gridCol");
      gridCol.setAttribute("id", `gridCoL${j + 1}`);
      gridCol.addEventListener(events[DevideType].down, (e) => {
        draw = true;
        if (erase) {
          gridCol.style.backgroundColor = "transparent";
        } else {
          gridCol.style.backgroundColor = colorRange.value;
        }
      });
      gridCol.addEventListener(events[DevideType].move, (e) => {
        let elementId = document.elementFromPoint(
          !isTouchDevide() ? e.clientX : e.touches.clientX,
          !isTouchDevide() ? e.clientY : e.touches.clientY
        );
        if (draw && !erase) {
          elementId.style.backgroundColor = colorRange.value;
        } else if (draw && erase) {
          elementId.style.backgroundColor = "transparent";
        }
      });
      gridCol.addEventListener(events[DevideType].up, () => {
        draw = false;
      });
      gridRow.append(gridCol);
    }
    container.append(gridRow);
  }
});

clearbtn.addEventListener("click", () => {
  container.innerHTML = "";
});

erasebtn.addEventListener("click", () => {
  erase = true;
});

paintbtn.addEventListener("click", () => {
  erase = false;
});

// function checker(elementId) {
//   let all_gridCol = document.querySelectorAll(".gridCol");
//   all_gridCol.forEach((element) => {
//     if (element.id == elementId.id) {
//       if (draw && !erase) {
//       }
//     }
//   });
// }
