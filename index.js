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
        
        this.pendingTransactions = [];
    }

    // Genesis block
    createGenesisBlock() {
        return new Block(Date.now(), 'Genesis Block', '0000');
    }

    // Get latest block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(){
        let block = new Block(Date.now(), this.pendingTransactions);
        block.pre_hash = this.getLatestBlock().hash;
        block.mineBlock(this.difficulty);
        this.chain.push(block);

        this.pendingTransactions = [];
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

    // get balance of address
    getBalanceOfAddress(address){
        let balance = 0;
        for(const block of this.chain){
            for(const transaction of block.transactions){
                if(transaction.fromAddress === address){
                    balance -= transaction.amount;
                }

                if(transaction.toAddress === address){
                    balance += transaction.amount;
                }
            }
        }
        return balance;
    }
    
}
// =================================================================================
//  Blockchain class end
// =================================================================================

const rkbcoin = new Blockchain();
rkbcoin.createTransaction(new Transaction('address1', 'address2', 100));
rkbcoin.createTransaction(new Transaction('address2', 'address1', 50));

rkbcoin.minePendingTransactions();
// console.log('Blockchain is : ', rkbcoin);
console.log('Balance of address1 is', rkbcoin.getBalanceOfAddress('address1'));
console.log('Balance of address2 is', rkbcoin.getBalanceOfAddress('address2'));