import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { BannerComponent } from '../../shared/components/banner/banner.component';
import { MovieService } from '../../shared/services/movie.service';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { Movie } from '../../shared/interfaces/movie.interface';
import { forkJoin, map, Observable } from 'rxjs';
import { VideoDetail } from '../../shared/interfaces/bannerVideo.interface';
import { ScrollService } from '../../shared/services/scroll.service';
import { MovieBannerCarousel } from '../../shared/interfaces/movieBannerCarousel.interface';

@Component({
  selector: 'app-browse',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BannerComponent, CarouselComponent],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent implements OnInit, AfterViewInit {
  private movie = inject(MovieService);
  private scroll = inject(ScrollService);

  // -------------------------Category Section-------------------------
  @ViewChild('trending', { static: false }) trendingSection!: ElementRef;
  @ViewChild('tvShow', { static: false }) tvShowSection!: ElementRef;
  @ViewChild('popular', { static: false }) popularSection!: ElementRef;
  @ViewChild('topRated', { static: false }) topRatedSection!: ElementRef;
  @ViewChild('nowPlaying', { static: false }) nowPlayingSection!: ElementRef;
  @ViewChild('upcoming', { static: false }) upcomingSection!: ElementRef;
  // -------------------------End Category Section-------------------------

  // -------------------------User Signed In-------------------------
  isUserSignedIn: boolean = true;

  // -------------------------Banner Info-------------------------
  // trendingBannerDetail$ = new Observable<any>();
  // trendingBannerVideo$ = new Observable<any>();
  trendingBannerTitle: string;
  trendingBannerOverview: string;
  trendingBannerVideoKey: string;

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
  movieBannerCarousel: MovieBannerCarousel[];
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

  ngOnInit(): void {
    // --------------------------------------------------Retrieve Movie Carousel Data from Source of Observables--------------------------------------------------
    forkJoin(this.sourceOfObservables)
      .pipe(
        map(([trending, tvShow, popular, topRated, nowPlaying, upcoming]) => {
          // console.log('trendingMovies:', trending);
          // console.log('tvShows:', tvShow);
          // console.log('popularMovies:', popular);
          // console.log('topRatedMovies:', topRated);
          // console.log('nowPlayingMovies:', nowPlaying);
          // console.log('upcomingMovies:', upcoming);

          // this.trendingBannerDetail$ = this.movie.getBannerDetail(
          //   trending.results[0].id
          // );
          // this.trendingBannerVideo$ = this.movie.getBannerVideo(
          //   trending.results[0].id
          // );
          // this.trendingBannerDetail$.subscribe((trendingBannerDetail) => {
          //   // console.log('trendingBannerDetail:', trendingBannerDetail);
          //   this.trendingBannerTitle =
          //     trendingBannerDetail.original_title || trendingBannerDetail.title;
          //   this.trendingBannerOverview = trendingBannerDetail.overview;
          // });
          // this.trendingBannerVideo$.subscribe((trendingBannerVideo) => {
          //   // console.log('trendingBannerVideo:', trendingBannerVideo);
          //   this.trendingBannerVideoKey = trendingBannerVideo.results[0].key;
          // });

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
        console.log('Response:', res);

        // -------------------------Assigning movie lists-------------------------
        this.trendingMovies = res.trending.results as Movie[];
        this.tvShows = res.tvShow.results as Movie[];
        this.popularMovies = res.popular.results as Movie[];
        this.popularMovies.reverse();
        this.topRatedMovies = res.topRated.results as Movie[];
        this.nowPlayingMovies = res.nowPlaying.results as Movie[];
        this.nowPlayingMovies.reverse();
        this.upcomingMovies = res.upcoming.results as Movie[];
        console.log('trendingMovies:', this.trendingMovies);
        console.log('tvShows:', this.tvShows);
        console.log('popularMovies:', this.popularMovies);
        console.log('topRatedMovies:', this.topRatedMovies);
        console.log('nowPlayingMovies:', this.nowPlayingMovies);
        console.log('upcomingMovies:', this.upcomingMovies);

        // -------------------------Retrieve Banner Information for each Category-------------------------
        this.extractBannerInfo(this.trendingMovies[0].id, 'trending');
        this.extractBannerInfo(this.tvShows[0].id, 'tvShow');
        this.extractBannerInfo(this.popularMovies[0].id, 'popular');
        this.extractBannerInfo(this.topRatedMovies[0].id, 'topRated');
        this.extractBannerInfo(this.nowPlayingMovies[0].id, 'nowPlaying');
        this.extractBannerInfo(this.upcomingMovies[0].id, 'upcoming');
        // -------------------------End Retrieve Banner Information for each Category-------------------------

        this.setBannerCarouselInformation();
      });
    // --------------------------------------------------End Retrieve Movie Carousel Data from Source of Observables--------------------------------------------------
  }

  ngAfterViewInit(): void {
    // --------------------------------------------------Retrieve Current Section from Observables--------------------------------------------------
    const categorySection = {
      trending: this.trendingSection,
      tvShow: this.tvShowSection,
      popular: this.popularSection,
      topRated: this.topRatedSection,
      nowPlaying: this.nowPlayingSection,
      upcoming: this.upcomingSection,
    };

    this.scroll.scrollToSection$.subscribe((section) => {
      // console.log('Observed Section:', section);
      this.scrollTo(section as keyof typeof categorySection, categorySection);
    });
    // --------------------------------------------------End Retrieve Current Section from Observables--------------------------------------------------
  }

  // --------------------------------------------------Retrieve Banner Information--------------------------------------------------
  // -------------------------Get Banner Info for Each Categoryn-------------------------
  extractBannerInfo(movieId: number, category: string) {
    forkJoin({
      bannerDetail: this.movie.getBannerDetail(movieId) as Observable<Movie>,
      bannerVideo: this.movie.getBannerVideo(
        movieId
      ) as Observable<VideoDetail>,
    }).subscribe(({ bannerDetail, bannerVideo }) => {
      console.log(`${category} Banner Details: `, bannerDetail);
      console.log(`${category} Banner Video: `, bannerVideo);
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
      case 'trending':
        this.trendingBannerTitle = title;
        this.trendingBannerOverview = overview;
        this.trendingBannerVideoKey = videoKey;
        break;
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

  // --------------------------------------------------Scroll to Current Section--------------------------------------------------
  scrollTo(
    section:
      | 'trending'
      | 'tvShow'
      | 'popular'
      | 'topRated'
      | 'nowPlaying'
      | 'upcoming',
    categoryMap: { [key: string]: ElementRef<any> }
  ): void {
    let targetElement: ElementRef | undefined = categoryMap[section];
    console.log('targetElement:', targetElement);
    targetElement?.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  // --------------------------------------------------End Scroll to Current Section--------------------------------------------------

  setBannerCarouselInformation() {
    this.movieBannerCarousel = [
      {
        templateRef: 'trending',
        category: 'Trending Movies',
        title: this.trendingBannerTitle,
        overview: this.trendingBannerOverview,
        key: this.trendingBannerVideoKey,
        videoContents: this.trendingMovies,
      },
      {
        templateRef: 'tvShow',
        category: 'TV Shows',
        title: this.tvShowBannerTitle,
        overview: '',
        key: this.tvShowBannerImageKey,
        isBackdrop: true,
        videoContents: this.tvShows,
      },
      {
        templateRef: 'popular',
        category: 'Popular Movies',
        title: this.popularBannerTitle,
        overview: this.popularBannerOverview,
        key: this.popularBannerVideoKey,
        videoContents: this.popularMovies,
      },
      {
        templateRef: 'topRated',
        category: 'Top Rated Movies',
        title: this.topRatedBannerTitle,
        overview: this.topRatedBannerOverview,
        key: this.topRatedBannerVideoKey,
        videoContents: this.topRatedMovies,
      },
      {
        templateRef: 'nowPlaying',
        category: 'Now Playing Movies',
        title: this.nowPlayingBannerTitle,
        overview: this.nowPlayingBannerOverview,
        key: this.nowPlayingBannerVideoKey,
        videoContents: this.nowPlayingMovies,
      },
      {
        templateRef: 'upcoming',
        category: 'Upcoming Movies Movies',
        title: this.upcomingBannerTitle,
        overview: this.upcomingBannerOverview,
        key: this.upcomingBannerVideoKey,
        videoContents: this.upcomingMovies,
      },
    ];
  }
}
