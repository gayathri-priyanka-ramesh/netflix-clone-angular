import { Movie } from './movie.interface';

export interface MovieBannerCarousel {
  templateRef: string;
  category: string;
  title: string;
  overview: string;
  key: string;
  isBackdrop?: boolean;
  videoContents: Movie[];
}
