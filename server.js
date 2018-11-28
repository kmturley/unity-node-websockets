const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });
const browser = [];
const unity = [];

console.log('Running at ws://localhost:3000');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    const replyObject = JSON.parse(data)
    console.log('Node received:', replyObject.type, replyObject.data);
    // on init, save reference to client by type
    if (replyObject.type === 'init') {
      if (replyObject.data === 'browser') {
        browser.push(ws);
      } else if (replyObject.data === 'unity') {
        unity.push(ws);
      }
    }
    // broadcast event back to unity client
    if (replyObject.type === 'action') {
      unity[0].send(JSON.stringify({
        "type": "action",
        "data": "move"
      }));
    }
  });

  ws.send(JSON.stringify({
    "type": "message",
    "data": "Sent from Node!"
  }));
});
