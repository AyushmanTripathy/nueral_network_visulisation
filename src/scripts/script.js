const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const accuracyCounter = document.querySelector("#accuracyCounter");

const gridSize = 100;
const blockSize = canvas.width / gridSize;

let dots;
let layers = [];
let weights = [
  0.08, 0.93, -0.47, 0.6, -0.51, 0.78, 0.99, -0.09, 0.8, -0.52, -0.51, 0.08,
];
let bias = [-0.28, -1, 0.72, -0.65, 0.79];

window.onload = init;
function init() {
  dots = generateDots(15);
  changeSliders(weights, "#weights", "changeWeight");
  changeSliders(bias, "#biass", "changeBias");

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
  const temp = JSON.parse(localStorage.getItem("weights"));

  //check if empty
  if (!temp) return alert("nothing saved yet");

  weights = temp;
  bias = JSON.parse(localStorage.getItem("bias"));

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
