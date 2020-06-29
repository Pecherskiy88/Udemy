// const scene = new Phaser.Scene('Game'); - OLD
class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // 1. загрузить бекграунд
    this.load.image('bg', 'assets/sprites/background.png');
    this.load.image('card', 'assets/sprites/card.png');
  }

  create() {
    this.createBackground();
    this.createCards();
  }

  createBackground() {
    // Phaser рендерит спрайты начанальную точку которых берет их центр. Поэтому смещаем ее в 0 0(левый верхний угол)
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }

  createCards() {
    this.cards = [];
    const positions = this.getCardPosition();
    for (let position of positions) {
      this.cards.push(new Card(this, position));
    }
  }

  getCardPosition() {
    const positions = [];
    const cardTexture = this.textures.get('card').getSourceImage(0, 0);
    const cardWidth = cardTexture.width + 4;
    const cardHeight = cardTexture.height + 4;
    const offsetX = (this.sys.game.config.width - cardWidth * config.cols) / 2;
    const offsetY =
      (this.sys.game.config.height - cardHeight * config.rows) / 2;

    for (let row = 0; row < config.rows; row++) {
      for (let col = 0; col < config.cols; col++) {
        positions.push({
          x: offsetX + col * cardWidth,
          y: offsetY + row * cardHeight,
        });
      }
    }
    return positions;
  }
}
