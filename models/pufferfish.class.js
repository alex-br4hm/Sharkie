class Pufferfish extends MovableObject {
  constructor() {
    super().loadImg('./graphics/2_enemy/1.Pufferfish/1.Swim/1.swim1.png');
    this.x = 200 + Math.random() * 500;
    this.y = Math.random() * 400;
  }
}
