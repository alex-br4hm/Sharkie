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
  swimming_sound = new Audio('audio/swim.mp3');

  constructor() {
    super().loadImg('./graphics/1_sharkie/3.Swim/1.png');
    this.loadImgs(this.IMAGES_SWIMMING);

    this.height = 200;
    this.width = 160;
    this.y = 150;
    this.x = 50;
    this.animationSpeed = 150;
    this.move();
  }

  move() {
    setInterval(() => {
      this.swimming_sound.pause();
      if (this.world.keyboard.UP) {
        this.y -= 4;
      }
      if (this.world.keyboard.DOWN) {
        this.y += 4;
      }

      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += 4;
        this.otherDirection = false;
        this.world.camera_x = -this.x + 50;
        this.swimming_sound.play();
      }
      if (this.world.keyboard.LEFT && this.x > -500) {
        this.x -= 4;
        this.otherDirection = true;
        this.world.camera_x = -this.x + 50;
        this.swimming_sound.play();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.UP || this.world.keyboard.DOWN || this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        this.animate();
      }
    }, 75);
  }

  animate() {
    // swim animation
    let i = this.currentImage % this.IMAGES_SWIMMING.length;
    let path = this.IMAGES_SWIMMING[i];
    this.img.src = path;
    this.currentImage++;
  }
}
