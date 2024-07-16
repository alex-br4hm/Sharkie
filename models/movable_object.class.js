class MovableObject extends DrawableObject {
  speed;
  energy = 100;
  lastHit = 0;
  coin = 0;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  };

  // characater.isColliding
  isColliding(obj) {
    return (
      this.x + this.width - this.offset.right > obj.x + obj.offset.left &&
      this.y + this.height - this.offset.bottom > obj.y + obj.offset.top &&
      this.x + this.offset.left < obj.x + obj.width - obj.offset.right &&
      this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom
    );
  }

  getHit(enemyType) {
    enemyType.isBoss ? (this.energy -= 25) : (this.energy -= 5);
    console.log(this.energy);
    this.lastHit = new Date().getTime();
  }

  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    return timePassed <= 500;
  }

  playAnimation(images_path) {
    let i = this.currentImage % images_path.length;
    let path = images_path[i];
    this.img.src = path;
    this.currentImage++;
  }
}
