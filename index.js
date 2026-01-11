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

const block = new Block(Date.now(), { amount: 4 }, '00000');
console.log(block);