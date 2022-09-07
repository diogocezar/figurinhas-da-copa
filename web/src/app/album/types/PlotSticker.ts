import Country from 'src/app/album/types/Country';
import { Sticker } from 'src/app/album/types/Sticker';

interface PlotSticker {
  country: Country;
  percentage?: number;
  stickers: Sticker[];
}

export default PlotSticker;
