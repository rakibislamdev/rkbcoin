const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Generate a new key pair
const key = ec.genKeyPair();

// Get the private and public keys in hexadecimal format
const privateKey = key.getPrivate('hex');
const publicKey = key.getPublic('hex');

console.log('Private Key:', privateKey);
console.log('Public Key:', publicKey);
