var canvas = document.getElementById('my-canvas');
canvas.style.background = '#043A4A';

var ctx = canvas.getContext('2d');
var i = 0;
var j = 0;

// var canvas = document.getElementById('my-canvas');
// canvas.style.background = '#043A4A';

// var ctx = canvas.getContext('2d');

// for (var i = 3; i < 18; i++) {
//   for (var j = 3; j < 18; j++) {
//     ctx.fillStyle = 'rgb(' + Math.floor(255 - 2 * i) + ',' + Math.floor(255 - 10 * i) + ', ' +
//       Math.floor(255 - 42.5 * j) + ')';
//     ctx.beginPath();
//     ctx.arc(12.5 + j * 22, 12.5 + i * 22, i, 0, Math.PI * 2, true);
//     ctx.fill();
//   }
// }

// //new
// var canvas = document.getElementById('my-canvas');
// canvas.style.background = '#043A4A';

// var ctx = canvas.getContext('2d');
// var i = 0;
// var j = 0;
// // for (var i = 3; i < 18; i++) {
// setInterval(function() {
//   for (var k = 0; k < 15; k++) {
//     ctx.clearRect(0, 0, 500, 500);
//     ctx.fillStyle = 'rgb(' + Math.floor(255 - 2 * j) + ',' + Math.floor(255 - 10 * j) + ', ' +
//       Math.floor(255 - 42.5 * j) + ')';
//     if (j >= 0 && i==0){
//       j++;
//       if (j==15)
//         i=1;
//     }
//     if (j <= 15 && i==1){
//       j--;
//       if (j==0)
//         i=0;
//     }
//     ctx.beginPath();
//     ctx.arc(100, 10 * j + 100, j, 0, Math.PI * 2, true);
//     ctx.fill();
//     ctx.closePath();
//   }
// }, 100);
// // }

// for (var i = 3; i < 18; i++) {
setInterval(function() {
  // for (var k = 0; k < 5; k++) {
  ctx.clearRect(0, 0, 500, 500);
  ctx.fillStyle = 'rgb(' + Math.floor(255 - 2 * j) + ',' + Math.floor(255 - 10 * j) + ', ' +
    Math.floor(255 - 42.5 * j) + ')';
  if (j >= 0 && i==0){
    j++;
    if (j==15)
      i=1;
  }
  if (j <= 15 && i==1){
    j--;
    if (j==0)
      i=0;
  }
  ctx.beginPath();
  ctx.arc(100, 10 * j + 100, j, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
  // }
}, 25);


//   // }
// }, 25);