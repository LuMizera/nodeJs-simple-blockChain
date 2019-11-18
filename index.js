const sha = require("sha256");

class Block {
  constructor(data, prevHash) {
    this.timestamp = Math.floor(Date.now() / 1000);
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.getHash();
  }

  getHash() {
    return sha(JSON.stringify(this.data) + this.prevHash + this.timestamp);
  }
}

class BlockChain {
  constructor(chain) {
    this.chain = [];
    if (chain) {
      for (let i = 0; i < chain.length; i++) {
        this.addBlock(chain[i]);
      }
    }
  }

  addBlock(data) {
    const prevHash = this.chain.length
      ? this.chain[this.chain.length - 1].hash
      : null;
    const block = new Block(data, prevHash);

    if (this.chainIsValid()) this.chain.push(block);
  }

  chainIsValid() {
    for (var i = 0; i < this.chain.length; i++) {
      if (this.chain[i].hash !== this.chain[i].getHash()) return false;
      if (i > 0 && this.chain[i].prevHash !== this.chain[i - 1].hash)
        return false;
    }
    return true;
  }
}

const CILCoin = new BlockChain([
  { sender: "Pessoa 0", reciver: "Pessoa 1", amount: 100 }
]);

CILCoin.addBlock({ sender: "Pessoa 1", reciver: "Pessoa 2", amount: 75 });
CILCoin.addBlock({ sender: "Pessoa 2", reciver: "Pessoa 3", amount: 50 });
CILCoin.addBlock({ sender: "Pessoa 3", reciver: "Pessoa 4", amount: 25 });
CILCoin.addBlock({ sender: "Pessoa 4", reciver: "Pessoa 5", amount: 0 });

console.log(JSON.stringify(CILCoin, null, 2));
