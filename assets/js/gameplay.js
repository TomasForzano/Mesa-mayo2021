class gameplay extends Phaser.Scene {
  constructor() {
    super("nivel");
  }
  create() {
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("character", {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "character", frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("character", {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.add.image(960, 540, "background");

    this.add.image(960, 540, "details");

    platforms = this.physics.add.staticGroup();

    platforms.create(960, 1030, "ground");
    platforms.create(1637, 884, "platform_1b");
    platforms.create(284, 884, "platform_1a");

    platforms.create(960, 590, "platform_2");
    platforms.create(960, 210, "platform_3");

    platforms.create(1650, 375, "platform_4b");
    platforms.create(270, 375, "platform_4a");

    platforms.create(960, 67, "platform_5");

    var patron = Phaser.Math.FloatBetween(0, 1);

    if (patron >= 0.5) {
      playerX = 100;
    } else {
      playerX = 1820;
    }

    player = this.physics.add.sprite(playerX, 450, "character").setScale(2);

    player.setCollideWorldBounds(true);

    if ((cursors = !undefined)) {
      cursors = this.input.keyboard.createCursorKeys();
    }

    red_gems = this.physics.add.group({
      key: "red_gem",
      repeat: 2,
      setXY: { x: 20, y: 175 },
    });

    red_gems.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
      child.x += Phaser.Math.FloatBetween(0, 1880);
      child.y += Phaser.Math.FloatBetween(0, 400);
    });

    blue_gems = this.physics.add.group({
      key: "blue_gem",
      repeat: 1,
      setXY: { x: 20, y: 175 },
    });

    blue_gems.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
      child.x += Phaser.Math.FloatBetween(0, 1880);
      child.y += Phaser.Math.FloatBetween(0, 400);
    });

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(red_gems, platforms);
    this.physics.add.collider(blue_gems, platforms);

    this.physics.add.overlap(player, red_gems, this.collectredGems, null, this);

    this.physics.add.overlap(
      player,
      blue_gems,
      this.collectblueGems,
      null,
      this
    );

    initialTime = 30;
    timedEvent = this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope: this,
      loop: true,
    });

    moveTime = 10 - level;
    timedEventMove = this.time.addEvent({
      delay: 1000,
      callback: this.Move,
      callbackScope: this,
      loop: true,
    });

    this.add.image(20, 10, "bgnums").setScale(0.6).setOrigin(0);
    this.add.image(1900, 10, "bgnums").setScale(0.6).setOrigin(1, 0);
    this.add.image(960, 10, "bgnums").setScale(0.6).setOrigin(0.5, 0);

    this.add.image(963, 69, "text_time").setTint(0x623f34);
    this.add.image(960, 67, "text_time");

    this.add.image(168, 69, "text_level").setTint(0x623f34);
    this.add.image(165, 67, "text_level");

    this.add.image(1760, 69, "text_score").setTint(0x623f34);
    this.add.image(1757, 67, "text_score");

    timeTextBG = this.add
      .text(958, 205, initialTime, {
        fontSize: "90px",
        color: "#2C1815",
        fontFamily: "font1",
      })
      .setOrigin(0.5);
    timeText = this.add
      .text(953, 200, initialTime, {
        fontSize: "90px",
        color: "#C7AE40",
        fontFamily: "font1",
      })
      .setOrigin(0.5);

    levelTextBG = this.add
      .text(348, 70, level, {
        fontSize: "70px",
        color: "#2C1815",
        fontFamily: "font1",
      })
      .setOrigin(0.5);
    levelText = this.add
      .text(345, 67, level, {
        fontSize: "70px",
        color: "#C7AE40",
        fontFamily: "font1",
      })
      .setOrigin(0.5);

    scoreTextBG = this.add
      .text(1600, 70, score, {
        fontSize: "70px",
        color: "#2C1815",
        fontFamily: "font1",
      })
      .setOrigin(1, 0.5);
    scoreText = this.add
      .text(1597, 67, score, {
        fontSize: "70px",
        color: "#C7AE40",
        fontFamily: "font1",
      })
      .setOrigin(1, 0.5);
  }

  Move() {
    moveTime = moveTime - 1;
    if (moveTime == 0) {
      moveTime = 10 - level;
      blue_gems.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
        child.x = Phaser.Math.FloatBetween(20, 1880);
        child.y = Phaser.Math.FloatBetween(175, 575);
      });
      red_gems.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
        child.x = Phaser.Math.FloatBetween(20, 1880);
        child.y = Phaser.Math.FloatBetween(175, 575);
      });
    }
  }

  update() {
    if (cursors.left.isDown) {
      player.setVelocityX(-400);

      player.anims.play("left", true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(400);

      player.anims.play("right", true);
    } else {
      player.setVelocityX(0);

      player.anims.play("turn");
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-510);
    }

    if (picked >= 5) {
      this.levelup();
    }
  }

  levelup() {
    level++;
    levelText.setText(level);
    levelTextBG.setText(level);
    moveTime = 10 - level;
    picked = 0;
    initialTime += 15;
    timeText.setText(initialTime);
    timeTextBG.setText(initialTime);

    if (level == 10) {
      win = 1;
      this.scene.pause();
      this.scene.run("finalScore");
    }
  }

  collectredGems(player, red_gem) {
    red_gem.disableBody(true, true);
    picked++;
    score += 10 * level;
    scoreText.setText(score);
    scoreTextBG.setText(score);

    var x = Phaser.Math.FloatBetween(20, 1900);

    var y = Phaser.Math.FloatBetween(175, 575);

    blue_gems
      .create(x, y, "blue_gem")
      .setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
  }

  collectblueGems(player, blue_gem) {
    blue_gem.disableBody(true, true);
    picked++;
    score += 15 * level;
    scoreText.setText(score);
    scoreTextBG.setText(score);

    var x = Phaser.Math.FloatBetween(20, 1900);

    var y = Phaser.Math.FloatBetween(175, 575);

    red_gems
      .create(x, y, "red_gem")
      .setBounceY(Phaser.Math.FloatBetween(0.2, 0.6));
  }
  onSecond() {
    initialTime = initialTime - 1;
    timeText.setText(initialTime);
    timeTextBG.setText(initialTime);
    if (initialTime == 0) {
      this.gameOver();
    }
  }
  gameOver() {
    win = 0;
    this.scene.pause();
    this.scene.run("finalScore");
  }
}
