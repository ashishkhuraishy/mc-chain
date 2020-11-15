const BlockChain = require("./blockchain");


const blkChain = new BlockChain();
const blk2 = new BlockChain();


blkChain.addBlock("foo");
blkChain.addBlock("bar");
blkChain.addBlock("zoo");

blk2.replaceChain(blkChain.chain);

console.log(blk2.chain);