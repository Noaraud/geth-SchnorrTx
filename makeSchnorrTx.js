const Tx = require('ethereumjs-tx-schnorr').Transaction;
const Buffer = require('safe-buffer').Buffer; 
const BigInteger = require('bigi');
const schnorr = require('bip-schnorr');

///////////////////////////

const prikey = BigInteger.fromHex("a772810e29331dc89a089fda8cca4da9115d109b63e41264b9739a49f26c196b");



const pubKey = Buffer.from("023a968c4c1a6127102fe60e2706476b23d8f6c3e147937a7252a5c35f61f0938e", "hex")
//Schnorrじゃない時のデフォルト値
//const pubKey = Buffer.from("0x")

//const addr_from = "0x6f4b8207d7ea8fc408c38c1603ebea69cdcdac91";

//const addr_to = "0xb081a3a5b838ac8741426e51f4a8339451cec3ae";

///////////////////////////


const txparams = {
    from: "0xe99259149c60f7f5fdb5e2b236303dfce23867a0",
    to: "0xb081a3a5b838ac8741426e51f4a8339451cec3ae",
    nonce: 0,
    value: 500000000000000000,
    gas: 21000
};
var tx = new Tx(txparams);

console.log(tx._implementsEIP155())
tx.pubkey = pubKey;
console.log("Non-signedTransaction:"+ JSON.stringify(tx) + "\n");
//console.log("Transaction:"+ JSON.stringify(tx.pubkey) + "\n");

//console.log(tx._implementsEIP155())

//r, s, vを入れない状態でHomestead or Frontierバージョン
const message = tx.hash(false);

const Signature = schnorr.sign(prikey, message);
tx.r = Signature.slice(0,32);
tx.s = Signature.slice(32,64);
tx.v = 27;


//tx.sign(prikeyhex);
console.log("SignedTransaction:"+ JSON.stringify(tx) + "\n");



const serializedTx = tx.serialize().toString('hex');
console.log("SerializedTransaction:"+ serializedTx + "\n");

console.log("Transaction nonce :"+ JSON.stringify(tx.nonce) + "\n");

console.log("Transaction gasPrice :"+ JSON.stringify(tx.gasPrice) + "\n");

console.log("Transaction gas :"+ JSON.stringify(tx.gas) + "\n");

console.log("Transaction to :"+ JSON.stringify(tx.to) + "\n");

console.log("Transaction value :"+ JSON.stringify(tx.value) + "\n");

console.log("Transaction data :"+ JSON.stringify(tx.input) + "\n");

console.log("Transaction pubkey :"+ JSON.stringify(tx.pubkey) + "\n");

console.log("Transaction v :"+ JSON.stringify(tx.v) + "\n");

console.log("Transaction r :"+ JSON.stringify(tx.r) + "\n");

console.log("Transaction s :"+ JSON.stringify(tx.s) + "\n");

console.log("Message :"+ Buffer.from(message).toString('hex') + "\n");

console.log("Signature :"+ Buffer.from(tx.r).toString('hex') + Buffer.from(tx.s).toString('hex'));










//Buffer.from([0xe3, 0x81, 0x82]).toString('hex')












