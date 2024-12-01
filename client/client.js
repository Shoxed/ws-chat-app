const socket = new WebSocket('ws://localhost:8080');

const messagesDiv = document.getElementById('messages');
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// Send message to the WebSocket server
sendButton.addEventListener('click', () => {
    const username = usernameInput.value || 'Anonymous';
    const message = messageInput.value;
    if (message) {
        const payload = { username, message };
        socket.send(JSON.stringify(payload));
        messageInput.value = '';
    }
});

// Receive messages from the WebSocket server
socket.onmessage = (event) => {
    const { username, message } = JSON.parse(event.data);
    const newMessage = document.createElement('div');
    newMessage.textContent = `${username}: ${message}`;
    messagesDiv.appendChild(newMessage);
};

socket.onerror = (error) => console.error('WebSocket error:', error);
