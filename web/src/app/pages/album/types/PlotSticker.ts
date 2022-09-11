import Country from 'src/app/pages/album/types/Country';
import { Sticker } from 'src/app/pages/album/types/Sticker';

interface PlotSticker {
  country: Country;
  percentage?: number;
  stickers: Sticker[];
}

export default PlotSticker;
