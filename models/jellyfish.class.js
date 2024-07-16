class Jellyfish extends MovableObject {
  IMAGES_SWIMMING = [
    './graphics/2_enemy/2.Jellyfish/Regular_damage/Lila1.png',
    './graphics/2_enemy/2.Jellyfish/Regular_damage/Lila2.png',
    './graphics/2_enemy/2.Jellyfish/Regular_damage/Lila3.png',
    './graphics/2_enemy/2.Jellyfish/Regular_damage/Lila4.png'
  ];

  IMAGES_DEAD = [
    './graphics/2_enemy/2.Jellyfish/Dead/Lila/L1.png',
    './graphics/2_enemy/2.Jellyfish/Dead/Lila/L2.png',
    './graphics/2_enemy/2.Jellyfish/Dead/Lila/L3.png',
    './graphics/2_enemy/2.Jellyfish/Dead/Lila/L4.png'
  ];

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 20
  };

  moveUpInterval;
  animateInterval;

  constructor(x) {
    super().loadImg('./graphics/2_enemy/2.Jellyfish/Regular_damage/Lila1.png');
    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_DEAD);
    this.x = x + Math.random() * 2500;
    this.y = Math.random() * 400;
    this.height = 80;
    this.width = 70;
    this.speed = 0.2 + Math.random() * 5;
    this.direction = this.speed;
    this.isDead = false;
    this.isBoss = false;
    this.isJelly = true;
    this.moveUp();
    this.animate();
  }

  moveUp() {
    this.moveUpInterval = setInterval(() => {
      this.y += this.direction;
      if (this.isDead) {
        this.playAnimationDead(this.IMAGES_DEAD);
      }
      if (this.y <= 0) {
        this.direction = this.speed; // Wechsel zu nach unten
        this.otherDirection = true;
      } else if (this.y >= 420) {
        this.direction = -this.speed; // Wechsel zu nach oben
        this.otherDirection = false;
      }
    }, 1000 / 60);
  }

  animate() {
    this.animateInterval = setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
    }, 100);
  }

  playAnimationDead(images_path) {
    clearInterval(this.moveUpInterval);
    clearInterval(this.animateInterval);

    setInterval(() => {
      let i = this.currentImage % images_path.length;
      let path = images_path[i];
      this.img.src = path;
      this.currentImage++;
      this.y -= 12;
    }, 50);
  }
}
