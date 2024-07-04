class Jellyfish extends MovableObject {
  IMAGES_SWIMMING = [
    'graphics/2_enemy/2.Jellyfish/Regular_damage/Lila1.png',
    'graphics/2_enemy/2.Jellyfish/Regular_damage/Lila2.png',
    'graphics/2_enemy/2.Jellyfish/Regular_damage/Lila3.png',
    'graphics/2_enemy/2.Jellyfish/Regular_damage/Lila4.png'
  ];

  constructor() {
    super().loadImg('graphics/2_enemy/2.Jellyfish/Regular_damage/Lila1.png');
    this.x = 200 + Math.random() * 500;
    this.y = Math.random() * 400;
    this.height = 80;
    this.width = 70;

    this.speed = 0.2 + Math.random() * 5;
    this.direction = this.speed;
    this.moveUp();
    this.animate();
  }

  moveUp() {
    setInterval(() => {
      this.y += this.direction;
      if (this.y <= 0) {
        this.direction = this.speed; // Wechsel zu nach unten
      } else if (this.y >= 420) {
        this.direction = -this.speed; // Wechsel zu nach oben
      }
    }, 1000 / 60);
  }

  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_SWIMMING.length;
      let path = this.IMAGES_SWIMMING[i];
      this.img.src = path;
      this.currentImage++;
    }, 100);
  }
}
