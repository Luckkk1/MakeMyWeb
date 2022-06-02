"use strict";

// <BOX__NAVBAR>
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
const btcPrice = document.querySelector(".btc__price");
const btcCurrDate = document.querySelector(".btc__date");

// btc box 현재시간
setInterval(() => {
  btcCurrDate.innerText = Date();
}, 1000);

// 가격 불러오기
async function fetchBTCPrice() {
  const res = await axios.get(
    "https://api.coinbase.com/v2/prices/spot?currency=USD"
  );
  const CurrPrice = res.data.data.amount;
  btcPrice.innerText = CurrPrice;
}

// 10초마다 갱신
fetchBTCPrice();
setInterval(() => {
  fetchBTCPrice();
}, 10000);

// <Saech Engine>
const radioBtns = document.querySelectorAll("input[name='searchEngine']");
const searchInput = document.querySelector(".searchInput");
const searchForm = document.querySelector("#searchForm");

// 제출할 때 작동
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const currEngine = searchForm.elements.searchEngine.value;
  const naverEng = `https://search.naver.com/search.naver?ie=UTF-8&query=${searchInput.value}`;
  const googleEng = `https://www.google.com/search?q=${searchInput.value}`;

  // url 여는 함수
  function openUrl(url) {
    window.open(url);
  }

  // 라디오박스 체크하면 해당 검색엔진 적용
  if (currEngine === "") {
    alert("값을 입력해주세요");
  } else if (currEngine === "naver") {
    openUrl(naverEng);
  } else if (currEngine === "google") {
    openUrl(googleEng);
  }
  searchForm.reset();
});

// <Color Box>

// rgb변환 class
class Color {
  constructor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
  }

  rgb() {
    const { r, g, b } = this;
    return `rgb(${r},${g},${b})`;
  }

  hex() {
    const { r, g, b } = this;
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  rgba(a = 1) {
    const { r, g, b } = this;
    return `rgba(${r},${g},${b},${a})`;
  }

  random() {
    let { r, g, b } = this;
    r = Math.floor(Math.random() * 256) + 1;
    g = Math.floor(Math.random() * 256) + 1;
    b = Math.floor(Math.random() * 256) + 1;
    return `${r} ${g} ${b}`;
  }

  opposite() {
    let { r, g, b } = this;
    r = 255 - r;
    g = 255 - g;
    b = 255 - b;
    return `${r} ${g} ${b}`;
  }
}

const colorForm = document.querySelector(".colorForm");
const rgbInput = document.querySelector(".rgbInput");
const colorShow = document.querySelector(".colorShow");
const inputToHex = document.querySelector(".colorForm__hex");
const menuColCng = document.querySelector(".menuColCng");
const backCng = document.querySelector(".backCng");
const randCng = document.querySelector(".randCng");
const oppoBtn = document.querySelector(".oppoBtn");
const fontBtn = document.querySelector(".fontBtn");
const opaBtn = document.querySelector(".opaBtn");

