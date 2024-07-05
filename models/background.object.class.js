class BackgroundObject extends MovableObject {
  constructor(path, x_position, width) {
    super().loadImg(path);
    this.x = x_position;
    this.y = 0;
    this.width = width;
    this.height = 480;
  }
}
