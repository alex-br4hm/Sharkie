class Poisonbar extends DrawableObject {
  IMAGES_POISON = [
    './graphics/4_marcadores/green/poisoned_bubbles/0_copia2.png',
    './graphics/4_marcadores/green/poisoned_bubbles/20_copia3.png',
    './graphics/4_marcadores/green/poisoned_bubbles/40_copia2.png',
    './graphics/4_marcadores/green/poisoned_bubbles/60_copia2.png',
    './graphics/4_marcadores/green/poisoned_bubbles/80_copia2.png',
    './graphics/4_marcadores/green/poisoned_bubbles/100_copia3.png'
  ];

  amount = 0;

  constructor() {
    super().loadImg('./graphics/4_marcadores/green/poisoned_bubbles/0_copia2.png');
    this.loadImgs(this.IMAGES_POISON);
    this.x = 200;
    this.y = 0;
    this.width = 175;
    this.height = 55;
    this.setAmount(this.amount);
  }

  setAmount(amount) {
    this.amount = amount;
    let path = this.IMAGES_POISON[this.resolveImageIndex()];
    this.img.src = path;
  }

  resolveImageIndex() {
    if (this.amount == 0) {
      return 0;
    } else if (this.amount == 1) {
      return 1;
    } else if (this.amount == 2) {
      return 2;
    } else if (this.amount == 3) {
      return 3;
    } else if (this.amount == 4) {
      return 4;
    } else return 5;
  }
}
