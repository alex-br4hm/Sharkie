let level1;

function initLevel() {
  level1 = new Level(
    [
      new Pufferfish(),
      new Pufferfish(),
      new Pufferfish(),
      new Pufferfish(),
      new Pufferfish(),
      new Pufferfish(),
      new Jellyfish(500),
      new Jellyfish(600),
      new Jellyfish(700),
      new Jellyfish(900),
      new Jellyfish(1000),
      new Jellyfish(1000),
      new Jellyfish(1000),
      new Jellyfish(1000)
    ],
    [new Endboss()],
    [
      new BackgroundObject('graphics/3_background/Legacy/Light/3.png', 0, 720 * 3),

      new BackgroundObject('graphics/3_background/Legacy/Light/3.png', 720 * 3 - 1, 720 * 3),
      new BackgroundObject('graphics/3_background/Barrier/3.png', 720 * 3 - 200, 240),

      new BackgroundObject('graphics/3_background/Legacy/Layers/5.Water/L1.png', 0, -720),
      new BackgroundObject('graphics/3_background/Legacy/Layers/3.Fondo1/L2.png', 0, -720),
      new BackgroundObject('graphics/3_background/Barrier/3.png', 0, -720),
      new BackgroundObject('graphics/3_background/Legacy/Layers/3.Fondo1/L1.png', 0, -720),
      new BackgroundObject('graphics/3_background/Legacy/Layers/2.Floor/L2.png', 0, -720),
      new BackgroundObject('graphics/3_background/Barrier/3.png', 50, -240)
    ],
    [
      new Coin(700, 20),
      new Coin(640, 80),
      new Coin(760, 80),
      new Coin(700, 140),
      new Coin(1000, 300),
      new Coin(1000, 360),
      new Coin(1000, 420),
      new Coin(1400, 100),
      new Coin(1460, 160),
      new Coin(1520, 220),
      new Coin(2120, 180),
      new Coin(2060, 240),
      new Coin(2000, 300)
    ],
    [
      new PoisonBottle(3000, 370),
      new PoisonBottle(2900, 300),
      new PoisonBottle(2600, 160),
      new PoisonBottle(2700, 150),
      new PoisonBottle(3100, 150),
      new PoisonBottle(2500, 80)
    ]
  );
}
