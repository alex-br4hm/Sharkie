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
  energy = 100;

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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Jellyfish || this instanceof Pufferfish || this instanceof Endboss) {
      ctx.beginPath();
      ctx.lineWidth = '3';
      this;
      ctx.strokeStyle = 'red';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
    if (this instanceof Character) {
      ctx.beginPath();
      ctx.lineWidth = '3';
      this;
      ctx.strokeStyle = 'red';
      ctx.rect(this.x + 20, this.y + 70, this.width - 40, this.height - 90);
      ctx.stroke();
    }
  }

  // characater.isColliding
  isColliding(movableObject) {
    return (
      this.x + this.width > movableObject.x &&
      this.y + this.height > movableObject.y &&
      this.x < movableObject.x &&
      this.y < movableObject.y + movableObject.height
    );
  }

  playSwimAnimation() {
    let i = this.currentImage % this.IMAGES_SWIMMING.length;
    let path = this.IMAGES_SWIMMING[i];
    this.img.src = path;
    this.currentImage++;
  }
}
