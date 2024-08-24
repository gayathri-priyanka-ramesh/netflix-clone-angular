import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // -------------------------TMDB API URL Parameter Configuration-------------------------
  options = {
    params: {
      include_adult: 'false',
      include_video: 'true',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
    },
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNTJiZWYxNzMwYzQwZWVkM2JhMTY0YmU4ZDRiM2UyOCIsIm5iZiI6MTcyMzczMTQ1MC4yNjg4MDgsInN1YiI6IjY2YmUwYjllMmJlNTQ2ZDE4ZmMzODYwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zQBROrNc6cCB9AUq_0ZWZq1YoKeQE8IwQ8onVtVtwOE',
    },
  };
  // -------------------------End TMDB API URL Parameter Configuration-------------------------

  constructor(private http: HttpClient) {}

  // --------------------------------------------------Get Banner Information--------------------------------------------------
  // -------------------------Get Banner Video-------------------------
  getBannerVideo(id: number) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}/videos`,
      this.options
    );
  }
  // -------------------------End Get Banner Video-------------------------

  // -------------------------Get Banner Detail-------------------------
  getBannerDetail(id: number) {
    return this.http.get(
      `https://api.themoviedb.org/3/movie/${id}`,
      this.options
    );
  }
  // -------------------------End Get Banner Detail-------------------------
  // --------------------------------------------------End Get Banner Information--------------------------------------------------

  // --------------------------------------------------Get Carousel Data--------------------------------------------------
  // -------------------------Get Trending Movies-------------------------
  getTrendingMovies() {
    return this.http.get<any>(
      'https://api.themoviedb.org/3/discover/movie',
      this.options
    );
  }
  // -------------------------End Get Trending Movies-------------------------

  // -------------------------Get TV Shows-------------------------
  getTvShows() {
    return this.http.get(
      'https://api.themoviedb.org/3/discover/tv',
      this.options
    );
  }
  // -------------------------End Get TV Shows-------------------------

  // -------------------------Get Popular Movies-------------------------
  getPopularMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/popular',
      this.options
    );
  }
  // -------------------------End Get Popular Movies-------------------------

  // -------------------------Get Top Rated Movies-------------------------
  getTopRated() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/top_rated',
      this.options
    );
  }
  // -------------------------End Get Top Rated Movies-------------------------

  // -------------------------Get Now Playing Movies-------------------------
  getNowPlayingMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/now_playing',
      this.options
    );
  }
  // -------------------------End Get Now Playing Movies-------------------------

  // -------------------------Get Now Upcoming Movies-------------------------
  getUpcomingMovies() {
    return this.http.get(
      'https://api.themoviedb.org/3/movie/upcoming',
      this.options
    );
  }
  // -------------------------End Get Now Upcoming Movies-------------------------
  // --------------------------------------------------End Get Carousel Data--------------------------------------------------
}