// form제출 억제
colorForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// 색깔 박스 버튼 효과
rgbInput.addEventListener("change", (e) => {
  e.preventDefault();
  const inputToNum = rgbInput.value.split(" ");
  const r = +inputToNum[0];
  const g = +inputToNum[1];
  const b = +inputToNum[2];

  // rgb input 숫자 범위 제한
  if (r > 255 || g > 255 || b > 255 || r < 0 || g < 0 || b < 0) {
    alert("숫자의 범위: 0 ~ 255");
    rgbInput.value = "";
  }
  let rgbColor = new Color(r, g, b);
  // input 값 hex로 전환
  inputToHex.innerText = `*HEX:${rgbColor.hex()}`;
  //  색 미리보기
  colorShow.style.backgroundColor = rgbColor.hex();

  const rgba = rgbColor.rgba();

  // hover 이너함수 => 배경변경, 폰트 색 자동변경, 초기화
  function hoverInner(t, type) {
    t.addEventListener("mouseover", () => {
      t.style.backgroundColor = type;
      if (r + g + b < 400) {
        t.style.color = "white";
      } else {
        t.style.color = "black";
      }
    });
    t.addEventListener("mouseout", () => {
      t.style.backgroundColor = "";
      t.style.color = "";
    });
  }

  // 기본고차함수
  function hoverBtn(t) {
    hoverInner(t, rgba);
  }

  // 반대값찾기 호버 함수, 클릭 시 다른 버튼과 연동
  function hoverOppoBtn(t) {
    t.addEventListener("mouseover", () => {
      const inputValue = rgbInput.value.split(" ");
      const currValue = new Color(
        `${+inputValue[0]}`,
        `${+inputValue[1]}`,
        `${+inputValue[2]}`
      );
      const currOppValue = currValue.opposite();
      const splitedOpp = currOppValue.split(" ");
      const splitedOppInner = `${splitedOpp[0]},${splitedOpp[1]},${splitedOpp[2]}`;
      const rgbOpp = `rgb(${splitedOppInner})`;

      t.style.backgroundColor = rgbOpp;
      if (r + g + b > 400) {
        t.style.color = "white";
      } else {
        t.style.color = "black";
      }

      oppoBtn.addEventListener("click", () => {
        rgbInput.value = `${splitedOpp[0]} ${splitedOpp[1]} ${splitedOpp[2]}`;
        colorShow.style.backgroundColor = rgbOpp;
        hoverInner(menuColCng, rgbOpp);
        hoverInner(backCng, rgbOpp);
        hoverInner(fontBtn, rgbOpp);
      });
    });
    t.addEventListener("mouseout", () => {
      t.style.backgroundColor = "";
      t.style.color = "";
    });
  }

  // 랜덤값 호버함수, 클릭 시 다른 버튼과 연동
  function hoverRanBtn(t) {
    t.addEventListener("mouseover", () => {
      const rand = rgbColor.random().split(" ");
      const randRgb = `rgb(${+rand[0]},${+rand[1]},${+rand[2]})`;
      t.style.backgroundColor = randRgb;
      if (+rand[0] + +rand[1] + +rand[2] < 400) {
        t.style.color = "white";
      } else {
        t.style.color = "black";
      }
      t.addEventListener("click", () => {
        rgbInput.value = `${rand[0]} ${rand[1]} ${rand[2]}`;
        colorShow.style.backgroundColor = `rgb(${rgbInput.value})`;
        hoverInner(menuColCng, randRgb);
        hoverInner(backCng, randRgb);
        hoverInner(fontBtn, randRgb);
      });
    });
    t.addEventListener("mouseout", () => {
      t.style.backgroundColor = "";
      t.style.color = "";
    });
  }

  // 투명도 호버함수, 다른 버튼과 연동
  function hoverOpaBtn(t, opacity) {
    t.addEventListener("mouseover", () => {
      const inputValue = rgbInput.value.split(" ");
      const currRgbaValue = `rgba(${inputValue[0]},${inputValue[1]},${inputValue[2]},${opacity})`;
      t.style.backgroundColor = currRgbaValue;
      if (r + g + b < 400) {
        t.style.color = "white";
      } else {
        t.style.color = "black";
      }
    });
    t.addEventListener("mouseout", () => {
      const inputValue = rgbInput.value.split(" ");
      const currRgbaValue = `rgba(${inputValue[0]},${inputValue[1]},${inputValue[2]},${opacity})`;

      hoverInner(menuColCng, currRgbaValue);
      hoverInner(backCng, currRgbaValue);
      hoverInner(fontBtn, currRgbaValue);

      colorShow.style.backgroundColor = currRgbaValue;
      rgbInput.value = `${inputValue[0]} ${inputValue[1]} ${inputValue[2]} ${opacity}`;

      t.style.backgroundColor = "";
      t.style.color = "";
    });
  }

  // nav footer 버튼 호버
  hoverBtn(menuColCng);
  // 배경색 버튼 호버
  hoverBtn(backCng);
  // 폰트색 버튼 호버
  hoverBtn(fontBtn);
  // 랜덤색 버튼 호버
  hoverRanBtn(randCng);
  // 반대색 버튼 호버
  hoverOppoBtn(oppoBtn);

  // 투명도 버튼 클릭시 투명도 조절
  opaBtn.addEventListener("click", () => {
    let opaInput = prompt("0 ~ 1.0 사이의 수를 입력해주세요.");
    while (opaInput > 1 || opaInput < 0) {
      opaInput = prompt("0 ~ 1.0 사이의 수를 입력해주세요.");
    }
    // 투명도 버튼 호버
    hoverOpaBtn(opaBtn, +opaInput);
  });

  // menuColBtn 클릭시 nav foot 색 변경
  const navBar = document.querySelector("nav");
  const footer = document.querySelector("footer");

  // rgba 값이 있다면 rgba로 없다면 rgb로
  menuColCng.addEventListener("click", () => {
    const inputValue = rgbInput.value.split(" ");
    const currRgbValue = `rgb(${inputValue[0]},${inputValue[1]},${inputValue[2]})`;
    const currRgbaValue = `rgb(${inputValue[0]},${inputValue[1]},${inputValue[2]},${inputValue[3]})`;
    if (!inputValue[3]) {
      navBar.style.backgroundColor = currRgbValue;
      footer.style.backgroundColor = currRgbValue;
    } else {
      navBar.style.backgroundColor = currRgbaValue;
      footer.style.backgroundColor = currRgbaValue;
    }
  });

  // backCng 클릭 시 배경색 변경
  const body = document.querySelector("body");

  backCng.addEventListener("click", () => {
    const inputValue = rgbInput.value.split(" ");
    const currRgbValue = `rgb(${inputValue[0]},${inputValue[1]},${inputValue[2]})`;
    const currRgbaValue = `rgb(${inputValue[0]},${inputValue[1]},${inputValue[2]},${inputValue[3]})`;
    if (!inputValue[3]) {
      body.style.backgroundColor = currRgbValue;
    } else {
      body.style.backgroundColor = currRgbaValue;
    }
  });

  fontBtn.addEventListener("click", () => {
    const fontCng = document.querySelectorAll(".font");
    console.log(fontCng);
    const inputValue = rgbInput.value.split(" ");
    const currRgbValue = `rgb(${inputValue[0]},${inputValue[1]},${inputValue[2]})`;
    const currRgbaValue = `rgb(${inputValue[0]},${inputValue[1]},${inputValue[2]},${inputValue[3]})`;

    for (let font of fontCng) {
      if (!inputValue[3]) {
        font.style.color = currRgbValue;
      } else {
        font.style.color = currRgbaValue;
      }
    }
  });
});
