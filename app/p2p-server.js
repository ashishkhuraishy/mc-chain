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
    }


    connectSocket(socket) {
        this.sockets.push(socket);
        console.log('Socket Connected');
    }

}