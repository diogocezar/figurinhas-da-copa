export const generateTextToCopy = (plotStickers) => {
  let text = '';
  plotStickers.map((plotStickers) => {
    const existsStickers = plotStickers.stickers.filter((sticker) => sticker);
    if (existsStickers.length > 0) {
      text += `${plotStickers.country.name}\n\n`;
      plotStickers.stickers.forEach((sticker) => {
        text += `${sticker.name} - `;
      });
      text = text.slice(0, -3);
      text += '\n\n\n';
    }
  });
  return text;
};
