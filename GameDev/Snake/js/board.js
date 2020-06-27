game.board = {
  game: game,
  size: 15,
  cells: [],
  create() {
    this.createCells();
  },
  createCells() {
    for (let row = 0; row < this.size; row++) {
      for (let col = 0; col < this.size; col++) {
        this.cells.push(this.createCell(row, col));
      }
    }
  },
  createCell(row, col) {
    const cellSize = this.game.sprites.cell.width + 1;
    const offsetX = (this.game.width - cellSize * this.size) / 2;
    const offsetY = (this.game.height - cellSize * this.size) / 2;

    return {
      row,
      col,
      x: offsetX + cellSize * col,
      y: offsetY + cellSize * row,
    };
  },
  getRandomAvailableCell() {
    const pool = this.cells.filter(
      (cell) => !cell.type && !this.game.snake.hasCell(cell),
    );
    const index = game.random(0, pool.length - 1);
    return pool[index];
  },
  createCellObject(type) {
    // Получить текущую ячейку с данным объектом
    let cell = this.cells.find((cell) => cell.type === type);
    if (cell) {
      cell.type = false;
    }
    // Получить случайную достпуную ячейку для нового объекта
    cell = this.getRandomAvailableCell();

    // установить поле нового объекта
    cell.type = type;
  },
  createFood() {
    this.createCellObject('food');
  },
  createBomb() {
    this.createCellObject('bomb');
  },
  isFoodCell(cell) {
    return cell.type === 'food';
  },
  isBombCell(cell) {
    return cell.type === 'bomb';
  },
  getCell(row, col) {
    return this.cells.find((cell) => cell.row === row && cell.col === col);
  },
  render() {
    this.cells.forEach((cell) => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);

      if (cell.type) {
        this.game.ctx.drawImage(this.game.sprites[cell.type], cell.x, cell.y);
      }
    });
  },
};
