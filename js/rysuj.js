const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');
let drawing = false;
let lastX = 0;
let lastY = 0;
let color = '#000000';

function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

function startDrawing(e) {
  drawing = true;
  if (e.touches) {
    e.preventDefault(); 
    let touch = getTouchPos(canvas, e);
    lastX = touch.x;
    lastY = touch.y;
  } else {
    lastX = e.offsetX;
    lastY = e.offsetY;
  }
}

function draw(e) {
  if (!drawing) return;
  let newX, newY;
  if (e.touches) {
    e.preventDefault(); 
    let touch = getTouchPos(canvas, e);
    newX = touch.x;
    newY = touch.y;
  } else {
    newX = e.offsetX;
    newY = e.offsetY;
  }
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.lineCap = 'round';
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(newX, newY);
  context.stroke();
  lastX = newX;
  lastY = newY;
}

function stopDrawing() {
  drawing = false;
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

canvas.addEventListener('touchstart', startDrawing);
canvas.addEventListener('touchmove', draw);
canvas.addEventListener('touchend', stopDrawing);

function setCanvasWidth() {

  if (window.innerWidth < 768) {
    canvas.width = window.innerWidth - 20; 
    canvas.height = window.innerHeight * 0.7; 
  } else {
    canvas.width = window.innerWidth * 0.4;
    canvas.height = window.innerHeight * 0.7; 
  }
}

function clearCanvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
  const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
  const link = document.createElement('a');
  link.download = 'plakat.png';
  link.href = image;
  link.click();
}

document.getElementById('color').addEventListener('input', (e) => {
  color = e.target.value;
});


setCanvasWidth();


window.addEventListener('resize', setCanvasWidth);