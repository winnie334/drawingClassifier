function prepareImages(images, label) {
  // Converts the images into arrays consisting of only 0 and 1's.
  let result = [];
  for (var i = 0; i < total; i++) {
    let better = beautify(images[i]);
    better.label = label;
    result.push(better);
  }
  return result;
}

function loadImages(dir) {
  let result = [];
  for (var i = 1; i <= total; i++) {
    img = loadImage('data/' + dir + '/' + i + '.png');
    result.push(img);
  }
  return result;
}

function beautify(img) {
  // get rid of those ugly artifacts
  img.loadPixels();
  let actualPixels = [];
  for (var i = 0; i < img.pixels.length; i += 4) {
    actualPixels.push(img.pixels[i] / 255.0);
  }
  //img.updatePixels();
  return actualPixels;
}

function prepareData() {
  // Convert all the images into usable data sets
  let full_data = [];
  let label_index = 0;
  for (let imageset of images) {
    // We convert each image set
    full_data.push(prepareImages(imageset, label_index));
    label_index += 1;
  }

  // Now we flatten the entire list
  let flattened_data = [];
  for (let preparedset of full_data) {
    for (let image of preparedset) {
      flattened_data.push(image);
    }
  }
  shuffle(flattened_data, true); // We shuffle all the image arrays
  console.log(flattened_data);
  // We split it into testing and training data
  training_data = flattened_data.slice(0, 0.8 * total * 4);
  testing_data = flattened_data.slice(0.8 * total * 4);
  console.log(training_data)
  console.log(testing_data)
  console.log("Prepared all the data.")
}