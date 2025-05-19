// Initialize Kaboom with fixed size and scale
kaboom({
  width: 640,
  height: 360,
  scale: 1,
  debug: true,
  background: [0, 0, 0],
});

// Load assets
loadSprite("player", "assets/player.png");
loadSprite("ground", "assets/tileset.png");
loadSprite("enemy", "assets/enemy.png");
loadSound("jump", "assets/jump.wav");

scene("main", () => {
  // Level map
  const level = [
    "                                         ",
    "                                         ",
    "         @                               ",
    "    ========         =====     ==        ",
    "                                         ",
    "=============================   =========",
  ];

  // Add level
  addLevel(level, {
    tileWidth: 32,
    tileHeight: 32,
    tiles: {
      "=": () => [
        sprite("ground"),
        area(),
        body({ isStatic: true }),
      ],
      "@": () => [
        sprite("enemy"),
        area(),
        body(),
      ],
    },
  });

  // Add player
  const player = add([
    sprite("player"),
    pos(40, 0),
    area(),
    body(),
    scale(1.2),
  ]);

  // Camera follows player
  onUpdate(() => {
    camPos(player.pos);
  });

  // Controls
  onKeyDown("left", () => player.move(-120, 0));
  onKeyDown("right", () => player.move(120, 0));
  onKeyPress("space", () => {
    if (player.isGrounded()) {
      play("jump");
      player.jump(400);
    }
  });

  // Respawn if player falls
  player.onUpdate(() => {
    if (player.pos.y > 600) {
      go("main");
    }
  });
});

// Start the game
go("main");
