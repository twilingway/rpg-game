import './index.scss';
import SenseiWalk from './assets/Male-1-Walk.png';
import Heart from './assets/heart.png';

const canvas = /** @type {HTMLCanvasElement} */ (
  document.getElementById('game')
);
const ctx = canvas.getContext('2d');

const spriteW = 48;
const spriteH = 48;
const shots = 3;
let cycle = 0;
let bottomPressed = false;
const speed = 10;
const areaW = 600;
const areaH = 600;
let pX = (areaW - spriteW) / 2;
let pY = (areaH - spriteH) / 2;
let sY = 0;
let direction = '';
const items = [];

function drowGrid() {
  ctx.beginPath();
  for (let i = 0; i <= areaW; i += 50) {
    ctx.moveTo(0, i);
    ctx.lineTo(areaH, i);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
  for (let j = 0; j <= areaH; j += 50) {
    ctx.moveTo(j, 0);
    ctx.lineTo(j, areaW);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 1;
    ctx.stroke();
  }
}
function keyDownHandler(event) {
  switch (event.key) {
    case 'down':
    case 'ArrowDown':
      sY = 0;
      direction = 'down';
      break;
    case 'up':
    case 'ArrowUp':
      sY = 144;
      direction = 'up';
      break;
    case 'left':
    case 'ArrowLeft':
      sY = 48;
      direction = 'left';
      break;
    case 'right':
    case 'ArrowRight':
      sY = 96;
      direction = 'right';
      break;
    default:
      sY = 0;
      direction = '';
      break;
  }
  bottomPressed = true;
}

function keyUpHandler(event) {
  switch (event.key) {
    case 'down':
    case 'ArrowDown':
      sY = 0;
      break;
    case 'up':
    case 'ArrowUp':
      sY = 144;
      break;
    case 'left':
    case 'ArrowLeft':
      sY = 48;
      break;
    case 'right':
    case 'ArrowRight':
      sY = 96;
      break;
    default:
      sY = 0;
      break;
  }
  bottomPressed = false;
}
const heart = document.createElement('img');
heart.src = Heart;

function respawn(count) {
  for (let i = 0; i <= count; i += 1) {
    items.push({
      x: 50 * Math.floor(Math.random() * (11 - 0 + 1)) + 0,
      y: 50 * Math.floor(Math.random() * (11 - 0 + 1)) + 0,
    });
  }
  return items;
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

const img = document.createElement('img');
img.src = SenseiWalk;

function move(direct) {
  switch (direct) {
    case 'down':
      if (pY + speed <= areaW - spriteW) {
        pY += speed;
      } else {
        pY = areaW - spriteW;
      }
      break;
    case 'up':
      if (pY - speed >= 0) {
        pY -= speed;
      } else {
        pY = 0;
      }
      break;
    case 'left':
      if (pX - speed >= 0) {
        pX -= speed;
      } else {
        pX = 0;
      }
      break;
    case 'right':
      if (pX + speed <= areaH - spriteH) {
        pX += speed;
      } else {
        pX = areaH - spriteH;
      }
      break;
    default:
      break;
  }
}
respawn(4);

img.addEventListener('load', () => {
  setInterval(() => {
    if (bottomPressed) {
      move(direction);
      cycle = (cycle + 1) % shots;
    }

    ctx.clearRect(0, 0, 600, 600);
    drowGrid();
    items.forEach((i) => {
      ctx.drawImage(heart, 0, 0, 920, 920, i.x, i.y, 50, 50);
    });
    ctx.drawImage(img, cycle * spriteW, sY, spriteW, spriteH, pX, pY, 48, 48);
  }, 120);
});

console.log('### Init :>> ');
