class Endboss extends MovableObject {
  IMAGES_SWIMMING = [
    './graphics/2_enemy/3.Boss/2.floating/1.png',
    './graphics/2_enemy/3.Boss/2.floating/2.png',
    './graphics/2_enemy/3.Boss/2.floating/3.png',
    './graphics/2_enemy/3.Boss/2.floating/4.png',
    './graphics/2_enemy/3.Boss/2.floating/5.png',
    './graphics/2_enemy/3.Boss/2.floating/6.png',
    './graphics/2_enemy/3.Boss/2.floating/7.png',
    './graphics/2_enemy/3.Boss/2.floating/8.png',
    './graphics/2_enemy/3.Boss/2.floating/9.png',
    './graphics/2_enemy/3.Boss/2.floating/10.png',
    './graphics/2_enemy/3.Boss/2.floating/11.png',
    './graphics/2_enemy/3.Boss/2.floating/12.png',
    './graphics/2_enemy/3.Boss/2.floating/13.png'
  ];
  IMAGES_INTRO = [
    './graphics/2_enemy/3.Boss/1.Introduce/1.png',
    './graphics/2_enemy/3.Boss/1.Introduce/2.png',
    './graphics/2_enemy/3.Boss/1.Introduce/3.png',
    './graphics/2_enemy/3.Boss/1.Introduce/4.png',
    './graphics/2_enemy/3.Boss/1.Introduce/5.png',
    './graphics/2_enemy/3.Boss/1.Introduce/6.png',
    './graphics/2_enemy/3.Boss/1.Introduce/7.png',
    './graphics/2_enemy/3.Boss/1.Introduce/8.png',
    './graphics/2_enemy/3.Boss/1.Introduce/9.png',
    './graphics/2_enemy/3.Boss/1.Introduce/10.png'
  ];
  IMAGES_ATTACK = [
    './graphics/2_enemy/3.Boss/Attack/1.png',
    './graphics/2_enemy/3.Boss/Attack/2.png',
    './graphics/2_enemy/3.Boss/Attack/3.png',
    './graphics/2_enemy/3.Boss/Attack/4.png',
    './graphics/2_enemy/3.Boss/Attack/5.png',
    './graphics/2_enemy/3.Boss/Attack/6.png'
  ];

  constructor() {
    super().loadImg(this.IMAGES_SWIMMING[0]);
    this.loadImgs(this.IMAGES_SWIMMING);
    this.loadImgs(this.IMAGES_INTRO);
    this.loadImgs(this.IMAGES_ATTACK);
    this.x = 2000;
    this.y = -100;
    this.width = 500;
    this.height = 500;
    this.introduce();
    this.attack();
  }

  introduce() {
    let currentImage = 0;
    const interval = setInterval(() => {
      if (currentImage < this.IMAGES_INTRO.length) {
        let path = this.IMAGES_INTRO[currentImage];
        this.img.src = path;
        currentImage++;
      } else {
        clearInterval(interval);
        this.animate();
      }
    }, 120);
  }

  attack() {
    // setInterval(() => {
    //   let i = this.currentImage % this.IMAGES_ATTACK.length;
    //   let path = this.IMAGES_ATTACK[i];
    //   this.img.src = path;
    //   this.currentImage++;
    // }, 1000);
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_SWIMMING);
    }, 120);
  }
}
