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

  // IMAGES_SHOCK = [
  //   './graphics/1_sharkie/5.Hurt/2.Electric shock/1.png',
  //   './graphics/1_sharkie/5.Hurt/2.Electric shock/2.png',
  //   './graphics/1_sharkie/5.Hurt/2.Electric shock/3.png'
  // ];

  world;
  swimming_sound = new Audio('audio/swim.mp3');
  ouch_sound = new Audio('audio/ouch.mp3');

  constructor() {
    super().loadImg('./graphics/1_sharkie/3.Swim/1.png');
    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_FLOAT);
    this.loadImgs(this.IMAGES_DEAD);
    this.loadImgs(this.IMAGES_POISONED);
    // this.loadImgs(this.IMAGES_SHOCK);
    this.height = 200;
    this.width = 160;
    this.y = 150;
    this.x = 50;
    this.animationSpeed = 150;
    this.move();
    this.float();
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

  // WIR SIND HIER
  // PROBLEM:
  // DIE STATUSBAR WIRD NICHT RICHTIG GEZEICHNET. WARUM?
  //

  isDead() {
    return this.energy == 0;
  }

  move() {
    setInterval(() => {
      this.swimming_sound.pause();

      if (this.world.keyboard.UP) {
        this.y -= 4;
        this.swimming_sound.play();
      }

      if (this.world.keyboard.DOWN) {
        this.y += 4;
        this.swimming_sound.play();
      }

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += 4;
        this.otherDirection = false;
        this.world.camera_x = -this.x + 50;
        this.swimming_sound.play();
      }

      if (this.world.keyboard.LEFT && this.x > -500) {
        this.x -= 4;
        this.otherDirection = true;
        this.world.camera_x = -this.x + 50;
        this.swimming_sound.play();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.isDead()) {
        console.log('is Dead');
        this.playAnimation(this.IMAGES_DEAD);
      } else if (this.isHurt()) {
        // this.ouch_sound.play();
        this.playAnimation(this.IMAGES_POISONED);
      } else {
        if (
          this.world.keyboard.UP ||
          this.world.keyboard.DOWN ||
          this.world.keyboard.RIGHT ||
          this.world.keyboard.LEFT
        ) {
          this.playAnimation(this.IMAGES_SWIMMING);
        }
      }
    }, 1000 / 10);
  }

  animate() {}
}
