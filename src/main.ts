import { createBoard, checkWin, isBoardFull } from './game';
import { initCanvas, drawBoard, getClickPosition } from './renderer';
import type { Board, Player } from './game';

const canvas = document.getElementById('board') as HTMLCanvasElement;
const statusEl = document.getElementById('status') as HTMLElement;
const restartBtn = document.getElementById('restart') as HTMLButtonElement;

const ctx = initCanvas(canvas);

let board: Board;
let currentPlayer: Player;
let gameOver: boolean;

function updateStatus(msg: string): void {
  statusEl.textContent = msg;
}

function playerName(p: Player): string {
  return p === 'black' ? '⚫ 黑棋' : '⚪ 白棋';
}

function startGame(): void {
  board = createBoard();
  currentPlayer = 'black';
  gameOver = false;
  updateStatus(`${playerName(currentPlayer)} 落子`);
  drawBoard(ctx, board);
}

canvas.addEventListener('click', (e: MouseEvent) => {
  if (gameOver) return;

  const pos = getClickPosition(canvas, e);
  if (!pos) return;

  const { row, col } = pos;
  if (board[row][col] !== null) return;

  board[row][col] = currentPlayer;
  drawBoard(ctx, board);

  if (checkWin(board, row, col, currentPlayer)) {
    updateStatus(`🎉 ${playerName(currentPlayer)} 获胜！`);
    gameOver = true;
    return;
  }

  if (isBoardFull(board)) {
    updateStatus('平局！');
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
  updateStatus(`${playerName(currentPlayer)} 落子`);
});

restartBtn.addEventListener('click', startGame);

startGame();
