// Tetris WebAssembly Interface
let wasmModule = null;
let wasmMemory = null;
let wasmExports = null;

// Canvas setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Logical (CSS) size of the board. The backing store is scaled by the
// device pixel ratio below so the game isn't blurry on retina displays.
const VIEW_WIDTH = 500;
const VIEW_HEIGHT = 600;

function setupHiDPI() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = VIEW_WIDTH * dpr;
  canvas.height = VIEW_HEIGHT * dpr;
  canvas.style.width = VIEW_WIDTH + 'px';
  canvas.style.height = VIEW_HEIGHT + 'px';
  // Draw in CSS pixels; the transform maps them onto the denser backing store.
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

setupHiDPI();
window.addEventListener('resize', setupHiDPI);

// Game constants
const CELL_SIZE = 30;
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const PREVIEW_SIZE = 4;

// Colors for each piece type
const COLORS = [
  '#00f0f0', // I - Cyan
  '#f0f000', // O - Yellow
  '#a000f0', // T - Purple
  '#00f000', // S - Green
  '#f00000', // Z - Red
  '#0000f0', // J - Blue
  '#f0a000', // L - Orange
];

// Initialize WebAssembly
async function initWasm() {
  try {
    const wasmResponse = await fetch('tetris.wasm');
    const wasmBytes = await wasmResponse.arrayBuffer();
    const wasmModule = await WebAssembly.instantiate(wasmBytes);
    
    wasmExports = wasmModule.instance.exports;
    wasmMemory = wasmExports.memory;
    
    // Initialize game
    wasmExports.init();
    
    // Start game loop
    gameLoop();
  } catch (error) {
    console.error('Failed to load WASM:', error);
    document.body.innerHTML = '<h1>Error loading game. Make sure tetris.wasm exists and is served via HTTP.</h1>';
  }
}

// Get board data from WASM memory
function getBoard() {
  const boardPtr = wasmExports.get_board();
  const board = new Uint8Array(wasmMemory.buffer, boardPtr, BOARD_WIDTH * BOARD_HEIGHT);
  return board;
}

// Get current piece info
function getCurrentPiece() {
  const piecePtr = wasmExports.get_current_piece();
  const pieceData = new Int32Array(wasmMemory.buffer, piecePtr, 4);
  return {
    type: pieceData[0],
    x: pieceData[1],
    y: pieceData[2],
    rotation: pieceData[3]
  };
}

// Get piece data for rendering
function getPieceData(type, rotation) {
  // Piece data is stored at offset 200 in WASM memory
  // Each piece: 64 bytes (4 rotations × 4 rows × 4 bytes)
  // Each rotation: 16 bytes (4 rows × 4 bytes per i32)
  const pieceOffset = 200 + (type * 64) + (rotation * 16);
  // Create a view into the WASM memory buffer at the correct byte offset
  const pieceData = new Int32Array(wasmMemory.buffer, pieceOffset, 4);
  return pieceData;
}

// Draw a cell
function drawCell(x, y, color, isPreview = false) {
  const screenX = x * CELL_SIZE;
  const screenY = y * CELL_SIZE;
  
  ctx.fillStyle = color;
  ctx.fillRect(screenX, screenY, CELL_SIZE - 1, CELL_SIZE - 1);
  
  // Draw border
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.strokeRect(screenX, screenY, CELL_SIZE - 1, CELL_SIZE - 1);
}

// Draw piece
function drawPiece(type, rotation, x, y, offsetX = 0, offsetY = 0, preview = false) {
  const pieceData = getPieceData(type, rotation);
  const color = COLORS[type];
  const scale = preview ? CELL_SIZE / 2 : CELL_SIZE;
  
  for (let row = 0; row < 4; row++) {
    const rowData = pieceData[row];
    for (let col = 0; col < 4; col++) {
      // Check if this cell is filled (bit 3-col)
      const mask = 1 << (3 - col);
      if (rowData & mask) {
        const cellX = offsetX + (x + col) * scale;
        const cellY = offsetY + (y + row) * scale;
        
        ctx.fillStyle = color;
        ctx.fillRect(cellX, cellY, scale - 1, scale - 1);
        
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.strokeRect(cellX, cellY, scale - 1, scale - 1);
      }
    }
  }
}

