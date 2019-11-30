const Tx = require('ethereumjs-tx-schnorr').Transaction;
const Buffer = require('safe-buffer').Buffer; 
const BigInteger = require('bigi');
const schnorr = require('bip-schnorr');

///////////////////////////

const prikey = BigInteger.fromHex("B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CFEF");

const pubKey = Buffer.from('02DFF1D77F2A671C5F36183726DB2341BE58FEAE1DA2DECED843240F7B502BA659', 'hex')

//const addr_from = "0x6f4b8207d7ea8fc408c38c1603ebea69cdcdac91";

//const addr_to = "0xb081a3a5b838ac8741426e51f4a8339451cec3ae";

///////////////////////////


const txparams = {
    from: "0x6f4b8207d7ea8fc408c38c1603ebea69cdcdac91",
    to: "0xb081a3a5b838ac8741426e51f4a8339451cec3ae",
    nonce: 0,
    value: 3000000000000000000,
    gas: 5000000
};
var tx = new Tx(txparams);
tx.pubkey = pubKey.slice(1, 33);
console.log("Non-signedTransaction:"+ JSON.stringify(tx) + "\n");
//console.log("Transaction:"+ JSON.stringify(tx.pubkey) + "\n");


const message = tx.hash();
const Signature = schnorr.sign(prikey, message);
tx.r = Signature.slice(0,32);
tx.s = Signature.slice(32,64);
tx.v = 44;
//tx.sign(prikeyhex);
console.log("SignedTransaction:"+ JSON.stringify(tx) + "\n");



const serializedTx = tx.serialize().toString('hex');
console.log("SerializedTransaction:"+ serializedTx);









