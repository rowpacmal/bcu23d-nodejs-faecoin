const adjustDifficultyLevel = (block, timestamp) => {
  if (timestamp - block.timestamp > +process.env.DEFAULT_MINE_RATE)
    return block.difficulty - 1;

  return block.difficulty + 1;
};

export default adjustDifficultyLevel;
