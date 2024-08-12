let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
updateSizeInfo();

function init() {
  world = null;
  closeStartEndScreen();
  initLevel();
  canvas = document.getElementById('canvas');
  world = new World(canvas);
  muteSounds();
  gameRunning = true;
  showMobileBtns();
}

function restartGame() {
  init(); 
}

window.addEventListener('keydown', (event) => {
  if (event.code === 'ArrowUp') {
    keyboard.UP = true;
  }
  if (event.code === 'ArrowDown') {
    keyboard.DOWN = true;
  }
  if (event.code === 'ArrowLeft') {
    keyboard.LEFT = true;
  }
  if (event.code === 'ArrowRight') {
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
  if (event.code === 'ArrowUp') {
    keyboard.UP = false;
  }
  if (event.code === 'ArrowDown') {
    keyboard.DOWN = false;
  }
  if (event.code === 'ArrowLeft') {
    keyboard.LEFT = false;
  }
  if (event.code === 'ArrowRight') {
    keyboard.RIGHT = false;
  }
  if (event.code === 'Space') {
    keyboard.SPACE = false;
  }
  if (event.code === 'KeyB') {
    keyboard.KEY_B = false;
  }
});

document.getElementById('arrowLeft').addEventListener('touchstart', (event) => {
  event.preventDefault;
  keyboard.LEFT = true;
});

document.getElementById('arrowLeft').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.LEFT = false;
});

document.getElementById('arrowUp').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyboard.UP = true;
});

document.getElementById('arrowUp').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.UP = false;
});

document.getElementById('arrowRight').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyboard.RIGHT = true;
});

document.getElementById('arrowRight').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.RIGHT = false;
});

document.getElementById('arrowDown').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyboard.DOWN = true;
});

document.getElementById('arrowDown').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.DOWN = false;
});

document.getElementById('attackBtn').addEventListener('touchstart', (event) => {
  event.preventDefault();
  keyboard.SPACE = true;
});

document.getElementById('attackBtn').addEventListener('touchend', (event) => {
  event.preventDefault();
  keyboard.SPACE = false;
});

// Screen Stuff

let startBtn = document.getElementById('startButton');
let tryAgainBtn = document.getElementById('tryAgainBtn');

function closeStartEndScreen() {
  let winScreenContainer = document.getElementById('endScreenWinContainer');
  let startScreenContainer = document.getElementById('startScreenContainer');
  let endScreenLoseContainer = document.getElementById('endScreenLoseContainer');
  endScreenLoseContainer.classList.add('d-none');
  winScreenContainer.classList.add('d-none');
  startScreenContainer.classList.add('d-none');
}

function endGameAfterLose() {
  let endScreenLoseContainer = document.getElementById('endScreenLoseContainer');
  endScreenLoseContainer.classList.remove('d-none');
}

function endGameAfterWin() {
  let winScreenContainer = document.getElementById('endScreenWinContainer');
  winScreenContainer.classList.remove('d-none');
  
}

function muteSounds() {
  let volumeIsOnBtn = document.getElementById('volumeIsOnBtn');
  let volumeIsOffBtn = document.getElementById('volumeIsOffBtn');
  volumeIsOnBtn.classList.add('d-none');
  volumeIsOffBtn.classList.remove('d-none');

  setTimeout(() => {
    world.sounds.forEach((sound) => {
      sound.volume = 0;
    });
  }, 100);
 
}

function unmuteSounds() {
  let volumeIsOnBtn = document.getElementById('volumeIsOnBtn');
  let volumeIsOffBtn = document.getElementById('volumeIsOffBtn');
  volumeIsOnBtn.classList.remove('d-none');
  volumeIsOffBtn.classList.add('d-none');
  world.sounds.forEach((sound) => {
    if (sound.src.includes('level_music')) {
      sound.volume = 0.4;
    } else sound.volume = 0.2;
  });
}

function showMobileBtns() {
  const mobileControl = document.getElementById('mobileControl');
  const attackBtn = document.getElementById('attackBtn');
  mobileControl.classList.remove('d-none');
  attackBtn.classList.remove('d-none');
}

function updateSizeInfo() {
  const mobileControl = document.getElementById('mobileControl');
  const attackBtn = document.getElementById('attackBtn');
  const turnDeviceOverlay = document.getElementById('turnDeviceOverlay');
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width <= 1024 && gameRunning) {
    mobileControl.classList.remove('d-none');
    attackBtn.classList.remove('d-none');
  } else {
    mobileControl.classList.add('d-none');
    attackBtn.classList.add('d-none');
  }

  if (width <= 1024 && height > width) {
    turnDeviceOverlay.classList.remove('d-none');
  } else turnDeviceOverlay.classList.add('d-none');
}

window.addEventListener('resize', updateSizeInfo);

// DIDNT WORK WELL - later

// function fullscreen() {
//   let fullscreen = document.getElementById('canvasContainer');
//   enterFullscreen(fullscreen);

//   canvas = document.querySelector('canvas');
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// }

// function enterFullscreen(element) {
//   if (element.requestFullscreen) {
//     element.requestFullscreen();
//   } else if (element.msRequestFullscreen) {
//     element.msRequestFullscreen();
//   } else if (element.webkitRequestFullscreen) {
//     element.webkitRequestFullscreen();
//   }
// }

// document.addEventListener('keydown', (event) => {
//   if (event.key === 'Escape') {
//     event.preventDefault();
//     exitFullscreenS();
//   }
// });

// function exitFullscreenS() {
//   console.log('hello');
//   if (document.exitFullscreen) {
//     document.exitFullscreen();
//   } else if (document.webkitExitFullscreen) {
//     document.webkitExitFullscreen();
//   }

//   canvas = document.querySelector('canvas');
//   canvas.width = 900;
//   canvas.height = 480;
// }
