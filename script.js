// variables
var canvas = document.querySelector("#myCanvas");
// to get all 2d animations property,we must use the below line.
var ctx = canvas.getContext("2d");
const colorArray = ["#267BD1", "#F56147", "#DA1B1B", "#1BDA27"];
var colorContainer = document.querySelector(".color_container");
var clrBtn = document.querySelector(".clear");
var downloadBtn = document.querySelector(".download");
var currentColor = colorArray[0];
clrBtn.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// for downloading the drawn image
downloadBtn.addEventListener("click", () => {
  var link = document.createElement("a");
  link.download = new Date().toDateString() + ".png";
  link.href = canvas.toDataURL();
  link.click();
});

// for choosing the different color
colorArray.forEach((color) => {
  const colorPlate = document.createElement("div");
  colorPlate.className = "color";
  colorPlate.style.backgroundColor = color;
  colorPlate.onclick = () => {
    currentColor = color;
  };
  colorContainer.insertAdjacentElement("beforeend", colorPlate);
});

console.log(ctx);

// to draw the lines 
const draw = (event) => {
  const rect = canvas.getBoundingClientRect();
  ctx.lineWidth = 3; // width of line by the brush
  ctx.lineCap = "round"; // rounded paint brush
  // by getting the pageX,pageY value,we can draw lines
  ctx.lineTo(event.pageX - rect.left, event.pageY - rect.top);
  ctx.strokeStyle = currentColor; 
  ctx.stroke();
  ctx.moveTo(event.pageX - rect.left, event.pageY - rect.top); // this will move the position of pen
};
var isMouseDown = false;
canvas.onmousedown = (event) => {
  isMouseDown = true;
  console.log(event);
  draw(event);
};

canvas.onmousemove = (event) => {
  if (isMouseDown) draw(event);
};

canvas.onmouseup = (event) => {
  ctx.beginPath(); // start the path to draw or change the ctx value
  isMouseDown = false;
};
