class Level {
  enemies;
  backgroundObject;
  coins = [];
  poisonBottles = [];
  endboss = [];
  level_end_x = 3500;

  constructor(enemies, endboss, backgroundObject, coins, poisonBottles) {
    this.enemies = enemies;
    this.endboss = endboss;
    this.backgroundObject = backgroundObject;
    this.coins = coins;
    this.poisonBottles = poisonBottles;
  }
}
