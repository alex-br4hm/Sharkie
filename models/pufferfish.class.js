class Pufferfish extends MovableObject {
  IMAGES_SWIMMING = [
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim1.png',
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim2.png',
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim3.png',
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim4.png',
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim5.png'
  ];

  IMAGES_DEAD = ['./graphics/2_enemy/1.Pufferfish/4.DIE/1.Dead1.png'];

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 20
  };

  moveLeftInterval;
  animateInterval;

  constructor() {
    super().loadImg('./graphics/2_enemy/1.Pufferfish/1.Swim/1.swim1.png');
    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_DEAD);
    this.x = 500 + Math.random() * 2000;
    this.y = Math.random() * 400;
    this.height = 80;
    this.width = 70;
    this.isDead = false;
    this.speed = 0.5 + Math.random() * 2;
    this.isBoss = false;
    this.moveLeft();
    this.animate();
  }

  moveLeft() {
    this.moveLeftInterval = setInterval(() => {
      if (this.x < -100) {
        this.x = 720 + Math.random() * 500;
        this.y = Math.random() * 400;
        this.speed = 0.5 + Math.random() * 2;
      }
      this.x -= this.speed;
    }, 1000 / 60);
  }

  animate() {
    this.animateInterval = setInterval(() => {
      if (this.isDead) {
        this.playAnimationDead(this.IMAGES_DEAD);
      } else {
        this.playAnimation(this.IMAGES_SWIMMING);
      }
    }, 50);
  }

  playAnimationDead(images_path) {
    clearInterval(this.moveLeftInterval);
    clearInterval(this.animateInterval);
    let i = this.currentImage % images_path.length;
    let path = images_path[i];
    this.img.src = path;
    this.currentImage++;

    setInterval(() => {
      this.x -= 1;
      this.y -= 3;
    }, 1000 / 60);
  }
}
