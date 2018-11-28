var exampleSocket = new WebSocket("ws://localhost:3000");
exampleSocket.onopen = function (event) {
  exampleSocket.send(JSON.stringify({
    type: 'init',
    data: 'browser'
  }));
};

function move() {
  exampleSocket.send(JSON.stringify({
    type: 'action',
    data: 'move'
  }));
}
