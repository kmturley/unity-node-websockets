const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });
console.log('Running at ws://localhost:3000');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const replyObject = JSON.parse(data)
    console.log('Node received:', replyObject.type, replyObject.data);
  });

  ws.send(JSON.stringify({
    "type": "message",
    "data": "Sent from Node!"
  }));

  ws.send(JSON.stringify({
    "type": "action",
    "data": "move"
  }));
});
