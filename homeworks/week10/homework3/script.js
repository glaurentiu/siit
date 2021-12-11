var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

ctx.fillStyle = "white";
ctx.strokeStyle = "black";
ctx.lineWidth = "2";
ctx.moveTo(100, 260);
ctx.lineTo(300, 10);
ctx.lineTo(500, 260);
ctx.stroke();
ctx.strokeRect(100, 260, 400, 300);
