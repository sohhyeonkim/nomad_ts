import crypto from "crypto";

interface BlockShape {
  prevHash: string;
  height: number;
  data: string;
  hash: string;
}

class Block implements BlockShape {
  public hash: string;
  constructor(
    public prevHash: string,
    public height: number,
    public data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string) {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash("sha256").update(toHash).digest("hex");
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return "";
    return this.blocks[this.blocks.length - 1].hash;
  }
  public addBlock(data: string) {
    const newBlock = new Block(
      this.getPrevHash(),
      this.blocks.length + 1,
      data
    );
    this.blocks.push(newBlock);
  }

  public getBlocks() {
    return [...this.blocks];
  }
}

const newblockchain = new Blockchain();

newblockchain.addBlock("first");
newblockchain.addBlock("second");
newblockchain.addBlock("third");

console.log(
  newblockchain.getBlocks().push(new Block("xxxxxx", 1111111, "hacked")),
  newblockchain
);
