let canvas;
let ctx;
let world;

function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas);
  ctx = canvas.getContext('2d');
}
