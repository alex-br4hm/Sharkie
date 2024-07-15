let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  // closeStartScreen();
  canvas = document.getElementById('canvas');
  world = new World(canvas);
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyW') {
    keyboard.UP = true;
  }
  if (event.code === 'KeyS') {
    keyboard.DOWN = true;
  }
  if (event.code === 'KeyA') {
    keyboard.LEFT = true;
  }
  if (event.code === 'KeyD') {
    keyboard.RIGHT = true;
  }
  if (event.code === 'Space') {
    keyboard.SPACE = true;
  }
  if (event.code === 'KeyB') {
    keyboard.KEY_B = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (event.code === 'KeyW') {
    keyboard.UP = false;
  }
  if (event.code === 'KeyS') {
    keyboard.DOWN = false;
  }
  if (event.code === 'KeyA') {
    keyboard.LEFT = false;
  }
  if (event.code === 'KeyD') {
    keyboard.RIGHT = false;
  }
  if (event.code === 'Space') {
    keyboard.SPACE = false;
  }
  if (event.code === 'KeyB') {
    keyboard.KEY_B = false;
  }
});

// Screen Stuff

let startBtn = document.getElementById('startButton');

function closeStartScreen() {
  let startScreenContainer = document.getElementById('startScreenContainer');
  startScreenContainer.classList.add('d-none');
}
