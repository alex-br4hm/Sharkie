class World {
  character = new Character();
  enemies = [new Pufferfish(), new Pufferfish(), new Pufferfish(), new Jellyfish(), new Jellyfish(), new Jellyfish()];
  light = new Light();
  backgroundObject = new BackgroundObject();

  ctx;
  canvas;
  keyboard;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMap(this.backgroundObject);
    this.addToMap(this.character);
    this.addObjectsToMap(this.enemies);
    // this.ctx.drawImage(this.light.img, this.light.x, this.light.y);

    //  draw is called again and again
    requestAnimationFrame(() => {
      this.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  addToMap(movableObject) {
    try {
      this.ctx.drawImage(
        movableObject.img,
        movableObject.x,
        movableObject.y,
        movableObject.width,
        movableObject.height
      );
    } catch (e) {
      console.warn('error loading image');
      console.log('could not load image', this.movableObject.img.src);
    }
  }
}
