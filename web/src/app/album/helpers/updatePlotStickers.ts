import CountryId from 'src/app/album/enum/CountryId';

export const updatePlotStickers = (
  plotStickers,
  id,
  quantity,
  operation,
  type
) => {
  plotStickers = plotStickers.map((plotSticker) => {
    let condition;
    if (type === 'fwc') condition = plotSticker.country.id === CountryId.FWC;
    if (type === 'coc') condition = plotSticker.country.id === CountryId.COC;
    if (type === 'countries')
      condition =
        plotSticker.country.id !== CountryId.COC &&
        plotSticker.country.id !== CountryId.FWC;
    if (condition) {
      return {
        ...plotSticker,
        stickers: plotSticker.stickers.map((sticker) => {
          if (sticker.id === id) {
            let newQuantity;
            if (operation === 'add') newQuantity = quantity + 1;
            if (operation === 'sub') newQuantity = quantity - 1;
            if (newQuantity < 0) newQuantity = 0;
            if (newQuantity > 5) newQuantity = 5;
            return {
              ...sticker,
              quantity: newQuantity,
            };
          }
          return sticker;
        }),
      };
    }
    return plotSticker;
  });
  return plotStickers;
};
