// Grid model is an extended array prototype to implement a grid
// Which structured [row][columns].
// This model can also check and return the total live neighborhood cells in a grid
export class Grid extends Array {
  constructor(private _rows: number, private _columns: number) {
    super();
    Object.setPrototypeOf(this, Grid.prototype);
    this._build();
  }

  get getRows() {
    return this._rows;
  }

  get getColumn() {
    return this._columns;
  }

  _build() {
    for (let i = 0; i < this._columns; i++) {
      this[i] = [];
    }
  }

  //  add up the total values for the surrounding cells
  checkSurroundingsCells(row, column) {
    let totalCells = 0;
    totalCells += this[column - 1][row - 1] || 0; //  top left
    totalCells += this[column - 1][row] || 0; //  top center
    totalCells += this[column - 1][row + 1] || 0; //  top right

    totalCells += this[column][row - 1] || 0; //  middle left
    totalCells += this[column][row + 1] || 0; //  middle right

    totalCells += this[column + 1][row - 1] || 0; //  bottom left
    totalCells += this[column + 1][row] || 0; //  bottom center
    totalCells += this[column + 1][row + 1] || 0; //  bottom right
    return totalCells;
  }
}
