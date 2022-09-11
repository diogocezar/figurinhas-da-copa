import CountryId from 'src/app/pages/album/enum/CountryId';
import CountryType from 'src/app/pages/album/enum/CountryType';

export const filterByType = (stickers, type) => {
  return stickers.filter((sticker) => {
    let condition;
    if (type === CountryType.FWC)
      condition = sticker.country.id === CountryId.FWC;
    if (type === CountryType.COC)
      condition = sticker.country.id === CountryId.COC;
    if (type === CountryType.COUNTRIES)
      condition =
        sticker.country.id !== CountryId.COC &&
        sticker.country.id !== CountryId.FWC;
    if (condition) return sticker;
  });
};

export const filterByRepeated = (plotStickers) => {
  return plotStickers.map((plotStickers) => {
    const stickers = plotStickers.stickers.filter(
      (sticker) => sticker.quantity > 1
    );
    return { ...plotStickers, stickers };
  });
};

export const filterByMissing = (plotStickers) => {
  return plotStickers.map((plotStickers) => {
    const stickers = plotStickers.stickers.filter(
      (sticker) => sticker.quantity === 0
    );
    return { ...plotStickers, stickers };
  });
};

export const filterByUnique = (plotStickers) => {
  return plotStickers.map((plotStickers) => {
    const stickers = plotStickers.stickers.filter(
      (sticker) => sticker.quantity === 1
    );
    return { ...plotStickers, stickers };
  });
};
