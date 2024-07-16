class Character extends MovableObject {
  IMAGES_SWIMMING = [
    './graphics/1_sharkie/3.Swim/1.png',
    './graphics/1_sharkie/3.Swim/2.png',
    './graphics/1_sharkie/3.Swim/3.png',
    './graphics/1_sharkie/3.Swim/4.png',
    './graphics/1_sharkie/3.Swim/5.png',
    './graphics/1_sharkie/3.Swim/6.png'
  ];

  IMAGES_FLOAT = [
    './graphics/1_sharkie/1.IDLE/1.png',
    './graphics/1_sharkie/1.IDLE/2.png',
    './graphics/1_sharkie/1.IDLE/3.png',
    './graphics/1_sharkie/1.IDLE/4.png',
    './graphics/1_sharkie/1.IDLE/5.png',
    './graphics/1_sharkie/1.IDLE/6.png',
    './graphics/1_sharkie/1.IDLE/7.png',
    './graphics/1_sharkie/1.IDLE/8.png',
    './graphics/1_sharkie/1.IDLE/9.png',
    './graphics/1_sharkie/1.IDLE/10.png',
    './graphics/1_sharkie/1.IDLE/11.png',
    './graphics/1_sharkie/1.IDLE/12.png',
    './graphics/1_sharkie/1.IDLE/13.png',
    './graphics/1_sharkie/1.IDLE/14.png',
    './graphics/1_sharkie/1.IDLE/15.png',
    './graphics/1_sharkie/1.IDLE/16.png',
    './graphics/1_sharkie/1.IDLE/17.png',
    './graphics/1_sharkie/1.IDLE/18.png'
  ];

  IMAGES_DEAD = [
    './graphics/1_sharkie/6.dead/1.Poisoned/1.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/2.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/3.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/4.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/5.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/6.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/7.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/8.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/9.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/10.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/11.png',
    './graphics/1_sharkie/6.dead/1.Poisoned/12.png'
  ];

  IMAGES_POISONED = [
    './graphics/1_sharkie/5.Hurt/1.Poisoned/1.png',
    './graphics/1_sharkie/5.Hurt/1.Poisoned/2.png',
    './graphics/1_sharkie/5.Hurt/1.Poisoned/3.png',
    './graphics/1_sharkie/5.Hurt/1.Poisoned/4.png',
    './graphics/1_sharkie/5.Hurt/1.Poisoned/5.png'
  ];

  IMAGES_ATTACKING = [
    './graphics/1_sharkie/4.Attack/Bubble_trap/op2/1.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op2/2.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op2/3.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op2/4.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op2/5.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op2/6.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op2/7.png'
  ];

  IMAGES_SHOCK = [
    './graphics/1_sharkie/5.Hurt/2.Electric shock/1.png',
    './graphics/1_sharkie/5.Hurt/2.Electric shock/2.png',
    './graphics/1_sharkie/5.Hurt/2.Electric shock/3.png'
  ];

  world;
  poisonBottles = 0;

  bossIntroPlaying = false;

  // Sounds
  swimming_sound = new Audio('audio/swim.mp3');
  ouch_sound = new Audio('audio/ouch.mp3');
  collect_coin_sound = new Audio('audio/collect_coin.mp3');
  collect_poison_sound = new Audio('audio/collect_poison.mp3');

  // intervals

  floatInterval;
  moveInterval;
  animateInterval;
  bossIntroInterval;
  driftingInterval;
  charIntervals = [
    this.floatInterval,
    this.moveInterval,
    this.animateInterval,
    this.bossIntroInterval,
    this.driftingInterval
  ];

  // offets

  offset = {
    top: 80,
    left: 30,
    right: 30,
    bottom: 30
  };

  boss_music = new Audio('audio/boss_music.mp3');

  constructor() {
    super().loadImg('./graphics/1_sharkie/3.Swim/1.png');
    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_FLOAT);
    this.loadImgs(this.IMAGES_DEAD);
    this.loadImgs(this.IMAGES_ATTACKING);
    this.loadImgs(this.IMAGES_POISONED);
    this.loadImgs(this.IMAGES_SHOCK);

    this.currentAnimation = null;
    this.isAnimating = false;
    this.dead = false;

    this.height = 200;
    this.width = 160;
    this.y = 150;
    this.x = 100;

    this.coins = 0;

    this.move();
    this.float();
    this.checkBossTime();
    this.animate();
  }

  float() {
    this.floatInterval = setInterval(() => {
      if (
        !this.world.keyboard.UP &&
        !this.world.keyboard.DOWN &&
        !this.world.keyboard.LEFT &&
        !this.world.keyboard.RIGHT &&
        !this.isDead()
      ) {
        let i = this.currentImage % this.IMAGES_FLOAT.length;
        let path = this.IMAGES_FLOAT[i];
        this.img.src = path;
        this.currentImage++;
      }
    }, 150);
  }

  move() {
    this.moveInterval = setInterval(() => {
      this.swimming_sound.pause();
      if (this.dead) {
        return;
      }

      if (this.world.keyboard.UP && this.y > -50 && !this.bossIntroPlaying) {
        this.y -= 4;
        this.swimming_sound.play();
      }

      if (this.world.keyboard.DOWN && this.y < 320 && !this.bossIntroPlaying) {
        this.y += 4;
        this.swimming_sound.play();
      }

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.bossIntroPlaying) {
        this.x += 4;
        this.otherDirection = false;
        this.world.camera_x = -this.x + 100;
        this.swimming_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > -500 && !this.bossIntroPlaying) {
        this.x -= 4;
        this.otherDirection = true;
        this.world.camera_x = -this.x + 100;
        this.swimming_sound.play();
      }
    }, 1000 / 60);
  }

  isDead() {
    return this.energy == 0;
  }

  animate() {
    this.animateInterval = setInterval(() => {
      if (this.isAnimating) return;
      if (this.dead) return;

      if (this.isDead()) {
        this.dead = true;
        this.playDeadAnimation();
      } else if (this.isHurt()) {
        this.playHurtAnimation();
      } else if (this.world.isShooting) {
        this.playShootingAnimation();
      } else if (
        this.world.keyboard.UP ||
        this.world.keyboard.DOWN ||
        this.world.keyboard.RIGHT ||
        this.world.keyboard.LEFT
      ) {
        this.playSwimmingAnimation();
      }
    }, 80);
  }

  playDeadAnimation() {
    this.charIntervals.forEach(clearInterval);
    clearInterval(this.animateInterval);
    clearInterval(this.floatInterval);
    this.isAnimating = true;

    let animationCounter = 0;
    const deadInterval = setInterval(() => {
      if (animationCounter < this.IMAGES_DEAD.length) {
        let path = this.IMAGES_DEAD[animationCounter];
        this.img.src = path;
        animationCounter++;
      } else this.img.src = this.IMAGES_DEAD[11];
    }, 1000 / 10);

    setTimeout(() => {
      this.driftingInterval = setInterval(() => {
        this.y -= 3;
      }, 1000 / 10);
    }, 1000);

    setTimeout(() => {
      clearInterval(this.driftingInterval);
      this.endGame();
    }, 3000);
  }

  playShootingAnimation() {
    this.charIntervals.forEach(clearInterval);
    clearInterval(this.animateInterval);
    clearInterval(this.floatInterval);

    let animationCounter = 0;
    console.log('me?');
    const deadInterval = setInterval(() => {
      if (animationCounter < this.IMAGES_ATTACKING.length) {
        let path = this.IMAGES_ATTACKING[animationCounter];
        this.img.src = path;
        animationCounter++;
        // console.log(animationCounter);
      } else {
        clearInterval(deadInterval);
        this.animate();
        this.float();
      }
    }, 1000 / 10);

    setTimeout(() => {
      this.isAnimating = false;
    }, 1000);
  }

  playHurtAnimation() {
    if (this.energy > 0) {
      this.ouch_sound.play();
      this.playAnimation(this.IMAGES_POISONED);
    } else this.dead = true;
  }

  playSwimmingAnimation() {
    if (!this.isAnimating) {
      this.isAnimating = true;
      this.playAnimation(this.IMAGES_SWIMMING);
      this.isAnimating = false;
    }
  }

  endGame() {
    console.log('Sharkie is dead');
  }

  bossFightStarted = false;

  checkBossTime() {
    // this.bossFightStarted = false;
    this.bossIntroInterval = setInterval(() => {
      if (Math.abs(this.x - 3200) < 10) {
        if (!this.bossFightStarted) {
          this.startBossFight();
          this.bossFightStarted = true;
          this.bossIntroPlaying = true;
          clearInterval(this.bossIntroInterval);
        } else this.bossIntroPlaying = false;
      }
    }, 1000 / 60);
  }

  startBossFight() {
    console.log('lets go');
    this.boss_music.play();
    // world.level_music.stop();
    this.world.level.endboss[0].init();
    setTimeout(() => {
      this.bossIntroPlaying = false;
    }, 2000);
  }

  getCoin() {
    this.coin += 1;
    this.collect_coin_sound.currentTime = 0;
    this.collect_coin_sound.play();
  }

  getPoisonBottle() {
    this.poisonBottles += 1;
    this.collect_poison_sound.currentTime = 0;
    this.collect_poison_sound.play();
  }

  // animate() {}
}
