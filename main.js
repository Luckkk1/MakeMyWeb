// content box  미니 버튼 클릭 시 최소화
const miniBtns = document.querySelectorAll(".miniBtn");
const boxes = document.querySelectorAll(".box");

miniBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (box of boxes) {
      if (btn.dataset.key === box.dataset.value) {
        box.style.height = "25em";
        box.style.width = "25em";
      }
    }
  });
});
