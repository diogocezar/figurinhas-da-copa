import CountryId from 'src/app/album/enum/CountryId';
import CountryType from 'src/app/album/enum/CountryType';

export const fill = (stickers, countries, type) => {
  const result = [];
  stickers.forEach((sticker) => {
    let condition;
    if (type === CountryType.FWC)
      condition = sticker.country.id === CountryId.FWC;
    if (type === CountryType.COC)
      condition = sticker.country.id === CountryId.COC;
    if (type === CountryType.COUNTRIES)
      condition =
        sticker.country.id !== CountryId.COC &&
        sticker.country.id !== CountryId.FWC;
    if (
      condition &&
      !result.find((country) => country.id === sticker.country.id)
    )
      result.push(sticker.country);
  });
  return result;
};
