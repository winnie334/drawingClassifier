# drawingClassifier
A neural network which tries to classify your drawing in 4 categories: **Fish**, **hurricanes**, **mushrooms** and **rainbows**. 
This idea was ~~completely stolen from~~ strongly inspired by [the Coding Train](https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw).

## How does it work?
The neural network has a big database of images, these come from [Google Quick Draw](https://quickdraw.withgoogle.com/). 
Using this giant collection of images, the neural network is trained to classify any new, unseen drawing into one of the 4 categories mentioned earlier.

[The neural network](https://github.com/CodingTrain/Toy-Neural-Network-JS) used in this project is made by [Daniel Shiffman](https://github.com/shiffman).

## How to install:
Download or clone this repository and open *index.html*. It should work straight away. If you run into any issues, please let me know or create a pull request.

(Note that it is sometimes necessary to run this project on a local server)

## Easily changeable variables:
If you want to change the code a bit, the following variables are easily changed and can have a significant impact:
  * `const total`, found in *sketch.js*. This variable decides how many images are loaded into memory and used for training.
  Please note that your browser might run out of memory if this number is too high. Obviously, the time needed to train one generation increases as well.
  This github repository currently has 2000 images of each category, so if you want to use more you'll need to download them yourself.
  
  * `const hidden_nodes`, also found in *sketch.js*. This variable is responsible for the amount of hidden nodes in the neural network.
  Increasing this number will also increase the time needed to train one generation, so choose wisely.
  
## Todo's:
  - [x] Provide some sort of UI.
  - [ ] Implement a "keep training" button.
  - [ ] Make users able to delete parts of their drawing using right click.
