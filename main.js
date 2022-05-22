const contentBox1 = document.querySelector(".box1");
const iframe1 = document.createElement("iframe");
iframe1.src = "http://web.humoruniv.com/main.html";
contentBox1.append(iframe1);
console.log(contentBox1);

const contentBox2 = document.querySelector(".box2");
const iframe2 = document.createElement("iframe");
iframe2.src = "https://www.melon.com/chart/index.htm";
contentBox2.append(iframe2);
console.log(contentBox2);
