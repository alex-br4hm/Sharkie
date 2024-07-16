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
  isShooting = false;

  level_music = new Audio('audio/level_music.mp3');
  bubble_shot_sound = new Audio('audio/bubble_shot.mp3');

  constructor(canvas) {
    this.ctx = canvas.getContext('2d');
    this.ctx.font = '30px Impact';
    this.ctx.fillStyle = 'Orange';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.level_music.loop = true;

    this.level_music.play();
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
        this.bubbles.splice(indexBubbles, 1);
      }
      this.level.enemies.forEach((enemy, indexEnemies) => {
        if (enemy.isColliding(bubble)) {
          this.level.enemies[indexEnemies].isDead = true;
          this.level.enemies[indexEnemies].x = this.level.enemies[indexEnemies].x;
          setTimeout(() => {
            this.level.enemies.splice(indexEnemies, 1);
          }, 2000);
          // Bubble zerplatzt Animation
          this.bubbles.splice(indexBubbles, 1);
        }
      });
      this.level.endboss.forEach((endboss) => {
        if (endboss.isColliding(bubble)) {
          endboss.energy -= 20;
          this.bubbles.splice(indexBubbles, 1);
          console.log(endboss.energy);
        }
      });
    });
  }

  checkCollisionsEnemies() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.getHit(enemy);
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  checkCollisionsEndboss() {
    this.level.endboss.forEach((endboss) => {
      if (this.character.isColliding(endboss)) {
        console.log(this.character.energy);
        this.character.getHit(endboss);
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
    this.isShooting = false;
    if (this.keyboard.SPACE && this.bubbles.length <= 0) {
      this.bubble_shot_sound.play();
      if (!this.character.otherDirection) {
        this.isShooting = true;

        setTimeout(() => {
          if (this.bubbles.length <= 0) {
            let bubble = new BubbleShot();
            bubble.shotBubble(this.character.x, this.character.y);
            this.bubbles.push(bubble);
          }
        }, 500);
      } else {
        this.isShooting = true;

        setTimeout(() => {
          let bubble = new BubbleShot();
          bubble.otherDirection = true;
          bubble.shotBubble(this.character.x, this.character.y);
          this.bubbles.push(bubble);
        }, 500);
      }
    }
  }

  cameraMoveBoss = 0;

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
    // this.ctx.fillText(this.character.coin + '/12', 50, 75);
    // this.ctx.fillText(this.character.poisonBottles + '/12', 50, 110);

    if (this.character.bossFightStarted) {
      this.ctx.translate(this.camera_x - 50, 0);
    } else this.ctx.translate(this.camera_x, 0);

    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.endboss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.poisonBottles);

    if (this.bubbles.length > 0) {
      this.addObjectsToMap(this.bubbles);
    }

    if (this.character.bossFightStarted) {
      this.ctx.translate(-this.camera_x + 50, 0);
    } else this.ctx.translate(-this.camera_x, 0);

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
