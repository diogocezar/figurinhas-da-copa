import CountryId from 'src/app/album/enum/CountryId';
import CountryType from 'src/app/album/enum/CountryType';

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
