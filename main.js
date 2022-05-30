"use strict";

// <NAVBAR>
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

// <TO-DO LIST>
const toDoForm = document.querySelector("#toDoForm");
const toDoInput = document.querySelector("#toDoInput");
const toDoYetCont = document.querySelector(".toDo__ul__yet");
const toDoDoneCont = document.querySelector(".toDo__ul__done");

// toDo List 해야할 일 추가
toDoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (toDoInput.value === "") {
    alert("값을 입력해주세요");
  } else {
    const toDoLiYet = document.createElement("li");
    toDoLiYet.className = "toDo__li";
    toDoLiYet.innerText = toDoInput.value;
    toDoYetCont.append(toDoLiYet);
    toDoForm.reset();
  }
});

// toDo List Hover 효과 추가
toDoYetCont.addEventListener("mouseover", (e) => {
  if (e.target.nodeName === "Li") {
    e.target.setAttribute("class", "hover");
  }
});

// toDo List 제거 함수
function removeLi(e) {
  e.target.innerHTML = "";
  e.target.style.padding = "0px";
}

// Yet List 클릭 시 Done List로 이동 후 Yet에서 삭제
toDoYetCont.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    const toDoLiDone = document.createElement("li");
    toDoLiDone.className = "toDo__li";
    toDoLiDone.innerText = e.target.outerText;
    toDoDoneCont.append(toDoLiDone);
    removeLi(e);
  }
});

// Done List 클릭 시 삭제
toDoDoneCont.addEventListener("click", (e) => {
  if (e.target.nodeName === "LI") {
    removeLi(e);
  }
});

// <CALCULATOR>
const calcForm = document.querySelector(".calc__container");
const calcOutput = document.querySelector(".calc__output");
const calcInBtns = document.querySelectorAll(".calc__container input.in");
const calcResetBtn = document.querySelector(".calc__reset");
const calcResultBtn = document.querySelector(".calc__result");

// form action 억제
calcForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// 계산기 숫자 기호 버튼
for (let btn of calcInBtns) {
  btn.addEventListener("click", () => {
    calcOutput.value += btn.value;
  });
}

// 계산기 캔슬버튼
calcResetBtn.addEventListener("click", () => {
  calcOutput.value = "";
});

// 계산기 결과버튼
calcResultBtn.addEventListener("click", () => {
  try {
    calcOutput.value = eval(calcOutput.value);
  } catch {
    alert("올바른 식을 입력해주세요!");
    calcOutput.value = "";
  }
});

// <BTC PRICE>
