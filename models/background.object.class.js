class BackgroundObject extends MovableObject {
  constructor() {
    super().loadImg('graphics/3_background/Legacy/Light/3.png');
    this.x = 0;
    this.y = 0;
    this.width = 720 * 3;
    this.height = 480;
  }
}
