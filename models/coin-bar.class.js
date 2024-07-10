class Coinbar extends DrawableObject {
  IMAGES_COINS = [
    './graphics/4_marcadores/green/Coin/0_copia4.png',
    './graphics/4_marcadores/green/Coin/20_copia4.png',
    './graphics/4_marcadores/green/Coin/40_copia4.png',
    './graphics/4_marcadores/green/Coin/60_copia4.png',
    './graphics/4_marcadores/green/Coin/80_copia4.png',
    './graphics/4_marcadores/green/Coin/100_copia4.png'
  ];

  amount = 0;

  constructor() {
    super().loadImg('./graphics/4_marcadores/green/Coin/0_copia4.png');
    this.loadImgs(this.IMAGES_COINS);
    this.x = 375;
    this.y = 0;
    this.width = 175;
    this.height = 55;
    this.setAmount(this.amount);
  }

  setAmount(amount) {
    this.amount = amount;
    let path = this.IMAGES_COINS[this.resolveImageIndex()];
    this.img.src = path;
  }

  resolveImageIndex() {
    if (this.amount == 0) {
      return 0;
    } else if (this.amount <= 3) {
      return 1;
    } else if (this.amount <= 6) {
      return 2;
    } else if (this.amount <= 9) {
      return 3;
    } else if (this.amount <= 11) {
      return 4;
    } else return 5;
  }
}
