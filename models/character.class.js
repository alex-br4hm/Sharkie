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
    './graphics/1_sharkie/4.Attack/Bubble_trap/op1/1.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op1/2.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op1/3.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op1/4.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op1/5.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op1/6.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op1/7.png',
    './graphics/1_sharkie/4.Attack/Bubble_trap/op1/8.png'
  ];

  // IMAGES_SHOCK = [
  //   './graphics/1_sharkie/5.Hurt/2.Electric shock/1.png',
  //   './graphics/1_sharkie/5.Hurt/2.Electric shock/2.png',
  //   './graphics/1_sharkie/5.Hurt/2.Electric shock/3.png'
  // ];

  world;
  poisonBottles = 0;

  bossIntroPlaying = false;

  // Sounds
  swimming_sound = new Audio('audio/swim.mp3');
  ouch_sound = new Audio('audio/ouch.mp3');
  collect_coin_sound = new Audio('audio/collect_coin.mp3');
  collect_poison_sound = new Audio('audio/collect_poison.mp3');

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
    // this.loadImgs(this.IMAGES_SHOCK);
    this.currentAnimation = null;
    this.isAnimating = false;
    this.height = 200;
    this.width = 160;
    this.y = 150;
    this.x = 100;
    this.animationSpeed = 150;
    this.coins = 0;
    this.move();
    this.float();
    this.checkBossTime();
  }

  float() {
    setInterval(() => {
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

  isDead() {
    return this.energy == 0;
  }

  move() {
    setInterval(() => {
      this.swimming_sound.pause();

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

    if (this.isAnimating) return;

    const animationInterval = setInterval(() => {
      if (this.isDead()) {
        this.isAnimating = true;
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        this.isAnimating = true;
        this.ouch_sound.play();
        this.playAnimation(this.IMAGES_POISONED);
      } else if (this.world.keyboard.KEY_B) {
        this.isAnimating = true;
        this.playAnimation(this.IMAGES_ATTACKING);
      } else {
        if (
          this.world.keyboard.UP ||
          this.world.keyboard.DOWN ||
          this.world.keyboard.RIGHT ||
          this.world.keyboard.LEFT
        ) {
          this.isAnimating = true;
          this.playAnimation(this.IMAGES_SWIMMING);
        }
      }
    }, 100);
  }

  animate() {}

  checkBossTime() {
    let bossFightStarted = false;
    const interval = setInterval(() => {
      if (Math.abs(this.x - 1000) < 10) {
        if (!bossFightStarted) {
          this.startBossFight();
          bossFightStarted = true;
          this.bossIntroPlaying = true;
          clearInterval(interval);
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

  animate() {}
}
