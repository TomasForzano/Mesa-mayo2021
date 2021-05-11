var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080,
    debug: "true",
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scene: [loader, gameplay, final],
};

var game = new Phaser.Game(config);

var score = 0;
var scoreText;
var scoreTextBG;
var gameOver;
var level = 1;
var levelText;
var levelTextBG;

var timedEvent;
var timedEventMove;
var initialTime;
var moveTime;
var timeText;
var timeTextBG;

var platforms;
var player;
var red_gems;
var blue_gems;

var randomX;
var randomY;
var playerX;

var cursors;
var picked = 0;
var retry;
var win = 0;
