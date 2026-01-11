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
        this.chain = [this.createGenesisBlock()]; 
    }

    // Genesis block
    createGenesisBlock() {
        return new Block(Date.now(), 'Genesis Block', '0000');
    }

    // Get latest block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    // Add block to the chain
    addBlock(newBlock) {
        newBlock.pre_hash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    
}

const rkbcoin = new Blockchain();
const block = new Block(Date.now(), { amount: 10 }, );

rkbcoin.addBlock(block);
console.log(rkbcoin.chain[1].data);