class Statusbar extends DrawableObject {
  IMAGES_LIFE = [
    './graphics/4_marcadores/green/Life/0_copia3.png',
    './graphics/4_marcadores/green/Life/20_copia4.png',
    './graphics/4_marcadores/green/Life/40_copia3.png',
    './graphics/4_marcadores/green/Life/60_copia3.png',
    './graphics/4_marcadores/green/Life/80_copia3.png',
    './graphics/4_marcadores/green/Life/100_copia2.png'
  ];

  percentage = 100;

  constructor() {
    super().loadImg('./graphics/4_marcadores/green/Life/100_copia3.png');
    this.loadImgs(this.IMAGES_LIFE);
    this.x = 30;
    this.y = 0;
    this.width = 175;
    this.height = 55;
    this.setPercentage(this.percentage);
  }

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES_LIFE[this.resolveImageIndex()];
    this.img.src = path;
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 0) {
      return 1;
    } else {
      return 0;
    }
  }
}