// Render game
function render() {
  // Clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);
  
  // Draw board
  const board = getBoard();
  for (let y = 0; y < BOARD_HEIGHT; y++) {
    for (let x = 0; x < BOARD_WIDTH; x++) {
      const cellValue = board[y * BOARD_WIDTH + x];
      if (cellValue > 0) {
        const color = COLORS[cellValue - 1];
        drawCell(x, y, color);
      } else {
        // Draw empty cell with grid
        ctx.fillStyle = '#111';
        ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
        ctx.strokeStyle = '#333';
        ctx.strokeRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
      }
    }
  }
  
  // Draw current piece
  if (!wasmExports.is_game_over()) {
    const current = getCurrentPiece();
    drawPiece(current.type, current.rotation, current.x, current.y);
  }
  
  // Draw next piece preview
  const nextType = wasmExports.get_next_piece();
  const previewX = BOARD_WIDTH * CELL_SIZE + 20;
  const previewY = 20;
  
  ctx.fillStyle = '#222';
  ctx.fillRect(previewX - 10, previewY - 10, PREVIEW_SIZE * (CELL_SIZE / 2) + 20, PREVIEW_SIZE * (CELL_SIZE / 2) + 20);
  
  ctx.fillStyle = '#fff';
  ctx.font = '14px Arial';
  ctx.fillText('Next:', previewX, previewY - 15);
  
  drawPiece(nextType, 0, 0, 0, previewX, previewY, true);
  
  // Draw score, level, lines
  const score = wasmExports.get_score();
  const level = wasmExports.get_level();
  const lines = wasmExports.get_lines();
  
  const infoX = BOARD_WIDTH * CELL_SIZE + 20;
  const infoY = previewY + PREVIEW_SIZE * (CELL_SIZE / 2) + 40;
  
  ctx.fillStyle = '#fff';
  ctx.font = '16px Arial';
  ctx.fillText(`Score: ${score}`, infoX, infoY);
  ctx.fillText(`Level: ${level}`, infoX, infoY + 25);
  ctx.fillText(`Lines: ${lines}`, infoX, infoY + 50);
  
  // Draw game over
  if (wasmExports.is_game_over()) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', VIEW_WIDTH / 2, VIEW_HEIGHT / 2 - 20);
    ctx.font = '20px Arial';
    ctx.fillText(`Final Score: ${score}`, VIEW_WIDTH / 2, VIEW_HEIGHT / 2 + 20);
    ctx.fillText('Press R to restart', VIEW_WIDTH / 2, VIEW_HEIGHT / 2 + 50);
    ctx.textAlign = 'left';
  }
}

// Game loop
let lastTime = 0;
function gameLoop(currentTime = 0) {
  if (!wasmExports) {
    requestAnimationFrame(gameLoop);
    return;
  }
  
  const deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  
  // Update game (tick)
  wasmExports.tick(Math.floor(deltaTime));
  
  // Render
  render();
  
  requestAnimationFrame(gameLoop);
}

// Keyboard input
const keys = {};
document.addEventListener('keydown', (e) => {
  if (keys[e.code]) return; // Prevent key repeat
  keys[e.code] = true;
  
  if (!wasmExports) return;
  
  switch (e.code) {
    case 'ArrowLeft':
      e.preventDefault();
      wasmExports.move_left();
      break;
    case 'ArrowRight':
      e.preventDefault();
      wasmExports.move_right();
      break;
    case 'ArrowDown':
      e.preventDefault();
      wasmExports.move_down();
      break;
    case 'ArrowUp':
    case 'KeyZ':
    case 'KeyX':
      e.preventDefault();
      wasmExports.rotate();
      break;
    case 'Space':
      e.preventDefault();
      wasmExports.hard_drop();
      break;
    case 'KeyR':
      if (wasmExports.is_game_over()) {
        wasmExports.init();
      }
      break;
  }
});

document.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

// Initialize when page loads
window.addEventListener('load', () => {
  initWasm();
});
