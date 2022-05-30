"use strict";

const miniBtns = document.querySelectorAll(".miniBtn");
const quitBtns = document.querySelectorAll(".quitBtn");
const boxes = document.querySelectorAll(".box");

// content box  미니 버튼 클릭 시 최소화
// 드래그 크기조절 위해 transition 300ms 후 애니메이션 정상화
miniBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    for (let box of boxes) {
      if (btn.dataset.key === box.dataset.value) {
        box.style.height = "25em";
        box.style.width = "25em";
        box.style.transition = "all ease-out 300ms";
        setTimeout(() => {
          box.style.transition = "";
        }, 300);
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

const toDoForm = document.querySelector("#toDoForm");
const toDoInput = document.querySelector("#toDoInput");
const toDoYetCont = document.querySelector(".toDo__ul__yet");
const toDoDoneCont = document.querySelector(".toDo__ul__done");

// toDo List 해야할 일 추가
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // const toDo
  const toDoLiYet = document.createElement("li");
  toDoLiYet.className = "toDo__yet__li";
  toDoLiYet.innerText = toDoInput.value;
  toDoYetCont.append(toDoLiYet);
  toDoForm.reset();
});

// Yet List 클릭 시 Done List로 이동 후 Yet에서 삭제
toDoYetCont.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    const toDoLiDone = document.createElement("li");
    toDoLiDone.className = "toDo__done__li";
    toDoLiDone.innerText = e.target.outerText;
    toDoDoneCont.append(toDoLiDone);
    e.target.innerHTML = "";
  }
});

toDoDoneCont.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    e.target.innerHTML = "";
  }
});
