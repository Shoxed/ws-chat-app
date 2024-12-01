# Reflections

## Security Vulnerabilities
1. **Cross-Site Scripting (XSS)**: Unsanitized user input might be injected into the DOM, executing malicious scripts. This could be mitigated by sanitizing inputs before broadcasting them.
2. **Denial of Service (DoS)**: Attackers could overload the server by opening many WebSocket connections or sending massive amounts of data.
3. **Lack of Authentication**: Anyone can connect to the WebSocket server. Adding token-based authentication could mitigate unauthorized usage.
4. **Unencrypted Data**: The current implementation uses `ws://`, which sends data in plaintext. A `wss://` connection should be used for production with SSL/TLS.

## What I Learned
- WebSockets provide real-time, bidirectional communication between the server and clients.
- It’s essential to consider security risks, even for simple implementations.
- Working with usernames and broadcasting messages helped me understand state management and client-server communication.
