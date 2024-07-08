class Pufferfish extends MovableObject {
  IMAGES_SWIMMING = [
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim1.png',
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim2.png',
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim3.png',
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim4.png',
    './graphics/2_enemy/1.Pufferfish/1.Swim/1.swim5.png'
  ];

  constructor() {
    super().loadImg('./graphics/2_enemy/1.Pufferfish/1.Swim/1.swim1.png');
    this.loadImgs(this.IMAGES_SWIMMING);
    this.x = 500 + Math.random() * 2000;
    this.y = Math.random() * 400;
    this.height = 80;
    this.width = 70;
    this.speed = 0.5 + Math.random() * 2;
    this.moveLeft();
    this.animate();
  }

  moveLeft() {
    setInterval(() => {
      if (this.x < -100) {
        this.x = 720 + Math.random() * 500;
        this.y = Math.random() * 400;
        this.speed = 0.5 + Math.random() * 2;
      }
      this.x -= this.speed;
    }, 1000 / 60);
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
    }, 200);
  }
}
