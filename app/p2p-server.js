const WebSocket = require("ws");

const P2P_PORT = process.env.P2P_PORT || 5001;
const PEERS = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain) {
        this.blockChain = blockchain;
        this.sockets = [];
    }


    listen() {
        const server = new WebSocket.Server({ port : P2P_PORT});
        server.on("connection", socket => this.connectSocket(socket));

        this.connectPeers();

        console.log(`Running P2P on Port : ${P2P_PORT}`);
    }


    connectPeers() {
        PEERS.forEach(peer => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }
    
    
    connectSocket(socket) {
        this.sockets.push(socket);
        // console.log('Socket Connected');
        
        this.messageHandler(socket);
        this.sendChain(socket);
    }

    syncChains() {
        this.sockets.forEach(socket => {
            this.sendChain(socket);
        });
    }
    
    sendChain(socket) {
        socket.send(JSON.stringify(this.blockChain.chain));
    }

    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            // console.log(data);

            this.blockChain.replaceChain(data);
        });
    }
    
}

module.exports = P2pServer;