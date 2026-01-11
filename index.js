const sha256 = require('crypto-js/sha256')

class Block {
    constructor(timestamp, data, pre_hash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.pre_hash = pre_hash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    /* A simple hash function for demonstration purposes */
    calculateHash() {
        return (
            sha256(this.pre_hash + this.timestamp + JSON.stringify(this.data)).toString()
        );
    }

    // minig function
    mineBlock(difficulty) {
        while (
            this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0')
        ) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log('Block mined: ' + this.hash);
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

    // Validate the integrity of the blockchain
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.pre_hash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
    
}

const rkbcoin = new Blockchain();
const block = new Block(Date.now(), { amount: 10 }, );

rkbcoin.addBlock(block);
console.log(rkbcoin.isChainValid()); // true

// Tampering with the blockchain
rkbcoin.chain[1].data = "hacked data";
// rkbcoin.chain[1].hash = rkbcoin.chain[1].calculateHash();
console.log(rkbcoin.isChainValid()); // false