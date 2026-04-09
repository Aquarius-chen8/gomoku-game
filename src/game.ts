export type Player = 'black' | 'white';
export type Cell = Player | null;
export type Board = Cell[][];

export const BOARD_SIZE = 15;
export const CELL_SIZE = 40;
export const PADDING = 30;
export const STONE_RADIUS = 17;
const WIN_COUNT = 5;

export function createBoard(): Board {
  return Array.from({ length: BOARD_SIZE }, () =>
    Array.from<Cell>({ length: BOARD_SIZE }).fill(null)
  );
}

export function checkWin(board: Board, row: number, col: number, player: Player): boolean {
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, -1],
  ];
  for (const [dr, dc] of directions) {
    let count = 1;
    for (const sign of [1, -1]) {
      let r = row + dr * sign;
      let c = col + dc * sign;
      while (
        r >= 0 && r < BOARD_SIZE &&
        c >= 0 && c < BOARD_SIZE &&
        board[r][c] === player
      ) {
        count++;
        r += dr * sign;
        c += dc * sign;
      }
    }
    if (count >= WIN_COUNT) return true;
  }
  return false;
}

export function isBoardFull(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell !== null));
}