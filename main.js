"use strict";

const miniBtns = document.querySelectorAll(".miniBtn");
const quitBtns = document.querySelectorAll(".quitBtn");
const boxes = document.querySelectorAll(".box");

// content box  미니 버튼 클릭 시 최소화
miniBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let box of boxes) {
      if (btn.dataset.key === box.dataset.value) {
        box.style.height = "25em";
        box.style.width = "25em";
      }
    }
  });
});

// content box 나가기 버튼 클릭 시 삭제
quitBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let box of boxes) {
      if (btn.dataset.key === box.dataset.value) {
        box.style.display = "none";
      }
    }
  });
});
