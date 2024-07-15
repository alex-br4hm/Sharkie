class BubbleShot extends MovableObject {
  IMAGES_BUBBLE = ['./graphics/1_sharkie/4.Attack/Bubble_trap/Bubble.png'];
  IMAGES_POISON_BUBBLE = ['./graphics/1_sharkie/4.Attack/Bubble_trap/Poisoned_bubble.png'];
  constructor() {
    super().loadImg('./graphics/1_sharkie/4.Attack/Bubble_trap/Bubble.png');
    this.loadImgs(this.IMAGES_BUBBLE);
    this.loadImgs(this.IMAGES_POISON_BUBBLE);
    this.x = world.character.x;
    this.y = world.character.y;
    this.distance = 0;
    this.width = 40;
    this.height = 40;
  }

  shotBubble(x, y) {
    if (world.character.poisonBottles > 0) {
      this.img.src = this.IMAGES_POISON_BUBBLE[0];
      world.character.poisonBottles--;
    }

    this.y = y + 100;
    this.otherDirection ? (this.x = x) : (this.x = x + 100);

    setInterval(() => {
      if (this.otherDirection) {
        this.x -= 3;
        this.distance += 1;
      } else {
        this.x += 3;
        this.distance += 1;
      }
    }, 1000 / 60);
  }
}
