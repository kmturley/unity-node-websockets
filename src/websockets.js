// var canvas = document.getElementById('canvas');
var image = document.getElementById('image');
var ws = new WebSocket("ws://localhost:3000");
ws.onopen = function (event) {
  console.log('Browser open');
  ws.send(JSON.stringify({
    type: 'init',
    data: 'browser'
  }));
};

// ws.onmessage = function (event) {
//   console.log('Browser message', event.data);
//   if (typeof event.data === 'string') {
//     console.log(JSON.parse(event.data));
//   } else {
//     var reader = new FileReader();
//     reader.readAsDataURL(event.data); 
//     reader.onloadend = function() {
//         image.src = reader.result;
//     }
//   }
// };

function move() {
  ws.send(JSON.stringify({
    type: 'action',
    data: 'move'
  }));
}
