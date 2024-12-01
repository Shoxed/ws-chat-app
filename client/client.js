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
        // Send the message as a JSON string
        const payload = JSON.stringify({ username, message });
        socket.send(payload);
        messageInput.value = '';
    }
});

// Receive messages from the WebSocket server
socket.onmessage = (event) => {
    try {
        // Parse the JSON string into an object
        const data = JSON.parse(event.data);
        const newMessage = document.createElement('div');
        newMessage.textContent = `${data.username}: ${data.message}`;
        messagesDiv.appendChild(newMessage);
    } catch (error) {
        console.error('Error parsing message:', error);
    }
};

socket.onerror = (error) => console.error('WebSocket error:', error);
