class final extends Phaser.Scene {
  constructor() {
    super("finalScore");
  }
  create() {
    this.add.image(960, 540, "black").setAlpha(0.4);
    if (win == 1) {
      this.add.image(970, 250, "text_won").setScale(3).setTint(0x623f34);
      this.add.image(960, 240, "text_won").setScale(3);
    } else {
      this.add.image(970, 230, "text_gameover").setScale(3).setTint(0x623f34);
      this.add.image(960, 220, "text_gameover").setScale(3);
    }

    this.add.image(960, 400, "text_fscore").setScale(1.5);

    scoreTextBG = this.add
      .text(970, 590, score, {
        fontSize: "200px",
        color: "#2C1815",
        fontFamily: "font1",
      })
      .setOrigin(0.5);
    scoreText = this.add
      .text(960, 580, score, {
        fontSize: "200px",
        color: "#C7AE40",
        fontFamily: "font1",
      })
      .setOrigin(0.5);

    retry = this.add
      .image(960, 850, "bgnums")
      .setInteractive({ cursor: "pointer", pixelPerfect: "true" });

    this.add.image(964, 854, "text_restart").setTint(0x623f34);
    this.add.image(960, 850, "text_restart");

    retry.on("pointerdown", () => {
      win = 0;
      score = 0;
      level = 1;
      picked = 0;
      this.scene.stop();
      this.scene.start("nivel");
    });
  }
}
