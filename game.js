// Initialize Kaboom
kaboom({
  width: 640,
  height: 360,
  scale: 1,
  debug: true,
  background: [0, 0, 0],
});

// Load sprites and sound
loadSprite("player", "assets/player.png");
loadSprite("ground", "assets/tileset.png");
loadSprite("enemy", "assets/enemy.png");
loadSound("jump", "assets/jump.wav");

// Define the main scene
scene("main", () => {
  // Define the level map
  const level = [
    "                                         ",
    "                                         ",
    "                                         ",
    "                                         ",
    "        @                                ",
    "    ========        =====     ==         ",
    "                                         ",
    "=============================   =========",
  ];

  // Add the level to the game
  addLevel(level, {
    tileWidth: 32,
    tileHeight: 32,
    tiles: {
      "=": () => [
        sprite("ground"),
        area(),
        body({ isStatic: true }), // Platform
      ],
      "@": () => [
        sprite("enemy"),
        area(),
        body(), // Enemy falls due to gravity
      ],
    },
  });

  // Add the player
  const player = add([
    sprite("player"),
    pos(40, 0),
    area(),
    body(), // Affected by gravity
    scale(1.2),
  ]);

  // Controls
  onKeyDown("left", () => player.move(-120, 0));
  onKeyDown("right", () => player.move(120, 0));
  onKeyPress("space", () => {
    if (player.isGrounded()) {
      play("jump");
      player.jump(400);
    }
  });

  // Camera follows the player
  onUpdate(() => {
    camPos(player.pos);
  });

  // Optional: Reset if player falls off map
  player.onUpdate(() => {
    if (player.pos.y > 600) {
      go("main");
    }
  });
});

// Start the game
go("main");
