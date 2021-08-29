const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const accuracyCounter = document.querySelector("#accuracyCounter");

const gridSize = 100;
const blockSize = canvas.width / gridSize;

let dots;
let layers = [];
let weights = [];
let bias = [];

window.onload = init;
function init() {
  dots = generateDots(5);
  addSliders("changeWeight", "#weights", 12);
  addSliders("changeBias", "#biass", 5);
  start();
}

function addSliders(oninput, id, count) {
  const parrent = document.querySelector(id);
  for (let i = 0; i < count; i++) {
    const ele = document.createElement("input");
    ele.type = "range";
    ele.max = 100;
    ele.min = -100;
    ele.setAttribute("oninput", `${oninput}(${i},this.value)`);

    const randomNo = Math.round(-100 + Math.random() * (100 - -100));
    ele.value = randomNo;

    if (id == "#weights") weights[i] = randomNo / 100;
    else if (id == "#biass") bias[i] = randomNo / 100;

    parrent.appendChild(ele);
  }
}

function changeWeight(index, value) {
  weights[index] = value / 100;
  start();
}

function changeBias(index, value) {
  bias[index] = value / 100;
  start();
}

function start() {
  draw(dots);
}

function save() {
  localStorage.setItem("weights", JSON.stringify(weights));
  localStorage.setItem("bias", JSON.stringify(bias));
}

function load() {
  weights = JSON.parse(localStorage.getItem("weights"));
  bias = JSON.parse(localStorage.getItem("bias"));

  //check if empty
  if (weights) return alert("nothing saved yet");

  //remove all childrens
  const weightsSection = document.getElementById("weights");
  while (weightsSection.firstChild) {
    weightsSection.removeChild(weightsSection.firstChild);
  }

  const biasSection = document.getElementById("biass");
  while (biasSection.firstChild) {
    biasSection.removeChild(biasSection.firstChild);
  }

  //add labels
  let label = document.createElement("label");
  label.innerHTML = "Weights";
  weightsSection.appendChild(label);

  label = document.createElement("label");
  label.innerHTML = "Bias";
  biasSection.appendChild(label);

  changeSliders(weights, "#weights", "changeWeight");
  changeSliders(bias, "#biass", "changeBias");

  start();
}

function changeSliders(arr, id, oninput) {
  const parrent = document.querySelector(id);
  for (let i = 0; i < arr.length; i++) {
    const ele = document.createElement("input");
    ele.type = "range";
    ele.max = 100;
    ele.min = -100;
    ele.setAttribute("oninput", `${oninput}(${i},this.value)`);

    ele.value = arr[i] * 100;
    parrent.appendChild(ele);
  }
}
