const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });
console.log('Running at ws://localhost:3000');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});