const dgram = require('dgram');

// Multicast configuration
const multicastAddress = '239.255.255.250'; // Multicast group IP address
const multicastPort = 5555; // Multicast group port
const multicastTTL = 1; // Time-to-live value for multicast packets

// Create a UDP socket for sending and receiving multicast data
const socket = dgram.createSocket({ type: 'udp4', reuseAddr: true });

// Bind the socket to a port
socket.bind(() => {
    console.log(`Socket bound to port ${socket.address().port} with address: ${socket.address().address}`);

    // Set the multicast TTL value
    socket.setMulticastTTL(multicastTTL);

    // Join the multicast group
    socket.addMembership(multicastAddress);
});

// Handle received messages
socket.on('message', (message, remote) => {
    console.log('Received message from ' + remote.address + ':' + remote.port);
    console.log('Message content: ' + message.toString());
});

// Send a multicast message
const sendMessage = (message) => {
    socket.send(message, 0, message.length, multicastPort, multicastAddress, (err) => {
        if (err) {
            console.error('Error sending message:', err);
        } else {
            console.log('Message sent successfully.');
        }
    });
};

sendMessage('Hello, multicast!');

// Usage: sendMessage('Hello, multicast!');
