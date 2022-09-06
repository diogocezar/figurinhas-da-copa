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
            return {
              ...sticker,
              quantity,
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
