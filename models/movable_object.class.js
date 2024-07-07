class MovableObject extends DrawableObject {
  speed;
  energy = 100;
  lastHit = 0;

  // characater.isColliding
  isColliding(movableObject) {
    return (
      this.x + this.width > movableObject.x &&
      this.y + this.height > movableObject.y &&
      this.x < movableObject.x &&
      this.y < movableObject.y + movableObject.height
    );
  }

  getHit() {
    this.energy -= 1;
    // console.log(this.energy);
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
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
