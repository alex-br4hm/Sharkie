class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x;
  y;
  height;
  width;
  otherDirection = false;

  loadImg(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImgs(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      img.style = 'transform: scaleX(-1)';
      this.imageCache[path] = img;
    });
  }

  draw(ctx) {
    if (this.img) {
      try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
      } catch (error) {
        // console.log(this.IMAGES_LIFE);
      }
    }
  }

  drawFrame(ctx) {
    if (
      this instanceof Character ||
      this instanceof Jellyfish ||
      this instanceof Pufferfish ||
      this instanceof Endboss
    ) {
      ctx.beginPath();
      ctx.lineWidth = '3';
      this;
      ctx.strokeStyle = 'red';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
