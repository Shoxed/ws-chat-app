const http = require('http');
const ws = require('ws');

const wss = new ws.Server({ noServer: true });
const clients = new Set();

http.createServer((req, res) => {
    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), onSocketConnect);
}).listen(8080, () => {
    console.log('Server is running on http://localhost:8080');
});

function onSocketConnect(ws) {
    clients.add(ws);

    ws.on('message', function (message) {
        try {
            // Parse the incoming JSON message
            const data = JSON.parse(message);

            // Limit message length to 50 characters
            const trimmedMessage = data.message.slice(0, 50);

            // Broadcast to all connected clients
            for (let client of clients) {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify({ username: data.username, message: trimmedMessage }));
                }
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', function () {
        clients.delete(ws);
    });
}
