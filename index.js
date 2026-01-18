const sha256 = require('crypto-js/sha256')

// =================================================================================
// Block class start
// =================================================================================
class Block {
    constructor(timestamp, transactions, pre_hash = '') {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.pre_hash = pre_hash;
        this.hash = this.calculateHash();
        this.nonce = 0;
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

    /* A simple hash function for demonstration purposes */
    calculateHash() {
        return (
            sha256(this.pre_hash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString()
        );
    }

}
// =================================================================================
// Block class end
// =================================================================================

// =================================================================================
// Transaction class start
// =================================================================================
class Transaction {
    constructor(fromAddress, toAddress, amount){
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
// =================================================================================
// Transaction class end
// =================================================================================


//=================================================================================
//  Blockchain class start
// =================================================================================
class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5; 
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
        newBlock.mineBlock(this.difficulty);
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
// =================================================================================
//  Blockchain class end
// =================================================================================

const rkbcoin = new Blockchain();
const block1 = new Block(Date.now(), { amount: 10 });
rkbcoin.addBlock(block1);

const block2 = new Block(Date.now(), { amount: 20 });
rkbcoin.addBlock(block2);

console.log(rkbcoin);
