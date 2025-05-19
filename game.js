kaboom({
  background: [0, 0, 0],
  global: true,
  fullscreen: true,
  scale: 2,
  debug: true,
});

// Load sprites and sounds
loadSprite("player", "assets/player.png");
loadSprite("ground", "assets/tileset.png");
loadSprite("enemy", "assets/enemy.png");
loadSound("jump", "assets/jump.wav");

scene("main", () => {
  // Add level
  const map = [
    "                              ",
    "                              ",
    "        @                     ",
    "    ========        =====     ",
    "                              ",
    "=============================",
  ];

  const levelConf = {
    width: 32,
    height: 32,
    "=": () => [sprite("ground"), area(), solid()],
    "@": () => [sprite("enemy"), area(), body()],
  };

  addLevel(map, levelConf);

  // Add player
  const player = add([
    sprite("player"),
    pos(40, 0),
    area(),
    body(),
  ]);

  // Controls
  onKeyDown("left", () => {
    player.move(-120, 0);
  });

  onKeyDown("right", () => {
    player.move(120, 0);
  });

  onKeyPress("space", () => {
    if (player.isGrounded()) {
      play("jump");
      player.jump(400);
    }
  });

  // Optional: Follow player
  onUpdate(() => {
    camPos(player.pos);
  });
});

go("main");
