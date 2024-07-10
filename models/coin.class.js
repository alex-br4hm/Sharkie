class Coin extends MovableObject {
  IMAGES_COINS = ['graphics/4_marcadores/1.Coins/1.png', 'graphics/4_marcadores/1.Coins/2.png'];

  constructor() {
    super().loadImg('graphics/4_marcadores/1.Coins/1.png');
    this.loadImgs(this.IMAGES_COINS);
    this.x = 500 + Math.random() * 2500;
    this.y = 100 + Math.random() * 300;
    this.height = 50;
    this.width = 50;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COINS);
    }, 300);
  }
}
