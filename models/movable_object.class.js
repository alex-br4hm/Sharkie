class MovableObject {
  x = 120;
  y = 300;
  img;
  height = 120;
  width = 100;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  moveRight() {
    console.log('moving right');
  }

  moveLeft() {}
}
