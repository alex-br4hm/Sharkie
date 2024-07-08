class BubbleShot extends MovableObject {
  IMAGES_BUBBLE = ['./graphics/1_sharkie/4.Attack/Bubble_trap/Bubble.png'];
  constructor() {
    super().loadImg('./graphics/1_sharkie/4.Attack/Bubble_trap/Bubble.png');
    this.loadImgs(this.IMAGES_BUBBLE);
    this.x = world.character.x;
    this.y = world.character.y;
    this.width = 40;
    this.height = 40;
    this.shotBubble(this.x, this.y);
  }

  shotBubble(x, y) {
    this.y = y + 100;
    this.x = x + 100;
    setInterval(() => {
      this.x += 3;
    }, 1000 / 60);
  }
}
