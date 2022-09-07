export const getTotal = (stickers) => {
  const total = stickers.length;
  return total;
};

export const getCompleted = (stickers) => {
  const completed = stickers.filter((sticker) => sticker.quantity > 0).length;
  return completed;
};

export const getRepeated = (stickers) => {
  const repeated = stickers.filter((sticker) => sticker.quantity > 1).length;
  return repeated;
};

export const getCompletedPercentage = (stickers) => {
  const total = getTotal(stickers);
  const completed = getCompleted(stickers);
  return Math.round((completed / total) * 100);
};
