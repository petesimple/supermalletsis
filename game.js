kaboom();

loadSprite("player", "assets/player.png");
loadSprite("ground", "assets/tileset.png");
loadSprite("enemy", "assets/enemy.png");
loadSound("jump", "assets/jump.wav");

scene("main", () => {
  layers(["bg", "obj", "ui"], "obj");

  const player = add([
    sprite("player"),
    pos(30, 0),
    body(),
  ]);

  const level = addLevel([
    "====================",
    "=                  =",
    "=        =         =",
    "=    @             =",
    "===================="
  ], {
    width: 32,
    height: 32,
    "=": () => [sprite("ground"), solid()],
    "@": () => [sprite("enemy"), body()],
  });

  keyPress("space", () => {
    if (player.grounded()) {
      play("jump");
      player.jump(400);
    }
  });
});

go("main");
