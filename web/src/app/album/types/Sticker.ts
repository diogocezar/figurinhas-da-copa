import Country from 'src/app/album/types/Country';

type BaseSticker = {
  id: number;
  name: string;
};

type Sticker = BaseSticker & {
  number: number;
  country: Country;
  quantity: number;
};

export type { Sticker, BaseSticker };
