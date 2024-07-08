const level1 = new Level(
  [
    new Pufferfish(),
    new Pufferfish(),
    new Pufferfish(),
    new Pufferfish(),
    new Pufferfish(),
    new Pufferfish(),
    new Pufferfish(),
    new Pufferfish(),
    new Pufferfish(),
    new Jellyfish(),
    new Jellyfish(),
    new Jellyfish(),
    new Endboss()
  ],
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
  ]
);
