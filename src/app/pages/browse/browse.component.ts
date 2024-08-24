import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { Movie } from '../../shared/interfaces/movie.interface';
import { forkJoin, map, Observable } from 'rxjs';
import { VideoDetail } from '../../shared/interfaces/bannerVideo.interface';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, CarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent implements OnInit {
  private movie = inject(MovieService);

  // -------------------------User Signed In-------------------------
  isUserSignedIn: boolean = true;

  // -------------------------Banner Info-------------------------
  trendingBannerDetail$ = new Observable<any>();
  trendingBannerVideo$ = new Observable<any>();

  tvShowBannerTitle: string;
  tvShowBannerImageKey: string;

  popularBannerTitle: string;
  popularBannerOverview: string;
  popularBannerVideoKey: string;

  topRatedBannerTitle: string;
  topRatedBannerOverview: string;
  topRatedBannerVideoKey: string;

  nowPlayingBannerTitle: string;
  nowPlayingBannerOverview: string;
  nowPlayingBannerVideoKey: string;

  upcomingBannerTitle: string;
  upcomingBannerOverview: string;
  upcomingBannerVideoKey: string;
  // -------------------------End Banner Info-------------------------

  // -------------------------Movie Lists-------------------------
  trendingMovies: Movie[] = [];
  tvShows: Movie[] = [];
  popularMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  nowPlayingMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  // -------------------------End Movie Lists-------------------------

  // -------------------------Retrieve Movie Data from Service-------------------------
  sourceOfObservables = [
    this.movie.getTrendingMovies(),
    this.movie.getTvShows(),
    this.movie.getPopularMovies(),
    this.movie.getTopRated(),
    this.movie.getNowPlayingMovies(),
    this.movie.getUpcomingMovies(),
  ];
  // -------------------------End Retrieve Movie Data from Service-------------------------

  // --------------------------------------------------Retrieve Movie Carousel Data from Source of Observables--------------------------------------------------
  ngOnInit(): void {
    // this.movie.getTrendingMovies().subscribe((res) => console.log(res));

    forkJoin(this.sourceOfObservables)
      .pipe(
        map(([trending, tvShow, popular, topRated, nowPlaying, upcoming]) => {
          // console.log('getTrendingMovies:', movie);
          // console.log('tvShows:', tvShow);
          // console.log('popularMovies:', popular);
          // console.log('topRatedMovies:', topRated);
          // console.log('nowPlayingMovies:', nowPlaying);
          // console.log('upcomingMovies:', upcoming);

          this.trendingBannerDetail$ = this.movie.getBannerDetail(
            trending.results[0].id
          );
          this.trendingBannerVideo$ = this.movie.getBannerVideo(
            trending.results[0].id
          );
          // console.log('Trending Banner Details:', this.trendingBannerDetail$);
          // console.log('Trending Banner Video:', this.trendingBannerVideo$);

          this.tvShowBannerTitle = tvShow.results[0].original_name;
          this.tvShowBannerImageKey = tvShow.results[0].backdrop_path;
          // console.log('TV Show Banner Title:', this.tvShowBannerTitle);
          // console.log('TV Show Banner Image Key:', this.tvShowBannerImageKey);

          return {
            trending,
            tvShow,
            popular,
            topRated,
            nowPlaying,
            upcoming,
          };
        })
      )
      .subscribe((res: any) => {
        // console.log('Response:', res);

        // -------------------------Assigning movie lists-------------------------
        this.trendingMovies = res.trending.results as Movie[];
        this.tvShows = res.tvShow.results as Movie[];
        this.popularMovies = res.popular.results as Movie[];
        this.topRatedMovies = res.topRated.results as Movie[];
        this.nowPlayingMovies = res.nowPlaying.results as Movie[];
        this.upcomingMovies = res.upcoming.results as Movie[];

        // -------------------------Retrieve Banner Information for each Category-------------------------
        this.extractBannerInfo(this.trendingMovies[0].id, 'trending');
        this.extractBannerInfo(this.tvShows[0].id, 'tvShow');
        this.extractBannerInfo(this.popularMovies[0].id, 'popular');
        this.extractBannerInfo(this.topRatedMovies[0].id, 'topRated');
        this.extractBannerInfo(this.nowPlayingMovies[0].id, 'nowPlaying');
        this.extractBannerInfo(this.upcomingMovies[0].id, 'upcoming');
        // -------------------------End Retrieve Banner Information for each Category-------------------------
      });
  }
  // --------------------------------------------------End Retrieve Movie Carousel Data from Source of Observables--------------------------------------------------

  // --------------------------------------------------Retrieve Banner Information--------------------------------------------------
  // -------------------------Get Banner Info for Each Categoryn-------------------------
  extractBannerInfo(movieId: number, category: string) {
    forkJoin({
      bannerDetail: this.movie.getBannerDetail(movieId) as Observable<Movie>,
      bannerVideo: this.movie.getBannerVideo(
        movieId
      ) as Observable<VideoDetail>,
    }).subscribe(({ bannerDetail, bannerVideo }) => {
      // console.log(`${category} Banner Details: `, bannerDetail);
      // console.log(`${category} Banner Video: `, bannerVideo);
      const title: string = bannerDetail.original_title ?? bannerDetail.title;
      const overview: string = bannerDetail.overview;
      const videoKey: string = bannerVideo.results[0]?.key;

      this.setBannerInfo(category, title, overview, videoKey);
    });
  }
  // -------------------------End Get Banner Info for Each Categoryn-------------------------

  // -------------------------Set Banner Info for Each Category-------------------------
  setBannerInfo(
    category: string,
    title: string,
    overview: string,
    videoKey: string
  ) {
    switch (category) {
      case 'popular':
        this.popularBannerTitle = title;
        this.popularBannerOverview = overview;
        this.popularBannerVideoKey = videoKey;
        break;
      case 'topRated':
        this.topRatedBannerTitle = title;
        this.topRatedBannerOverview = overview;
        this.topRatedBannerVideoKey = videoKey;
        break;
      case 'nowPlaying':
        this.nowPlayingBannerTitle = title;
        this.nowPlayingBannerOverview = overview;
        this.nowPlayingBannerVideoKey = videoKey;
        break;
      case 'upcoming':
        this.upcomingBannerTitle = title;
        this.upcomingBannerOverview = overview;
        this.upcomingBannerVideoKey = videoKey;
        break;
      default:
        break;
    }
  }
  // -------------------------End Set Banner Info for Each Category-------------------------
  // --------------------------------------------------End Retrieve Banner Information--------------------------------------------------
}
