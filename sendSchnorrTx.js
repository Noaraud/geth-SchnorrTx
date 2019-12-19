const Tx = require('ethereumjs-tx-schnorr').Transaction;
const Buffer = require('safe-buffer').Buffer; 
const BigInteger = require('bigi');
const schnorr = require('bip-schnorr');
const web3 = new (require("web3"));
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

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
    nonce: 4,
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
const serializedTx = tx.serialize().toString('hex');
console.log("SerializedTransaction:"+ serializedTx);



var res = web3.eth.sendSignedTransaction('0x' + serializedTx).then((res, hash) => {
    console.log("OK! Tx is sended");
    //console.log("Tx is : " + tx.serialize().toString('hex'));
}).catch((res, hash) => {
    console.log("NG");
    console.log(res);
});





