let accuracy = 0;
const totalCases = gridSize * gridSize;

function draw(dots) {
  //#42bcf5 light blue
  //#f55a42 light red

  //reset
  ctx.fillStyle = "#202124";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const prediction = model(
        map(i, 0, gridSize, 0, 1),
        map(j, 0, gridSize, 0, 1)
      );
      ctx.fillStyle = prediction ? "#f55a42" : "#42bcf5";
      ctx.fillRect(blockSize * i, blockSize * j, blockSize, blockSize);
    }
  }

  //  draw dots
  ctx.strokeStyle = "#000000";
  ctx.strokeWidth = 15;
  dots.forEach((dot) => {
    ctx.beginPath();

    //red dot
    if (dot.value) ctx.fillStyle = "red";
    else ctx.fillStyle = "blue";

    ctx.ellipse(dot.x * blockSize, dot.y * blockSize, 5, 5, 0, 0, 360);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  });

  showAccuracy();
}

function showAccuracy() {
  const acc = Math.floor(map(accuracy, 0, totalCases, 0, 100));
  accuracyCounter.innerHTML = acc;
  accuracy = 0;
}

function model(x, y) {
  let layers = [];
  //input node
  layers[0] = new Array(2);
  layers[0][0] = x;
  layers[0][1] = y;

  //hidden layer
  layers.push(new Array(3));
  layers[layers.length - 1][0] = null;
  layers[layers.length - 1][1] = null;
  layers[layers.length - 1][2] = null;

  //output node
  layers.push(new Array(2));
  layers[layers.length - 1][0] = null;
  layers[layers.length - 1][1] = null;

  return network(layers);
}

function network(layers) {
  const correctPrediction = layers[0][0] > layers[0][1] ? 1 : 0;

  let n = 0;
  let b = 0;
  //one layer
  for (let i = 1; i < layers.length; i++) {
    //node
    //x[n]*w +b
    for (let j = 0; j < layers[i].length; j++) {
      let sum = 0;
      //every node from prev layer
      for (let k = 0; k < layers[i - 1].length; k++) {
        const inputNode = layers[i - 1][k];
        sum += inputNode * weights[n];
        n++;
      }
      sum += bias[b];
      layers[i][j] = sigmoid(sum);
      b++;
    }
  }

  const outputNode = layers.pop();
  if (!outputNode[0] && outputNode[0] != 0) throw new Error(outputNode);

  const prediction = outputNode[0] > outputNode[1] ? 1 : 0;
  if (prediction == correctPrediction) accuracy++;

  return prediction;
}

function map(n, start1, stop1, start2, stop2) {
  return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}

function sigmoid(x) {
  const t = Math.pow(2.71828, x * -1) + 1;
  return 1 / t;
}

function randomArr(length) {
  const arr = new Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = Math.round(-1 + Math.random() * (1 - -1));
  }
  return arr;
}

function generateDots(num) {
  const min = 5;
  const max = gridSize - min;

  let arr = new Array(num);
  for (let i = 0; i < num; i++) {
    arr[i] = {
      x: Math.floor(Math.random() * max) + min,
      y: Math.floor(Math.random() * max) + min,
    };

    if (arr[i].x < arr[i].y) arr[i].value = 0;
    else arr[i].value = 1;
  }
  return arr;
}
