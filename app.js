const dgram = require('dgram');

// import dgram from 'node:dgram'
// address range
//  224.0.0.0 to 239.255. 255.255
const address = '224.0.0.0' // address which all of the member are listening to
const port = 5554

let socket = dgram.createSocket({
    type: 'udp4',
    reuseAddr: true // for testing multiple instances on localhost
})

socket.bind(port)

socket.on('message', (msg, remote) => {
    console.log(msg.toString().trim())
})

socket.on("listening", function () {
    this.setBroadcast(true)
    this.setMulticastTTL(128)
    this.addMembership(address)
    console.log('Multicast listening . . . ')
})

setInterval(() => {
    let message = 'Hi! ' + new Date().getTime()
    socket.send(message, 0, message.length, port, address)
}, 1000)