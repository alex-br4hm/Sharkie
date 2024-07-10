class PoisonBottle extends MovableObject {
  IMAGES_POISON = [
    './graphics/4_marcadores/Posión/Animada/1.png',
    './graphics/4_marcadores/Posión/Animada/2.png',
    './graphics/4_marcadores/Posión/Animada/3.png',
    './graphics/4_marcadores/Posión/Animada/4.png',
    './graphics/4_marcadores/Posión/Animada/5.png',
    './graphics/4_marcadores/Posión/Animada/6.png',
    './graphics/4_marcadores/Posión/Animada/7.png',
    './graphics/4_marcadores/Posión/Animada/8.png'
  ];

  constructor() {
    super().loadImg('./graphics/4_marcadores/Posión/Animada/1.png');
    this.loadImgs(this.IMAGES_POISON);
    this.x = 500 + Math.random() * 2500;
    this.y = 100 + Math.random() * 300;
    this.height = 80;
    this.width = 70;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_POISON);
    }, 100);
  }
}
