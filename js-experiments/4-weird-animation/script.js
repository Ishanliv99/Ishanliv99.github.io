var maxCircleSize = 10;
var speed = 0.03;
var numRows = 10;
var numCols = 16;
var numStrands = 2;
var phase = 0;
var frameCount = 0;


map_range = function(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * ((value - low1) / (high1 - low1));
}

var canvas = document.getElementById('my-canvas');
canvas.style.background = '#043A4A';
var ctx = canvas.getContext('2d');

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var x = 0
  var colOffset = 0;
  frameCount++;
  phase = frameCount * speed;

  for (var i = 0; i < 2; i += 1) {
    var strandPhase = phase + map_range(i, 0, numStrands, 0, 2 * Math.PI);
    for (var j = 0; j < numCols; j += 1) {
      var colOffset = map_range(j, 0, numCols, 0, 2 * Math.PI);
      var x = map_range(j, 0, numCols, 50, canvas.width - 50);
      for (var k = 0; k < numRows; k += 1) {
        var y = canvas.height / 3 + k * 13 + Math.sin(strandPhase + colOffset) * 50;
        var sizeOffset = (Math.cos(strandPhase - (k / numRows) + colOffset) + 1) * 0.5;
        var circleSize = sizeOffset * maxCircleSize;
        ctx.beginPath();
        ctx.clearRect(200, 400, canvas.width, canvas.height);

        ctx.arc(x, y, circleSize, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgb(' + Math.floor(255 - 2 * k) + ',' + Math.floor(255 - 10 * j) + ', ' +
          Math.floor(255 - 42.5 * i) + ')';
        ctx.fill();

        ctx.closePath();
      }
    }
  }
}

setInterval(draw, 20);


// // for (var i = 3; i < 18; i++) {
// setInterval(function() {
//   // for (var k = 0; k < 5; k++) {
//   ctx.clearRect(0, 0, 500, 500);
//   ctx.fillStyle = 'rgb(' + Math.floor(255 - 2 * j) + ',' + Math.floor(255 - 10 * j) + ', ' +
//     Math.floor(255 - 42.5 * j) + ')';
//   if (j >= 0 && i==0){
//     j++;
//     if (j==15)
//       i=1;
//   }
//   if (j <= 15 && i==1){
//     j--;
//     if (j==0)
//       i=0;
//   }
//   ctx.beginPath();
//   ctx.arc(100, 10 * j + 100, j, 0, Math.PI * 2, true);
//   ctx.fill();
//   ctx.closePath();
//   // }
// }, 25);