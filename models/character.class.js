class Character extends MovableObject {
  IMAGES_SWIMMING = [
    './graphics/1_sharkie/3.Swim/1.png',
    './graphics/1_sharkie/3.Swim/2.png',
    './graphics/1_sharkie/3.Swim/3.png',
    './graphics/1_sharkie/3.Swim/4.png',
    './graphics/1_sharkie/3.Swim/5.png',
    './graphics/1_sharkie/3.Swim/6.png'
  ];
  world;
  keyboard;
  animationSpeed;

  constructor() {
    super().loadImg('./graphics/1_sharkie/3.Swim/1.png');
    this.loadImgs(this.IMAGES_SWIMMING);

    this.height = 200;
    this.width = 160;
    this.y = 150;
    this.x = 0;
    this.animationSpeed = 150;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.UP) {
        let i = this.currentImage % this.IMAGES_SWIMMING.length;
        let path = this.IMAGES_SWIMMING[i];
        this.img.src = path;
        this.currentImage++;
      }
    }, this.animationSpeed);
  }

  moveUp() {}
}
