"use strict";

const defaultColor = "#ff6b6b";
const padWidth = 800;
let gridContainer;
let isDrawing = false;
let cellNum = 64;
let cellColor = defaultColor;

const body = document.body;

const controlsContainer = document.createElement("div");
controlsContainer.classList.toggle("controls-container");
controlsContainer.style.margin = "20px auto";
body.appendChild(controlsContainer);

const button = document.createElement("button");
controlsContainer.appendChild(button);
button.style.width = "160px";
button.style.height = "40px";
button.textContent = "Pad Size";

const colorPickContainer = document.createElement("div");
colorPickContainer.classList.toggle("color-container");
controlsContainer.appendChild(colorPickContainer);
const colorPot = document.createElement("input");
colorPot.type = "color";
colorPot.id = "color";
colorPot.type = "color";
colorPot.value = cellColor;
const colorLabel = document.createElement("label");
colorLabel.for = "color";
colorLabel.textContent = "Color:";
colorPickContainer.appendChild(colorLabel);
colorPickContainer.appendChild(colorPot);

gridContainer = addGridContainer();
let cells = addCells(padWidth, cellNum);

button.addEventListener("click", function () {
  gridContainer.remove();
  gridContainer = addGridContainer();

  cellNum = prompt("How many cells on one side?");

  cells = addCells(padWidth, cellNum);
});

colorPot.addEventListener("change", function (e) {
  cellColor = e.target.value;
  console.log(e.target.value);
  cells.forEach((cell) => addClickEvent(cell, cellColor, 100));
});

function addGridContainer() {
  const gridContainer = document.createElement("div");
  body.appendChild(gridContainer);
  gridContainer.style.margin = "0 auto";
  gridContainer.style.width = `${padWidth}px`;
  gridContainer.style.height = `${padWidth}px`;
  gridContainer.style.border = "2px solid #555";

  return gridContainer;
}

function addClickEvent(square, color, brightness) {
  const addColor = function () {
    if (isDrawing) {
      brightness = makeDarker(brightness);
      square.style.backgroundColor = `color-mix(in srgb, ${color} ${brightness}%, black)`;
    }
  };

  square.addEventListener("mousedown", () => (isDrawing = true));
  square.addEventListener("mouseenter", addColor);
  square.addEventListener("mouseup", () => (isDrawing = false));
}

function addCells(padWidth, cellNum) {
  const cellSize = padWidth / cellNum;
  const cellArray = [];

  for (let i = 0; i < cellNum; i++) {
    let rowContainer = document.createElement("div");
    rowContainer.classList.toggle("grid-container");
    for (let i = 0; i < cellNum; i++) {
      let square = document.createElement("div");
      square.classList.toggle("cell");
      rowContainer.appendChild(square);
      square.style.width = `${cellSize}px`;
      square.style.height = `${cellSize}px`;

      cellArray.push(square);

      let brightness = 100;

      addClickEvent(square, cellColor, brightness);
    }
    gridContainer.appendChild(rowContainer);
  }
  return cellArray;
}

function makeDarker(br) {
  br = br - 10;
  if (br < 0) br = 0;
  return br;
}
