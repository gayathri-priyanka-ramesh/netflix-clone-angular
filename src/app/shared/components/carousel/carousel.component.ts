import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import Swiper from 'swiper';
import { Movie } from '../../interfaces/movie.interface';
import { DescriptionPipe } from '../../pipes/description.pipe';
import { ImagePipe } from '../../pipes/image.pipe';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, ImagePipe, DescriptionPipe],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class CarouselComponent implements AfterViewInit {
  @Input() videoContents: Movie[];
  @Input() title: string;

  @ViewChild('swiperContainer') swiperContainer!: ElementRef;
  selectedContent: string | null = null;

  constructor() {}
  ngAfterViewInit(): void {
    this.initializeSwiper();
  }

  swiperCongiguration = {
    slidesPerView: 3,
    slidesPerGroup: 2,
    centeredSlides: true,
    loop: true,
    breakpoints: {
      600: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 5,
        centeredSlides: true,
      },
      900: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 5,
        centeredSlides: true,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 5,
        centeredSlides: false,
      },
      1500: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 5,
        centeredSlides: false,
      },
      1800: {
        slidesPerView: 5,
        slidesPerGroup: 6,
        spaceBetween: 5,
        centeredSlides: false,
      },
    },
  };

  private initializeSwiper() {
    console.log('Swiper Initialized');
    return new Swiper(
      this.swiperContainer.nativeElement,
      this.swiperCongiguration
    );
  }

  setHoverContent(content: Movie) {
    this.selectedContent = content.original_title ?? content.title;
  }

  clearHoverContent() {
    this.selectedContent = null;
  }
}
