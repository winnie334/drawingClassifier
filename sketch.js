const total = 600; // amount of images to load in.
const hidden_nodes = 75;
const len = 784; // width * height of each image.

let images;
// both data sets contain 4 arrays, each for its own type of drawing.
let training_data = [];
let testing_data = [];

let nn;
let train_counter = 0;

function preload() {
  fishies = loadImages('fish');
  mushies = loadImages('mushroom');
  hurries = loadImages('hurricane');
  rainies = loadImages('rainbow');
  images = [fishies, hurries, mushies, rainies];
  console.log("Preloaded images.")
  let s = "preparing data (" + total + " images)."
  document.getElementById("status").innerHTML = s;
}


function setup() {
  let canvas = createCanvas(280, 280);
  canvas.parent('canvas');
  strokeWeight(18);
  stroke(0);
  background(220);
  prepareData();
  initializeButtons();
  nn = new NeuralNetwork(len, hidden_nodes, 4);
  guess();
}

function initializeButtons() {
  document.getElementById("status").innerHTML = "doing nothing.";
  let trainButton = select('#train');
  trainButton.mousePressed(function() {
    document.getElementById("status").innerHTML = "training!";
    setTimeout(train, 50);
  });

  let testButton = select('#test');
  testButton.mousePressed(function() {
    document.getElementById("status").innerHTML = "testing!";
    setTimeout(evaluate, 50);
  });

  let clearButton = select('#clear');
  clearButton.mousePressed(function() {
    background(220);
  });
}

function draw() {
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
    guess();
  }
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
  train_counter += 1;
  document.getElementById("generations").innerHTML = train_counter;
  document.getElementById("status").innerHTML = "doing nothing.";
  guess(); // We guess again, to see what the current field is
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

  document.getElementById("status").innerHTML = "doing nothing.";
  let percentage = 100 * correct / testing_data.length;
  document.getElementById("percentage").innerHTML = nf(percentage, 2, 2) + "%";
}

function guess() {
  // Guesses the current drawing.
  let input = [];
  let img = get();
  img.resize(28, 28);
  img.loadPixels();
  for (var i = 0; i < img.pixels.length; i += 4) {
    if (img.pixels[i] == 220) {
      input.push(1);
    } else {
      input.push(img.pixels[i] / 255.0)
    }
  }
  let prediction = nn.predict(input);
  // Sadly the total prediction odds don't add up to 100,
  // so we need to do that ourselves.
  let total = prediction.reduce(function(a, b) {
    return a + b;
  }, 0);
  for (var i = 0; i < prediction.length; i++) {
    prediction[i] = prediction[i] / total;
  }
  showGuess(prediction);
}

function showGuess(prediction) {
  // First we display the percentages
  for (var i = 0; i < prediction.length; i++) {
    document.getElementById("chance_" + i).innerHTML = nf(prediction[i] * 100, 2, 2);
  }

  let result = prediction.indexOf(max(prediction));

  // Then we update the images
  let fish = "data/fish/1.png";
  let hurricane = "data/hurricane/32.png";
  let mushroom = "data/mushroom/14.png";
  let rainbow = "data/rainbow/156.png";
  let result_images = [fish, hurricane, mushroom, rainbow];
  document.getElementById("resultimg_1").src = result_images[result];
  document.getElementById("resultimg_2").src = result_images[result];

  let fish_s = "fish";
  let hurricane_s = "hurricane";
  let mushroom_s = "mushroom";
  let rainbow_s = "rainbow";
  let result_strings = [fish_s, hurricane_s, mushroom_s, rainbow_s];
  document.getElementById("result").innerHTML = result_strings[result];
}