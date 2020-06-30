class Card extends Phaser.GameObjects.Sprite {
  constructor(scene, value, position) {
    // this.add.sprite(position.x, position.y, 'card');
    super(scene, position.x, position.y, 'card');
    this.scene = scene;
    this.value = value;
    this.setOrigin(0, 0);
    this.scene.add.existing(this);

    this.setInteractive(); // делаем спрайт карт интерактивным, теперь слушатель реагирует на клики по карте.
    this.opened = false;
  }

  open() {
    this.opened = true;
    this.setTexture('card' + this.value);
  }
  close() {
    this.opened = false;
    this.setTexture('card');
  }
}
