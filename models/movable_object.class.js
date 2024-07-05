class MovableObject {
  x;
  y;
  img;
  height;
  width;
  imageCache = {};
  currentImage = 0;
  speed;
  otherDirection = false;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImgs(arr) {
    arr.forEach((path) => {
      let img = new Image();
      this.img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    console.log('moving right');
  }

  moveLeft() {}
}
