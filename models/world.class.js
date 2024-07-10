class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  camera_x = 0;
  statusBar = new Statusbar();
  coinBar = new Coinbar();
  poisonBar = new Poisonbar();
  bubbles = [];
  endboss = this.level.endboss;

  level_music = new Audio('audio/level_music.mp3');

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.level_music.loop = true;
    document.getElementById('startButton').addEventListener('click', () => {
      this.level_music.play();
    });
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkBubbleShot();
    }, 200);
  }

  checkCollisions() {
    this.checkCollisionsEnemies();
    this.checkCollisionsEndboss();
    this.checkCollisionsCoins();
    this.checkCollisionsPoisons();
    this.checkCollisionsBubbles();
  }

  checkCollisionsBubbles() {
    this.bubbles.forEach((bubble, indexBubbles) => {
      if (bubble.distance > 70) {
        // Bubble zerplatzt Animation
        this.bubbles.splice(indexBubbles, 1);
      }
      this.level.enemies.forEach((enemy, indexEnemies) => {
        if (enemy.isColliding(bubble)) {
          console.log(this.level.enemies);
          this.level.enemies.splice(indexEnemies, 1);
          // Bubble zerplatzt Animation
          this.bubbles.splice(indexBubbles, 1);
        }
      });
    });
  }

  checkCollisionsEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.getHit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        this.character.getHit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsCoins() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.level.coins.splice(index, 1);
        this.character.getCoin();
        this.coinBar.setAmount(this.character.coin);
      }
    });
  }

  checkCollisionsPoisons() {
    this.level.poisonBottles.forEach((poisonBottle, index) => {
      if (this.character.isColliding(poisonBottle)) {
        this.level.poisonBottles.splice(index, 1);
        this.character.getPoisonBottle();
        this.poisonBar.setAmount(this.character.poisonBottles);
      }
    });
  }

  checkBubbleShot() {
    if (this.keyboard.KEY_B) {
      if (!this.character.otherDirection) {
        let bubble = new BubbleShot();
        bubble.shotBubble(this.character.x, this.character.y);
        this.bubbles.push(bubble);
      } else {
        let bubble = new BubbleShot();
        bubble.otherDirection = true;
        bubble.shotBubble(this.character.x, this.character.y);
        this.bubbles.push(bubble);
      }
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // console.log(this.character.x);

    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObject);
    this.ctx.translate(-this.camera_x, 0);
    // HERE FIXED OBJECTS
    this.addToMap(this.statusBar);
    this.addToMap(this.poisonBar);
    this.addToMap(this.coinBar);
    // this.ctx.fillText(this.character.coin, 50, 75);

    this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.poisonBottles);

    if (this.bubbles.length > 0) {
      this.addObjectsToMap(this.bubbles);
    }

    this.ctx.translate(-this.camera_x, 0);

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
    if (movableObject.otherDirection) {
      this.flipImage(movableObject);
    }

    movableObject.draw(this.ctx);
    movableObject.drawFrame(this.ctx);

    if (movableObject.otherDirection) {
      this.flipImageBack(movableObject);
    }
  }

  flipImage(movableObject) {
    this.ctx.save();
    this.ctx.translate(movableObject.width, 0);
    this.ctx.scale(-1, 1);
    movableObject.x = movableObject.x * -1;
  }

  flipImageBack(movableObject) {
    movableObject.x = movableObject.x * -1;
    this.ctx.restore();
  }
}
