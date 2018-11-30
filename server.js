const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });
let browser;
let unity;

console.log('Running at ws://localhost:3000');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    try {
      const replyObject = JSON.parse(data);
      console.log('Type:', replyObject.type, replyObject.data);
      // on init, save reference to client by type
      if (replyObject.type === 'init') {
        if (replyObject.data === 'browser') {
          browser = ws;
        } else if (replyObject.data === 'unity') {
          unity = ws;
        }
      }
      // broadcast event back to unity client
      if (replyObject.type === 'action' && unity) {
        unity.send(JSON.stringify({
          "type": "action",
          "data": "move"
        }));
      }
    } catch (e) {
      // broadcast binary back to browser client
      if (browser) {
        browser.send(data);
      }
    }
  });

  ws.send(JSON.stringify({
    "type": "message",
    "data": "Sent from Node!"
  }));
});
