import { BOARD_SIZE, CELL_SIZE, PADDING, STONE_RADIUS } from './game';
import type { Board, Player } from './game';

const CANVAS_SIZE = CELL_SIZE * (BOARD_SIZE - 1) + PADDING * 2;

export function initCanvas(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas not supported');
  return ctx;
}

export function drawBoard(ctx: CanvasRenderingContext2D, board: Board): void {
  const { width, height } = ctx.canvas;

  // 背景
  ctx.fillStyle = '#dcb35c';
  ctx.fillRect(0, 0, width, height);

  // 网格线
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;

  for (let i = 0; i < BOARD_SIZE; i++) {
    const pos = PADDING + i * CELL_SIZE;

    ctx.beginPath();
    ctx.moveTo(PADDING, pos);
    ctx.lineTo(PADDING + (BOARD_SIZE - 1) * CELL_SIZE, pos);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pos, PADDING);
    ctx.lineTo(pos, PADDING + (BOARD_SIZE - 1) * CELL_SIZE);
    ctx.stroke();
  }

  // 星位点
  const starPoints = [3, 7, 11];
  ctx.fillStyle = '#333';
  for (const r of starPoints) {
    for (const c of starPoints) {
      ctx.beginPath();
      ctx.arc(PADDING + c * CELL_SIZE, PADDING + r * CELL_SIZE, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // 棋子
  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const cell = board[r][c];
      if (!cell) continue;
      drawStone(ctx, r, c, cell);
    }
  }
}

function drawStone(ctx: CanvasRenderingContext2D, row: number, col: number, player: Player): void {
  const x = PADDING + col * CELL_SIZE;
  const y = PADDING + row * CELL_SIZE;

  ctx.beginPath();
  ctx.arc(x, y, STONE_RADIUS, 0, Math.PI * 2);

  if (player === 'black') {
    const gradient = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, STONE_RADIUS);
    gradient.addColorStop(0, '#555');
    gradient.addColorStop(1, '#000');
    ctx.fillStyle = gradient;
  } else {
    const gradient = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, STONE_RADIUS);
    gradient.addColorStop(0, '#fff');
    gradient.addColorStop(1, '#ccc');
    ctx.fillStyle = gradient;
  }

  ctx.fill();
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 0.5;
  ctx.stroke();
}

export function getClickPosition(canvas: HTMLCanvasElement, event: MouseEvent): { row: number; col: number } | null {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  const col = Math.round((x - PADDING) / CELL_SIZE);
  const row = Math.round((y - PADDING) / CELL_SIZE);

  if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return null;

  return { row, col };
}
