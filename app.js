const boardSize = 3;

const PlayerX = true;
const PlayerO = false;

const Game = {
  board: Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)),

  player: PlayerX,
  turns: 0,
  gameOver: false,

  reset: function() {
    this.player = PlayerX;
    this.turns = 0;
    this.gameOver = false;
    this.board.forEach(row => row.fill(null));
  },

  move: function(atRow, atCol) {
    const boardRow = this.board[atRow];
    boardRow[atCol] = this.player;
    this.turns++;
    if (this.turns === boardSize * boardSize) {
      gameOver = true;
      return 'Tie';
    } else if (
      // check horizontal
      boardRow.every(place => place === this.player) ||
      // check vertical
      this.board.every(row => row[atCol] === this.player) ||
      // check major diagonal
      atRow === atCol && this.board.every((row, i) => row[i] === this.player) ||
      // check minor diagonal
      atRow + atCol + 1 === boardSize
        && this.board.every((row, i) => row[boardSize - i - 1] === this.player)
    ) {
      gameOver = true;
      return this.player === PlayerX ? 'X wins' : 'O wins';
    } else {
      this.player = !this.player;
    }
  }
};

const View = {
  tiles: [],
  victor: document.getElementById('victor'),

  reset: function() {
    Game.reset();
    victor.innerText = '';
    for (const tile of this.tiles) {
      tile.innerText = '';
    }
  },

  move: function(event) {
    const tile = event.target;
    if (Game.gameOver || tile.innerText) {
      return;
    }
    tile.innerText = Game.player === PlayerX ? 'X' : 'O';
    const victor = Game.move(tile.row, tile.col);
    if (victor) {
      this.victor.innerText = victor;
    }
  }
};

const board = document.createElement('tbody');

for (let row = 0; row < boardSize; row++) {
  const tr = document.createElement('tr');
  for (let col = 0; col < boardSize; col++) {
    const tile = document.createElement('td');
    tile.row = row;
    tile.col = col;
    tile.onclick = View.move.bind(View);
    View.tiles.push(tile);
    tr.append(tile);
  }
  board.append(tr);
}

document.getElementById('board').append(board);
document.getElementById('reset').onclick = View.reset.bind(View);

