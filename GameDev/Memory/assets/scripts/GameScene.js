// const scene = new Phaser.Scene('Game'); - OLD
class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
    // 1. загрузить бекграунд
    this.load.image('bg', 'assets/sprites/background.png');
    this.load.image('card', 'assets/sprites/card.png');
    this.load.image('card1', 'assets/sprites/card1.png');
    this.load.image('card2', 'assets/sprites/card2.png');
    this.load.image('card3', 'assets/sprites/card3.png');
    this.load.image('card4', 'assets/sprites/card4.png');
    this.load.image('card5', 'assets/sprites/card5.png');
  }

  create() {
    this.createBackground();
    this.createCards();
    this.openedCard = null;
  }

  createBackground() {
    // Phaser рендерит спрайты начанальную точку которых берет их центр. Поэтому смещаем ее в 0 0(левый верхний угол)
    this.add.sprite(0, 0, 'bg').setOrigin(0, 0);
  }

  createCards() {
    this.cards = [];
    const positions = this.getCardPosition();
    Phaser.Utils.Array.Shuffle(positions);

    for (let value of config.cards) {
      for (let i = 0; i < 2; i++) {
        this.cards.push(new Card(this, value, positions.pop()));
      }
    }

    this.input.on('gameobjectdown', this.onCardClicked, this); // слушатель
  }

  onCardClicked(pointer, card) {
    if (card.opened) {
      return false;
    }
    if (this.openedCard) {
      // уже есть открытая карты
      if (this.openedCard.value === card.value) {
        // картинки равны - запомнить
        this.openedCard = null;
      } else {
        // картинки разные - скрыть прошлую
        this.openedCard.close();
        this.openedCard = card;
      }
    } else {
      // еще нет открытой карты
      this.openedCard = card;
    }
    card.open();
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
