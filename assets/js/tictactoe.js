document.addEventListener('DOMContentLoaded', function () {
  const board = document.querySelector('.board');
  const status = document.querySelector('h2');
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  let cells, turn, finished;

  function initialize() {
    cells = Array(9).fill('');
    turn = 'X';
    finished = false;
    board.replaceChildren();
    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div');
      cell.id = String(i);
      cell.className = 'box';
      board.appendChild(cell);
    }
    status.textContent = "It is X's turn.";
  }

  board.addEventListener('click', function (event) {
    const cell = event.target.closest('.box');
    if (!cell || cell.parentElement !== board || finished) return;
    const index = Number(cell.id);
    if (cells[index]) {
      alert('Spot has already been taken. Choose another.');
      return;
    }
    cells[index] = turn;
    const mark = document.createElement('p');
    mark.textContent = turn;
    cell.appendChild(mark);
    if (wins.some(line => line.every(i => cells[i] === turn))) {
      status.textContent = turn + ' has won!';
      finished = true;
    } else if (cells.every(Boolean)) {
      status.textContent = "The game is over. It's a draw.";
      finished = true;
    } else {
      turn = turn === 'X' ? 'O' : 'X';
      status.textContent = "It is " + turn + "'s turn.";
    }
  });

  document.querySelector('#new').addEventListener('click', initialize);
  initialize();
});
