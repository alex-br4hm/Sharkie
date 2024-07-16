class Endboss extends MovableObject {
  IMAGES_SWIMMING = [
    './graphics/2_enemy/3.Boss/2.floating/1.png',
    './graphics/2_enemy/3.Boss/2.floating/2.png',
    './graphics/2_enemy/3.Boss/2.floating/3.png',
    './graphics/2_enemy/3.Boss/2.floating/4.png',
    './graphics/2_enemy/3.Boss/2.floating/5.png',
    './graphics/2_enemy/3.Boss/2.floating/6.png',
    './graphics/2_enemy/3.Boss/2.floating/7.png',
    './graphics/2_enemy/3.Boss/2.floating/8.png',
    './graphics/2_enemy/3.Boss/2.floating/9.png',
    './graphics/2_enemy/3.Boss/2.floating/10.png',
    './graphics/2_enemy/3.Boss/2.floating/11.png',
    './graphics/2_enemy/3.Boss/2.floating/12.png',
    './graphics/2_enemy/3.Boss/2.floating/13.png'
  ];
  IMAGES_INTRO = [
    './graphics/2_enemy/3.Boss/1.Introduce/1.png',
    './graphics/2_enemy/3.Boss/1.Introduce/2.png',
    './graphics/2_enemy/3.Boss/1.Introduce/3.png',
    './graphics/2_enemy/3.Boss/1.Introduce/4.png',
    './graphics/2_enemy/3.Boss/1.Introduce/5.png',
    './graphics/2_enemy/3.Boss/1.Introduce/6.png',
    './graphics/2_enemy/3.Boss/1.Introduce/7.png',
    './graphics/2_enemy/3.Boss/1.Introduce/8.png',
    './graphics/2_enemy/3.Boss/1.Introduce/9.png',
    './graphics/2_enemy/3.Boss/1.Introduce/10.png'
  ];
  IMAGES_ATTACK = [
    './graphics/2_enemy/3.Boss/Attack/1.png',
    './graphics/2_enemy/3.Boss/Attack/2.png',
    './graphics/2_enemy/3.Boss/Attack/3.png',
    './graphics/2_enemy/3.Boss/Attack/4.png',
    './graphics/2_enemy/3.Boss/Attack/5.png',
    './graphics/2_enemy/3.Boss/Attack/6.png'
  ];

  IMAGES_HURT = [
    './graphics/2_enemy/3.Boss/Hurt/1.png',
    './graphics/2_enemy/3.Boss/Hurt/2.png',
    './graphics/2_enemy/3.Boss/Hurt/3.png',
    './graphics/2_enemy/3.Boss/Hurt/4.png'
  ];

  IMAGES_DEATH = [
    './graphics/2_enemy/3.Boss/Dead/death_1.png',
    './graphics/2_enemy/3.Boss/Dead/death_2.png',
    './graphics/2_enemy/3.Boss/Dead/death_3.png',
    './graphics/2_enemy/3.Boss/Dead/death_4.png',
    './graphics/2_enemy/3.Boss/Dead/death_5.png'
  ];

  swimmingInterval;
  attackInterval;
  startAttackInterval;
  hurtAnimationInterval;
  checkHurtInterval;
  dyingInterval;
  cooldown = false;

  constructor() {
    super();
    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_INTRO);
    this.loadImgs(this.IMAGES_ATTACK);
    this.loadImgs(this.IMAGES_HURT);
    this.loadImgs(this.IMAGES_DEATH);
    this.previousEnergy = this.energy; // Initialer Energiezustand
    // this.introduce();
    // this.animate();
  }

  init() {
    this.loadImg(this.IMAGES_INTRO[0]);
    this.offset = {
      top: 200,
      left: 20,
      right: 40,
      bottom: 80
    };
    this.width = 500;
    this.height = 500;
    this.x = 3500;
    this.y = -100;
    this.energy = 100; // Initialer Energiezustand
    this.previousEnergy = this.energy; // Initialer Energiezustand speichern
    this.isBoss = true;
    this.isHurted = false;
    this.isDead = false;
    this.introduce();
  }

  introduce() {
    let currentImage = 0;
    const interval = setInterval(() => {
      if (currentImage < this.IMAGES_INTRO.length) {
        this.playAnimation(this.IMAGES_INTRO);
        currentImage++;
      } else {
        clearInterval(interval);
        this.animate();
      }
    }, 120);
  }

  animate() {
    clearInterval(this.swimmingInterval);
    clearInterval(this.attackInterval);
    clearInterval(this.hurtAnimationInterval);

    this.swimmingInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
      this.moveTowardsCharacter();
    }, 120);

    this.startAttackInterval = setInterval(() => {
      if (!this.cooldown && world.character.x <= this.x + 100 && world.character.x >= this.x - 250 && !this.isHurted) {
        clearInterval(this.attackInterval);
        this.attack();
      }
    }, 100);

    this.checkHurt();
  }

  checkHurt() {
    if (this.energy <= 0) {
      this.bossDeafeted();
      return;
    }

    this.checkHurtInterval = setInterval(() => {
      if (this.previousEnergy > this.energy) {
        this.playHurtAnimation();
      }
      this.previousEnergy = this.energy;
    }, 1000 / 60);
  }

  animationCounter = 0;
  bossDeafeted() {
    this.isDead = true;
    clearInterval(this.swimmingInterval);
    clearInterval(this.attackInterval);
    clearInterval(this.checkHurtInterval);
    clearInterval(this.hurtAnimationInterval);
    clearInterval(this.startAttackInterval);
    clearInterval(this.dyingInterval);

    this.dyingInterval = setInterval(() => {
      if (this.animationCounter < this.IMAGES_DEATH.length) {
        this.playAnimation(this.IMAGES_DEATH);
        this.animationCounter++;
      }
    }, 150);
    setTimeout(() => {
      this.img.src = this.IMAGES_DEATH[4];
      clearInterval(this.dyingInterval);
    }, 1000);
  }

  playHurtAnimation() {
    clearInterval(this.swimmingInterval);
    clearInterval(this.attackInterval);

    this.hurtAnimationInterval = setInterval(() => {
      if (!this.isDead) {
        this.isHurted = true;
        this.playAnimation(this.IMAGES_HURT);
      }

      setTimeout(() => {
        clearInterval(this.hurtAnimationInterval);
        this.isHurted = false;
        this.animate();
      }, 100);
    }, 1000 / 60);
  }

  attack() {
    clearInterval(this.swimmingInterval);
    clearInterval(this.attackInterval);
    clearInterval(this.hurtAnimationInterval);
    clearInterval(this.checkHurtInterval);

    this.cooldown = true;
    this.attackInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveTowardsCharacter();
        this.playAnimation(this.IMAGES_ATTACK);
        this.checkHurt();
        this.x -= 10;
      }
    }, 100);

    setTimeout(() => {
      if (!this.isDead) {
        clearInterval(this.swimmingInterval);
        clearInterval(this.attackInterval);
        this.cooldown = false;
        this.animate();
      }
    }, 1000);
  }

  moveTowardsCharacter() {
    let targetY = world.character.y - 200;
    let differenceY = targetY - this.y;
    this.y += differenceY * 0.1;
    this.x -= 10;
  }
}
