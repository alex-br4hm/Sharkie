class Light extends MovableObject {
  constructor() {
    super().loadImg('graphics/3_background/Layers/1. Light/2.png');
    this.x = Math.random() * 100;
    this.y = -500;
  }
}
