const scene = new Phaser.Scene('Game');

scene.preload = function () {
  // 1. загрузить бекграудн
  console.log('preload');
};

scene.create = function () {
  // 2. вывести бекграунд
  console.log('create');
};

const config = {
  type: Phaser.AUTO, // по дефолту использует WEBGL || canvas
  width: 1280,
  height: 720,
  scene: scene,
};
const game = new Phaser.Game(config);
