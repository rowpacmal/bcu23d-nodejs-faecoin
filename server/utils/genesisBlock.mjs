const genesisBlock = {
  index: 1,
  timestamp: Date.now(),
  prevHash: '0',
  hash: '0',
  data: [],
  nonce: 0,
  difficulty: +process.env.DEFAULT_DIFFICULTY || 3,
};

export default genesisBlock;
