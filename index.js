const sha256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, data, pre_hash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.pre_hash = pre_hash;
        this.hash = this.calculateHash();
    }

    /* A simple hash function for demonstration purposes */
    calculateHash() {
        return (
            sha256(this.pre_hash + this.timestamp + JSON.stringify(this.data)).toString()
        );
    }
}


class Blockchain {
    constructor() {
        this.chain = [];
    }

    // Add block to the chain
    addBlock(newBlock) {
        // newBlock.pre_hash = this.getLatestBlock().hash;
        // newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    
}

const rkbcoin = new Blockchain();
const block = new Block(Date.now(), { amount: 4 }, '00000');

rkbcoin.addBlock(block);
console.log(rkbcoin);