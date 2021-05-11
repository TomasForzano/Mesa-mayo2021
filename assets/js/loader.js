var carga;

class loader extends Phaser.Scene {
  constructor() {
    super("preload");
  }

  preload() {
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(800, 515, 320, 50);
    var width = 1920;
    var height = 1080;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        fill: "#ffffff",
        fontFamily: "font1",
        fontSize: "20px",
      },
    });
    loadingText.setOrigin(0.5, 0.5);
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.image("background", "assets/images/background.png");
    this.load.image("black", "assets/images/black.png");
    this.load.image("details", "assets/images/details.png");
    this.load.image("ground", "assets/images/platform_base.png");
    this.load.image("platform_1a", "assets/images/platform_1a.png");
    this.load.image("platform_1b", "assets/images/platform_1b.png");
    this.load.image("platform_2", "assets/images/platform_2.png");
    this.load.image("platform_3", "assets/images/platform_3.png");
    this.load.image("platform_4a", "assets/images/platform_4a.png");
    this.load.image("platform_4b", "assets/images/platform_4b.png");
    this.load.image("platform_5", "assets/images/platform_5.png");

    this.load.spritesheet("character", "assets/images/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });

    this.load.image("red_gem", "assets/images/red_gem.png");
    this.load.image("blue_gem", "assets/images/blue_gem.png");

    this.load.image("bgnums", "assets/images/bgnums.png");
    this.load.image("text_level", "assets/images/text_level.png");
    this.load.image("text_score", "assets/images/text_score.png");
    this.load.image("text_time", "assets/images/text_time.png");
    this.load.image("text_won", "assets/images/text_won.png");
    this.load.image("text_gameover", "assets/images/text_gameover.png");
    this.load.image("text_restart", "assets/images/text_restart.png");
    this.load.image("text_fscore", "assets/images/text_fscore.png");

    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(810, 523, 300 * value, 32);
      percentText.setText(parseInt(value * 100) + "%");
    });

    this.load.on("fileprogress", function (file) {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", function () {
      carga = 1;
    });
  }
  update() {
    if (carga == 1) {
      this.scene.start("nivel");
      this.scene.sleep();
    }
  }
}
