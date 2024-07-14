const io = require('socket.io-client');

const connectSocket = () => {
    const socket = io('wss://frontend-api.pump.fun', {
        path: '/socket.io/',
        transports: ['websocket'],
        reconnection: true,           // Enable reconnection
        reconnectionAttempts: Infinity, // Retry forever
        reconnectionDelay: 1000,      // Initial reconnection delay
        reconnectionDelayMax: 5000,   // Maximum reconnection delay
        timeout: 20000                // Connection timeout
    });

    // Log connection success
    socket.on('connect', () => {
        console.log('Connected to the server');
    });

    // Listen for the tradeCreated event
    socket.on('tradeCreated', (data) => {
        // This contains all the trade (buy/sell) on pump.fun (could be spammy)
        // console.log('New trade created:', data);
    });

    // Listen for the newCoinCreated event
    socket.on('newCoinCreated', (data) => {
        // This contains all the information about the new token created on pump.fun
        // Implement your functions/features to do something with it. 
        // For example, creating instructions to swap for new token whenever the socket receives a new coin created event
        console.log('New coin created:', data);
    });

    // Handle connection errors
    socket.on('connect_error', (error) => {
        console.error('Connection error:', error);
    });

    // Log disconnection and attempt reconnection
    socket.on('disconnect', (reason) => {
        console.log('Disconnected from the server:', reason);
        if (reason === 'io server disconnect') {
            // The server disconnected us, try to reconnect manually
            socket.connect();
        }
    });

    // Log reconnection attempts
    socket.on('reconnect_attempt', () => {
        console.log('Attempting to reconnect...');
    });

    // Log successful reconnection
    socket.on('reconnect', (attemptNumber) => {
        console.log(`Successfully reconnected on attempt ${attemptNumber}`);
    });

    // Log reconnection errors
    socket.on('reconnect_error', (error) => {
        console.error('Reconnection error:', error);
    });

    // Log failed reconnection attempts
    socket.on('reconnect_failed', () => {
        console.error('Failed to reconnect');
    });
};

// Initial connection
connectSocket();
