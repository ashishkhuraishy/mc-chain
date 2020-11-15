const Block = require("./block");

class BlockChain {

    constructor(){
        this.chain = [Block.genesisBlock()];
    }


    addBlock(data) {
        var block = Block.mineBlock(this.chain[this.chain.length - 1], data);
        this.chain.push(block);


        return block;
    }



    _isValidChain(chain){
        if(JSON.stringify(chain[0]) !== JSON.stringify(Block.genesisBlock())) return false;

        for (let i = 1; i < chain.length; i++) {
            const block = chain[i];
            const lastBlock = chain[i - 1];
            if(block.lastHash !== lastBlock.hash || block.hash !== Block.hashBlock(block)) return false;
        }


        return true;
    }


    replaceChain(newChain) {
        if (newChain.length <= this.chain) {
            console.log("The recived chain is shorter keeping the current chain.")
            return;
        } else if(!this._isValidChain(newChain)) {
            console.log("One or more blocks inside this chain are invalid");
            return;
        }

        console.log("Replacing current chain with the new one");
        this.chain = newChain;
        return;
    }

}


module.exports = BlockChain;