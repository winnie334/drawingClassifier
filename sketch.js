const total = 1000;
const len = 784;

let images;
// both data sets contain 4 arrays, each for its own type of drawing.
let training_data = [];
let testing_data = [];

let nn;

function preload() {
  fishies = loadImages('fish');
  mushies = loadImages('mushroom');
  hurries = loadImages('hurricane');
  rainies = loadImages('rainbow');
  images = [fishies, mushies, hurries, rainies];
  console.log("Preloaded images.")
}



function setup() {
  createCanvas(280, 280);
  prepareData();
  nn = new NeuralNetwork(len, 75, 4);
  for (var i = 1; i < 150; i++) {
    train();
    console.log("Trained till epoch " + i);
    percentage = evaluate();
    console.log("Percentage correct: " + percentage);
  }
}

function draw() {
  image(img, 0, 0);
}

function train() {
  // train for one epoch
  for (var i = 0; i < training_data.length; i++) {
    let input = training_data[i];
    let label = training_data[i].label;
    let target = [0, 0, 0, 0];
    target[label] = 1;
    nn.train(input, target);
  }
}

function evaluate() {
  // Check the current network against the training data to see how well it's doing
  let correct = 0;

  for (var i = 0; i < testing_data.length; i++) {
    let input = testing_data[i];
    let label = testing_data[i].label;
    let prediction = nn.predict(input);
    let guess_index = prediction.indexOf(max(prediction));
    if (label == guess_index) {
      correct += 1;
    }
  }

  let percentage = correct / testing_data.length;
  return percentage;
}