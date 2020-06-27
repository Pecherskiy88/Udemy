game.snake = {
  game: game,
  cells: [],
  moving: false,
  direction: false,
  directions: {
    up: {
      row: -1,
      col: 0,
      angle: 0,
    },
    down: {
      row: 1,
      col: 0,
      angle: 180,
    },
    left: {
      row: 0,
      col: -1,
      angle: 270,
    },
    right: {
      row: 0,
      col: 1,
      angle: 90,
    },
  },
  create() {
    const startCells = [
      { row: 7, col: 7 },
      { row: 8, col: 7 },
    ];

    this.direction = this.directions.up;

    for (let startCell of startCells) {
      this.cells.push(this.game.board.getCell(startCell.row, startCell.col));
    }
  },
  renderHead() {
    // получить голову и отрисовать
    const head = this.cells[0];

    const halfSize = this.game.sprites.head.width / 2;

    // сохранить исходное состояние контекста
    this.game.ctx.save();

    // перемещаем точку начала отсчета координат в координаты головы(левый верхний угол)
    this.game.ctx.translate(head.x, head.y);

    // перемещаем точку начала координат в центр головы
    this.game.ctx.translate(halfSize, halfSize);

    // вращаем контекст относительно центра спрайта головы змеи.
    this.game.ctx.rotate((this.direction.angle * Math.PI) / 180); // - чтобы не передавать значение в радианах.

    // отрисовываем голову с учетом поворота контекста
    this.game.ctx.drawImage(this.game.sprites.head, -halfSize, -halfSize); // -halfSize чтобы отрисовать спрайт от левого верхнего угла, а не от центра.

    // вернуть исходное состояние контекста
    this.game.ctx.restore();
  },
  renderBody() {
    for (let i = 1; i < this.cells.length; i++) {
      this.game.ctx.drawImage(
        this.game.sprites.body,
        this.cells[i].x,
        this.cells[i].y,
      );
    }
  },
  render() {
    this.renderHead();
    this.renderBody();
  },
  start(keyKode) {
    switch (keyKode) {
      case 38:
        this.direction = this.directions.up;
        break;
      case 37:
        this.direction = this.directions.left;
        break;
      case 39:
        this.direction = this.directions.right;
        break;
      case 40:
        this.direction = this.directions.down;
        break;
    }

    if (!this.moving) {
      this.game.onSnakeStart();
    }

    this.moving = true;
  },
  move() {
    if (!this.moving) {
      return;
    }
    // получить следующую ячейку
    let cell = this.getNextCell();
    if (!cell || this.hasCell(cell) || this.game.board.isBombCell(cell)) {
      // остановить игру
      this.game.stop();
    }
    // если такая ячейка есть
    else {
      // добавить ячейку в snake.cells
      this.cells.unshift(cell);
      // удалить последнюю ячейку из snake.cells
      // если новая ячейчка не является яблоком - то хвост не удалять.
      if (!this.game.board.isFoodCell(cell)) {
        this.cells.pop();
      } else {
        // если новая ячейка является яблоком
        this.game.onSnakeEat();
      }
    }
  },
  hasCell(cell) {
    return this.cells.find((part) => part === cell);
  },
  getNextCell() {
    const head = this.cells[0];

    let row = head.row + this.direction.row;
    let col = head.col + this.direction.col;

    return this.game.board.getCell(row, col);
  },
};
