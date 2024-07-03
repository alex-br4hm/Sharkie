class World {
  character = new Character();
  enemies = [new Pufferfish(), new Pufferfish(), new Pufferfish()];
  light = new Light();

  ctx;
  canvas;

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.drawImage(
      this.character.img,
      this.character.x,
      this.character.y,
      this.character.height,
      this.character.width
    );

    this.enemies.forEach((enemy) => {
      this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.height, enemy.width);
    });

    this.ctx.drawImage(this.light.img, this.light.x, this.light.y);

    //  draw is called again and again
    requestAnimationFrame(() => {
      this.draw();
    });
  }
}
