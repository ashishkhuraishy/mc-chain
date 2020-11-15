const { SHA256 } = require("crypto-js");

class Block {
    constructor(timeStamp, lastHash, hash, data){
        this.timeStamp = timeStamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
    }


    toString(){
        return `Block -- 
        TimeStamp : ${this.timeStamp}
        LastHash  : ${this.lastHash}
        Hash      : ${this.hash}
        Data      : ${this.data}`;
    }


    static genesisBlock() {
        return new Block("Genesis Time", "--------", "f1r57 h45h", []);
    }


    static hash(timestamp, lasthash, data){
        return SHA256(`${timestamp}${lasthash}${data}`).toString();
    }


    static hashBlock(block) {
        const {timeStamp, lastHash, data } = block;
        return this.hash(timeStamp, lastHash, data);
    }


    static mineBlock(lastBlock, data){
        var timeStamp = Date.now();
        var lastHash = lastBlock.hash;
        var hash = this.hash(timeStamp, lastHash, data);


        return new Block(timeStamp, lastHash, hash, data);
    }

}

module.exports = Block;