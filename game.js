kaboom();

loadSprite("player", "assets/player.png");
loadSprite("ground", "assets/tileset.png");
loadSprite("enemy", "assets/enemy.png");
loadSound("jump", "assets/jump.wav");

scene("main", () => {
  const player = add([
    sprite("player"),
    pos(30, 0),
    body(),
  ]);

  addLevel([
    "====================",
    "=                  =",
    "=        =         =",
    "=    @             =",
    "===================="
  ], {
    width: 32,
    height: 32,
    "=": () => [sprite("ground"), area(), solid()],
    "@": () => [sprite("enemy"), area(), body()],
  });

  keyPress("space", () => {
    if (player.isGrounded()) {
      play("jump");
      player.jump(400);
    }
  });
});

go("main");
